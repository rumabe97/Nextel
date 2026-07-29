'use client';
import { usePathname } from 'next/navigation';

import styles from './LanguageSwitcher.module.css';

import { equivalentPath, LOCALES } from 'i18n/config';
import { Link } from 'ui/components/Link';
import { rememberLocale } from 'i18n/rememberLocale';

import type { Locale } from 'i18n/config';

export interface LanguageSwitcherProps {
  /** Full language names, for the accessible label only — the control shows ES / EN. */
  languageNames: Record<Locale, string>;
  /** Label for the surrounding group, e.g. "Idioma". */
  legend: string;
  locale: Locale;
  /** `drawer` stretches the control to full width inside the mobile menu. */
  variant?: 'drawer' | 'header';
}

// Not in Figma — designed to match: Roboto Light, uppercase, wide tracking, exactly like the
// header links, with the active language in Primary. A two-item segmented control rather
// than a dropdown: with only two languages a menu would be one more click for no gain, and
// both options stay visible, which is its own affordance.
//
// Real links, not buttons: a crawler must be able to follow them to the other language —
// that, plus the hreflang tags, is what gets both versions indexed. The click handler only
// adds the cookie, so the choice survives a later visit to an unprefixed URL.
//
// Routed through the DS Link (next/link) rather than a bare <a>. Inside the drawer, clicking
// this also trips MobileNav's delegated handler, which closes the sheet and unmounts the
// portal that contains this very anchor. WebKit cancels a pending *default* navigation when
// the element is detached mid-click, so on iPhone the language simply never changed while
// Chrome shrugged and navigated anyway. next/link performs the navigation in JS during the
// handler, which the unmount cannot cancel — the same reason every other link in the drawer
// always worked on iOS.
export function LanguageSwitcher({ languageNames, legend, locale, variant = 'header' }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={legend} className={variant === 'drawer' ? `${styles.group} ${styles.drawer}` : styles.group}>
      {LOCALES.map(code => {
        const isCurrent = code === locale;

        return (
          <Link
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={languageNames[code]}
            className={isCurrent ? `${styles.option} ${styles.active}` : styles.option}
            href={equivalentPath(pathname, code)}
            hrefLang={code}
            key={code}
            onClick={() => rememberLocale(code)}
          >
            {code}
          </Link>
        );
      })}
    </nav>
  );
}
