import styles from './Legal.module.css';

import { fill } from 'i18n/getDictionary';

import { Eyebrow } from 'components/Eyebrow';
import { Glow } from 'components/Glow';
import { PageSection } from 'components/PageSection';

import { getContactEmail } from 'lib/contactEmail';

import type { Dictionary } from 'i18n/dictionaries/es';

export interface LegalProps {
  copy: Dictionary['privacy'];
}

// A long-form legal document rather than a marketing block: a single readable column, the
// site's own type scale, and section headings that can be linked to. `{email}` placeholders
// are filled from the same env var the rest of the site uses, so the contact address can
// never drift out of sync with the policy.
export function Legal({ copy }: LegalProps) {
  const email = getContactEmail();

  return (
    <PageSection>
      {/* Not in Figma — there is no privacy frame. The corner one matches Contact's
          #2002:1505 (381px @57%) so the page reads as part of the same system; the other two
          carry that down a 2819px column that otherwise had a single light at the very top.
          Alternating sides, and dimmer than the corner, because this page is a wall of text
          and the glows must stay behind it. */}
      <Glow className={styles.cornerGlow} opacity={0.57} size={381} />
      <Glow className={styles.upperGlow} opacity={0.17} size={390} />
      <Glow className={styles.midGlow} opacity={0.2} size={420} />
      <Glow className={styles.footGlow} opacity={0.18} size={400} />

      <article className={styles.document}>
        <header className={styles.header}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 className={styles.title}>{copy.heading}</h1>
          <p className={styles.updated}>{copy.updated}</p>
          <p className={styles.intro}>{copy.intro}</p>
        </header>

        {copy.sections.map(section => (
          <section className={styles.section} key={section.title}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>

            {section.body.map(paragraph => (
              <p className={styles.paragraph} key={paragraph}>
                {fill(paragraph, { email })}
              </p>
            ))}

            {'items' in section && section.items ? (
              <ul className={styles.list}>
                {section.items.map(item => (
                  <li className={styles.listItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}

            {'footer' in section && section.footer ? <p className={styles.paragraph}>{fill(section.footer, { email })}</p> : null}
          </section>
        ))}
      </article>
    </PageSection>
  );
}
