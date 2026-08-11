import styles from './Glow.module.css';

import type { CSSProperties } from 'react';

export interface GlowProps {
  /** Positioning class from the consuming section (absolute placement). */
  className?: string;
  /** Peak opacity, matching the Figma ellipse's fill alpha. */
  opacity?: number;
  /** Diameter of the Figma ellipse in px. The rendered halo is 1.5× — see below. */
  size: number;
}

/** The Figma board these sizes were measured on. A glow's size only means anything against it. */
const BOARD_WIDTH = 1920;

/** Reference narrow viewport, and how much of the board size a glow keeps there. */
const NARROW_WIDTH = 390;
const NARROW_SCALE = 0.45;

// One scale factor for the whole set, interpolated linearly from 1.0 at the board width down
// to NARROW_SCALE on a phone, and capped at 1.0 above the board. Using a single factor is the
// point: it is what keeps the glows sized correctly *relative to each other*, which is what
// makes the composition read the same at any width.
//
// The previous fixed-px diameter did the opposite. It kept the full desktop size on a phone,
// where the stylesheet's `max-width: 95vw` ceiling then caught every one of them — so a 336px
// accent and a 1041px wash both rendered as the same 371px circle, and the seven distinct
// sizes Figma specifies collapsed into one.
function responsiveDiameter(rendered: number) {
  const slope = ((1 - NARROW_SCALE) / (BOARD_WIDTH - NARROW_WIDTH)) * rendered;
  const base = rendered - slope * BOARD_WIDTH;

  // `slope` is px of diameter per px of viewport; ×100 expresses it in vw.
  return `min(${rendered}px, calc(${base.toFixed(2)}px + ${(slope * 100).toFixed(4)}vw))`;
}

// Figma scatters ELLIPSE nodes with `filter: blur(200–250px)` behind sections. A gaussian
// blur that large pushes light well beyond the ellipse bounds, so the halo is rendered at
// 1.5× the nominal diameter with a plateau-then-falloff gradient — visually equivalent to
// the blurred disc at a fraction of the paint cost.
export function Glow({ className, opacity = 1, size }: GlowProps) {
  const diameter = responsiveDiameter(Math.round(size * 1.5));
  // Published so a positioning class can place the glow relative to its own edge rather than
  // to its centre — `top: calc(var(--glow-radius) + 1rem)` puts its top edge 1rem below the
  // container's, and keeps doing so as the diameter scales with the viewport. Positioning by
  // a percentage of the container instead is what let the home intro glow bury a third of
  // itself behind the hero, where the seam sliced it with a hard straight edge.
  const style = { '--glow-radius': `calc(${diameter} / 2)`, height: diameter, opacity, width: diameter } as CSSProperties;

  return <div aria-hidden={true} className={[styles.glow, className].filter(Boolean).join(' ')} style={style} />;
}
