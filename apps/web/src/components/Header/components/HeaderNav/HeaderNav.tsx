'use client';
import { usePathname } from 'next/navigation';

import styles from './HeaderNav.module.css';

import { Dropdown } from 'ui/components/Dropdown';
import { DropdownOption } from 'ui/components/Dropdown/components/DropdownOption';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';

import { isActivePath, isSamePageTopLink, NAV_ITEMS } from 'lib/navigation';

import type { MouseEvent } from 'react';

// Client because it reads the current route to mark the active link. `aria-current` does
// the announcing; the brand-blue styling is just the visual half of the same signal.
export function HeaderNav() {
  const pathname = usePathname();

  // Only the Servicios menu needs this here: HeaderShell delegates the same behaviour for
  // everything rendered inside the <header>, but the menu is portalled out of it so its
  // clicks never reach that handler. Re-selecting the current page is a no-op for the
  // router, which would otherwise leave a scrolled-down visitor exactly where they were.
  function handleSamePageClick(event: MouseEvent<HTMLElement>) {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;

    if (anchor && isSamePageTopLink(anchor.getAttribute('href') ?? '', pathname)) {
      window.scrollTo({ top: 0 });
    }
  }

  return (
    <nav aria-label="Navegación principal" className={styles.nav}>
      <ul className={styles.list}>
        {NAV_ITEMS.map(item => {
          const isActive = isActivePath(pathname, item.href);

          if (item.children) {
            return (
              <li className={styles.item} key={item.href}>
                <Dropdown
                  align="start"
                  aria-label={`${item.label} — abrir submenú`}
                  label={
                    <span className={isActive ? `${styles.link} ${styles.active}` : styles.link}>
                      {/* data-text feeds the hidden bold copy that reserves this label's
                          widest width — see .label in the stylesheet. */}
                      <span className={styles.label} data-text={item.label}>
                        {item.label}
                      </span>
                      <Icon className={styles.caret} name="caretDown" />
                    </span>
                  }
                  // Every item here navigates. Modal mode would lock body scroll while open,
                  // which detaches the sticky header and can leave the page unscrollable when
                  // the route change unmounts the menu mid-close.
                  modal={false}
                  // Items link to anchors (/services#site-management). Letting focus return
                  // to the trigger would scroll the sticky header back into view and undo the
                  // jump to the anchor; the route change hands focus off anyway.
                  onCloseAutoFocus={event => event.preventDefault()}
                  // Strips the DS trigger's pill chrome so "Servicios" sits flush with the
                  // plain links either side of it, as it does in Figma.
                  triggerClassName={styles.trigger}
                >
                  {/* The parent route is reachable from inside the menu too: the trigger
                      opens the dropdown rather than navigating, so without this entry
                      /services would have no link anywhere in the header. */}
                  {/* The menu is portalled out of this <nav>, so its clicks never reach the
                      delegated handler above — it needs its own. */}
                  <DropdownOption asChild={true} className={styles.menuOption} onClick={handleSamePageClick}>
                    <Link href={item.href}>Ver todos los servicios</Link>
                  </DropdownOption>
                  {item.children.map(child => (
                    <DropdownOption asChild={true} className={styles.menuOption} key={child.href}>
                      <Link href={child.href}>{child.label}</Link>
                    </DropdownOption>
                  ))}
                </Dropdown>
              </li>
            );
          }

          return (
            <li className={styles.item} key={item.href}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                href={item.href}
              >
                <span className={styles.label} data-text={item.label}>
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
