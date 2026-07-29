'use client';
import { useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './MobileNav.module.css';

import { Drawer } from 'ui/components/Drawer';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';

import { FOOTER_LEGAL, isActivePath, isSamePageTopLink, NAV_ITEMS } from 'lib/navigation';

import type { MouseEvent } from 'react';

/**
 * Long enough to outlast the sheet's close animation and the scroll restore vaul performs
 * on iOS immediately after it. Short enough that it is over before anyone looks away.
 */
const DRAWER_SETTLE_MS = 450;

export interface MobileNavProps {
  /** Resolved by the server-rendered Header — a Client Component cannot read the env var. */
  contactEmail: string;
}

export function MobileNav({ contactEmail }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Tapping a link navigates, but the App Router transition does not unmount the drawer —
  // it would stay open over the new page. `ui/components/Link` deliberately exposes no
  // onClick, so this delegates: the click bubbles from the anchor up to the <nav>, and we
  // close only when it actually originated on a link (not on padding or the title).
  //
  // Handling it here rather than in an effect on `pathname` is deliberate — calling
  // setState synchronously in an effect triggers a cascading render, which the React
  // Compiler lint (`react-hooks/set-state-in-effect`) flags for good reason.
  // Element, not HTMLElement: every row ends in an inline <svg> arrow, so a tap landing on
  // the arrow reports an SVGElement — which fails an HTMLElement check, leaving the drawer
  // open over the page it just navigated to. `closest` is defined on Element.
  function handleNavClick(event: MouseEvent<HTMLElement>) {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;

    if (!anchor) {
      return;
    }

    const href = anchor.getAttribute('href') ?? '';

    setOpen(false);

    // Re-selecting the page you are already on: the router has nothing to do, so without
    // this the drawer just closes and the page stays wherever it was scrolled to.
    if (isSamePageTopLink(href, pathname)) {
      window.scrollTo({ top: 0 });
    }

    // …and then assert it again once the sheet has finished closing, because on iOS the
    // sheet fights us. vaul cannot rely on `overflow: hidden` there — iOS ignores it — so it
    // pins <body> with `position: fixed; top: -<scroll offset>` while open and calls
    // window.scrollTo() to put that offset back as it closes. That restore runs *after* the
    // router has navigated and scrolled, so on iPhone the page snapped straight back to
    // wherever it was before the menu opened: tapping a section appeared to do nothing, and
    // a service anchor landed at the old offset instead of the section. Chrome on Android
    // never takes that code path, which is exactly why it only broke on iOS.
    const hashIndex = href.indexOf('#');
    const targetId = hashIndex === -1 ? '' : href.slice(hashIndex + 1);

    window.setTimeout(() => {
      if (targetId) {
        // scrollIntoView honours the container's scroll-padding-top, so the section still
        // clears the fixed header.
        document.getElementById(targetId)?.scrollIntoView();

        return;
      }

      window.scrollTo({ top: 0 });
    }, DRAWER_SETTLE_MS);
  }

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
      title="Menú"
      trigger={
        <button aria-label="Abrir menú" className={styles.trigger} type="button">
          <Icon name="menu" />
        </button>
      }
    >
      {/* The onClick here is delegation, not an interactive affordance: every focusable
          child is a real anchor with its own keyboard handling, so there is no keyboard
          equivalent to add. */}
      <nav aria-label="Navegación principal" className={styles.nav} onClick={handleNavClick}>
        <ul className={styles.list}>
          {NAV_ITEMS.map(item => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li className={styles.item} key={item.href}>
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                  href={item.href}
                >
                  <span className={styles.linkLabel}>{item.label}</span>
                  <Icon className={styles.linkIcon} name="arrowRight" />
                </Link>

                {item.children ? (
                  <ul className={styles.subList}>
                    {item.children.map((child, index) => (
                      <li key={child.href}>
                        <Link className={styles.subLink} href={child.href}>
                          {/* Same 01/02 numbering the service cards use on the home page. */}
                          <span className={styles.subIndex}>{String(index + 1).padStart(2, '0')}</span>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className={styles.meta}>
          <p className={styles.metaLabel}>Escríbenos</p>
          <a className={styles.email} href={`mailto:${contactEmail}`}>
            {contactEmail}
            <Icon className={styles.emailIcon} name="arrowUpRight" />
          </a>

          <ul className={styles.legal}>
            {FOOTER_LEGAL.map(legal => (
              <li key={legal.href}>
                <Link className={styles.legalLink} href={legal.href}>
                  {legal.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </Drawer>
  );
}
