import { en } from './dictionaries/en';
import { es } from './dictionaries/es';

import type { Dictionary } from './dictionaries/es';
import type { Locale } from './config';

const DICTIONARIES: Record<Locale, Dictionary> = { en, es };

/**
 * Both dictionaries are imported statically rather than lazily. They are only ever read from
 * Server Components, so nothing here reaches the browser bundle — client components receive
 * the handful of strings they need as props instead.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Fills `{email}`-style placeholders in a copy string. */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
