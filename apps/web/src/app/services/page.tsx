import { Fragment } from 'react';

import Image from 'next/image';

import styles from './page.module.css';

import { CheckList } from 'components/CheckList';
import { ExpertiseCard } from 'components/ExpertiseCard';
import { Glow } from 'components/Glow';
import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

import type { CheckListItem } from 'components/CheckList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'Contratación de nueva planta y Site Management: identificación de emplazamientos, negociación de condiciones, eficiencia económica, renegociación de vencimientos y gestión de conflictos.',
  title: 'Servicios'
};

// Copy source: deck slides 5–7, matching the `04_Nuestros Servicios` frame.
const NUEVA_PLANTA: CheckListItem[] = [
  {
    id: 'identificacion',
    label: (
      <Fragment>
        <strong>Identificación</strong> y <strong>contratación</strong> de emplazamientos técnicamente viables
      </Fragment>
    )
  },
  {
    id: 'requisitos',
    label: (
      <Fragment>
        Cumplimiento de requisitos <strong>constructivos, urbanísticos y legales</strong>
      </Fragment>
    )
  },
  {
    id: 'ubicaciones',
    label: (
      <Fragment>
        Selección de <strong>ubicaciones estratégicas</strong> para mejora de cobertura
      </Fragment>
    )
  },
  {
    id: 'negociacion',
    label: (
      <Fragment>
        Negociación de condiciones <strong>económicas y legales óptimas</strong>
      </Fragment>
    )
  },
  {
    id: 'formalizacion',
    label: (
      <Fragment>
        Formalización de acuerdos <strong>estables</strong> y sostenibles a <strong>largo plazo</strong>
      </Fragment>
    )
  }
];

const SITE_MANAGEMENT: CheckListItem[] = [
  {
    id: 'eficiencia',
    details: ['Reducción de rentas o capitalizaciones para generar ahorro'],
    label: <strong>Proyectos de eficiencia económica</strong>
  },
  {
    id: 'vencimientos',
    details: ['Extensión de contratos en condiciones óptimas'],
    label: <strong>Renegociación de vencimientos contractuales</strong>
  },
  {
    id: 'conflictos',
    details: ['Acceso a los emplazamientos', 'Impagos', 'Suministro eléctrico u otros problemas operativos'],
    label: <strong>Gestión de conflictos con propiedades</strong>
  },
  {
    id: 'ampliaciones',
    details: ['Comparticiones adicionales', 'Actualizaciones tecnológicas / instalación de equipamiento 5G'],
    label: <strong>Negociación de ampliaciones de espacio</strong>
  },
  {
    id: 'titularidad',
    details: ['Tramitación y formalización de cesiones o modificaciones de titular en los contratos vigentes'],
    label: <strong>Cambios de titularidad contractual</strong>
  }
];

export default function ServiciosPage() {
  return (
    <Fragment>
      <PageSection className={styles.heroSection} flush={true}>
        {/* Ellipse #2042:685: 508px solid Primary off the left edge. */}
        <Glow className={styles.heroGlow} size={508} />
        <div className={styles.heroMedia}>
          <Image
            alt="Antenas de telecomunicaciones a contraluz"
            height={1068}
            priority={true}
            sizes="(max-width: 90rem) 100vw, 1296px"
            src="/images/services-hero.webp"
            width={1594}
          />
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading align="center" as="h1" eyebrow="Nextel Advisors">
          Nuestro expertise
        </SectionHeading>

        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <h2 className={styles.pillarTitle}>Experiencia</h2>
            <p className={styles.pillarBody}>
              Contamos con una sólida experiencia en la gestión de proyectos vinculados al sector de las telecomunicaciones.
            </p>
            <CheckList
              items={[
                { id: 'nueva-planta', label: 'Proyectos de contratación de nueva planta' },
                { id: 'site-management', label: 'Proyectos de Site Management' }
              ]}
            />
          </div>

          <div className={styles.pillar}>
            <h2 className={styles.pillarTitle}>Satisfacción</h2>
            <p className={styles.pillarBody}>
              Nos involucramos activamente en cada etapa del proyecto, comprometiéndonos con la satisfacción de las propiedades.
            </p>
            <CheckList
              items={[
                { id: 'transparente', label: 'Relación transparente' },
                { id: 'profesional', label: 'Trato profesional' },
                { id: 'largo-plazo', label: 'Enfoque a largo plazo' }
              ]}
            />
          </div>
        </div>
      </PageSection>

      <PageSection>
        <div className={styles.cards}>
          <ExpertiseCard
            id="new-plant"
            image="/images/service-photo-1.webp"
            items={NUEVA_PLANTA}
            titleAccent="nueva planta"
            titleLead="Contratación de"
          />

          <ExpertiseCard
            id="site-management"
            image="/images/service-photo-2.webp"
            items={SITE_MANAGEMENT}
            titleAccent="management"
            titleLead="Site"
          />
        </div>
      </PageSection>
    </Fragment>
  );
}
