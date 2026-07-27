'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './HeroVideo.module.css';

// Figma's hero is `frame-video-inicio` — a video, not a still. Performance strategy:
//   1. The poster (already-optimised webp) is server-rendered with priority — it IS the LCP,
//      so first paint never waits on video bytes.
//   2. The <video> only enters the DOM after hydration + idle, so the 7MB stream competes
//      with nothing on the critical path; it fades in over the poster when playable.
//   3. muted + playsInline + loop = autoplay allowed everywhere, looping forever; no audio
//      track was encoded. preload="auto" only once we've decided to mount it at all.
//   4. Decorative: aria-hidden video, empty-alt poster — SEO/a11y read the h1, not this.
//   5. prefers-reduced-motion users keep the still image; the video never mounts.
export function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // A short post-hydration delay keeps the 7MB stream entirely off the critical path;
    // by then the poster (the LCP) has long painted.
    const handle = window.setTimeout(() => setShowVideo(true), 300);

    return () => window.clearTimeout(handle);
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
          // The raw footage moves too fast for a background — Figma's feel is a slow drift.
          ref={node => {
            if (node) {
              node.playbackRate = 0.6;
            }
          }}
          src="/videos/hero.mp4"
          tabIndex={-1}
        />
      ) : null}
    </div>
  );
}
