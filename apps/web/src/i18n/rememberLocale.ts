import { LOCALE_COOKIE } from './config';

import type { Locale } from './config';

/**
 * Persists an explicit language choice so the middleware honours it on the next visit to an
 * unprefixed URL, outranking the browser's Accept-Language from then on.
 *
 * A year, and `samesite=lax` so it survives ordinary navigation without riding along on
 * cross-site requests. Lives outside the component because writing to `document` from a
 * render-adjacent scope is exactly what the React Compiler's immutability rule guards
 * against — this is an explicit, isolated side effect.
 */
export function rememberLocale(locale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
