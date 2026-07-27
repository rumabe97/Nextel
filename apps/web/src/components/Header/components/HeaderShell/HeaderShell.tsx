'use client';
import { useEffect, useState } from 'react';

import styles from './HeaderShell.module.css';

import type { ReactNode } from 'react';

// Client wrapper that owns only the scroll state. At rest the header is fully transparent,
// as in Figma; once the page scrolls it gains a glass background + hairline so white nav
// text never sits illegibly over bright content (the /services hero, the blue footer).
// Children stay server-rendered — this component receives them as a prop.
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header}>{children}</header>;
}
