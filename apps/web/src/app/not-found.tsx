import styles from './not-found.module.css';

import { Link } from 'ui/components/Link';

import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Página no encontrada' };

export default function NotFound() {
  return (
    <PageSection>
      <SectionHeading as="h1" eyebrow="Error 404" lead="La página que buscas no existe o ha cambiado de dirección.">
        No encontramos esta página
      </SectionHeading>

      <p className={styles.back}>
        <Link href="/" inline={true}>
          Volver al inicio
        </Link>
      </p>
    </PageSection>
  );
}
