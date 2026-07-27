import Image from 'next/image';

import styles from './Logo.module.css';

/** Intrinsic size of the header lockup in Figma (`NEXTEL_Logo-01`, node 2026:782). */
const LOCKUP_WIDTH = 163;
const LOCKUP_HEIGHT = 69;

export interface LogoProps {
  className?: string;
  /** Height in px. `lockup` scales proportionally from 69; `mark` from 2884. */
  size?: number;
  /**
   * `lockup` — the full brand image (N mark + NEXTEL/ADVISORS wordmark), as the header uses.
   * `mark` — the N monogram alone, recolourable, for watermarks.
   */
  variant?: 'lockup' | 'mark';
}

// Two deliberately different rendering strategies:
//
// `lockup` is a raster image because that is what the brand lockup *is* — Figma places it as
// an image fill, and the wordmark's letterforms are custom, so rebuilding it from Roboto/Rubik
// would only ever approximate it.
//
// `mark` is painted with `mask-image` instead of an <img> so `currentColor` drives the fill:
// the "Sobre Nosotros" watermark needs it near-black, the footer needs it translucent white.
// The source art is a 7KB auto-traced path, so inlining the SVG would ship that on every page.
export function Logo({ className, size, variant = 'lockup' }: LogoProps) {
  if (variant === 'mark') {
    const height = size ?? 34;

    return (
      <span
        aria-hidden={true}
        className={[styles.mark, className].filter(Boolean).join(' ')}
        style={{ height: `${height}px`, width: `${(height * 1844) / 2884}px` }}
      />
    );
  }

  return (
    <Image
      alt="Nextel Advisors"
      className={[styles.lockup, className].filter(Boolean).join(' ')}
      height={LOCKUP_HEIGHT}
      priority={true}
      src="/images/logo-lockup.webp"
      // Only pin the height when a caller asks for a specific one. Left unset, the `.lockup`
      // class owns it, so consumers can scale the logo responsively from CSS — an inline
      // style would win over any media query.
      style={size === undefined ? undefined : { height: `${size}px` }}
      width={LOCKUP_WIDTH}
    />
  );
}
