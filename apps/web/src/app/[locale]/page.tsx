import { notFound } from 'next/navigation';

import { getDictionary } from 'i18n/getDictionary';
import { Home } from 'views/Home';
import { isLocale } from 'i18n/config';

import { absoluteUrl, languageAlternates } from 'lib/siteUrl';

import type { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    alternates: { canonical: absoluteUrl('home', locale), languages: languageAlternates('home') },
    description: dictionary.home.description,
    // The home page owns the site's default title verbatim rather than through the template.
    title: { absolute: dictionary.home.title }
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <Home dictionary={getDictionary(locale)} locale={locale} />;
}
