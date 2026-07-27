import styles from './NumberedList.module.css';

export interface NumberedListProps {
  className?: string;
  items: string[];
}

// The 1–4 challenges grid from `03_Quienes Somos`: an oversized ghosted numeral beside
// each statement, laid out two-up. The numerals come from the ordered list itself via a
// CSS counter, so reordering the copy renumbers automatically.
export function NumberedList({ className, items }: NumberedListProps) {
  return (
    <ol className={[styles.list, className].filter(Boolean).join(' ')}>
      {items.map(item => (
        <li className={styles.item} key={item}>
          <p className={styles.label}>{item}</p>
        </li>
      ))}
    </ol>
  );
}
