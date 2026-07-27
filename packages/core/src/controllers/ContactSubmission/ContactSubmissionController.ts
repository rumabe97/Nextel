import { z, ZodError } from 'zod';

import { InputParseError } from 'core/entities/Error';
import { createContactSubmissionSchema } from 'core/entities/ContactSubmission';
import { ContactEmailRepository } from '#repositories/ContactEmail';

export const ContactSubmissionController = {
  // Input arrives as `unknown` because it comes straight off a FormData in the server
  // action — never trust its shape. Validation happens here rather than in the action so
  // the rules live in one place and stay testable without a request context.
  //
  // Nothing is persisted: a valid submission is rendered into the branded template and
  // e-mailed to the Nextel inbox.
  async submit(input: unknown): Promise<void> {
    let parsed;

    try {
      parsed = createContactSubmissionSchema.parse(input);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // z.flattenError() gives { formErrors, fieldErrors } — fieldErrors is already the
        // Record<string, string[]> shape InputParseError carries, which the server action
        // threads into each field's error message.
        throw new InputParseError('Revisa los datos del formulario.', z.flattenError(error).fieldErrors);
      }

      throw error;
    }

    // The schema already trimmed every field; a whitespace-only phone trims to '' and is
    // collapsed to undefined so the template omits the row entirely.
    await ContactEmailRepository.send({ ...parsed, phone: parsed.phone || undefined });
  }
};
