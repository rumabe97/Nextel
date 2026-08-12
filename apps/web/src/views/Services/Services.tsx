import { Fragment } from 'react';

import Image from 'next/image';

import styles from './Services.module.css';

import { SERVICE_ANCHORS } from 'i18n/config';

import { CheckList } from 'components/CheckList';
import { ExpertiseCard } from 'components/ExpertiseCard';
import { Glow } from 'components/Glow';
import { PageSection } from 'components/PageSection';
import { Reveal } from 'components/Reveal';
import { RichText } from 'components/RichText';
import { SectionHeading } from 'components/SectionHeading';

import { blurred } from 'lib/blurData';

import type { CheckListItem } from 'components/CheckList';
import type { CSSProperties } from 'react';
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
            width={1594}
            {...blurred('/images/services-hero.webp')}
          />
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma, which lights only this page's hero. Right side — the hero glow owns
            the left edge, so this alternates against it instead of stacking under it. */}
        <Glow className={styles.pillarsGlow} opacity={0.2} size={420} />

        <Reveal>
          <SectionHeading align="center" as="h1" eyebrow={services.eyebrow}>
            {services.heading}
          </SectionHeading>
        </Reveal>

        <Reveal className={styles.pillars} stagger={true}>
          {services.pillars.map((pillar, index) => (
            // Published so the rule under each heading draws on that pillar's own beat.
            <div className={styles.pillar} key={pillar.title} style={{ '--pillar-index': index } as CSSProperties}>
              <h2 className={styles.pillarTitle}>{pillar.title}</h2>
              <p className={styles.pillarBody}>{pillar.body}</p>
              <CheckList items={pillar.items.map(label => ({ id: label, label }))} />
            </div>
          ))}
        </Reveal>
      </PageSection>

      <PageSection>
        {/* Not in Figma — Figma lights only this page's hero. Two here, because 813px of the
            run between the pillars and the second card had nothing in it. Centre then left,
            so neither shares a column with the other or with the hero glow above. */}
        <Glow className={styles.cardsGlowLead} opacity={0.18} size={400} />
        <Glow className={styles.cardsGlow} opacity={0.24} size={460} />

        {/* One Reveal each, not a staggered pair: these two cards are the tallest blocks on
            the site and the second is a full screen below the first, so a shared trigger
            would play its animation long before it was on screen. They are also the anchor
            targets for the header's Servicios menu — arriving directly at #site-management
            has to land on a card that is already visible, which the observer's
            above-the-viewport check in Reveal handles for the one that gets skipped past. */}
        <div className={styles.cards}>
          <Reveal>
            <ExpertiseCard
              id={SERVICE_ANCHORS.newPlant}
              image="/images/service-photo-1.webp"
              items={newPlantItems}
              titleAccent={services.newPlant.titleAccent}
              titleLead={services.newPlant.titleLead}
            />
          </Reveal>

          <Reveal>
            <ExpertiseCard
              id={SERVICE_ANCHORS.siteManagement}
              image="/images/service-photo-2.webp"
              items={siteManagementItems}
              titleAccent={services.siteManagement.titleAccent}
              titleLead={services.siteManagement.titleLead}
            />
          </Reveal>
        </div>
      </PageSection>
    </Fragment>
  );
}
