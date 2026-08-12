import styles from 'views/Legal/NotFound.module.css';

import { DEFAULT_LOCALE, pathFor } from 'i18n/config';
import { getDictionary } from 'i18n/getDictionary';
import { Link } from 'ui/components/Link';

import { Glow } from 'components/Glow';
import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

// Rendered for any unmatched path inside a language. It cannot read `params` — Next renders
// not-found outside the route's own params — so it answers in the default language, which is
// also what an unresolvable URL most likely deserves.
export default function NotFound() {
  const dictionary = getDictionary(DEFAULT_LOCALE);

  return (
    <PageSection>
      <Glow className={styles.glow} opacity={0.22} size={440} />

      {/* Ornament, in the site's own language of oversized ghosted numerals. It says nothing
          a screen reader needs — the heading below already explains the page. */}
      <span aria-hidden={true} className={styles.mark}>
        404
      </span>

      <SectionHeading as="h1" className={styles.heading} eyebrow={dictionary.notFound.eyebrow} lead={dictionary.notFound.lead}>
        {dictionary.notFound.heading}
      </SectionHeading>

      <p className={styles.back}>
        <Link href={pathFor('home', DEFAULT_LOCALE)} inline={true}>
          {dictionary.notFound.back}
        </Link>
      </p>
    </PageSection>
  );
}
