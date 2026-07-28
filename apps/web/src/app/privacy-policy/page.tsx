import { PageSection } from 'components/PageSection';
import { SectionHeading } from 'components/SectionHeading';

import { getContactEmail } from 'lib/contactEmail';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Not indexable until the real policy text lands — a placeholder legal page in search
  // results is worse than no page.
  robots: { follow: true, index: false },
  title: 'Política de privacidad'
};

export default function PoliticaDePrivacidadPage() {
  const contactEmail = getContactEmail();

  return (
    <PageSection>
      <SectionHeading
        as="h1"
        eyebrow="Legal"
        lead={`Estamos preparando este contenido. Si necesitas información sobre el tratamiento de tus datos, escríbenos a ${contactEmail}.`}
      >
        Política de privacidad
      </SectionHeading>
    </PageSection>
  );
}
