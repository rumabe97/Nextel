// Single source of truth for the site's languages and its localised URLs.
//
// Adding a third language is meant to be a two-file change: add the code to LOCALES, add its
// column to SLUGS, and add a dictionary. Nothing else in the app hard-codes a language.

export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/** Spanish is the company's own language and the fallback for every unmatched browser. */
export const DEFAULT_LOCALE: Locale = 'es';

/** Remembers an explicit choice from the language switcher, so it outranks the browser. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** Every page that exists in both languages. */
export const PAGE_KEYS = ['home', 'about', 'services', 'why', 'contact', 'privacy'] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

// The URL segment per page per language. Localised because Spanish prospects search Spanish
// words — /es/sobre-nosotros ranks for queries that /es/about-us never will. `home` has no
// segment: it *is* the locale root.
const SLUGS: Record<PageKey, Record<Locale, string>> = {
  about: { en: 'about-us', es: 'sobre-nosotros' },
  contact: { en: 'contact', es: 'contacto' },
  home: { en: '', es: '' },
  privacy: { en: 'privacy-policy', es: 'politica-de-privacidad' },
  services: { en: 'services', es: 'servicios' },
  why: { en: 'why-nextel', es: 'por-que-nextel' }
};

// Deliberately NOT localised. Anchors are shared by both languages so a link copied from the
// Spanish page still lands correctly if the reader switches to English, and they carry no
// ranking weight worth splitting.
export const SERVICE_ANCHORS = { newPlant: 'new-plant', siteManagement: 'site-management' } as const;

export function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Absolute path for a page in a language, e.g. pathFor('about', 'es') -> `/es/sobre-nosotros`. */
export function pathFor(page: PageKey, locale: Locale, hash?: string): string {
  const slug = SLUGS[page][locale];
  const suffix = hash ? `#${hash}` : '';

  return slug ? `/${locale}/${slug}${suffix}` : `/${locale}${suffix}`;
}

/** Resolves a URL segment back to the page it names, or null when it names nothing. */
export function pageForSlug(slug: string, locale: Locale): PageKey | null {
  return PAGE_KEYS.find(page => SLUGS[page][locale] === slug) ?? null;
}

/** Every non-home slug for a language — feeds generateStaticParams and the sitemap. */
export function slugsFor(locale: Locale): { page: PageKey; slug: string }[] {
  return PAGE_KEYS.filter(page => SLUGS[page][locale] !== '').map(page => ({ page, slug: SLUGS[page][locale] }));
}

/**
 * Picks a language from an explicit cookie first, then the browser's Accept-Language, and
 * falls back to Spanish for anything else — exactly the rule the brief asked for.
 *
 * Accept-Language is quality-weighted (`en-GB,en;q=0.9,es;q=0.8`), so entries are sorted by
 * q before matching rather than trusting document order, and only the primary subtag is
 * compared so `en-GB` and `en-US` both count as English.
 */
export function resolvePreferredLocale(acceptLanguage: string | null, cookieValue?: string): Locale {
  if (isLocale(cookieValue)) {
    return cookieValue;
  }

  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const ranked = acceptLanguage
    .split(',')
    .map(part => {
      const [tag, ...params] = part.trim().split(';');
      const quality = params.find(p => p.trim().startsWith('q='))?.split('=')[1];

      return { quality: quality === undefined ? 1 : Number.parseFloat(quality), tag: (tag ?? '').trim().toLowerCase() };
    })
    .filter(entry => entry.tag !== '' && !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const primary = tag.split('-')[0];

    if (isLocale(primary)) {
      return primary;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * The same page in another language: `/es/sobre-nosotros` -> `/en/about-us`.
 *
 * Switching language should keep you where you are rather than dumping you on the home page,
 * and it is the same mapping the hreflang tags advertise — so the switcher and the crawler
 * hints can never disagree. Anything unrecognisable falls back to that language's home.
 */
export function equivalentPath(pathname: string, target: Locale): string {
  const [, first, second] = pathname.split('/');

  if (!isLocale(first) || second === undefined || second === '') {
    return pathFor('home', target);
  }

  const page = pageForSlug(second, first);

  return page ? pathFor(page, target) : pathFor('home', target);
}
