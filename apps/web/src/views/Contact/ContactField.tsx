import styles from './ContactForm.module.css';

import { Icon } from 'components/Icon';

import type { IconName } from 'components/Icon';

export interface ContactFieldProps {
  autoComplete?: string;
  className?: string;
  defaultValue?: string;
  error?: string;
  icon: IconName;
  label: string;
  /** Native length bounds — the browser's first line of defence before the server re-checks. */
  maxLength?: number;
  minLength?: number;
  /** Also seeds the element id (`contact-${name}`) that links the label and error text. */
  name: string;
  required?: boolean;
  type?: string;
}

// The design's inputs are underline-only with a leading glyph inside the label — a shape
// `ui/components/Input` (bordered box, label stacked above) has no variant for. Per the
// convention in AGENTS.md, a fundamentally different look becomes an app component rather
// than a specificity fight against the DS module.
//
// It shares ContactForm.module.css rather than owning a stylesheet: the two are one visual
// unit, and the textarea in ContactForm reuses the same `.input` rules.
export function ContactField({
  autoComplete,
  className,
  defaultValue,
  error,
  icon,
  label,
  maxLength,
  minLength,
  name,
  required,
  type = 'text'
}: ContactFieldProps) {
  const id = `contact-${name}`;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label} htmlFor={id}>
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
        {label}
        {required ? (
          <span aria-hidden={true} className={styles.required}>
            *
          </span>
        ) : null}
      </label>
      <input
        aria-describedby={errorId}
        aria-invalid={error ? true : undefined}
        autoComplete={autoComplete}
        className={styles.input}
        defaultValue={defaultValue}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        name={name}
        required={required}
        type={type}
      />
      {error ? (
        <p aria-live="polite" className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
