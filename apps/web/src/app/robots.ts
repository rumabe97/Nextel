import type { MetadataRoute } from 'next';

// TODO: set the production domain when it exists; relative sitemap URLs are invalid.
const BASE_URL = 'https://nextel.com';

export default function robots(): MetadataRoute.Robots {
  return { rules: { allow: '/', userAgent: '*' }, sitemap: `${BASE_URL}/sitemap.xml` };
}
