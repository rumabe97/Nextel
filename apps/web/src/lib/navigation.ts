// The site's navigation, built per language from the slug map and the dictionary, so a new
// page or a new language is added in one place and appears in the header, the drawer and the
// footer at once.

import { pathFor, SERVICE_ANCHORS } from 'i18n/config';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface NavItem {
  /** Sub-items render as a dropdown in the header and as an indented list in the drawer. */
  children?: NavItem[];
  href: string;
  label: string;
}

// Figma's header carries only the four section links, with the logo as the way home. Home is
// an addition on top of that: the drawer covers the logo while it is open, and by the footer
// the header is a scroll away, so relying on the mark alone left no obvious way back.
export function buildNav(locale: Locale, dictionary: Dictionary): NavItem[] {
  return [
    { href: pathFor('home', locale), label: dictionary.nav.home },
    { href: pathFor('about', locale), label: dictionary.nav.about },
    {
      children: [
        { href: pathFor('services', locale, SERVICE_ANCHORS.newPlant), label: dictionary.serviceMenu.newPlant },
        { href: pathFor('services', locale, SERVICE_ANCHORS.siteManagement), label: dictionary.serviceMenu.siteManagement }
      ],
      href: pathFor('services', locale),
      label: dictionary.nav.services
    },
    { href: pathFor('why', locale), label: dictionary.nav.why },
    { href: pathFor('contact', locale), label: dictionary.nav.contact }
  ];
}

// Sub-items belong to the header dropdown and the drawer only — the footer column is a flat
// list of destinations.
export function buildFooterLinks(locale: Locale, dictionary: Dictionary): NavItem[] {
  return buildNav(locale, dictionary).map(({ href, label }) => ({ href, label }));
}

export function buildLegalLinks(locale: Locale, dictionary: Dictionary): NavItem[] {
  return [{ href: pathFor('privacy', locale), label: dictionary.legalLinks.privacy }];
}

// A link to the page you are already on is a no-op for the router: nothing re-renders and
// nothing scrolls, so tapping "Home" halfway down the page leaves you exactly where you
// were. Callers turn this into an explicit scroll back to the top. Fragment links are
// excluded — the browser's own same-document scroll already handles those correctly.
export function isSamePageTopLink(href: string, pathname: string) {
  return !href.includes('#') && href === pathname;
}

// The locale root (`/es`) needs its own rule: every path in that language starts with it, so
// the generic prefix test would light up Home on every page of the site.
export function isActivePath(pathname: string, href: string, locale: Locale) {
  const path = href.split('#')[0] ?? href;

  if (path === `/${locale}`) {
    return pathname === path;
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}
