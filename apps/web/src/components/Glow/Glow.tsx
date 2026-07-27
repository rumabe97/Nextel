import styles from './Glow.module.css';

import type { CSSProperties } from 'react';

export interface GlowProps {
  /** Positioning class from the consuming section (absolute placement). */
  className?: string;
  /** Peak opacity, matching the Figma ellipse's fill alpha. */
  opacity?: number;
  /** Diameter of the Figma ellipse in px. The rendered halo is 1.5× — see below. */
  size: number;
  /** Figma uses brand-blue ellipses everywhere plus amber ones on About/Why pages. */
  tone?: 'amber' | 'brand';
}

// Figma scatters ELLIPSE nodes with `filter: blur(200–250px)` behind sections. A gaussian
// blur that large pushes light well beyond the ellipse bounds, so the halo is rendered at
// 1.5× the nominal diameter with a plateau-then-falloff gradient — visually equivalent to
// the blurred disc at a fraction of the paint cost. Capped at 95vw so a 1000px glow can't
// dwarf a phone viewport.
export function Glow({ className, opacity = 1, size, tone = 'brand' }: GlowProps) {
  const rendered = Math.round(size * 1.5);
  const style: CSSProperties = { height: `${rendered}px`, opacity, width: `${rendered}px` };

  return <div aria-hidden={true} className={[styles.glow, styles[tone], className].filter(Boolean).join(' ')} style={style} />;
}
