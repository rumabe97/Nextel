'use server';
import { fill, getDictionary } from 'i18n/getDictionary';

import { InputParseError } from 'core/entities/Error';

import { ContactSubmissionController } from 'core/controllers/ContactSubmission';

import { getContactEmail } from 'lib/contactEmail';

import type { Dictionary } from 'i18n/dictionaries/es';
import type { Locale } from 'i18n/config';

export interface ContactFormState {
  errors?: { _form?: string; email?: string; message?: string; name?: string; phone?: string };
  /** Flips to `true` on a successful send so the client can reset and toast. */
  success?: boolean;
  /** Preserved so the form re-renders with the visitor's input instead of clearing it. */
  values?: { email?: string; message?: string; name?: string; phone?: string };
}

// The entity schema emits stable codes ('name.min'); the language lives here. An unknown
// code falls through as-is rather than rendering blank, so a schema change can never leave
// a field silently unexplained.
function translate(dictionary: Dictionary, code: string | undefined): string | undefined {
  if (code === undefined) {
    return undefined;
  }

  return dictionary.validation[code as keyof Dictionary['validation']] ?? code;
}

export async function submitContactAction(locale: Locale, _previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const dictionary = getDictionary(locale);
  const values = {
    email: String(formData.get('email') ?? ''),
    message: String(formData.get('message') ?? ''),
    name: String(formData.get('name') ?? ''),
    phone: String(formData.get('phone') ?? '')
  };

  try {
    await ContactSubmissionController.submit({
      email: values.email,
      message: values.message,
      name: values.name,
      // The controller's schema treats phone as optional; an empty field must be absent,
      // not an empty string, or the max-length rule would run against ''.
      phone: values.phone === '' ? undefined : values.phone
    });

    return { success: true };
  } catch (error: unknown) {
    // App boundaries are the only place that translate domain errors into UI state
    // (see apps/web/AGENTS.md). InputParseError carries per-field codes; anything else is
    // unexpected and gets a generic form-level message so we never leak provider text.
    if (error instanceof InputParseError) {
      return {
        errors: {
          email: translate(dictionary, error.fieldErrors.email?.[0]),
          message: translate(dictionary, error.fieldErrors.message?.[0]),
          name: translate(dictionary, error.fieldErrors.name?.[0]),
          phone: translate(dictionary, error.fieldErrors.phone?.[0])
        },
        values
      };
    }

    console.error('[contacto] submission failed', error);

    // The address goes in the message so a provider outage or a misconfigured sender never
    // leaves a prospect with nowhere to go — they can just email us directly instead.
    return { errors: { _form: fill(dictionary.contact.form.genericError, { email: getContactEmail() }) }, values };
  }
}
