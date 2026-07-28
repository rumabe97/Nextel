import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

import { getContactEmail } from 'lib/contactEmail';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // See politica-de-privacidad: kept out of the index until the real text is supplied.
  robots: { follow: true, index: false },
  title: 'Términos y condiciones'
};

export default function TerminosYCondicionesPage() {
  const contactEmail = getContactEmail();

  return (
    <PageSection>
      <SectionHeading
        as="h1"
        eyebrow="Legal"
        lead={`Estamos preparando este contenido. Para cualquier consulta sobre las condiciones de nuestros servicios, escríbenos a ${contactEmail}.`}
      >
        Términos y condiciones
      </SectionHeading>
    </PageSection>
  );
}
