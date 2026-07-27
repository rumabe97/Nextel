import styles from './layout.module.css';

import { Navigation } from 'components/Navigation';

import type { ReactNode } from 'react';

export default function SectionedLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <div aria-hidden="true" />
      <Navigation />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
