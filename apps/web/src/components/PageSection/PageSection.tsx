import styles from './PageSection.module.css';

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export interface PageSectionProps extends Omit<ComponentPropsWithoutRef<'section'>, 'children'> {
  /** Underlying tag. Defaults to `<section>`. */
  as?: ElementType;
  children: ReactNode;
  /** Draws the thin full-bleed rule above the section that separates blocks in the design. */
  divided?: boolean;
  /** Removes the vertical rhythm padding — for full-bleed media blocks that supply their own. */
  flush?: boolean;
}

// Every content block in the design sits on a 1296px column centred in the viewport with
// generous vertical rhythm. Centralising that here keeps the page files about content.
export function PageSection({ as: Component = 'section', children, className, divided, flush, ...rest }: PageSectionProps) {
  return (
    <Component
      className={[styles.section, divided ? styles.divided : undefined, flush ? styles.flush : undefined, className].filter(Boolean).join(' ')}
      {...rest}
    >
      <div className={styles.inner}>{children}</div>
    </Component>
  );
}
