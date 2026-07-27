import styles from './Eyebrow.module.css';

import type { ReactNode } from 'react';

export interface EyebrowProps {
  /** Hides the trailing arrow glyph. */
  bare?: boolean;
  children: ReactNode;
  className?: string;
  /** Renders in white instead of brand blue — for use over photography. */
  tone?: 'brand' | 'light';
}

// The letterspaced uppercase kicker that precedes almost every heading in the design
// (Figma text style `style_5a08b104`: Rubik Light 16, 0.22em, UPPER), with the small
// down-right arrow glyph that trails it.
export function Eyebrow({ bare, children, className, tone = 'brand' }: EyebrowProps) {
  return (
    <p className={[styles.eyebrow, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
      {bare ? null : (
        <svg aria-hidden={true} className={styles.arrow} fill="none" viewBox="0 0 14 7">
          <path d="M1 1l5.5 4.5L12 1" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
        </svg>
      )}
    </p>
  );
}
