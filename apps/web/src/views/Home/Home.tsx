import { Fragment } from 'react';

import Image from 'next/image';

import styles from './Home.module.css';

import { Link } from 'ui/components/Link';
import { pathFor, SERVICE_ANCHORS } from 'i18n/config';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { HeroVideo } from 'components/HeroVideo';
import { Icon } from 'components/Icon';
import { PageSection } from 'components/PageSection';
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
            <span className={styles.taglineBlack}>{home.tagline.first}</span>
          </span>
          <span className={styles.taglineRowStart}>
            <span className={styles.taglineBlack}>{home.tagline.second}</span> <span className={styles.taglineThin}>{home.tagline.third}</span>
          </span>
          <span className={styles.taglineRowEnd}>
            <span className={styles.taglineThin}>{home.tagline.fourth}</span>
          </span>
        </h1>
      </section>

      <PageSection className={styles.introSection} flush={true}>
        {/* Ellipse #2007:802: 780px blue glow, 30%, off the right edge at the hero seam. */}
        <Glow className={styles.introGlow} opacity={0.3} size={780} />

        <div className={styles.intro}>
          <p className={styles.introLead}>{home.intro.lead}</p>
          <div className={styles.introRule} />
          <Link className={styles.introCta} href={pathFor('contact', locale)}>
            {dictionary.common.contactAdvisor}
            <Icon className={styles.introCtaIcon} name="arrowRight" />
          </Link>
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.positioning}>
          <div className={styles.positioningBody}>
            <Eyebrow>{home.positioning.eyebrow}</Eyebrow>
            <h2 className={styles.positioningTitle}>{home.positioning.title}</h2>
            <p className={styles.positioningNote}>{home.positioning.note}</p>
          </div>

          {/* Figma "Img" #417:5658 — the hexagon + lightning graphic, right of the copy. */}
          <Image alt="" className={styles.positioningMark} height={521} src="/images/hex-lightning.svg" unoptimized={true} width={482} />
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading align="center" eyebrow={home.services.eyebrow}>
          {home.services.heading}
        </SectionHeading>

        <div className={styles.services}>
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
        </div>
      </PageSection>

      <PageSection className={styles.statementsSection} divided={true}>
        {/* Ellipse #417:5725: 376px, 59%, right edge of the statements block. */}
        <Glow className={styles.statementsGlow} opacity={0.59} size={376} />

        {/* Figma staggers the four statements diagonally (~210px per step), each opening
            with a 416px transparent→Primary gradient rule. */}
        <ol className={styles.statements}>
          {home.statements.map((statement, index) => (
            <li className={styles.statement} key={statement} style={{ '--statement-step': index } as CSSProperties}>
              <p className={styles.statementText}>{statement}</p>
            </li>
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
