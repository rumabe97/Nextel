'use client';
import { Fragment, useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import styles from './HeaderShell.module.css';

import { isSamePageTopLink } from 'lib/navigation';

import type { MouseEvent, ReactNode } from 'react';

// Client wrapper that owns only the scroll state. At rest the header is fully transparent,
// as in Figma; once the page scrolls it gains a glass background + hairline so white nav
// text never sits illegibly over bright content (the /services hero, the blue footer).
// Children stay server-rendered — this component receives them as a prop.
export function HeaderShell({ children }: { children: ReactNode }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Watching an 8px probe at the top of the document rather than listening to `scroll`.
  //
  // Both answer the same question, but a scroll listener asks it on every single scroll event
  // — main-thread work on every frame, for the whole session, on every page — while the
  // compositor is trying to move a page carrying several large blurred gradients. React bails
  // out of the re-render when the boolean has not changed, so the old version was cheap rather
  // than wrong; it was still the only per-frame work the site did, and it is the classic first
  // thing to find when scrolling stutters on an older phone. An observer costs nothing until
  // the answer actually changes, and it reports once on observe, so a page restored mid-scroll
  // lands in the right state without a synchronous read.
  useEffect(() => {
    const node = sentinel.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      const latest = entries.at(-1);

      if (latest) {
        setScrolled(!latest.isIntersecting);
      }
    });

    observer.observe(node);

    return () => observer.disconnect();
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
    <Fragment>
      {/* The probe. Absolutely positioned against the initial containing block — there is no
          positioned ancestor between here and the document — so it sits at the very top of the
          page, scrolls away with it, and takes up no space in the flow. The header above it is
          `position: fixed` and out of flow too, so nothing here can move `main`. */}
      <div aria-hidden={true} className={styles.sentinel} ref={sentinel} />

      {/* The click handler is delegation, not an affordance of the <header> itself: every
          focusable child is a real anchor or button with its own keyboard handling. */}
      <header className={scrolled ? `${styles.header} ${styles.scrolled}` : styles.header} onClick={handleSamePageClick}>
        {children}
      </header>
    </Fragment>
  );
}
