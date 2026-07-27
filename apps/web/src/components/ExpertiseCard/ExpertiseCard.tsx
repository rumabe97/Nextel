import Image from 'next/image';

import styles from './ExpertiseCard.module.css';

import { Link } from 'ui/components/Link';

import { CheckList } from 'components/CheckList';
import { Icon } from 'components/Icon';

import type { CheckListItem } from 'components/CheckList';

export interface ExpertiseCardProps {
  /** Anchor id so the header dropdown can deep-link to this card. */
  id: string;
  /** Photograph washed into the card's right side. */
  image: string;
  items: CheckListItem[];
  /** Bold second half of the title, e.g. "NUEVA PLANTA" in "Contratación de NUEVA PLANTA". */
  titleAccent: string;
  /** Light first half of the title. */
  titleLead: string;
}

// The service detail card from `04_Nuestros Servicios`: a brand-blue tab breaking out of
// the top edge of a petrol-washed panel that holds the checklist.
export function ExpertiseCard({ id, image, items, titleAccent, titleLead }: ExpertiseCardProps) {
  return (
    <article className={styles.card} id={id}>
      <h3 className={styles.tab}>
        <span className={styles.tabLead}>{titleLead}</span> <span className={styles.tabAccent}>{titleAccent}</span>
      </h3>

      <div className={styles.panel}>
        <Image alt="" className={styles.image} height={697} sizes="(max-width: 64rem) 100vw, 1286px" src={image} width={1286} />

        <div className={styles.content}>
          <CheckList items={items} tone="light" />

          <Link className={styles.cta} href="/contact">
            Contactar
            <Icon className={styles.ctaIcon} name="arrowUpRight" />
          </Link>
        </div>
      </div>
    </article>
  );
}
