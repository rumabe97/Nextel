import { Fragment } from 'react';

import styles from './Why.module.css';

import { Link } from 'ui/components/Link';
import { pathFor } from 'i18n/config';

import { Glow } from 'components/Glow';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';
import { StatBlock } from 'components/StatBlock';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface WhyProps {
  dictionary: Dictionary;
  locale: Locale;
}

// The `05_Por qué Nextel` Figma frame was never designed — it still holds the purchased
// template's English lorem. This page is therefore built from the "Presentación TelCo"
// deck (slides 8 and 9), which pair each pillar with its expanded rationale, rendered in
// the visual language established by the frames that *are* designed.
export function Why({ dictionary, locale }: WhyProps) {
  const { why } = dictionary;

  return (
    <Fragment>
      <PageSection className={styles.headerSection}>
        {/* Figma 05: 508px blue glow left (#417:6475) + 376px amber @60% right (#417:6483). */}
        <Glow className={styles.headerGlowBlue} size={508} />
        <Glow className={styles.headerGlowAmber} opacity={0.6} size={376} tone="amber" />
        {/* Ellipse #417:6476: 381px amber @30%, top-right corner. */}
        <Glow className={styles.headerGlowTop} opacity={0.3} size={381} tone="amber" />
        <SectionHeading as="h1" eyebrow={why.eyebrow} lead={why.lead}>
          {why.heading}
        </SectionHeading>
      </PageSection>

      <PageSection divided={true}>
        <ol className={styles.reasons}>
          {why.reasons.map(reason => (
            <li className={styles.reason} key={reason.title}>
              <h2 className={styles.reasonTitle}>{reason.title}</h2>
              <p className={styles.reasonBody}>{reason.body}</p>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.commitments}>
          <SectionHeading eyebrow={why.commitment.eyebrow}>{why.commitment.heading}</SectionHeading>

          <StatBlock stats={why.commitment.stats} />
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.cta}>
          <p className={styles.ctaTitle}>{why.cta.title}</p>
          <Link className={styles.ctaLink} href={pathFor('contact', locale)}>
            {dictionary.common.contactAdvisor}
            <Icon className={styles.ctaIcon} name="arrowRight" />
          </Link>
        </div>
      </PageSection>
    </Fragment>
  );
}
