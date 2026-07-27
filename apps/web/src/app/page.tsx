import { Fragment } from 'react';

import Image from 'next/image';

import styles from './page.module.css';

import { Link } from 'ui/components/Link';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { HeroVideo } from 'components/HeroVideo';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';
import { ServiceCard } from 'components/ServiceCard';
import { TaglineBand } from 'components/TaglineBand';

import type { CSSProperties } from 'react';

// Copy source: `02_Home` in Figma (#2045:238), cross-checked against the deck.
const VALUE_STATEMENTS = [
  'Actuamos como puente entre empresas y clientes, ofreciendo un servicio de consultoría ágil, eficiente y orientado a resultados.',
  'Ofrecemos soluciones realistas y alineadas con las necesidades actuales del mercado.',
  'Garantizamos una atención directa, flexible y personalizada.',
  'Trabajamos para generar resultados concretos, medibles y sostenibles en el tiempo.'
];

export default function HomePage() {
  return (
    <Fragment>
      <section className={styles.hero}>
        <HeroVideo />
        <div className={styles.heroOverlay} />

        {/* Figma GROUP "N" (#417:5623): a 508px Primary glow behind the white N icon
            (NEXTEL_Icono-01, fill_e52d51cb) — layered UNDER the tagline text. */}
        <div className={styles.heroMark}>
          <Glow className={styles.heroMarkGlow} size={508} />
          {/* unoptimized: the file is already a 7KB lossless-alpha webp; the optimizer's
              lossy re-encode can only dull the pure-white fill. */}
          <Image alt="" className={styles.heroIcon} height={516} priority={true} src="/images/icon-n.webp" unoptimized={true} width={330} />
        </div>

        {/* Component 2 (#2019:759) — the tagline OVER the N: line 1 Roboto Black 900
            left-aligned, line 2 Roboto Thin 100 right-aligned one row down (the offset
            "tab" comes from the right alignment against the shorter last line). */}
        <h1 className={styles.tagline}>
          <span className={styles.taglineRowStart}>
            <span className={styles.taglineBlack}>Conectamos</span>
          </span>
          <span className={styles.taglineRowStart}>
            <span className={styles.taglineBlack}>hoy,</span> <span className={styles.taglineThin}>impulsamos</span>
          </span>
          <span className={styles.taglineRowEnd}>
            <span className={styles.taglineThin}>el mañana</span>
          </span>
        </h1>
      </section>

      <PageSection className={styles.introSection} flush={true}>
        {/* Ellipse #2007:802: 780px blue glow, 30%, off the right edge at the hero seam. */}
        <Glow className={styles.introGlow} opacity={0.3} size={780} />

        <div className={styles.intro}>
          <p className={styles.introLead}>
            Consultoría especializada en servicios de intermediación y captación comercial para el sector de las telecomunicaciones.
          </p>
          <div className={styles.introRule} />
          <Link className={styles.introCta} href="/contact">
            Contacta con un asesor
            <Icon className={styles.introCtaIcon} name="arrowRight" />
          </Link>
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.positioning}>
          <div className={styles.positioningBody}>
            <Eyebrow>Nextel Advisors</Eyebrow>
            <h2 className={styles.positioningTitle}>Servicio de consultoría ágil, eficiente y orientado a resultados.</h2>
            <p className={styles.positioningNote}>
              Contamos con una sólida experiencia en la gestión de proyectos vinculados al sector de las telecomunicaciones.
            </p>
          </div>

          {/* Figma "Img" #417:5658 — the hexagon + lightning graphic, right of the copy. */}
          <Image alt="" className={styles.positioningMark} height={521} src="/images/hex-lightning.svg" unoptimized={true} width={482} />
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading align="center" eyebrow="Nuestros servicios">
          Nos involucramos activamente en cada etapa del proyecto
        </SectionHeading>

        <div className={styles.services}>
          <ServiceCard href="/services#new-plant" image="/images/service-new-plant.webp" index="01" title="Contratación de nueva planta" />
          <ServiceCard href="/services#site-management" image="/images/service-site-management.webp" index="02" title="Site management" />
        </div>
      </PageSection>

      <PageSection className={styles.statementsSection} divided={true}>
        {/* Ellipse #417:5725: 376px, 59%, right edge of the statements block. */}
        <Glow className={styles.statementsGlow} opacity={0.59} size={376} />

        {/* Figma staggers the four statements diagonally (~210px per step), each opening
            with a 416px transparent→Primary gradient rule. */}
        <ol className={styles.statements}>
          {VALUE_STATEMENTS.map((statement, index) => (
            <li className={styles.statement} key={statement} style={{ '--statement-step': index } as CSSProperties}>
              <p className={styles.statementText}>{statement}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <section className={styles.bandSection}>
        {/* Ellipse #2045:240: 722px, 18%, bleeding off the left edge. */}
        <Glow className={styles.bandGlow} opacity={0.18} size={722} />
        <TaglineBand />
      </section>
    </Fragment>
  );
}
