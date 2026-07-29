import { notFound } from 'next/navigation';

import 'ui/styles/colors';
import 'ui/styles/variables';
import 'ui/styles/base';
import 'ui/styles/classnames';

import 'styles/globals.css';
import 'styles/variables.css';

import { getDictionary } from 'i18n/getDictionary';
import { isLocale, LOCALES } from 'i18n/config';
import { Toaster } from 'ui/components/Toaster';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';

import { BASE_URL } from 'lib/siteUrl';
import { body, heading } from 'lib/fonts';

import type { Locale } from 'i18n/config';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

// The root layout lives inside the [locale] segment: every page on the site is language
// scoped, so there is no route above this one that would need an <html> of its own.
export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const dictionary = getDictionary(isLocale(locale) ? locale : 'es');

  return {
    description: dictionary.home.description,
    // Lets every page express canonicals and hreflang as absolute URLs from one origin.
    metadataBase: new URL(BASE_URL),
    openGraph: {
      description: dictionary.home.ogDescription,
      locale: locale === 'en' ? 'en_GB' : 'es_ES',
      siteName: 'Nextel Advisors',
      title: dictionary.home.title,
      type: 'website'
    },
    title: { default: dictionary.home.title, template: '%s | Nextel Advisors' }
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale as Locale);

  return (
    // `lang` is what tells search engines and screen readers which language this document is
    // in — it is the single most important i18n attribute on the page.
    //
    // suppressHydrationWarning on these two elements only: browser extensions (dark-mode
    // themers in particular) rewrite <html>/<body> attributes before React hydrates, which
    // React reports as a mismatch it "won't patch up". Both render deterministic, static
    // attributes here, so there is no real mismatch this can mask — and the flag covers just
    // the element it sits on, never its subtree.
    <html data-scroll-behavior="smooth" lang={locale} suppressHydrationWarning={true}>
      <body className={`${body.variable} ${heading.variable}`} suppressHydrationWarning={true}>
        <a className="skipLink" href="#contenido">
          {dictionary.common.skipToContent}
        </a>
        <Header dictionary={dictionary} locale={locale as Locale} />
        <main id="contenido">{children}</main>
        <Footer dictionary={dictionary} locale={locale as Locale} />
        <Toaster />
      </body>
    </html>
  );
}
