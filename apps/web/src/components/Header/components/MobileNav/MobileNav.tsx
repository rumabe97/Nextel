'use client';
import { useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './MobileNav.module.css';

import { Drawer } from 'ui/components/Drawer';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';

import { CONTACT_EMAIL, FOOTER_LEGAL, NAV_ITEMS } from 'lib/navigation';

import type { MouseEvent } from 'react';

export function MobileNav() {
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
  function handleNavClick(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof HTMLElement && event.target.closest('a')) {
      setOpen(false);
    }
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
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? `${styles.link} ${styles.active}` : styles.link}
                  href={item.href}
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <ul className={styles.subList}>
                    {item.children.map(child => (
                      <li key={child.href}>
                        <Link className={styles.subLink} href={child.href}>
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
          <a className={styles.email} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
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
