'use client';
import { useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './MobileNav.module.css';

import { Drawer } from 'ui/components/Drawer';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';
import { LanguageSwitcher } from 'components/LanguageSwitcher';

import { isActivePath } from 'lib/navigation';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';
import type { MouseEvent } from 'react';
import type { NavItem } from 'lib/navigation';

/**
 * Upper bound on how long to keep trying to reach the tapped destination. Only a give-up
 * point — the attempt stops the moment the page can actually be scrolled and the target
 * exists, which is normally within a frame or two of the sheet closing.
 */
const LANDING_TIMEOUT_MS = 1500;

/**
 * Puts the visitor where the tapped link says they should be, as soon as that is possible.
 * Two things have to be true first: <body> must be unpinned — vaul fixes it in place while
 * the sheet is open and a fixed body cannot be scrolled — and, for a service anchor, the
 * section has to exist, which it does not until its route has committed and rendered.
 *
 * Retrying per frame rather than waiting a fixed delay is the point: the old code guessed
 * 450ms, which was both too late (the visitor watched the scroll happen) and, on a slow
 * connection, too early (the section had not rendered, so the scroll silently did nothing).
 */
function land(targetId: string, deadline: number) {
  const target = targetId ? document.getElementById(targetId) : null;
  const ready = document.body.style.position !== 'fixed' && (!targetId || target !== null);

  if (ready) {
    if (target) {
      // block:'start' plus html's scroll-padding-top drops the section below the fixed header.
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    } else {
      window.scrollTo({ behavior: 'instant', top: 0 });
    }
  }

  if (ready || Date.now() > deadline) {
    document.documentElement.style.scrollBehavior = '';

    return;
  }

  window.requestAnimationFrame(() => land(targetId, deadline));
}

export interface MobileNavProps {
  /** Resolved by the server-rendered Header — a Client Component cannot read the env var. */
  contactEmail: string;
  dictionary: Dictionary;
  items: NavItem[];
  locale: Locale;
}

export function MobileNav({ contactEmail, dictionary, items, locale }: MobileNavProps) {
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

    // mailto: and anything else off-site leaves the page where it is — only close the sheet.
    if (!href.startsWith('/')) {
      return;
    }

    // Every movement between here and the landing has to be instant. The document carries
    // `scroll-behavior: smooth`, which turns each of vaul's restore, the router's
    // scroll-to-top, the browser's fragment jump and our own final positioning into its own
    // animation. Run back to back, those are the "drops back to where I was, then crawls all
    // the way up" — the visitor was watching two or three separate scrolls play out. An
    // inline style outranks the stylesheet; land() puts it back.
    document.documentElement.style.scrollBehavior = 'auto';

    // vaul pins <body> with `position: fixed; top: -<scrollY>` while the sheet is open,
    // because that is the only thing that locks scrolling on iOS, and on close it reads that
    // offset back out to scroll there. Rewriting the offset to zero now aims its restore at
    // the top of the document instead of wherever the visitor had got to, so the page moves
    // once — and the drawer, not a timer racing it, is what moves it.
    if (document.body.style.position === 'fixed') {
      document.body.style.top = '0px';
    }

    const hashIndex = href.indexOf('#');

    land(hashIndex === -1 ? '' : href.slice(hashIndex + 1), Date.now() + LANDING_TIMEOUT_MS);
  }

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
      title={dictionary.common.menuTitle}
      trigger={
        <button aria-label={dictionary.common.openMenu} className={styles.trigger} type="button">
          <Icon name="menu" />
        </button>
      }
    >
      {/* The onClick here is delegation, not an interactive affordance: every focusable
          child is a real anchor with its own keyboard handling, so there is no keyboard
          equivalent to add. */}
      <nav aria-label={dictionary.common.mainNav} className={styles.nav} onClick={handleNavClick}>
        <ul className={styles.list}>
          {items.map(item => {
            const isActive = isActivePath(pathname, item.href, locale);

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
          <p className={styles.metaLabel}>{dictionary.common.writeUs}</p>
          <a className={styles.email} href={`mailto:${contactEmail}`}>
            {contactEmail}
            <Icon className={styles.emailIcon} name="arrowUpRight" />
          </a>

          <LanguageSwitcher languageNames={dictionary.languageNames} legend={dictionary.common.language} locale={locale} variant="drawer" />
        </div>
      </nav>
    </Drawer>
  );
}
