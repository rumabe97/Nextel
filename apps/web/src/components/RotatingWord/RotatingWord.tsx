'use client';
import { useEffect, useRef, useState } from 'react';

import styles from './RotatingWord.module.css';

export interface RotatingWordProps {
  /** Milliseconds each word is held. Defaults to 2200. */
  interval?: number;
  /** Cycled in order; the first is what SSR renders as current. */
  words: string[];
}

// The "En Nextel ofrecemos soluciones eficientes / innovadoras / personalizadas /
// sostenibles" banner — the Figma file ships these as four component variants, i.e. an
// animated word swap.
//
// This is the only unbounded animation on the site, so it is the only one that has to be
// careful about when it is allowed to run. Three separate conditions gate it, and each is
// tracked as its own piece of state because each changes independently:
//
//   · Off screen. The banner sits in the middle of a 3600px page. Left ungated, this swapped
//     a word every 2.2s for as long as the tab was open, re-rendering to move something no
//     one was looking at.
//   · Backgrounded tab. Browsers throttle timers there but do not stop them, and the work is
//     pointless either way.
//   · Reduced motion. Reading the preference once at mount was not enough — someone who turns
//     it on while the page is open is asking for the movement to stop now, not on next load.
//     The global rule in ui/styles/base only collapses CSS durations; a JS interval has to be
//     stopped in JS.
export function RotatingWord({ interval = 2200, words }: RotatingWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const [backgrounded, setBackgrounded] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const node = ref.current;

    // No observer means no way to tell — run rather than sit frozen, which is the same call
    // the rest of the site makes when this API is missing.
    if (!node || typeof IntersectionObserver === 'undefined') {
      setOnScreen(true);

      return;
    }

    const observer = new IntersectionObserver(entries => setOnScreen(entries.some(entry => entry.isIntersecting)));

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setBackgrounded(document.hidden);

    sync();
    document.addEventListener('visibilitychange', sync);

    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);

    sync();
    query.addEventListener('change', sync);

    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!onScreen || backgrounded || reduced) {
      return;
    }

    const timer = setInterval(() => setIndex(previous => (previous + 1) % words.length), interval);

    return () => clearInterval(timer);
  }, [backgrounded, interval, onScreen, reduced, words.length]);

  return (
    <span className={styles.root} ref={ref}>
      {/* Sizing ghost: the widest word reserves the inline space so the surrounding line
          never reflows as the word changes. Hidden from a11y and from paint. */}
      <span aria-hidden={true} className={styles.ghost}>
        {words.reduce((longest, word) => (word.length > longest.length ? word : longest), '')}
      </span>

      {/* Every word is in the DOM at once, stacked in the one grid cell, and only the current
          one is opaque. That is what makes this a crossfade: keying a single node on the word
          made React drop the outgoing element in the same commit that mounted the incoming
          one, so the animation only ever played on the arriving half and the departing word
          simply blinked out. Holding both lets one fade out under the other.

          All of them are hidden from assistive tech — a screen reader meeting four adjectives
          in a row would read the sentence as nonsense. */}
      {words.map((word, position) => (
        <span aria-hidden={true} className={position === index ? `${styles.word} ${styles.current}` : styles.word} key={word}>
          {word}
        </span>
      ))}

      {/* The a11y counterpart to the stack above: one live region carrying only the current
          word, so the sentence reads correctly and each change is announced once. */}
      <span aria-live="polite" className={styles.announced}>
        {words[index]}
      </span>
    </span>
  );
}
