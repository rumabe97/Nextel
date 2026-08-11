import { Fragment } from 'react';

import Image from 'next/image';

import styles from './About.module.css';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { Logo } from 'components/Logo';
import { NumberedList } from 'components/NumberedList';
import { PageSection } from 'components/PageSection';
import { RotatingWord } from 'components/RotatingWord';
import { SectionHeading } from 'components/SectionHeading';
import { StatBlock } from 'components/StatBlock';
import { TeamCard } from 'components/TeamCard';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { TeamMember } from 'components/TeamCard';

// Roster as supplied by the client on 28 Jul 2026. `role` is optional on TeamMember so a
// confirmed colleague can ship without a title rather than carry a guessed one.
const TEAM: TeamMember[] = [
  { email: 'Alejandro.serrano@nexteladv.es', name: 'Alejandro Serrano', role: 'General Manager' },
  { email: 'Ruben.garrido@nexteladv.es', name: 'Rubén Garrido', role: 'General Manager' },
  { email: 'Jorge.fernandez@nexteladv.es', name: 'Jorge Fernández', role: 'General Manager' }
];

export interface AboutProps {
  dictionary: Dictionary;
}

export function About({ dictionary }: AboutProps) {
  const { about } = dictionary;

  return (
    <Fragment>
      <PageSection className={styles.heroSection} flush={true}>
        {/* Ellipse #2019:448: 508px solid Primary, left edge behind the hero photo. */}
        <Glow className={styles.heroGlow} size={508} />
        {/* Ellipse #2019:455: 381px solid Primary, top-right corner. */}
        <Glow className={styles.heroGlowRight} size={381} />
        <div className={styles.heroMedia}>
          <Image
            alt={about.heroAlt}
            height={967}
            priority={true}
            sizes="(max-width: 90rem) 100vw, 1296px"
            src="/images/about-hero.webp"
            width={1720}
          />
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma. Added to light a measured dead stretch: the four Figma glows sit at the very top and the very bottom of this page,
            so the middle 1900px had none at all. */}
        <Glow className={styles.introGlow} opacity={0.2} size={440} />

        <div className={styles.intro}>
          <div className={styles.introBody}>
            <h1 className={styles.introTitle}>{about.introTitle}</h1>

            <div className={styles.introNote}>
              <p>{about.notes[0]}</p>
              <p>{about.notes[1]}</p>
            </div>

            <StatBlock className={styles.stats} stats={about.stats} />
          </div>

          <Logo className={styles.introMark} variant="mark" />
        </div>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.mission}>
          <div className={styles.missionMedia}>
            <Image
              alt={about.mission.meetingAlt}
              className={styles.missionImage}
              height={695}
              sizes="(max-width: 64rem) 80vw, 38rem"
              src="/images/office-meeting.webp"
              width={1042}
            />
          </div>

          <div className={styles.missionBody}>
            <Eyebrow>{about.mission.eyebrow}</Eyebrow>
            <h2 className={styles.missionTitle}>{about.mission.title}</h2>

            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <h3 className={styles.missionCardTitle}>{about.mission.cards[0].title}</h3>
                <p className={styles.missionCardBody}>{about.mission.cards[0].body}</p>
              </div>

              <div className={styles.missionCard}>
                <h3 className={styles.missionCardTitle}>{about.mission.cards[1].title}</h3>
                <p className={styles.missionCardBody}>{about.mission.cards[1].body}</p>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection>
        {/* Not in Figma. The run between the intro and the banner was 1381px with no light in
            it at all — the longest dark stretch on the site. */}
        <Glow className={styles.teamGlow} opacity={0.19} size={430} />

        <SectionHeading align="center" eyebrow={about.team.eyebrow}>
          {about.team.heading}
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
        {/* Ellipses #2019:456 (336px @40%) and #2019:449 (1041px @26%). Figma tints the first
            amber; the site keeps one Primary palette, so both are blue. */}
        <Glow className={styles.bannerGlowCentre} opacity={0.4} size={336} />
        <Glow className={styles.bannerGlowBlue} opacity={0.26} size={1041} />
        <p className={styles.banner}>
          {about.banner.lead} <RotatingWord words={about.banner.words} />
        </p>
      </PageSection>

      <PageSection divided={true}>
        <div className={styles.challenges}>
          <div className={styles.challengesBody}>
            <Eyebrow>{about.challenges.eyebrow}</Eyebrow>
            <h2 className={styles.challengesTitle}>{about.challenges.title}</h2>

            <NumberedList className={styles.challengesList} items={about.challenges.items} />

            <p className={styles.challengesClosing}>{about.challenges.closing}</p>
          </div>

          <div className={styles.challengesMedia}>
            <Image
              alt={about.challenges.projectAlt}
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
