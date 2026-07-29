import { LOCALES, PAGE_KEYS } from 'i18n/config';

import { absoluteUrl, languageAlternates } from 'lib/siteUrl';

import type { MetadataRoute } from 'next';

// Every page in every language, each entry carrying the full set of hreflang alternates.
// Google reads `alternates.languages` from the sitemap as an equivalent signal to the <link>
// tags in the head, so the two reinforce each other. The privacy page is excluded while it
// is still a placeholder and marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.flatMap(locale =>
    PAGE_KEYS.map(page => ({
      alternates: { languages: languageAlternates(page) },
      changeFrequency: 'monthly' as const,
      lastModified,
      priority: page === 'home' ? 1 : page === 'privacy' ? 0.3 : 0.8,
      url: absoluteUrl(page, locale)
    }))
  );
}
