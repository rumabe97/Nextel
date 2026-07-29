import styles from 'views/Legal/NotFound.module.css';

import { DEFAULT_LOCALE, pathFor } from 'i18n/config';
import { getDictionary } from 'i18n/getDictionary';
import { Link } from 'ui/components/Link';

import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

// Rendered for any unmatched path inside a language. It cannot read `params` — Next renders
// not-found outside the route's own params — so it answers in the default language, which is
// also what an unresolvable URL most likely deserves.
export default function NotFound() {
  const dictionary = getDictionary(DEFAULT_LOCALE);

  return (
    <PageSection>
      <SectionHeading as="h1" eyebrow={dictionary.notFound.eyebrow} lead={dictionary.notFound.lead}>
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
