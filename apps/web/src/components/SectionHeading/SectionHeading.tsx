import styles from './SectionHeading.module.css';

import { Eyebrow } from 'components/Eyebrow';

import type { ReactNode } from 'react';

export interface SectionHeadingProps {
  /** Centres the block, as the "Nuestros Servicios" and "Nuestro Equipo" sections do. */
  align?: 'center' | 'start';
  /** Heading level. Defaults to `h2` — only the page hero should be an `h1`. */
  as?: 'h1' | 'h2' | 'h3';
  children: ReactNode;
  className?: string;
  /** The letterspaced kicker above the title. */
  eyebrow?: string;
  /** Supporting paragraph below the title. */
  lead?: ReactNode;
  /** Drops the eyebrow's arrow onto its own row beneath the kicker, as Figma's home
   *  "Nuestros servicios" block does. Every other block keeps it inline. */
  stackedEyebrow?: boolean;
}

export function SectionHeading({ align = 'start', as: Heading = 'h2', children, className, eyebrow, lead, stackedEyebrow }: SectionHeadingProps) {
  return (
    <div className={[styles.root, styles[align], stackedEyebrow ? styles.stackedEyebrow : undefined, className].filter(Boolean).join(' ')}>
      {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
      <Heading className={styles.title}>{children}</Heading>
      {lead ? <div className={styles.lead}>{lead}</div> : null}
    </div>
  );
}
