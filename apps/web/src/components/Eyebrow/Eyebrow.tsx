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
// (Figma text style `style_5a08b104`: Rubik Light 16, 0.22em, UPPER), with the brand arrow
// trailing it.
//
// The path is the client's own export, `RECURSOS/Arrow 1.svg`: a 16x14 filled arrow in
// Primary that already points down-right, so it needs no rotation here.
//
// Worth recording, because the file data is misleading on its own: Figma reports the marker
// as 14x7 at strokeWeight 2, and selecting it yields `height: 0`, `border: 2px`, length
// 15.652 at -26.57deg. That describes only the arrow's SHAFT — 15.652 * cos(26.57) = 14.0
// and * sin(26.57) = 7.0 — which is why building from those numbers produced a bare diagonal
// line with no head. The exported asset is the complete glyph.
export function Eyebrow({ bare, children, className, tone = 'brand' }: EyebrowProps) {
  return (
    <p className={[styles.eyebrow, styles[tone], className].filter(Boolean).join(' ')}>
      {children}
      {bare ? null : (
        <svg aria-hidden={true} className={styles.arrow} fill="none" viewBox="0 0 16 14">
          <path
            d="M1.44746 1.64415C0.953479 1.39716 0.352806 1.59738 0.105817 2.09136C-0.141172 2.58534 0.059052 3.18601 0.553031 3.433L1.00024 2.53857L1.44746 1.64415ZM15.3165 10.4873C15.8404 10.3126 16.1236 9.74629 15.9489 9.22235L13.1029 0.684197C12.9282 0.160254 12.3619 -0.122907 11.838 0.0517415C11.314 0.22639 11.0309 0.792709 11.2055 1.31665L13.7353 8.90612L6.14587 11.4359C5.62192 11.6106 5.33876 12.1769 5.51341 12.7009C5.68806 13.2248 6.25438 13.508 6.77832 13.3333L15.3165 10.4873ZM1.00024 2.53857L0.553031 3.433L14.553 10.433L15.0002 9.53857L15.4475 8.64415L1.44746 1.64415L1.00024 2.53857Z"
            fill="currentColor"
          />
        </svg>
      )}
    </p>
  );
}
