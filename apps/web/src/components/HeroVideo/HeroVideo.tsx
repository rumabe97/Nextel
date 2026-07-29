'use client';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './HeroVideo.module.css';

// Figma's hero is `frame-video-inicio` — a video, not a still. Performance strategy:
//   1. The poster is server-rendered with priority — it IS the LCP, so first paint never
//      waits on video bytes. It is frame 0 of hero.mp4 at the video's native size, so the
//      hand-off is invisible; a poster from a different moment of the shot made the
//      framing visibly jump sideways when the video appeared.
//   2. The <video> only enters the DOM after hydration, so the stream competes with
//      nothing on the critical path.
//   3. The video is opaque the whole time and the POSTER fades away over it — see the
//      stylesheet, this is what makes iOS autoplay work at all.
//   4. The slow drift is baked into the file (15fps, 0.6x) rather than applied through
//      playbackRate — Safari drops a rate set before metadata arrives, and a non-native
//      rate keeps it off some hardware decode paths.
//   5. muted + playsInline + loop = autoplay allowed everywhere, looping forever; no audio
//      track was encoded.
//   6. Decorative: aria-hidden video, empty-alt poster — SEO/a11y read the h1, not this.
//   7. prefers-reduced-motion users keep the still image; the video never mounts.
export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // A short post-hydration delay keeps the stream entirely off the critical path; by
    // then the poster (the LCP) has long painted.
    const handle = window.setTimeout(() => setShowVideo(true), 300);

    return () => window.clearTimeout(handle);
  }, []);

  // Safari will not start on the autoplay attribute alone: React sets `muted` as a property
  // only, and Safari reads the *attribute* when deciding whether autoplay is permitted —
  // without it the element is treated as unmuted and blocked. So force both, then ask for
  // playback explicitly, and keep asking.
  //
  // The retries matter on iOS specifically. A first play() before any data has arrived is
  // refused, and iOS additionally refuses outright in Low Power Mode and while the tab is
  // backgrounded. Re-trying as the media element reaches each readiness milestone, when the
  // page becomes visible again, and once after the visitor's first touch — which lifts the
  // gesture requirement — covers every one of those without ever blocking the UI. If they
  // all fail the poster simply remains, which is a perfectly good hero.
  //
  // useCallback keeps the ref stable: an inline callback is detached and re-invoked on
  // every render, which would re-bind the listeners each time `playing` changes.
  const mountVideo = useCallback((video: HTMLVideoElement | null) => {
    if (!video) {
      return;
    }

    video.muted = true;
    video.setAttribute('muted', '');

    const attempt = () => {
      void video.play().catch(() => undefined);
    };

    attempt();

    const mediaEvents = ['loadedmetadata', 'loadeddata', 'canplay'];

    for (const name of mediaEvents) {
      video.addEventListener(name, attempt);
    }

    document.addEventListener('visibilitychange', attempt);
    // `once` so a single touch anywhere retries, then the listener is gone.
    document.addEventListener('touchstart', attempt, { once: true, passive: true });

    return () => {
      for (const name of mediaEvents) {
        video.removeEventListener(name, attempt);
      }

      document.removeEventListener('visibilitychange', attempt);
      document.removeEventListener('touchstart', attempt);
    };
  }, []);

  return (
    <div className={styles.media}>
      {/* Rendered before the poster so the poster paints on top of it. */}
      {showVideo ? (
        <video
          aria-hidden={true}
          autoPlay={true}
          className={styles.video}
          loop={true}
          muted={true}
          onPlaying={() => setPlaying(true)}
          playsInline={true}
          preload="auto"
          ref={mountVideo}
          src="/videos/hero.mp4"
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
