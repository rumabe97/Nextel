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
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL_TO;
    const from = process.env.CONTACT_EMAIL_FROM;

    if (!apiKey || !to || !from) {
      throw new DatabaseOperationError('Email service is not configured (RESEND_API_KEY / CONTACT_EMAIL_TO / CONTACT_EMAIL_FROM)');
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
      throw new DatabaseOperationError(`Email service rejected the message (HTTP ${response.status})`);
    }
  }
};
