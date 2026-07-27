import type { MetadataRoute } from 'next';

// Keep in sync with robots.ts.
const BASE_URL = 'https://nextel.com';

// The two legal stubs are intentionally absent — they carry `robots: index: false`
// until their real copy lands.
const ROUTES = ['', '/about-us', '/services', '/why-nextel', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(route => ({ changeFrequency: 'monthly', priority: route === '' ? 1 : 0.7, url: `${BASE_URL}${route}` }));
}
