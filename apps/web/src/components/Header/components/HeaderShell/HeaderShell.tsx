'use client';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './HeaderShell.module.css';

import { isSamePageTopLink } from 'lib/navigation';

import type { MouseEvent, ReactNode } from 'react';

// Client wrapper that owns only the scroll state. At rest the header is fully transparent,
// as in Figma; once the page scrolls it gains a glass background + hairline so white nav
// text never sits illegibly over bright content (the /services hero, the blue footer).
// Children stay server-rendered — this component receives them as a prop.
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigating to the page you are already on is a no-op for the router: nothing scrolls,
  // so clicking the logo (or the nav item for the current page) from halfway down leaves
  // the visitor exactly where they were. Delegated from the <header> so it covers the logo
  // and the desktop nav at once — `ui/components/Link` exposes no onClick of its own. The
  // drawer and the Servicios menu are portalled out of here and carry their own handlers.
  // Element, not HTMLElement: the logo is an inline <svg>, so a click that lands on the mark
  // itself reports an SVGElement target — which fails an HTMLElement check and would skip
  // the very link this exists for. `closest` is defined on Element, so this covers both.
  function handleSamePageClick(event: MouseEvent<HTMLElement>) {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;

    if (anchor && isSamePageTopLink(anchor.getAttribute('href') ?? '', pathname)) {
      window.scrollTo({ top: 0 });
    }
  }

  return (
    // The click handler is delegation, not an affordance of the <header> itself: every
    // focusable child is a real anchor or button with its own keyboard handling.
    <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header} onClick={handleSamePageClick}>
      {children}
    </header>
  );
}
