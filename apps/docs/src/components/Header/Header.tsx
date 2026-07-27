'use client';
import { usePathname } from 'next/navigation';

import styles from './Header.module.css';

import { Link } from 'ui/components/Link';

import { Brand } from 'components/Brand';

const SECTIONS = [
  { href: '/ui', label: 'UI', matchPrefix: '/ui' },
  { href: '/tests', label: 'Tests', matchPrefix: '/tests' }
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className={`${styles.header} dotted-bottom`}>
      <Brand className={styles.brand} />
      <span aria-hidden="true" className={styles.separator}>
        /
      </span>
      <nav aria-label="Sections" className={styles.sections}>
        {SECTIONS.map(({ href, label, matchPrefix }) => {
          const isActive = pathname === matchPrefix || pathname.startsWith(`${matchPrefix}/`);

          return (
            <Link
              aria-current={isActive ? 'page' : undefined}
              className={isActive ? `${styles.section} ${styles.sectionActive}` : styles.section}
              href={href}
              key={href}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
