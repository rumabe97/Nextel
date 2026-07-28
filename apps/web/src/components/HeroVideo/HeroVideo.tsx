'use client';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './HeroVideo.module.css';

// Figma's hero is `frame-video-inicio` — a video, not a still. Performance strategy:
//   1. The poster is server-rendered with priority — it IS the LCP, so first paint never
//      waits on video bytes. It is frame 0 of hero.mp4 at the video's native size, so the
//      hand-off is invisible; a poster from a different moment of the shot made the
//      framing visibly jump sideways when the video faded in.
//   2. The <video> only enters the DOM after hydration, so the stream competes with
//      nothing on the critical path; it fades in once frames are actually rendering.
//   3. The slow drift is baked into the file (15fps, 0.6x) rather than applied through
//      playbackRate — Safari drops a rate set before metadata arrives, and a non-native
//      rate keeps it off some hardware decode paths.
//   4. muted + playsInline + loop = autoplay allowed everywhere, looping forever; no audio
//      track was encoded.
//   5. Decorative: aria-hidden video, empty-alt poster — SEO/a11y read the h1, not this.
//   6. prefers-reduced-motion users keep the still image; the video never mounts.
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

  // Safari will not start on the autoplay attribute alone here: React sets `muted` as a
  // property only, and Safari reads the *attribute* when deciding whether autoplay is
  // permitted — without it the element is treated as unmuted and blocked. So force both,
  // then ask for playback explicitly. The first request can also be refused before any
  // data has arrived, hence the retry on canplay. If every attempt is denied (iOS Low
  // Power Mode) `playing` stays false and the poster simply remains — no black box.
  //
  // useCallback keeps the ref stable: an inline callback is detached and re-invoked on
  // every render, which would re-bind the listener each time `playing` changes.
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
    video.addEventListener('loadeddata', attempt);
    video.addEventListener('canplay', attempt);

    return () => {
      video.removeEventListener('loadeddata', attempt);
      video.removeEventListener('canplay', attempt);
    };
  }, []);

  return (
    <div className={styles.media}>
      <Image alt="" className={styles.poster} fill={true} priority={true} sizes="100vw" src="/images/home-hero.webp" />
      {showVideo ? (
        <video
          aria-hidden={true}
          autoPlay={true}
          className={playing ? `${styles.video} ${styles.playing}` : styles.video}
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
    </div>
  );
}
