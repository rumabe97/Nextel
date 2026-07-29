import styles from './Header.module.css';

import { Link } from 'ui/components/Link';
import { pathFor } from 'i18n/config';

import { HeaderNav } from './components/HeaderNav';
import { HeaderShell } from './components/HeaderShell';
import { MobileNav } from './components/MobileNav';
import { LanguageSwitcher } from 'components/LanguageSwitcher';
import { Logo } from 'components/Logo';

import { buildNav } from 'lib/navigation';
import { getContactEmail } from 'lib/contactEmail';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface HeaderProps {
  dictionary: Dictionary;
  locale: Locale;
}

// HeaderShell (client) owns only the scrolled/transparent state; everything inside stays
// server-rendered. The inner grid centres the nav on the header, as Figma lays it out —
// logo left, nav centred, language switcher and drawer toggle right.
export function Header({ dictionary, locale }: HeaderProps) {
  // Read here rather than inside MobileNav: that component is a Client Component, where a
  // non-public env var is not available at all.
  const contactEmail = getContactEmail();
  const items = buildNav(locale, dictionary);

  return (
    <HeaderShell>
      <div className={styles.inner}>
        <Link className={styles.brand} href={pathFor('home', locale)}>
          <Logo className={styles.logo} />
        </Link>

        <HeaderNav dictionary={dictionary} items={items} locale={locale} />

        <div className={styles.actions}>
          {/* Desktop only — on touch the switcher lives inside the drawer instead. */}
          <div className={styles.switcher}>
            <LanguageSwitcher languageNames={dictionary.languageNames} legend={dictionary.common.language} locale={locale} />
          </div>

          <MobileNav contactEmail={contactEmail} dictionary={dictionary} items={items} locale={locale} />
        </div>
      </div>
    </HeaderShell>
  );
}
