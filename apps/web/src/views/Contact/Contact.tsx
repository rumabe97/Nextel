import Image from 'next/image';

import styles from './Contact.module.css';

import { pathFor } from 'i18n/config';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { Reveal } from 'components/Reveal';

import { blurred } from 'lib/blurData';

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
      <Image
        alt=""
        className={styles.background}
        height={1525}
        priority={true}
        sizes="100vw"
        width={2400}
        {...blurred('/images/contact-skyline.webp')}
      />
      <div className={styles.overlay} />
      {/* Ellipse #2002:1505: 381px blue @57%, top-right corner. */}
      <Glow className={styles.cornerGlow} opacity={0.57} size={381} />

      {/* Not in Figma. Its one ellipse sits in the top-right corner, leaving the form side
          unlit; this balances it low and left, well under the form's own contrast. */}
      <Glow className={styles.midGlow} opacity={0.16} size={380} />
      <Glow className={styles.formGlow} opacity={0.2} size={400} />

      {/* The LCP element on this page is the skyline behind it — full-bleed, `priority`, and
          outside both wrappers below — so revealing the copy costs nothing at load. */}
      <div className={styles.inner}>
        <Reveal className={styles.aside} stagger={true}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <p className={styles.taglinePrimary}>{dictionary.footer.taglinePrimary}</p>
          <p className={styles.taglineSecondary}>{dictionary.footer.taglineSecondary}</p>
        </Reveal>

        <Reveal className={styles.formColumn} delay={1} stagger={true}>
          <h1 className={styles.title}>{contact.heading}</h1>
          <ContactForm copy={contact.form} locale={locale} privacy={{ href: pathFor('privacy', locale), label: dictionary.legalLinks.privacy }} />
        </Reveal>
      </div>
    </section>
  );
}
