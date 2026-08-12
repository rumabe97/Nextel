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

/** Slowest and fastest a glow may complete one drift cycle, in seconds. Both deliberately
 *  long: at this speed nobody watches a glow move, they only notice that the page is not a
 *  flat image. Anything under ~15s starts to read as something breathing at you. */
const DRIFT_MIN_SECONDS = 22;
const DRIFT_SPAN_SECONDS = 9;

/** Travel at the midpoint of the cycle, as a percentage of the glow's own diameter. */
const DRIFT_MIN_TRAVEL = 1.5;
const DRIFT_SPAN_TRAVEL = 1.6;

/** FNV-1a, 32-bit. It only has to spread a handful of strings evenly — nothing here is
 *  security-sensitive, and it has to be deterministic so the server and the client agree. */
function hash(input: string) {
  let value = 0x81_1c_9d_c5;

  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 0x01_00_01_93);
  }

  return value >>> 0;
}

/** Everything that makes one glow drift differently from its neighbours, derived rather than
 *  passed in: the alternative is a phase prop on all two dozen call sites, which is a lot of
 *  noise for a number nobody will ever want to choose deliberately.
 *
 *  The seed is the glow's positioning class plus its size and opacity, which together are
 *  unique per glow on a page. The class name is hashed by CSS Modules and so changes between
 *  builds — that only reshuffles which glow gets which phase, which is not something anyone
 *  can perceive.
 *
 *  A negative delay is the point of the whole exercise: it starts each glow part-way through
 *  its own cycle, so they are already out of step on the first frame. Left in phase, two dozen
 *  lights pulsing together would read as the page flickering. */
function drift(seed: number) {
  const duration = DRIFT_MIN_SECONDS + (seed % DRIFT_SPAN_SECONDS);
  const travel = (offset: number) =>
    ((seed >> offset) % 2 === 0 ? 1 : -1) * (DRIFT_MIN_TRAVEL + ((seed >> (offset + 2)) % 17) * (DRIFT_SPAN_TRAVEL / 17));

  return {
    '--glow-delay': `-${seed % duration}s`,
    '--glow-drift-x': `${travel(5).toFixed(2)}%`,
    '--glow-drift-y': `${travel(13).toFixed(2)}%`,
    '--glow-duration': `${duration}s`
  };
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
  const style = {
    '--glow-radius': `calc(${diameter} / 2)`,
    ...drift(hash(`${className ?? ''}|${size}|${opacity}`)),
    height: diameter,
    opacity,
    width: diameter
  } as CSSProperties;

  return <div aria-hidden={true} className={[styles.glow, className].filter(Boolean).join(' ')} style={style} />;
}
