import styles from './Footer.module.css';

import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';
import { Logo } from 'components/Logo';

import { FOOTER_LEGAL, FOOTER_LINKS } from 'lib/navigation';
import { getContactEmail } from 'lib/contactEmail';

export function Footer() {
  const contactEmail = getContactEmail();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.tagline}>
          <p className={styles.taglinePrimary}>Conectamos hoy</p>
          <p className={styles.taglineSecondary}>Impulsamos el mañana</p>

          <a className={styles.email} href={`mailto:${contactEmail}`}>
            {contactEmail}
            <Icon className={styles.emailIcon} name="arrowUpRight" />
          </a>
        </div>

        <nav aria-labelledby="footer-links" className={styles.column}>
          <h2 className={styles.columnTitle} id="footer-links">
            Links
          </h2>
          <ul className={styles.columnList}>
            {FOOTER_LINKS.map(link => (
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
            Otros
          </h2>
          <ul className={styles.columnList}>
            {FOOTER_LEGAL.map(link => (
              <li key={link.href}>
                <Link className={styles.columnLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Logo className={styles.watermark} size={128} variant="mark" />
      </div>

      <p className={styles.copyright}>
        ©{new Date().getFullYear()} <strong className={styles.copyrightBrand}>Nextel Advisors</strong> Todos los derechos reservados
      </p>
    </footer>
  );
}
