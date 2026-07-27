'use client';
import { useActionState } from 'react';
import { useEffect, useRef } from 'react';

import styles from './ContactForm.module.css';

import { toast } from 'ui/components/Toaster';

import { Icon } from 'components/Icon';

import { ContactField } from './ContactField';
import { submitContactAction } from './_actions/submitContact';

import type { ContactFormState } from './_actions/submitContact';

const INITIAL_STATE: ContactFormState = {};

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactAction, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success('Mensaje enviado. Te responderemos lo antes posible.');
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    // No `noValidate`: required / type=email / minLength are the browser's instant first
    // pass, in the user's language; the Zod schema server-side remains the source of truth.
    <form action={action} className={styles.form} ref={formRef}>
      <div className={styles.grid}>
        <ContactField
          defaultValue={state.values?.name}
          error={state.errors?.name}
          icon="user"
          label="Nombre"
          maxLength={120}
          minLength={2}
          name="name"
          required={true}
        />
        <ContactField
          autoComplete="email"
          defaultValue={state.values?.email}
          error={state.errors?.email}
          icon="mail"
          label="Correo electrónico"
          name="email"
          required={true}
          type="email"
        />
        <ContactField
          autoComplete="tel"
          className={styles.wide}
          defaultValue={state.values?.phone}
          error={state.errors?.phone}
          icon="phone"
          label="Teléfono"
          maxLength={40}
          name="phone"
          type="tel"
        />

        <div className={`${styles.field} ${styles.wide}`}>
          <label className={styles.label} htmlFor="contact-message">
            <span className={styles.icon}>
              <Icon name="pencil" />
            </span>
            Mensaje
            <span aria-hidden={true} className={styles.required}>
              *
            </span>
          </label>
          <textarea
            aria-describedby={state.errors?.message ? 'contact-message-error' : undefined}
            aria-invalid={state.errors?.message ? true : undefined}
            className={styles.textarea}
            defaultValue={state.values?.message}
            id="contact-message"
            maxLength={2000}
            minLength={10}
            name="message"
            required={true}
            rows={4}
          />
          {state.errors?.message ? (
            <p aria-live="polite" className={styles.error} id="contact-message-error">
              {state.errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Form-level failures (a dead database, an unexpected throw) are separate from
          per-field validation and get their own alert region. */}
      {state.errors?._form ? (
        <p className={styles.formError} role="alert">
          {state.errors._form}
        </p>
      ) : null}

      {/* Only the submit is disabled while pending — never the inputs, so a visitor can
          keep fixing a typo while the request is in flight. */}
      <button className={styles.submit} disabled={isPending} type="submit">
        {isPending ? 'Enviando…' : 'Enviar mensaje'}
        <Icon className={styles.submitIcon} name="arrowRight" />
      </button>
    </form>
  );
}
