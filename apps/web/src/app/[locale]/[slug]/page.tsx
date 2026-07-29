import { notFound } from 'next/navigation';

import { About } from 'views/About';
import { Contact } from 'views/Contact';
import { getDictionary } from 'i18n/getDictionary';
import { isLocale, LOCALES, pageForSlug, slugsFor } from 'i18n/config';
import { Legal } from 'views/Legal';
import { Services } from 'views/Services';
import { Why } from 'views/Why';

import { absoluteUrl, languageAlternates } from 'lib/siteUrl';

import type { Locale, PageKey } from 'i18n/config';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// One route for every page below the locale root. The slug is resolved through the shared
// map in i18n/config, so adding a language means adding its column there — no new folders,
// and no chance of the Spanish and English trees drifting apart.
//
// dynamicParams:false means anything not enumerated below is a 404 rather than an attempted
// render, which keeps a typo'd URL from ever returning a soft-200 to a crawler.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap(locale => slugsFor(locale).map(({ slug }) => ({ locale, slug })));
}

function resolve(localeParam: string, slug: string): { locale: Locale; page: PageKey } | null {
  if (!isLocale(localeParam)) {
    return null;
  }

  const page = pageForSlug(slug, localeParam);

  // A page is only reachable through its *own* language's slug: /en/sobre-nosotros is not a
  // real URL and must not answer, or the two languages would each be indexed twice.
  return page && page !== 'home' ? { locale: localeParam, page } : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = resolve(locale, slug);

  if (!resolved) {
    return {};
  }

  const dictionary = getDictionary(resolved.locale);
  const copy = dictionary[resolved.page];

  return {
    alternates: { canonical: absoluteUrl(resolved.page, resolved.locale), languages: languageAlternates(resolved.page) },
    description: 'description' in copy ? copy.description : undefined,
    title: copy.title
  };
}

export default async function LocalisedPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const resolved = resolve(locale, slug);

  if (!resolved) {
    notFound();
  }

  const dictionary = getDictionary(resolved.locale);

  switch (resolved.page) {
    case 'about':
      return <About dictionary={dictionary} />;
    case 'services':
      return <Services dictionary={dictionary} />;
    case 'why':
      return <Why dictionary={dictionary} locale={resolved.locale} />;
    case 'contact':
      return <Contact dictionary={dictionary} locale={resolved.locale} />;
    default:
      return <Legal copy={dictionary.privacy} />;
  }
}
