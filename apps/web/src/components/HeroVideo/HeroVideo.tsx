'use client';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './HeroVideo.module.css';

const VIDEO_SRC = '/videos/hero.mp4';

// Readiness milestones. Each one is a moment where a previously-refused play() may now be
// permitted, so we ask again.
const MEDIA_EVENTS = ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'suspend'] as const;

// Any of these is the visitor's first interaction, which lifts every remaining autoplay
// restriction there is — including iOS Low Power Mode, which no amount of markup can talk
// its way past. Pointer/touch/click cover phones and desktop, keydown covers keyboard-only,
// scroll covers "started reading without touching anything".
const GESTURE_EVENTS = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'scroll'] as const;

// Backoff that outlives the moment when WebKit has not yet decided the element is visible —
// see the note in mountVideo. Dense at the start, then a slow tail: iOS effectively ignores
// `preload` and only fetches once playback is requested, so on a phone connection the first
// several attempts can all land before there is a single frame to show. Stopping at 6s, as
// this used to, gave up while the file was still arriving. The tail costs one timer every
// 1.5s and stops the instant a frame renders.
const RETRY_DELAYS_MS = [100, 300, 700, 1400, 2500, 4000, 6000, 8000, 10_000, 12_500, 15_000, 18_000, 21_000, 25_000];

/** `navigator.connection` is still unshipped in Safari, so it is absent from lib.dom. */
interface NetworkInformation {
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  saveData?: boolean;
}

// A 2.9MB decorative loop is a bad trade on a metered or very slow connection, where it also
// competes with content the visitor actually asked for. The poster alone is a complete hero.
function prefersNoVideo() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  if (!connection) {
    return false;
  }

  return connection.saveData === true || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g';
}

// Figma's hero is `frame-video-inicio` — a video, not a still. Performance strategy:
//   1. The poster is server-rendered with priority — it IS the LCP, so first paint never
//      waits on video bytes. It is frame 0 of hero.mp4 at the video's native size, so the
//      hand-off is invisible; a poster from a different moment of the shot made the
//      framing visibly jump sideways when the video appeared.
//   2. The <video> only enters the DOM once the browser goes idle, so the stream competes
//      with neither hydration nor the poster.
//   3. The video is opaque the whole time and the POSTER fades away over it — see the
//      stylesheet, this is what makes iOS autoplay work at all.
//   4. The slow drift is baked into the file (15fps, 0.6x) rather than applied through
//      playbackRate — Safari drops a rate set before metadata arrives, and a non-native
//      rate keeps it off some hardware decode paths.
//   5. muted + playsInline + loop = autoplay allowed everywhere, looping forever; no audio
//      track was encoded.
//   6. Decorative: aria-hidden video, empty-alt poster — SEO/a11y read the h1, not this.
//   7. prefers-reduced-motion, Save-Data and 2g visitors keep the still; nothing is fetched.
export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (prefersNoVideo()) {
      return;
    }

    // Idle rather than a fixed delay: on a fast machine the stream starts sooner than the
    // old 300ms guess, and on a busy one it correctly waits longer. requestIdleCallback
    // only reached Safari 16.4, hence the timeout fallback.
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(() => setShowVideo(true), { timeout: 1_000 });

      return () => window.cancelIdleCallback(handle);
    }

    const handle = window.setTimeout(() => setShowVideo(true), 200);

    return () => window.clearTimeout(handle);
  }, []);

  // useCallback keeps the ref stable: an inline callback is detached and re-invoked on every
  // render, which would tear down and rebuild all of this every time `playing` changes.
  const mountVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) {
      return;
    }

    // ── 1. Become autoplay-eligible BEFORE there is anything to load ──────────────────
    // react-dom 19 sets `muted` as a DOM *property* only — its prop table literally reads
    // `case "muted": domElement.muted = value` — so the `muted` content attribute never
    // reaches the DOM. WebKit reads the attribute when it decides whether a video may start
    // on its own. That is why the JSX below deliberately carries no `src`: with no source
    // the resource selection algorithm never runs, so nothing is evaluated until these
    // attributes are in place and we hand it the URL ourselves.
    video.defaultMuted = true; // this is the IDL attribute that reflects `muted`
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', ''); // iOS 9 and earlier
    // Keeps the element out of the AirPlay/remote-playback route picker, which can otherwise
    // suspend a background loop the moment any route is available.
    video.setAttribute('disableremoteplayback', '');
    video.setAttribute('x-webkit-airplay', 'deny');

    video.src = VIDEO_SRC;
    video.load();

    // ── 2. Ask to play, and keep asking ──────────────────────────────────────────────
    const teardown: Array<() => void> = [];
    const stopTrying: Array<() => void> = [];

    const attempt = () => {
      if (!video.paused) {
        return;
      }

      void video.play().catch(() => undefined);
    };

    // The bug this replaces: WebKit refuses autoplay for an element whose viewport
    // visibility it has not computed yet — `MediaElementSession::autoplayPermitted()` bails
    // out while `visibleInViewportState()` is still Unknown, which it is for the first
    // rendering update after insertion. Every media-readiness event fires inside that same
    // opening moment, so a retry set bound only to those can miss the window entirely and
    // then never fire again. That is exactly why a single tap "fixed" it — the tap was the
    // only retry trigger left. A short bounded backoff simply outlives the window.
    const timers = RETRY_DELAYS_MS.map(delay => window.setTimeout(attempt, delay));

    stopTrying.push(() => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    });

    // The precise, event-driven version of the same thing: fires once WebKit has actually
    // resolved the element's viewport visibility, whenever that turns out to be.
    if (typeof IntersectionObserver === 'function') {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          attempt();
        }
      });

      observer.observe(video);
      stopTrying.push(() => observer.disconnect());
    }

    for (const name of MEDIA_EVENTS) {
      video.addEventListener(name, attempt);
      stopTrying.push(() => video.removeEventListener(name, attempt));
    }

    for (const name of GESTURE_EVENTS) {
      document.addEventListener(name, attempt, { passive: true });
      stopTrying.push(() => document.removeEventListener(name, attempt));
    }

    // ── 3. Stay playing ──────────────────────────────────────────────────────────────
    // iOS pauses background media and does not resume it, and a bfcache restore comes back
    // paused too. These outlive success, so they are not part of `stopTrying`.
    const resume = () => {
      if (document.visibilityState === 'visible') {
        attempt();
      }
    };

    video.addEventListener('pause', resume);
    document.addEventListener('visibilitychange', resume);
    // pageshow covers a bfcache restore; focus and orientationchange are moments Safari
    // re-evaluates the page and has been observed to release a previously refused element.
    window.addEventListener('pageshow', resume);
    window.addEventListener('focus', resume);
    window.addEventListener('orientationchange', resume);

    teardown.push(() => {
      video.removeEventListener('pause', resume);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('pageshow', resume);
      window.removeEventListener('focus', resume);
      window.removeEventListener('orientationchange', resume);
    });

    // Once frames are rendering, drop the whole retry apparatus — six document-level
    // listeners and seven timers are not something to leave armed for the session.
    const settle = () => {
      for (const stop of stopTrying.splice(0)) {
        stop();
      }
    };

    const handlePlaying = () => {
      setPlaying(true);
      settle();
    };

    video.addEventListener('playing', handlePlaying);
    teardown.push(() => video.removeEventListener('playing', handlePlaying));

    attempt();

    return () => {
      settle();

      for (const undo of teardown) {
        undo();
      }
    };
  }, []);

  return (
    <div className={styles.media}>
      {/* Rendered before the poster so the poster paints on top of it. `src` is set in the
          ref, not here — see mountVideo. */}
      {showVideo ? (
        <video
          aria-hidden={true}
          autoPlay={true}
          className={styles.video}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
          ref={mountVideo}
          tabIndex={-1}
        />
      ) : null}

      <Image
        alt=""
        className={playing ? `${styles.poster} ${styles.posterHidden}` : styles.poster}
        fill={true}
        priority={true}
        sizes="100vw"
        src="/images/home-hero.webp"
      />
    </div>
  );
}
