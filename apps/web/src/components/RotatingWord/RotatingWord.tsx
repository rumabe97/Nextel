'use client';
import { useEffect, useState } from 'react';

import styles from './RotatingWord.module.css';

export interface RotatingWordProps {
  /** Milliseconds each word is held. Defaults to 2200. */
  interval?: number;
  /** Cycled in order; the first is what SSR renders. */
  words: string[];
}

// The "En Nextel ofrecemos soluciones eficientes / innovadoras / personalizadas /
// sostenibles" banner — the Figma file ships these as four component variants, i.e. an
// animated word swap.
export function RotatingWord({ interval = 2200, words }: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Respect the OS motion preference. The global reduced-motion rule in ui/styles/base
    // only collapses CSS animation — a JS interval would keep swapping the word, which is
    // exactly the kind of unrequested movement the preference is asking us to stop.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (reduced.matches) {
      return;
    }

    const timer = setInterval(() => {
      setIndex(previous => (previous + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  return (
    <span className={styles.root}>
      {/* Sizing ghost: the widest word reserves the inline space so the surrounding line
          never reflows as the word changes. Hidden from a11y and from paint. */}
      <span aria-hidden={true} className={styles.ghost}>
        {words.reduce((longest, word) => (word.length > longest.length ? word : longest), '')}
      </span>

      {/* One live region, not four: assistive tech announces the current word once per
          change rather than reading the whole list. */}
      <span aria-live="polite" className={styles.word} key={words[index]}>
        {words[index]}
      </span>
    </span>
  );
}
