import { Fragment } from 'react';

import type { SVGProps } from 'react';

// Small inline icon set — the only glyphs the design needs outside packages/ui. They are
// simple enough that an icon dependency (or 100+ SVG files exported from Figma) would cost
// more than it saves.
//
// One component with a `name` lookup rather than one exported component per glyph: the repo
// lints `react/no-multi-comp` as an error, and a directory-per-icon would mean 30+ files for
// what is a single 24×24 path each.
const PATHS = {
  arrowRight: <path d="M4 12h15m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
  arrowUpRight: <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
  /** Solid triangle — Figma draws the Servicios menu affordance as a filled 13×7 polygon. */
  caretDown: <path d="M2 8h20L12 19z" fill="currentColor" />,
  checkCircle: (
    <Fragment>
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12.4l2.6 2.6L16 9.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </Fragment>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
  instagram: (
    <Fragment>
      <rect height="18" rx="5" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" fill="currentColor" r="1.2" />
    </Fragment>
  ),
  linkedin: (
    <path
      d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 9.5h4v11H3v-11zM10 9.5h3.8v1.5a4.2 4.2 0 013.7-2c2.7 0 4.5 1.8 4.5 5.2v6.3h-4v-5.7c0-1.5-.6-2.4-1.9-2.4-1.4 0-2.1 1-2.1 2.5v5.6h-4v-11z"
      fill="currentColor"
    />
  ),
  mail: (
    <Fragment>
      <rect height="14" rx="2" stroke="currentColor" strokeWidth="1.6" width="18" x="3" y="5" />
      <path d="M3.5 6.5l8.5 6 8.5-6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </Fragment>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />,
  pencil: <path d="M15.5 5.5l3 3L9 18H6v-3l9.5-9.5z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />,
  phone: (
    <Fragment>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12h17M12 3a15 15 0 010 18M12 3a15 15 0 000 18" stroke="currentColor" strokeWidth="1.4" />
    </Fragment>
  ),
  search: (
    <Fragment>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Fragment>
  ),
  user: (
    <Fragment>
      <circle cx="12" cy="8" r="3.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20c0-3.6 3.4-5.5 7.5-5.5s7.5 1.9 7.5 5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </Fragment>
  )
} as const;

export type IconName = keyof typeof PATHS;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'viewBox'> {
  name: IconName;
}

// Sizing defaults to `1em` so an icon tracks the font-size of whatever it sits next to,
// and every glyph inherits `currentColor`. Decorative by default: `aria-hidden` is set
// unless the caller supplies an `aria-label`, which is the only reason an icon would need
// to be in the a11y tree.
export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg aria-hidden={rest['aria-label'] ? undefined : true} fill="none" focusable={false} height="1em" viewBox="0 0 24 24" width="1em" {...rest}>
      {PATHS[name]}
    </svg>
  );
}
