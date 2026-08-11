import Image from 'next/image';

import styles from './Contact.module.css';

import { pathFor } from 'i18n/config';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';

import { ContactForm } from './ContactForm';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface ContactProps {
  dictionary: Dictionary;
  locale: Locale;
}

export function Contact({ dictionary, locale }: ContactProps) {
  const { contact } = dictionary;

  return (
    <section className={styles.section}>
      <Image alt="" className={styles.background} height={1525} priority={true} sizes="100vw" src="/images/contact-skyline.webp" width={2400} />
      <div className={styles.overlay} />
      {/* Ellipse #2002:1505: 381px blue @57%, top-right corner. */}
      <Glow className={styles.cornerGlow} opacity={0.57} size={381} />

      {/* Not in Figma. Its one ellipse sits in the top-right corner, leaving the form side
          unlit; this balances it low and left, well under the form's own contrast. */}
      <Glow className={styles.midGlow} opacity={0.16} size={380} />
      <Glow className={styles.formGlow} opacity={0.2} size={400} />

      <div className={styles.inner}>
        <div className={styles.aside}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <p className={styles.taglinePrimary}>{dictionary.footer.taglinePrimary}</p>
          <p className={styles.taglineSecondary}>{dictionary.footer.taglineSecondary}</p>
        </div>

        <div className={styles.formColumn}>
          <h1 className={styles.title}>{contact.heading}</h1>
          <ContactForm copy={contact.form} locale={locale} privacy={{ href: pathFor('privacy', locale), label: dictionary.legalLinks.privacy }} />
        </div>
      </div>
    </section>
  );
}
