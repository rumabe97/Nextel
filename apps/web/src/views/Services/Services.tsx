import { Fragment } from 'react';

import Image from 'next/image';

import styles from './Services.module.css';

import { SERVICE_ANCHORS } from 'i18n/config';

import { CheckList } from 'components/CheckList';
import { ExpertiseCard } from 'components/ExpertiseCard';
import { Glow } from 'components/Glow';
import { PageSection } from 'components/PageSection';
import { RichText } from 'components/RichText';
import { SectionHeading } from 'components/SectionHeading';

import type { CheckListItem } from 'components/CheckList';
import type { Dictionary } from 'i18n/dictionaries/es';

export interface ServicesProps {
  dictionary: Dictionary;
}

// Copy source: deck slides 5–7, matching the `04_Nuestros Servicios` frame. The bold runs
// inside each bullet come from `**markers**` in the dictionary so the copy stays plain text.
export function Services({ dictionary }: ServicesProps) {
  const { services } = dictionary;

  const newPlantItems: CheckListItem[] = services.newPlant.items.map((text, index) => ({
    id: `new-plant-${index}`,
    label: <RichText text={text} />
  }));

  const siteManagementItems: CheckListItem[] = services.siteManagement.items.map((item, index) => ({
    id: `site-management-${index}`,
    details: item.details,
    label: <RichText text={item.label} />
  }));

  return (
    <Fragment>
      <PageSection className={styles.heroSection} flush={true}>
        {/* Ellipse #2042:685: 508px solid Primary off the left edge. */}
        <Glow className={styles.heroGlow} size={508} />
        <div className={styles.heroMedia}>
          <Image
            alt={services.heroAlt}
            height={1068}
            priority={true}
            sizes="(max-width: 90rem) 100vw, 1296px"
            src="/images/services-hero.webp"
            width={1594}
          />
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma, which lights only this page's hero. Right side — the hero glow owns
            the left edge, so this alternates against it instead of stacking under it. */}
        <Glow className={styles.pillarsGlow} opacity={0.2} size={420} />

        <SectionHeading align="center" as="h1" eyebrow={services.eyebrow}>
          {services.heading}
        </SectionHeading>

        <div className={styles.pillars}>
          {services.pillars.map(pillar => (
            <div className={styles.pillar} key={pillar.title}>
              <h2 className={styles.pillarTitle}>{pillar.title}</h2>
              <p className={styles.pillarBody}>{pillar.body}</p>
              <CheckList items={pillar.items.map(label => ({ id: label, label }))} />
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma — Figma lights only this page's hero. Two here, because 813px of the
            run between the pillars and the second card had nothing in it. Centre then left,
            so neither shares a column with the other or with the hero glow above. */}
        <Glow className={styles.cardsGlowLead} opacity={0.18} size={400} />
        <Glow className={styles.cardsGlow} opacity={0.24} size={460} />

        <div className={styles.cards}>
          <ExpertiseCard
            id={SERVICE_ANCHORS.newPlant}
            image="/images/service-photo-1.webp"
            items={newPlantItems}
            titleAccent={services.newPlant.titleAccent}
            titleLead={services.newPlant.titleLead}
          />

          <ExpertiseCard
            id={SERVICE_ANCHORS.siteManagement}
            image="/images/service-photo-2.webp"
            items={siteManagementItems}
            titleAccent={services.siteManagement.titleAccent}
            titleLead={services.siteManagement.titleLead}
          />
        </div>
      </PageSection>
    </Fragment>
  );
}
