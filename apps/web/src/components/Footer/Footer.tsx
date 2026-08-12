import styles from './Footer.module.css';

import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';
import { Logo } from 'components/Logo';
import { Reveal } from 'components/Reveal';

import { buildFooterLinks, buildLegalLinks } from 'lib/navigation';
import { getContactEmail } from 'lib/contactEmail';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface FooterProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function Footer({ dictionary, locale }: FooterProps) {
  const contactEmail = getContactEmail();

  return (
    <footer className={styles.footer}>
      {/* Staggered across the four columns, left to right — the footer is the one block on
          the site the visitor always arrives at by scrolling, so it is the safest place for
          motion and the only one guaranteed to be seen in the right order. */}
      <Reveal className={styles.inner} stagger={true}>
        <div className={styles.tagline}>
          <p className={styles.taglinePrimary}>{dictionary.footer.taglinePrimary}</p>
          <p className={styles.taglineSecondary}>{dictionary.footer.taglineSecondary}</p>

          <a className={styles.email} href={`mailto:${contactEmail}`}>
            {contactEmail}
            <Icon className={styles.emailIcon} name="arrowUpRight" />
          </a>
        </div>

        <nav aria-labelledby="footer-links" className={styles.column}>
          <h2 className={styles.columnTitle} id="footer-links">
            {dictionary.footer.links}
          </h2>
          <ul className={styles.columnList}>
            {buildFooterLinks(locale, dictionary).map(link => (
              <li key={link.href}>
                <Link className={styles.columnLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal" className={styles.column}>
          <h2 className={styles.columnTitle} id="footer-legal">
            {dictionary.footer.other}
          </h2>
          <ul className={styles.columnList}>
            {buildLegalLinks(locale, dictionary).map(link => (
              <li key={link.href}>
                <Link className={styles.columnLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Logo className={styles.watermark} variant="mark" />
      </Reveal>

      <p className={styles.copyright}>
        ©{new Date().getFullYear()} <strong className={styles.copyrightBrand}>Nextel Advisors</strong> {dictionary.footer.rights}
      </p>
    </footer>
  );
}
