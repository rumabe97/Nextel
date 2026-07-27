import { Roboto, Rubik } from 'next/font/google';

// Typography comes straight from the Figma file (canvas "Main site"):
//   headings  → Roboto Bold        (H1 120 / H2 50 / H3 32 / H4 28 / H5 22)
//   body      → Rubik Regular 16/29
//   eyebrows  → Rubik Light 16, letter-spacing 0.22em, uppercase
//
// next/font/google self-hosts these at build time — no runtime request to Google, no
// layout shift from a late swap. The CSS variables are consumed in styles/variables.css.

// Weights per Figma usage: 100/900 hero tagline (Component 2 — Thin + Black), 300 header
// nav (`style_3c98fda1`), 500 service-card titles and section notes, 700 the H1–H5 scale.
export const heading = Roboto({ display: 'swap', subsets: ['latin'], variable: '--font-heading', weight: ['100', '300', '500', '700', '900'] });

// `--main-font` is the token ui/styles/base.css already applies to <body>, so overriding
// it here rebrands every component in packages/ui without touching the package.
export const body = Rubik({ display: 'swap', subsets: ['latin'], variable: '--main-font', weight: ['300', '400', '500'] });
