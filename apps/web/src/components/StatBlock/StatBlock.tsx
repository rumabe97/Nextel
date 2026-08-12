'use client';
import { useEffect, useRef, useState } from 'react';

import styles from './StatBlock.module.css';

import { observeOnce } from 'components/Reveal';

export interface Stat {
  /** Letterspaced uppercase caption below the value. */
  caption: string;
  /** Display figure — "Equipo", "5+". */
  value: string;
}

export interface StatBlockProps {
  className?: string;
  stats: Stat[];
}

/** Long enough to be legible as counting rather than as a glitch, short enough that it has
 *  finished by the time the eye has moved to the caption underneath. */
const COUNT_MS = 1100;

/** Cubic ease-out. The figure should sprint and then settle, the way a dial comes to rest —
 *  a linear count reads mechanical, and an ease-in looks like it stalled. */
function easeOut(progress: number) {
  return 1 - (1 - progress) ** 3;
}

/** The leading integer, if the value opens with one. "5+" → 5; "Equipo" → undefined, which is
 *  how a worded stat opts out of counting without needing a flag of its own. */
function leadingNumber(value: string) {
  const digits = /^\d+/.exec(value);

  return digits ? Number(digits[0]) : undefined;
}

// The "Equipo de expertos en el sector · 5+ años de experiencia" pairing.
//
// Numeric figures count up the first time they are scrolled to. Three things keep that from
// costing anything:
//
//   · The final value is what renders on the server and on the first frame. The counter only
//     ever rewinds a figure that is still below the fold, where no one can see it start from
//     zero — so nothing is ever hidden, nothing shifts, and a visitor who lands with the stats
//     already on screen simply reads them.
//   · Worded stats ("Equipo", "Largo plazo") fall through untouched, so this needs no
//     configuration and no second component.
//   · Reduced motion skips it outright. The number is content, not decoration; it has to be
//     correct the instant it is on screen, which is exactly what not animating gives.
//
// The layout cannot move as the digits change: `.list` is a wrapping flex row whose items are
// sized by their caption, which is several times wider than any figure above it.
export function StatBlock({ className, stats }: StatBlockProps) {
  const ref = useRef<HTMLDListElement>(null);
  // 1 means settled — every figure shows its final value. That is the initial state, so the
  // server-rendered markup is the finished markup.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const node = ref.current;

    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Strictly below the fold, matching Reveal's rule: a block already on screen was never
    // scrolled to, so counting it would be inventing an arrival that did not happen.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    let frame = 0;

    setProgress(0);

    const stopObserving = observeOnce(node, () => {
      const started = performance.now();

      const tick = (now: number) => {
        const elapsed = Math.min((now - started) / COUNT_MS, 1);

        setProgress(easeOut(elapsed));

        if (elapsed < 1) {
          frame = requestAnimationFrame(tick);
        }
      };

      frame = requestAnimationFrame(tick);
    });

    return () => {
      stopObserving();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <dl className={[styles.list, className].filter(Boolean).join(' ')} ref={ref}>
      {stats.map(stat => {
        const target = leadingNumber(stat.value);
        // Only the leading digits are replaced, so any suffix the figure carries — the "+" on
        // "5+" — stays put for the whole count instead of appearing at the end.
        const display = progress === 1 || target === undefined ? stat.value : stat.value.replace(/^\d+/, String(Math.round(target * progress)));

        return (
          <div className={styles.item} key={stat.caption}>
            <dt className={styles.value}>{display}</dt>
            <dd className={styles.caption}>{stat.caption}</dd>
          </div>
        );
      })}
    </dl>
  );
}
