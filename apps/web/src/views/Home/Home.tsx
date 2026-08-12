import { Fragment } from 'react';

import Image from 'next/image';

import styles from './Home.module.css';

import { Link } from 'ui/components/Link';
import { pathFor, SERVICE_ANCHORS } from 'i18n/config';

import { ClientStrip } from 'components/ClientStrip';
import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { HeroTagline } from 'components/HeroTagline';
import { HeroVideo } from 'components/HeroVideo';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
import { Reveal } from 'components/Reveal';
import { SectionHeading } from 'components/SectionHeading';
import { ServiceCard } from 'components/ServiceCard';
import { TaglineBand } from 'components/TaglineBand';

import type { CSSProperties } from 'react';
import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface HomeProps {
  dictionary: Dictionary;
  locale: Locale;
}

// Layout source: `02_Home` in Figma (#2045:238), cross-checked against the deck.
export function Home({ dictionary, locale }: HomeProps) {
  const { home } = dictionary;

  return (
    <Fragment>
      <section className={styles.hero}>
        <HeroVideo />
        <div className={styles.heroOverlay} />

        {/* Figma GROUP "N" (#417:5623) + Component 2 (#2019:759). Both live in HeroTagline:
            the watermark has to stay centred on the headline text at every width, which is
            an invariant only their shared container can hold. */}
        <HeroTagline tagline={home.tagline} />
      </section>

      <PageSection className={styles.introSection} flush={true}>
        {/* Ellipse #2007:802: 780px blue glow, 30%, off the right edge at the hero seam. */}
        <Glow className={styles.introGlow} opacity={0.3} size={780} />

        {/* stagger, not a plain reveal: the lead, its rule and the CTA are a sequence the eye
            already reads top to bottom, and arriving in that order is what makes the block
            feel composed rather than pasted in. The hero above is deliberately left alone —
            it is the LCP element and must paint on the first frame. */}
        <Reveal className={styles.intro} stagger={true}>
          <p className={styles.introLead}>{home.intro.lead}</p>
          <div className={styles.introRule} />
          <Link className={styles.introCta} href={pathFor('contact', locale)}>
            {dictionary.common.contactAdvisor}
            <Icon className={styles.introCtaIcon} name="arrowRight" />
          </Link>

          {/* Not in Figma. Directly under the hero, which is where a credibility signal has to
              land, and inside the intro column so it shares that column's width and left edge —
              spanning the full section instead put a wide centred band under narrow left-aligned
              copy, which is what made it look off-centre. */}
          <ClientStrip label={home.clients.label} />
        </Reveal>
      </PageSection>

      <PageSection divided={true}>
        {/* Not in Figma. The positioning block was the only section on this page with no light
            of its own, and the page's other glows all sit hard against one edge or the other —
            this one runs down the middle. */}
        <Glow className={styles.positioningGlow} opacity={0.17} size={400} />

        <div className={styles.positioning}>
          {/* The two halves come in from the sides they sit on, so the pairing itself is what
              animates — copy from the left, graphic from the right, meeting in the middle.
              Two Reveals rather than one, because the direction has to differ. */}
          <Reveal className={styles.positioningBody} variant="left">
            <Eyebrow>{home.positioning.eyebrow}</Eyebrow>
            <h2 className={styles.positioningTitle}>{home.positioning.title}</h2>
            <p className={styles.positioningNote}>{home.positioning.note}</p>
          </Reveal>

          {/* Figma "Img" #417:5658 — the hexagon + lightning graphic, right of the copy. */}
          <Reveal className={styles.positioningMarkReveal} variant="right">
            <Image alt="" className={styles.positioningMark} height={521} src="/images/hex-lightning.svg" unoptimized={true} width={482} />
          </Reveal>
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma. Added to light a measured dead stretch: every Figma glow on this page sits right of centre (93.9%, 91.5%) or off
            the left edge (-2%), leaving the whole service-card band dark. Left side, low
            opacity, so it balances the pair above rather than competing with them. */}
        <Glow className={styles.servicesGlow} opacity={0.22} size={440} />

        <Reveal>
          <SectionHeading align="center" eyebrow={home.services.eyebrow} stackedEyebrow={true}>
            {home.services.heading}
          </SectionHeading>
        </Reveal>

        <Reveal className={styles.services} stagger={true}>
          <ServiceCard
            href={pathFor('services', locale, SERVICE_ANCHORS.newPlant)}
            image="/images/service-new-plant.webp"
            index="01"
            title={dictionary.serviceMenu.newPlant}
          />
          <ServiceCard
            href={pathFor('services', locale, SERVICE_ANCHORS.siteManagement)}
            image="/images/service-site-management.webp"
            index="02"
            title={dictionary.serviceMenu.siteManagement}
          />
        </Reveal>
      </PageSection>

      <PageSection className={styles.statementsSection} divided={true}>
        {/* Ellipse #417:5725: 376px, 59%, right edge of the statements block. */}
        <Glow className={styles.statementsGlow} opacity={0.59} size={376} />

        {/* Figma staggers the four statements diagonally (~210px per step), each opening
            with a 416px transparent→Primary gradient rule.
            Each gets its own Reveal rather than one staggered list: the four are spread over
            roughly a full screen of height, so a single trigger would fire them all while
            the last two are still well below the fold and their motion would be spent before
            anyone saw it. Slid in from the left, along the same diagonal the layout steps. */}
        <ol className={styles.statements}>
          {home.statements.map((statement, index) => (
            <Reveal as="li" className={styles.statement} key={statement} style={{ '--statement-step': index } as CSSProperties} variant="left">
              <p className={styles.statementText}>{statement}</p>
            </Reveal>
          ))}
        </ol>
      </PageSection>

      <section className={styles.bandSection}>
        {/* Ellipse #2045:240: 722px, 18%, bleeding off the left edge. */}
        <Glow className={styles.bandGlow} opacity={0.18} size={722} />
        <TaglineBand primary={dictionary.footer.taglinePrimary} secondary={dictionary.footer.taglineSecondary} />
      </section>
    </Fragment>
  );
}
