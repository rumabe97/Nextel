import Image from 'next/image';

import styles from './ServiceCard.module.css';

import { Icon } from 'components/Icon';

import { blurred } from 'lib/blurData';

import type { BlurredImage } from 'lib/blurData';

export interface ServiceCardProps {
  href: string;
  /** Photograph behind the card. Typed to the set that has a blur placeholder generated, so
   *  a new photo cannot ship without one. */
  image: BlurredImage;
  /** Two-digit index shown ghosted at the top of the panel ("01", "02"). */
  index: string;
  title: string;
}

// The home page's paired service teasers. Figma's card (group "01" #417:5678) is a
// 503.49 x 401.39 photograph with a petrol panel overlaying its top-right corner, and the
// panel stacks three things in this order:
//
//   1. the ghosted number, top-right          (#417:5690  x406.26 y18.37, Roboto Medium 50)
//   2. the title, centred beneath it          (#417:5689  x193.04 y80.08, Roboto Medium 18)
//   3. the arrow disc, beneath that           (#2045:171  x410.24 y157.15, 42.04 circle)
//
// The disc straddles the panel's bottom edge — the panel ends at y178.17 and the disc runs
// to y199.19, so exactly half of it hangs below onto the photograph.
export function ServiceCard({ href, image, index, title }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image alt="" className={styles.image} height={335} sizes="(max-width: 48rem) 100vw, 44vw" width={503} {...blurred(image)} />
      </div>

      <div className={styles.panel}>
        <span aria-hidden={true} className={styles.index}>
          {index}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <span aria-hidden={true} className={styles.arrow}>
          <Icon className={styles.arrowIcon} name="arrowRight" />
        </span>
      </div>

      {/* The whole card is the link target — a stretched anchor keeps one tab stop and one
          hit area while leaving the heading as real text in the a11y tree. */}
      <a className={styles.link} href={href}>
        <span className={styles.linkLabel}>Ver {title}</span>
      </a>
    </article>
  );
}
