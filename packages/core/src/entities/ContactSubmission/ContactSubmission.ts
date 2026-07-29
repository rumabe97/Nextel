import { z } from 'zod';

// Messages are stable CODES, not sentences. The site is bilingual, and this package has no
// business holding Spanish copy: the app maps each code to the visitor's language through
// its dictionary (see apps/web/src/views/Contact/_actions/submitContact.ts). Adding a
// language therefore never touches core.
//
// `.trim()` comes FIRST on every string, before the length and format checks. Order matters:
// with the trim applied afterwards, a pasted "  ada@example.com  " would fail `.email()` and
// the visitor would be told their valid address is invalid.
export const createContactSubmissionSchema = z.object({
  email: z.string().trim().min(1, 'email.invalid').email('email.invalid'),
  message: z.string().trim().min(10, 'message.min').max(2000, 'message.max'),
  name: z.string().trim().min(2, 'name.min').max(120, 'name.max'),
  // Optional in the form. Permissive on purpose: international formats vary too much to
  // regex safely, and rejecting a valid number costs more than passing a malformed one on.
  phone: z.string().trim().max(40, 'phone.max').optional()
});

export type CreateContactSubmission = z.infer<typeof createContactSubmissionSchema>;
