import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DatabaseOperationError } from 'core/entities/Error';
import { makeContactSubmission } from '#test/fixtures';
import { ContactEmailRepository } from './ContactEmailRepository';

// Mock fetch — repo tests never hit the real Resend API.
const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

describe('ContactEmailRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_EMAIL_TO', 'inbox@nextel.com');
    vi.stubEnv('CONTACT_EMAIL_FROM', 'Nextel Advisors <web@nextel.com>');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('POSTs the rendered template to Resend with reply_to set to the visitor', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });
    const input = makeContactSubmission();

    await ContactEmailRepository.send(input);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] as [string, { body: string; headers: Record<string, string>; method: string }];
    expect(url).toBe('https://api.resend.com/emails');
    expect(options.method).toBe('POST');
    expect(options.headers.Authorization).toBe('Bearer re_test_key');

    const body: unknown = JSON.parse(options.body);
    expect(body).toMatchObject({
      from: 'Nextel Advisors <web@nextel.com>',
      reply_to: input.email,
      subject: `Nuevo mensaje de contacto — ${input.name}`,
      to: 'inbox@nextel.com'
    });
  });

  it('escapes HTML in user input before it reaches the template', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });

    await ContactEmailRepository.send(makeContactSubmission({ message: '<script>alert(1)</script> nos interesa el servicio' }));

    const [, options] = fetchMock.mock.calls[0] as [string, { body: string }];
    const body: unknown = JSON.parse(options.body);

    if (typeof body !== 'object' || body === null || !('html' in body) || typeof body.html !== 'string') {
      throw new Error('Expected an html field in the request body');
    }

    expect(body.html).not.toContain('<script>');
    expect(body.html).toContain('&lt;script&gt;');
  });

  it('omits the phone row when phone is absent', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });

    await ContactEmailRepository.send(makeContactSubmission({ phone: undefined }));

    const [, options] = fetchMock.mock.calls[0] as [string, { body: string }];
    expect(options.body).not.toContain('Teléfono');
  });

  it('throws DatabaseOperationError when the service is not configured', async () => {
    vi.stubEnv('RESEND_API_KEY', '');

    await expect(ContactEmailRepository.send(makeContactSubmission())).rejects.toThrow(DatabaseOperationError);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('throws DatabaseOperationError when Resend rejects the message', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 422 });

    await expect(ContactEmailRepository.send(makeContactSubmission())).rejects.toThrow(DatabaseOperationError);
  });

  it('throws DatabaseOperationError when the network call itself fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('ECONNREFUSED'));

    await expect(ContactEmailRepository.send(makeContactSubmission())).rejects.toThrow(DatabaseOperationError);
  });
});
