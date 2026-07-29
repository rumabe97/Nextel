import Image from 'next/image';

import styles from './ServiceCard.module.css';

import { Icon } from 'components/Icon';

export interface ServiceCardProps {
  href: string;
  /** Photograph behind the card. */
  image: string;
  /** Two-digit index shown ghosted in the tab ("01", "02"). */
  index: string;
  title: string;
}

// The home page's paired service teasers: a petrol tab carrying the title and a ghosted
// index, overlapping a photograph, with an arrow affordance bottom-right.
export function ServiceCard({ href, image, index, title }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.tab}>
        <h3 className={styles.title}>{title}</h3>
        <span aria-hidden={true} className={styles.index}>
          {index}
        </span>
      </div>

      <div className={styles.media}>
        <Image alt="" className={styles.image} height={335} sizes="(max-width: 48rem) 100vw, 44vw" src={image} width={503} />
      </div>

      {/* The whole card is the link target — a stretched anchor keeps one tab stop and one
          hit area while leaving the heading as real text in the a11y tree. */}
      <a className={styles.link} href={href}>
        <span className={styles.linkLabel}>Ver {title}</span>
        {/* Figma's card arrow (component #2045:171) is a 42.04px circle holding a 13.01 x
            9.01 glyph — a wide, short shape, i.e. a horizontal arrow. This rendered a
            diagonal arrowUpRight, whose bounding box is square, which is why it read as the
            wrong icon. */}
        <span aria-hidden={true} className={styles.arrow}>
          <Icon name="arrowRight" />
        </span>
      </a>
    </article>
  );
}
