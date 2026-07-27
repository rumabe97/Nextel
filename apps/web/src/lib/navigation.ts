// Single source of truth for the site's navigation, shared by the header, the mobile
// drawer and the footer's LINKS column so a new page only has to be added once.

export interface NavItem {
  /** Sub-items render as a dropdown in the header and as an indented list in the drawer. */
  children?: NavItem[];
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
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

export const FOOTER_LINKS: NavItem[] = [{ href: '/', label: 'Home' }, ...NAV_ITEMS.map(({ href, label }) => ({ href, label }))];

export const FOOTER_LEGAL: NavItem[] = [
  { href: '/privacy-policy', label: 'Política de privacidad' },
  { href: '/terms-and-conditions', label: 'Términos y condiciones' }
];

export const CONTACT_EMAIL = 'info@nextel.com';
