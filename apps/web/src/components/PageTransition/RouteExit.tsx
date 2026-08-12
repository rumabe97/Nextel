'use client';
import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

/** Marks <html> while a navigation the visitor just started is in flight. */
const LEAVING = 'data-leaving';

/** Safety net: if a navigation never completes — cancelled, blocked, or intercepted by
 *  something else on the page — the page must not stay dimmed. Comfortably longer than the
 *  0.2s exit itself, short enough that a stuck state is never noticed. */
const RELEASE_MS = 900;

// The departure half of the page transition. The App Router exposes no "navigation started"
// signal, so the click that starts one is the signal: this listens in the capture phase, on
// the document, and flags <html> before Next's own handler runs.
//
// Nothing here waits for anything. The exit runs *while* the router works, so it costs zero
// latency — on a static page that resolves in 20ms the flag is cleared before the fade is
// perceptible, and on a slow cold route it becomes real feedback that the tap registered.
// The animation scales itself to the wait instead of imposing one.
export function RouteExit() {
  const pathname = usePathname();

  // Arrival clears it. This effect re-runs on every route change, which is precisely when the
  // new page is on screen and the dimming has to come off.
  useEffect(() => {
    document.documentElement.removeAttribute(LEAVING);
  }, [pathname]);

  useEffect(() => {
    let release: ReturnType<typeof setTimeout> | undefined;

    const handleClick = (event: MouseEvent) => {
      // Anything but an unmodified primary click is the browser's to handle: middle-click and
      // ctrl/cmd-click open a new tab and leave this page exactly where it is.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.('a[href]');

      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download')) {
        return;
      }

      // New tab (the client logos), and non-http schemes (mailto:, tel:) — this document stays.
      if ((anchor.target && anchor.target !== '_self') || !anchor.href.startsWith('http')) {
        return;
      }

      const target = new URL(anchor.href);

      // Off-site: the browser paints its own transition, and dimming first only makes the
      // handover look broken.
      if (target.origin !== window.location.origin) {
        return;
      }

      // Same page — a fragment link, or the nav item for the route already open. There is no
      // navigation to cover, and `pathname` will not change to clear the flag.
      if (target.pathname === window.location.pathname && target.search === window.location.search) {
        return;
      }

      document.documentElement.setAttribute(LEAVING, '');
      clearTimeout(release);
      release = setTimeout(() => document.documentElement.removeAttribute(LEAVING), RELEASE_MS);
    };

    document.addEventListener('click', handleClick, true);

    // Restoring a bfcache'd page re-runs no effects and re-renders nothing, so a page left
    // mid-navigation would come back still dimmed.
    const handlePageShow = () => document.documentElement.removeAttribute(LEAVING);

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      clearTimeout(release);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return null;
}
