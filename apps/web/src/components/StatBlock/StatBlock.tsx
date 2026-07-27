import styles from './StatBlock.module.css';

export interface Stat {
  /** Letterspaced uppercase caption below the value. */
  caption: string;
  /** Display figure — "EQUIPO", "5+". */
  value: string;
}

export interface StatBlockProps {
  className?: string;
  stats: Stat[];
}

// The "EQUIPO de expertos en el sector · 5+ años de experiencia" pairing.
export function StatBlock({ className, stats }: StatBlockProps) {
  return (
    <dl className={[styles.list, className].filter(Boolean).join(' ')}>
      {stats.map(stat => (
        <div className={styles.item} key={stat.caption}>
          <dt className={styles.value}>{stat.value}</dt>
          <dd className={styles.caption}>{stat.caption}</dd>
        </div>
      ))}
    </dl>
  );
}
