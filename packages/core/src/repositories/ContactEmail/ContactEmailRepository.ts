import { DatabaseOperationError } from 'core/entities/Error';
import { renderContactEmail } from './template';
import type { CreateContactSubmission } from 'core/entities/ContactSubmission';

// ContactEmailRepository — the only I/O in the contact flow. Sends the branded template
// through the Resend REST API (plain fetch, no SDK dependency).
//
// Env contract (server-only, never NEXT_PUBLIC_):
//   RESEND_API_KEY     — Resend secret key
//   CONTACT_EMAIL_TO   — inbox that receives the submissions
//   CONTACT_EMAIL_FROM — verified sender, e.g. "Nextel Advisors <web@nextel.com>"
//
// Failures throw DatabaseOperationError (the domain's "external service failed" error) with
// generic messages — the raw provider response is logged server-side by the caller, never
// surfaced to the browser.
export const ContactEmailRepository = {
  async send(input: CreateContactSubmission): Promise<void> {
    // Trimmed on the way in. These values get pasted into a hosting dashboard, and a
    // trailing newline survives that trip invisibly — on the key it corrupts the
    // Authorization header into a 401 that reproduces nowhere but the deployed site.
    const apiKey = process.env.RESEND_API_KEY?.trim();
    const to = process.env.CONTACT_EMAIL_TO?.trim();
    const from = process.env.CONTACT_EMAIL_FROM?.trim();

    if (!apiKey || !to || !from) {
      // Naming the absent variables turns "but it works locally" into a one-line answer in
      // the host's runtime logs. Only names are ever recorded — never a value.
      const missing = [
        ['RESEND_API_KEY', apiKey],
        ['CONTACT_EMAIL_TO', to],
        ['CONTACT_EMAIL_FROM', from]
      ]
        .filter(([, value]) => !value)
        .map(([name]) => name)
        .join(', ');

      throw new DatabaseOperationError(`Email service is not configured — missing: ${missing}`);
    }

    const { html, subject, text } = renderContactEmail(input);

    let response: Response;

    try {
      response = await fetch('https://api.resend.com/emails', {
        body: JSON.stringify({
          from,
          html,
          // Replying in the inbox goes straight back to the visitor.
          reply_to: input.email,
          subject,
          text,
          to
        }),
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        method: 'POST'
      });
    } catch {
      throw new DatabaseOperationError('Email service is unreachable');
    }

    if (!response.ok) {
      // Resend explains every rejection in the body — an unverified sending domain, a
      // revoked key, a testing sender that may only deliver to the account owner. Without
      // it a deployment failure is just a bare status code with nothing to act on. The
      // caller logs this server-side; the browser only ever sees a generic message.
      const detail = await response.text().catch(() => '');

      throw new DatabaseOperationError(`Email service rejected the message (HTTP ${response.status}) ${detail}`.trim());
    }
  }
};
