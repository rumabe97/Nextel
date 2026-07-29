import { DEFAULT_LOCALE, LOCALES, pathFor } from 'i18n/config';

import type { Locale, PageKey } from 'i18n/config';

/**
 * Canonical origin, used for canonical tags, hreflang alternates, the sitemap and robots.
 *
 * PLACEHOLDER until the production domain is confirmed — every absolute URL the crawlers see
 * comes from here, so this is the one line to change.
 */
export const BASE_URL = 'https://nextel.com';

export function absoluteUrl(page: PageKey, locale: Locale): string {
  return `${BASE_URL}${pathFor(page, locale)}`;
}

/**
 * The hreflang map for a page: one entry per language plus `x-default`.
 *
 * x-default points at Spanish rather than at `/`, because `/` is a redirect — pointing
 * crawlers at a 307 wastes the hint. Google is explicit that every language version should
 * list every other, including itself, which is why this is generated rather than hand-kept.
 */
export function languageAlternates(page: PageKey): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[locale] = absoluteUrl(page, locale);
  }

  languages['x-default'] = absoluteUrl(page, DEFAULT_LOCALE);

  return languages;
}
