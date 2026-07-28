// Single source of truth for the site's navigation, shared by the header, the mobile
// drawer and the footer's LINKS column so a new page only has to be added once.

export interface NavItem {
  /** Sub-items render as a dropdown in the header and as an indented list in the drawer. */
  children?: NavItem[];
  href: string;
  label: string;
}

// Figma's header carries only the four section links, with the logo as the way home. Inicio
// is an addition on top of that: the drawer covers the logo while it is open, and by the
// footer the header is a scroll away, so relying on the mark alone left no obvious way back.
export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about-us', label: 'Sobre Nosotros' },
  {
    children: [
      { href: '/services#new-plant', label: 'Contratación de nueva planta' },
      { href: '/services#site-management', label: 'Site Management' }
    ],
    href: '/services',
    label: 'Servicios'
  },
  { href: '/why-nextel', label: '¿Por qué Nextel?' },
  { href: '/contact', label: 'Contacto' }
];

// Sub-items belong to the header dropdown and the drawer only — the footer column is a flat
// list of destinations.
export const FOOTER_LINKS: NavItem[] = NAV_ITEMS.map(({ href, label }) => ({ href, label }));

// A link to the page you are already on is a no-op for the router: nothing re-renders and
// nothing scrolls, so tapping "Inicio" halfway down the home page leaves you exactly where
// you were. Callers turn this into an explicit scroll back to the top. Fragment links are
// excluded — the browser's own same-document scroll already handles those correctly.
export function isSamePageTopLink(href: string, pathname: string) {
  return !href.includes('#') && href === pathname;
}

// `/` needs its own rule: every path starts with it, so the generic prefix test would light
// up Inicio on every page of the site.
export function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export const FOOTER_LEGAL: NavItem[] = [
  { href: '/privacy-policy', label: 'Política de privacidad' },
  { href: '/terms-and-conditions', label: 'Términos y condiciones' }
];
