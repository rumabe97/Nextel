import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root: a stray lockfile in the user's home directory otherwise makes
  // Turbopack guess wrong and warn on every dev start.
  turbopack: { root: fileURLToPath(new URL('../..', import.meta.url)) }
};

export default nextConfig;
