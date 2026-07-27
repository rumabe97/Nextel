import { beforeEach, describe, expect, it, vi } from 'vitest';

import { InputParseError } from 'core/entities/Error';
import { ContactEmailRepository } from '#repositories/ContactEmail';
import { makeContactSubmission } from '#test/fixtures';
import { ContactSubmissionController } from './ContactSubmissionController';

// Mock the repository so controller tests stay pure-logic — no network, no I/O.
vi.mock('#repositories/ContactEmail', () => ({ ContactEmailRepository: { send: vi.fn() } }));

const repo = vi.mocked(ContactEmailRepository);

const validInput = makeContactSubmission();

describe('ContactSubmissionController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('submit', () => {
    it('sends the email with the validated payload', async () => {
      repo.send.mockResolvedValueOnce(undefined);

      await ContactSubmissionController.submit(validInput);

      expect(repo.send).toHaveBeenCalledWith(validInput);
    });

    it('trims whitespace before sending', async () => {
      repo.send.mockResolvedValueOnce(undefined);

      await ContactSubmissionController.submit({
        email: '  ada@example.com  ',
        message: `  ${validInput.message}  `,
        name: '  Ada Lovelace  ',
        phone: '  +34 600 123 456  '
      });

      expect(repo.send).toHaveBeenCalledWith(validInput);
    });

    it('collapses a blank phone to undefined so the template omits the row', async () => {
      repo.send.mockResolvedValueOnce(undefined);

      await ContactSubmissionController.submit({ ...validInput, phone: '   ' });

      expect(repo.send).toHaveBeenCalledWith({ ...validInput, phone: undefined });
    });

    it('throws InputParseError with per-field messages for an invalid email', async () => {
      const promise = ContactSubmissionController.submit({ ...validInput, email: 'not-an-email' });

      await expect(promise).rejects.toThrow(InputParseError);
      await expect(promise).rejects.toMatchObject({ fieldErrors: { email: ['Introduce un correo electrónico válido.'] } });
      expect(repo.send).not.toHaveBeenCalled();
    });

    it('throws InputParseError when the message is too short', async () => {
      await expect(ContactSubmissionController.submit({ ...validInput, message: 'Hola' })).rejects.toMatchObject({
        fieldErrors: { message: ['Cuéntanos algo más — al menos 10 caracteres.'] }
      });
    });

    it('collects errors for every invalid field at once', async () => {
      const thrown: unknown = await ContactSubmissionController.submit({ email: '', message: '', name: '' }).catch((error: unknown) => error);

      // `expect(...).toBeInstanceOf()` asserts but does not narrow, so guard explicitly
      // rather than casting — reading `.fieldErrors` needs the real type.
      if (!(thrown instanceof InputParseError)) {
        throw new Error(`Expected an InputParseError, received ${String(thrown)}`);
      }

      expect(Object.keys(thrown.fieldErrors).sort()).toEqual(['email', 'message', 'name']);
    });

    it('rejects a completely malformed payload rather than throwing a TypeError', async () => {
      await expect(ContactSubmissionController.submit(null)).rejects.toThrow(InputParseError);
    });
  });
});
