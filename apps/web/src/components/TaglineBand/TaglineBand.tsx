'use client';
import { useEffect, useRef, useState } from 'react';

import styles from './TaglineBand.module.css';

// The mid-page display band from `02_Home`: Figma stores it as two component sets
// ("CONECTAMOS HOY" #2045:201, "IMPULSAMOS EL MAÑANA" #2045:202) whose variants move the
// lines from off-canvas (x:-1206 / x:1595, opacity 0) to rest — i.e. a scroll-triggered
// slide-in, line 1 from the left, line 2 from the right. An IntersectionObserver arms it
// once; prefers-reduced-motion collapses the transition globally (ui/styles/base).
export interface TaglineBandProps {
  primary: string;
  secondary: string;
}

export function TaglineBand({ primary, secondary }: TaglineBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    // Decorative restatement of the brand line — the page's h1 already carries it for
    // assistive tech, so this stays out of the a11y tree.
    <div aria-hidden={true} className={visible ? `${styles.band} ${styles.visible}` : styles.band} ref={ref}>
      <p className={`${styles.line} ${styles.filled}`}>{primary}</p>
      <p className={`${styles.line} ${styles.outlined}`}>{secondary}</p>
    </div>
  );
}
