import NXLink from 'next/link';

import styles from './Link.module.css';

import type { AriaAttributes, ReactNode } from 'react';

export interface LinkProps {
  /** Set `'page'` on the active link in a nav list — SRs announce "current page". CSS `.active` doesn't reach assistive tech. */
  'aria-current'?: AriaAttributes['aria-current'];
  children?: ReactNode;
  className?: string;
  /** **Required.** Destination URL — internal route or external URL. */
  href: string;
  /** Visible underline + brand colour. Use in prose (WCAG 1.4.1); skip in nav where context already identifies the link. */
  inline?: boolean;
  /** Forwarded to `next/link`. `null` (default) prefetches static routes; `false` disables; `true` forces. */
  prefetch?: boolean | null;
  /** `rel`. Defaults to `'noopener noreferrer'` when `target="_blank"` and not explicitly set. */
  rel?: string;
  /** Browsing context. Use `'_blank'` for new-tab links — `rel` auto-defaults to `noopener noreferrer`. */
  target?: '_blank' | '_parent' | '_self' | '_top';
}

// `...rest` is a passthrough, not a widening of the documented API above: the named props
// stay the supported surface. It exists because this component is used as the child of
// Radix `asChild` slots (the Dropdown menu items in the Nextel header), and a slot works by
// cloning its child with extra props — role, tabIndex, data-radix-collection-item, the
// selection handlers, and in React 19 the ref. Destructuring a fixed set and rendering only
// those silently swallowed all of it: menu items came out as bare <a class href>, so the
// menu never learned an item had been chosen and stayed open after every navigation, the
// items were missing role="menuitem" under a role="menu" parent, and keyboard roving never
// registered them. Hyphenated attributes such as aria-label were dropped the same way.
export function Link({ 'aria-current': ariaCurrent, children, className, href, inline, prefetch, rel, target, ...rest }: LinkProps) {
  // When opening in a new tab, default to `noopener noreferrer`. Modern browsers add
  // `noopener` implicitly for `target="_blank"` but `noreferrer` is NOT — the destination
  // would still see the Referer header. Defense in depth: apply both unless the consumer
  // passed their own `rel`.
  const safeRel = target === '_blank' && rel === undefined ? 'noopener noreferrer' : rel;
  const classes = [styles.link, inline ? styles.inline : undefined, className].filter(Boolean).join(' ');

  return (
    // rest first: the named props are computed here (merged classes, the safe rel default)
    // and must win over anything a slot happens to pass for the same key.
    <NXLink {...rest} aria-current={ariaCurrent} className={classes} href={href} prefetch={prefetch} rel={safeRel} target={target}>
      {children}
    </NXLink>
  );
}
