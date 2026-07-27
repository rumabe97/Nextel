import type { CreateContactSubmission } from 'core/entities/ContactSubmission';

// Test fixtures (object-mother / test-data-builder pattern).
//
// Each `makeX` returns a complete, valid entity with sensible defaults. Pass
// `overrides` to set only the fields that matter to your test — the rest stay
// stable. When adding a new entity to packages/core/src/entities/, add a matching
// factory here.

export function makeContactSubmission(overrides?: Partial<CreateContactSubmission>): CreateContactSubmission {
  return {
    email: 'ada@example.com',
    message: 'Nos interesa vuestro servicio de site management para nuestra cartera.',
    name: 'Ada Lovelace',
    phone: '+34 600 123 456',
    ...overrides
  };
}
