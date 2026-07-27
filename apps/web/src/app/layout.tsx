import 'ui/styles/colors';
import 'ui/styles/variables';
import 'ui/styles/base';
import 'ui/styles/classnames';

import 'styles/globals.css';
import 'styles/variables.css';

import { Toaster } from 'ui/components/Toaster';

import { Footer } from 'components/Footer';
import { Header } from 'components/Header';

import { body, heading } from 'lib/fonts';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description:
    'Nextel Advisors — consultoría, intermediación y captación comercial para el sector de las telecomunicaciones. Contratación de nueva planta y Site Management.',
  openGraph: {
    description: 'Consultoría especializada en servicios de intermediación y captación comercial para el sector de las telecomunicaciones.',
    locale: 'es_ES',
    siteName: 'Nextel Advisors',
    title: 'Nextel Advisors — Conectamos hoy, impulsamos el mañana',
    type: 'website'
  },
  title: { default: 'Nextel Advisors — Conectamos hoy, impulsamos el mañana', template: '%s | Nextel Advisors' }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-scroll-behavior tells Next the smooth scrolling in globals.css is intentional,
    // so it can suppress it during route transitions (and its dev warning).
    <html data-scroll-behavior="smooth" lang="es">
      <body className={`${body.variable} ${heading.variable}`}>
        <a className="skipLink" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
