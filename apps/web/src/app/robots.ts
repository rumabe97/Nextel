import { BASE_URL } from 'lib/siteUrl';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return { rules: { allow: '/', userAgent: '*' }, sitemap: `${BASE_URL}/sitemap.xml` };
}
