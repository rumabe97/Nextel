'use client';
import { usePathname } from 'next/navigation';

import styles from './HeaderNav.module.css';

import { Dropdown } from 'ui/components/Dropdown';
import { DropdownOption } from 'ui/components/Dropdown/components/DropdownOption';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';

import { NAV_ITEMS } from 'lib/navigation';

// Client because it reads the current route to mark the active link. `aria-current` does
// the announcing; the brand-blue styling is just the visual half of the same signal.
export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className={styles.nav}>
      <ul className={styles.list}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          if (item.children) {
            return (
              <li className={styles.item} key={item.href}>
                <Dropdown
                  align="start"
                  aria-label={`${item.label} — abrir submenú`}
                  label={
                    <span className={isActive ? `${styles.link} ${styles.active}` : styles.link}>
                      {item.label}
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
                  <DropdownOption asChild={true} className={styles.menuOption}>
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
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
