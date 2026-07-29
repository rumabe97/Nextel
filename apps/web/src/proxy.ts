import { NextResponse } from 'next/server';

import { isLocale, LOCALE_COOKIE, resolvePreferredLocale } from 'i18n/config';

import type { NextRequest } from 'next/server';

// Next 16 renamed the `middleware` file convention to `proxy`; the contract is otherwise
// identical — same request/response objects, same `config.matcher`.
//
// Every page lives under a language segment, so any request without one is redirected to the
// visitor's language. A 307 (not a rewrite) is deliberate: search engines then index exactly
// one canonical URL per language instead of finding the same content served at two paths.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split('/');

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  const locale = resolvePreferredLocale(request.headers.get('accept-language'), request.cookies.get(LOCALE_COOKIE)?.value);
  const url = request.nextUrl.clone();

  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(url, 307);
}

export const config = {
  // Everything except Next's own assets and anything that looks like a file.
  //
  // The `.*\\..*` clause is doing the real work: it skips any path containing a dot, which
  // covers every static file served straight from public/ plus robots.txt and sitemap.xml.
  // Listing directories instead missed assets sitting at the root of public/ — /logo-nextel.svg
  // was being redirected to /es/logo-nextel.svg, so the CSS mask that draws the N monogram
  // 404'd and every watermark silently rendered as nothing.
  matcher: ['/((?!_next/|.*\\..*).*)']
};
