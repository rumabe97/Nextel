import Image from 'next/image';

import styles from './page.module.css';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';

import { ContactForm } from './ContactForm';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Ponte en contacto con Nextel Advisors. Cuéntanos tu proyecto de contratación de nueva planta o Site Management.',
  title: 'Contacto'
};

export default function ContactoPage() {
  return (
    <section className={styles.section}>
      <Image alt="" className={styles.background} height={1525} priority={true} sizes="100vw" src="/images/contact-skyline.webp" width={2400} />
      <div className={styles.overlay} />
      {/* Ellipse #2002:1505: 381px blue @57%, top-right corner. */}
      <Glow className={styles.cornerGlow} opacity={0.57} size={381} />

      <div className={styles.inner}>
        <div className={styles.aside}>
          <Eyebrow>Nextel Advisors</Eyebrow>
          <p className={styles.taglinePrimary}>Conectamos hoy</p>
          <p className={styles.taglineSecondary}>Impulsamos el mañana</p>
        </div>

        <div className={styles.formColumn}>
          <h1 className={styles.title}>Contacto</h1>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
