import { z } from 'zod';

// Field-level messages are in Spanish because they surface directly in the contact form UI.
// See apps/web/src/app/contact/_actions/submitContact.ts for the mapping into form state.
//
// `.trim()` comes FIRST on every string, before the length and format checks. Order matters:
// with the trim applied afterwards, a pasted "  ada@example.com  " would fail `.email()` and
// the visitor would be told their valid address is invalid.
export const createContactSubmissionSchema = z.object({
  email: z.string().trim().min(1, 'Introduce tu correo electrónico.').email('Introduce un correo electrónico válido.'),
  message: z.string().trim().min(10, 'Cuéntanos algo más — al menos 10 caracteres.').max(2000, 'El mensaje no puede superar los 2000 caracteres.'),
  name: z.string().trim().min(2, 'Introduce tu nombre.').max(120, 'El nombre no puede superar los 120 caracteres.'),
  // Optional in the form. Permissive on purpose: international formats vary too much to
  // regex safely, and rejecting a valid number costs more than passing a malformed one on.
  phone: z.string().trim().max(40, 'El teléfono no puede superar los 40 caracteres.').optional()
});

export type CreateContactSubmission = z.infer<typeof createContactSubmissionSchema>;
