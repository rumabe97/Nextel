import { Fragment } from 'react';

import styles from './page.module.css';

import { Link } from 'ui/components/Link';

import { Glow } from 'components/Glow';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';
import { StatBlock } from 'components/StatBlock';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Enfoque especializado, cercanía y compromiso, resultados medibles y experiencia combinada: las cuatro razones por las que trabajar con Nextel Advisors.',
  title: '¿Por qué Nextel?'
};

// The `05_Por qué Nextel` Figma frame was never designed — it still holds the purchased
// template's English lorem. This page is therefore built from the "Presentación TelCo"
// deck (slides 8 and 9), which pair each pillar with its expanded rationale, rendered in
// the visual language established by the frames that *are* designed.
const REASONS = [
  {
    body: 'Contamos con conocimiento profundo en el sector de telecomunicaciones, lo que nos permite ofrecer soluciones realistas y alineadas con las necesidades actuales del mercado.',
    title: 'Enfoque especializado'
  },
  {
    body: 'Al ser un equipo compacto, garantizamos una atención directa, flexible y personalizada, adaptándonos a cada cliente como un socio estratégico.',
    title: 'Cercanía y compromiso'
  },
  {
    body: 'No solo proponemos ideas: trabajamos para generar resultados concretos, medibles y sostenibles en el tiempo.',
    title: 'Resultados medibles'
  },
  {
    body: 'Unimos trayectorias profesionales diversas en ventas, consultoría y gestión comercial, lo que nos da una perspectiva completa para abordar cada proyecto con solidez.',
    title: 'Experiencia combinada'
  }
];

export default function PorQueNextelPage() {
  return (
    <Fragment>
      <PageSection className={styles.headerSection}>
        {/* Figma 05: 508px blue glow left (#417:6475) + 376px amber @60% right (#417:6483). */}
        <Glow className={styles.headerGlowBlue} size={508} />
        <Glow className={styles.headerGlowAmber} opacity={0.6} size={376} tone="amber" />
        {/* Ellipse #417:6476: 381px amber @30%, top-right corner. */}
        <Glow className={styles.headerGlowTop} opacity={0.3} size={381} tone="amber" />
        <SectionHeading
          as="h1"
          eyebrow="¿Por qué nosotros?"
          lead="Cuatro razones por las que las propiedades y los operadores confían en Nextel Advisors."
        >
          Un socio estratégico, no un proveedor más
        </SectionHeading>
      </PageSection>

      <PageSection divided={true}>
        <ol className={styles.reasons}>
          {REASONS.map(reason => (
            <li className={styles.reason} key={reason.title}>
              <h2 className={styles.reasonTitle}>{reason.title}</h2>
              <p className={styles.reasonBody}>{reason.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.commitments}>
          <SectionHeading eyebrow="Nuestro compromiso">Nos involucramos en cada etapa del proyecto</SectionHeading>

          <StatBlock
            stats={[
              { caption: 'Relación con la propiedad', value: 'Transparente' },
              { caption: 'En cada interacción', value: 'Profesional' },
              { caption: 'Enfoque de la relación', value: 'Largo plazo' }
            ]}
          />
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.cta}>
          <p className={styles.ctaTitle}>¿Hablamos de tu próximo proyecto?</p>
          <Link className={styles.ctaLink} href="/contact">
            Contacta con un asesor
            <Icon className={styles.ctaIcon} name="arrowRight" />
          </Link>
        </div>
      </PageSection>
    </Fragment>
  );
}
