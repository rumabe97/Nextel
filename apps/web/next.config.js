import { fileURLToPath } from 'node:url';

// Files under `public/` are served by Vercel with `max-age=0, must-revalidate`, so the 2.9MB
// hero video and the un-optimised hero images pay a conditional round trip on *every* page
// view. These are content assets that change only when someone deliberately replaces them.
//
// `stale-while-revalidate` rather than `immutable`: a replaced file still reaches everyone,
// just one visit later, instead of being pinned in caches for a year. If you ever swap one
// out and need it live immediately, rename it — the URL is the cache key.
const STATIC_ASSET_CACHE = 'public, max-age=2592000, stale-while-revalidate=86400';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ headers: [{ key: 'Cache-Control', value: STATIC_ASSET_CACHE }], source: '/:dir(videos|images)/:path*' }];
  },
  // Pin the workspace root: a stray lockfile in the user's home directory otherwise makes
  // Turbopack guess wrong and warn on every dev start.
  turbopack: { root: fileURLToPath(new URL('../..', import.meta.url)) }
};

export default nextConfig;
