import { Fragment } from 'react';

import styles from './Why.module.css';

import { Link } from 'ui/components/Link';
import { pathFor } from 'i18n/config';

import { Glow } from 'components/Glow';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
import { Reveal } from 'components/Reveal';
import { SectionHeading } from 'components/SectionHeading';
import { StatBlock } from 'components/StatBlock';

import type { CSSProperties } from 'react';
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
        {/* Figma 05: 508px glow left (#417:6475). Figma draws this page's glows amber; the site
            runs one Primary palette, so they are blue here. */}
        <Glow className={styles.headerGlowBlue} size={508} />
        {/* Ellipse #417:6476: 381px @30%, top-right corner. */}
        <Glow className={styles.headerGlowTop} opacity={0.3} size={381} />
        <SectionHeading as="h1" eyebrow={why.eyebrow} lead={why.lead}>
          {why.heading}
        </SectionHeading>
      </PageSection>

      <PageSection divided={true}>
        {/* Not in Figma. All three of its glows are stacked in the header, so everything below
            the fold ran dark — 84% of the page. */}
        <Glow className={styles.reasonsGlow} opacity={0.22} size={440} />

        <Reveal as="ol" className={styles.reasons} stagger={true}>
          {why.reasons.map((reason, index) => (
            // The index is published so the keyline above each pillar can draw itself in on
            // that pillar's own beat of the stagger rather than all four at once.
            <li className={styles.reason} key={reason.title} style={{ '--reason-index': index } as CSSProperties}>
              <h2 className={styles.reasonTitle}>{reason.title}</h2>
              <p className={styles.reasonBody}>{reason.body}</p>
            </li>
          ))}
        </Reveal>
      </PageSection>

      <PageSection divided={true}>
        {/* Not in Figma. The reasons glow above only reaches so far; this page is 2169px and
            Figma lights only its header. */}
        <Glow className={styles.commitmentsGlow} opacity={0.2} size={420} />

        <Reveal className={styles.commitments} stagger={true}>
          <SectionHeading eyebrow={why.commitment.eyebrow}>{why.commitment.heading}</SectionHeading>

          <StatBlock stats={why.commitment.stats} />
        </Reveal>
      </PageSection>

      <PageSection divided={true}>
        {/* Figma's #417:6483 (376px @60%). It belongs to this page's header in Figma, but that
            frame is 4762px tall against our 2169 — at our height it landed 296px from
            .headerGlowTop and read as one smudge with it. Moved to the CTA, which was the
            page's last dark stretch, so the same three Figma glows now span the page. */}
        <Glow className={styles.ctaGlow} opacity={0.6} size={376} />

        <Reveal className={styles.cta} stagger={true}>
          <p className={styles.ctaTitle}>{why.cta.title}</p>
          <Link className={styles.ctaLink} href={pathFor('contact', locale)}>
            {dictionary.common.contactAdvisor}
            <Icon className={styles.ctaIcon} name="arrowRight" />
          </Link>
        </Reveal>
      </PageSection>
    </Fragment>
  );
}
