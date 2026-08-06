'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import styles from './HeroTagline.module.css';

import { Glow } from 'components/Glow';

import type { CSSProperties } from 'react';

// Roboto uppercase runs 0.588–0.622em per character, and this headline mixes Black 900 with
// Thin 100, which is wider again. 0.72 deliberately over-estimates: it is only the value used
// before the real measurement lands, and guessing high renders slightly small (harmless)
// where guessing low would wrap a row.
const FALLBACK_EM_PER_CHAR = 0.72;

// Row 3's indent at the wide breakpoint — see `.rowEnd` in the stylesheet.
const FALLBACK_INDENT_EM = 4.1;

// Figma's H1 column is 1249px on a 1920 board with the type at 120px, and the widest row
// measures 9.515em — so the design deliberately leaves ~9% of the column empty. Carrying that
// ratio is what makes the fitted size land on Figma's own 120px at the width it was drawn at.
const COLUMN_SLACK = 1.09;

// Ignore sub-1% churn so a ResizeObserver reacting to its own font-size change cannot
// oscillate on floating-point noise.
const MIN_CHANGE = 0.005;

export interface HeroTaglineFragments {
  first: string;
  fourth: string;
  second: string;
  third: string;
}

export interface HeroTaglineProps {
  /** The four fragments of "Conectamos / hoy, impulsamos / el mañana". */
  tagline: HeroTaglineFragments;
}

function estimateFit({ first, fourth, second, third }: HeroTaglineFragments) {
  const widest = Math.max(
    first.length * FALLBACK_EM_PER_CHAR,
    (second.length + 1 + third.length) * FALLBACK_EM_PER_CHAR,
    fourth.length * FALLBACK_EM_PER_CHAR + FALLBACK_INDENT_EM
  );

  return widest * COLUMN_SLACK;
}

// Figma "Component 2" (#2019:759) over GROUP "N" (#417:5623): three rows — Black 900, then
// Black + Thin sharing the middle row, then Thin indented so its left edge lands under the
// M–P of the row above. The N watermark sits behind, with a 508px Primary glow.
//
// The mark and the headline are deliberately the same grid cell, so the watermark is centred
// on the text by construction. Previously the h1 lived in a fixed `min(1249px, 90vw)` box
// that the text only partly filled while the mark centred on the hero, which put the N up to
// 172px to the right of where the text actually was.
export function HeroTagline({ tagline }: HeroTaglineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [fit, setFit] = useState(() => estimateFit(tagline));

  const measure = useCallback(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const fontSize = Number.parseFloat(getComputedStyle(node).fontSize);

    if (!fontSize) {
      return;
    }

    let widest = 0;

    for (const row of node.children) {
      // A Range measures the text itself. Reading the row would give the h1's width back,
      // since each row is a full-width block whose nowrap text simply overflows it.
      const range = document.createRange();

      range.selectNodeContents(row);

      const indent = Number.parseFloat(getComputedStyle(row).marginLeft) || 0;

      // em, so it is independent of the size it was measured at and converges in one pass.
      widest = Math.max(widest, (range.getBoundingClientRect().width + indent) / fontSize);
    }

    if (widest > 0) {
      const next = widest * COLUMN_SLACK;

      setFit(previous => (Math.abs(previous - next) / previous > MIN_CHANGE ? next : previous));
    }
  }, []);

  useEffect(() => {
    measure();

    // Metrics change wholesale when the webfont swaps in over the fallback.
    let cancelled = false;

    void document.fonts?.ready.then(() => {
      if (!cancelled) {
        measure();
      }
    });

    // Not width-independent: `.rowEnd`'s indent changes at the 40rem breakpoint.
    const node = ref.current;
    const observer = new ResizeObserver(() => measure());

    if (node) {
      observer.observe(node);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [measure]);

  return (
    <div className={styles.root} style={{ '--tagline-fit': String(fit) } as CSSProperties}>
      <div className={styles.mark}>
        <Glow className={styles.glow} size={508} />
        {/* unoptimized: the file is already a 7KB lossless-alpha webp; the optimizer's
            lossy re-encode can only dull the pure-white fill. */}
        <Image alt="" className={styles.icon} height={516} priority={true} src="/images/icon-n.webp" unoptimized={true} width={330} />
      </div>

      <h1 className={styles.tagline} ref={ref}>
        <span className={styles.rowStart}>
          <span className={styles.black}>{tagline.first}</span>
        </span>
        <span className={styles.rowStart}>
          <span className={styles.black}>{tagline.second}</span> <span className={styles.thin}>{tagline.third}</span>
        </span>
        <span className={styles.rowEnd}>
          <span className={styles.thin}>{tagline.fourth}</span>
        </span>
      </h1>
    </div>
  );
}
