import styles from './CheckList.module.css';

import { Icon } from 'components/Icon';

import type { ReactNode } from 'react';

export interface CheckListItem {
  /** Stable React key. Required because `label` is a ReactNode and cannot key the row. */
  id: string;
  /** Nested plain-text bullets, as the Site Management card uses. */
  details?: string[];
  /** Rendered as-is, so callers can emphasise fragments with <strong>. */
  label: ReactNode;
}

export interface CheckListProps {
  className?: string;
  items: CheckListItem[];
  /** `brand` tints the check glyph blue (default); `light` keeps it white over photography. */
  tone?: 'brand' | 'light';
}

export function CheckList({ className, items, tone = 'brand' }: CheckListProps) {
  return (
    <ul className={[styles.list, styles[tone], className].filter(Boolean).join(' ')}>
      {items.map(item => (
        <li className={styles.item} key={item.id}>
          <Icon className={styles.icon} name="checkCircle" />
          <div className={styles.body}>
            <p className={styles.label}>{item.label}</p>
            {item.details ? (
              <ul className={styles.details}>
                {item.details.map(detail => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
