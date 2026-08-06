'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './TaglineBand.module.css';

import type { CSSProperties } from 'react';

// Measured in Roboto Bold uppercase across both languages: 0.588–0.622em per character.
// Rounded up on purpose — this is only the pre-measurement guess, and a guess that runs
// LARGE renders slightly small (harmless) while a guess that runs small would overflow.
const FALLBACK_EM_PER_CHAR = 0.66;

// Line 2's indent at the widest breakpoint — see `.outlined` in the stylesheet.
const FALLBACK_INDENT_EM = 0.88;

// The fitted size spans the band exactly by construction, so with no margin at all a
// sub-pixel disagreement between measurement and layout is enough to shave a glyph.
const SAFETY = 1.01;

// Ignore sub-1% churn: a ResizeObserver reacting to its own font-size change would otherwise
// be able to oscillate on floating-point noise.
const MIN_CHANGE = 0.005;

function estimateFit(primary: string, secondary: string) {
  return Math.max(primary.length * FALLBACK_EM_PER_CHAR, secondary.length * FALLBACK_EM_PER_CHAR + FALLBACK_INDENT_EM);
}

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

  // How many em wide the longest line is, indent included. The stylesheet divides the band's
  // own width by this, so the type is sized by the text it has to fit rather than by a fixed
  // vw slope. A slope has to be tuned for the longest string in the longest language, which
  // is why the English band used to render ~24% smaller than it had room for, and why the
  // Spanish one had to keep shrinking to stay inside `overflow: hidden` on a phone.
  const [fit, setFit] = useState(() => estimateFit(primary, secondary));

  const measure = useCallback(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    let widest = 0;

    for (const line of node.querySelectorAll('p')) {
      const style = getComputedStyle(line);
      const fontSize = Number.parseFloat(style.fontSize);

      if (!fontSize) {
        continue;
      }

      // A Range measures the text itself. Reading the <p> would give the band's width back,
      // since the paragraph is a full-width block whose nowrap text simply overflows it.
      const range = document.createRange();

      range.selectNodeContents(line);

      const indent = Number.parseFloat(style.marginLeft) || 0;

      // em, so it is independent of the size it was measured at and converges in one pass.
      widest = Math.max(widest, (range.getBoundingClientRect().width + indent) / fontSize);
    }

    if (widest > 0) {
      const next = widest * SAFETY;

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

    // Not width-independent: `.outlined`'s indent changes at the 48rem breakpoint.
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
    <div
      aria-hidden={true}
      className={visible ? `${styles.band} ${styles.visible}` : styles.band}
      ref={ref}
      style={{ '--band-fit': String(fit) } as CSSProperties}
    >
      <p className={`${styles.line} ${styles.filled}`}>{primary}</p>
      <p className={`${styles.line} ${styles.outlined}`}>{secondary}</p>
    </div>
  );
}
