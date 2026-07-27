'use server';
import { InputParseError } from 'core/entities/Error';

import { ContactSubmissionController } from 'core/controllers/ContactSubmission';

export interface ContactFormState {
  errors?: { _form?: string; email?: string; message?: string; name?: string; phone?: string };
  /** Flips to `true` on a successful write so the client can reset and toast. */
  success?: boolean;
  /** Preserved so the form re-renders with the visitor's input instead of clearing it. */
  values?: { email?: string; message?: string; name?: string; phone?: string };
}

export async function submitContactAction(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
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
    // (see apps/web/AGENTS.md). InputParseError carries per-field messages; anything
    // else is unexpected and gets a generic form-level message so we never leak
    // connection strings or driver text to the browser.
    if (error instanceof InputParseError) {
      return {
        errors: {
          email: error.fieldErrors.email?.[0],
          message: error.fieldErrors.message?.[0],
          name: error.fieldErrors.name?.[0],
          phone: error.fieldErrors.phone?.[0]
        },
        values
      };
    }

    console.error('[contacto] submission failed', error);

    return { errors: { _form: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.' }, values };
  }
}
