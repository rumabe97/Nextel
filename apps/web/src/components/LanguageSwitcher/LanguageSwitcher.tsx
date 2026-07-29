'use client';
import { usePathname, useRouter } from 'next/navigation';

import styles from './LanguageSwitcher.module.css';

import { equivalentPath, LOCALES } from 'i18n/config';
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
// Real <a> elements, not buttons. A crawler must be able to follow the link to the other
// language — that, plus the hreflang tags, is what gets both versions indexed. The click
// handler only adds the cookie so the choice survives a later visit to `/`.
export function LanguageSwitcher({ languageNames, legend, locale, variant = 'header' }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function remember(next: Locale) {
    rememberLocale(next);
    router.refresh();
  }

  return (
    <nav aria-label={legend} className={variant === 'drawer' ? `${styles.group} ${styles.drawer}` : styles.group}>
      {LOCALES.map(code => {
        const isCurrent = code === locale;

        return (
          <a
            aria-current={isCurrent ? 'true' : undefined}
            aria-label={languageNames[code]}
            className={isCurrent ? `${styles.option} ${styles.active}` : styles.option}
            href={equivalentPath(pathname, code)}
            hrefLang={code}
            key={code}
            onClick={() => remember(code)}
          >
            {code}
          </a>
        );
      })}
    </nav>
  );
}
