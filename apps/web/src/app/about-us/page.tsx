import { Fragment } from 'react';

import Image from 'next/image';

import styles from './page.module.css';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { Logo } from 'components/Logo';
import { NumberedList } from 'components/NumberedList';
import { PageSection } from 'components/PageSection';
import { RotatingWord } from 'components/RotatingWord';
import { SectionHeading } from 'components/SectionHeading';
import { StatBlock } from 'components/StatBlock';
import { TeamCard } from 'components/TeamCard';

import type { Metadata } from 'next';
import type { TeamMember } from 'components/TeamCard';

export const metadata: Metadata = {
  description:
    'Nextel es una empresa con experiencia en servicios de consultoría, intermediación y captación comercial, unidos por una visión común: soluciones eficientes, innovadoras, personalizadas y sostenibles.',
  title: 'Sobre Nosotros'
};

// Roster as supplied by the client on 28 Jul 2026. `role` is optional on TeamMember so a
// confirmed colleague can ship without a title rather than carry a guessed one.
const TEAM: TeamMember[] = [
  { email: 'Alejandro.serrano@nexteladv.es', name: 'Alejandro Serrano', role: 'General Manager' },
  { email: 'Ruben.garrido@nexteladv.es', name: 'Rubén Garrido', role: 'General Manager' },
  { email: 'Jorge.fernandez@nexteladv.es', name: 'Jorge Fernández', role: 'General Manager' }
];

// Slide 4 of the deck, "¿Por qué existimos?".
const CHALLENGES = [
  'Dificultades para llegar eficazmente a nuevos clientes.',
  'Necesidad de optimizar procesos comerciales sin perder calidad.',
  'Falta de recursos para implementar estrategias de captación sostenibles.',
  'Escasez de asesoramiento especializado e imparcial.'
];

export default function SobreNosotrosPage() {
  return (
    <Fragment>
      <PageSection className={styles.heroSection} flush={true}>
        {/* Ellipse #2019:448: 508px solid Primary, left edge behind the hero photo. */}
        <Glow className={styles.heroGlow} size={508} />
        {/* Ellipse #2019:455: 381px solid Primary, top-right corner. */}
        <Glow className={styles.heroGlowRight} size={381} />
        <div className={styles.heroMedia}>
          <Image
            alt="El equipo de Nextel Advisors"
            height={967}
            priority={true}
            sizes="(max-width: 90rem) 100vw, 1296px"
            src="/images/about-hero.webp"
            width={1720}
          />
        </div>
      </PageSection>

      <PageSection>
        <div className={styles.intro}>
          <div className={styles.introBody}>
            <h1 className={styles.introTitle}>Unidos por una visión común</h1>

            <div className={styles.introNote}>
              <p>Nextel es una empresa con experiencia en servicios de consultoría, intermediación y captación comercial.</p>
              <p>Ofrecemos soluciones eficientes, innovadoras, personalizadas y sostenibles.</p>
            </div>

            <StatBlock
              className={styles.stats}
              stats={[
                { caption: 'De expertos en el sector', value: 'Equipo' },
                { caption: 'Años de experiencia', value: '5+' }
              ]}
            />
          </div>

          <Logo className={styles.introMark} size={280} variant="mark" />
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.mission}>
          <div className={styles.missionMedia}>
            <Image
              alt="Reunión del equipo en la oficina"
              className={styles.missionImage}
              height={695}
              sizes="(max-width: 64rem) 80vw, 38rem"
              src="/images/office-meeting.webp"
              width={1042}
            />
          </div>

          <div className={styles.missionBody}>
            <Eyebrow>¿Por qué nosotros?</Eyebrow>
            <h2 className={styles.missionTitle}>Pasión y visión estratégica</h2>

            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <h3 className={styles.missionCardTitle}>Nuestra misión</h3>
                <p className={styles.missionCardBody}>
                  Construir relaciones de confianza a través de un trabajo serio, comprometidos con la calidad y ofreciendo una atención
                  personalizada.
                </p>
              </div>

              <div className={styles.missionCard}>
                <h3 className={styles.missionCardTitle}>Nuestra base</h3>
                <p className={styles.missionCardBody}>
                  Contamos con solidez de conocimientos, combinando experiencia, pasión y visión estratégica para impulsar el crecimiento de nuestros
                  clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading align="center" eyebrow="Miembros">
          Nuestro equipo
        </SectionHeading>

        <ul className={styles.team}>
          {TEAM.map(member => (
            <li key={member.name}>
              <TeamCard member={member} />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection className={styles.bannerSection}>
        {/* Ellipses #2019:456 (336px amber @40%) and #2019:449 (1041px blue @26%). */}
        <Glow className={styles.bannerGlowAmber} opacity={0.4} size={336} tone="amber" />
        <Glow className={styles.bannerGlowBlue} opacity={0.26} size={1041} />
        <p className={styles.banner}>
          En Nextel ofrecemos soluciones <RotatingWord words={['eficientes', 'innovadoras', 'personalizadas', 'sostenibles']} />
        </p>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.challenges}>
          <div className={styles.challengesBody}>
            <Eyebrow>¿Por qué existimos?</Eyebrow>
            <h2 className={styles.challengesTitle}>
              En un entorno cada vez más competitivo y en constante evolución tecnológica, muchas empresas se enfrentan a diferentes retos.
            </h2>

            <NumberedList className={styles.challengesList} items={CHALLENGES} />

            <p className={styles.challengesClosing}>
              Actuamos como puente entre empresas y clientes, ofreciendo un servicio de consultoría ágil, eficiente y orientado a resultados.
            </p>
          </div>

          <div className={styles.challengesMedia}>
            <Image
              alt="Equipo trabajando en un proyecto"
              className={styles.challengesImage}
              height={918}
              sizes="(max-width: 64rem) 80vw, 34rem"
              src="/images/office-project.webp"
              width={1364}
            />
          </div>
        </div>
      </PageSection>
    </Fragment>
  );
}
