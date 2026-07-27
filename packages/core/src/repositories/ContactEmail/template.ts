import type { CreateContactSubmission } from 'core/entities/ContactSubmission';

// HTML entity-escape user input before interpolation — an email client rendering
// "<script>" or a premature "</td>" from the message field must see text, not markup.
function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Email-safe rendition of the site's visual language: #131313 canvas, #161616 card,
// Primary #2793C1 accents, petrol #12455B, the letterspaced NEXTEL ADVISORS wordmark and
// the tagline footer. Tables + inline styles only — email clients ignore stylesheets, and
// webfonts are unreliable, so Roboto degrades to Arial.
const FONT = "'Roboto', Arial, Helvetica, sans-serif";

function row(label: string, value: string, link?: string): string {
  const content = link
    ? `<a href="${link}" style="color: #2793c1; text-decoration: none;">${value}</a>`
    : `<span style="color: #ffffff;">${value}</span>`;

  return `
    <tr>
      <td style="padding: 14px 24px; border-bottom: 1px solid #2c2c2c; font-family: ${FONT}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b0b0b0; vertical-align: top; width: 130px;">${label}</td>
      <td style="padding: 14px 24px; border-bottom: 1px solid #2c2c2c; font-family: ${FONT}; font-size: 15px; line-height: 1.6;">${content}</td>
    </tr>`;
}

export interface ContactEmailContent {
  html: string;
  subject: string;
  text: string;
}

export function renderContactEmail(input: CreateContactSubmission): ContactEmailContent {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const phone = input.phone ? escapeHtml(input.phone) : null;
  // Preserve the visitor's line breaks inside the message cell.
  const message = escapeHtml(input.message).replace(/\r?\n/g, '<br />');

  const html = `<!DOCTYPE html>
<html lang="es">
  <body style="margin: 0; padding: 0; background-color: #131313;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #131313; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
            <!-- Wordmark -->
            <tr>
              <td style="padding: 8px 0 24px; text-align: center;">
                <span style="font-family: ${FONT}; font-size: 22px; font-weight: bold; letter-spacing: 1px; color: #ffffff;">NEXTEL</span>
                <span style="font-family: ${FONT}; font-size: 13px; letter-spacing: 5px; color: #2793c1;">&nbsp;ADVISORS</span>
              </td>
            </tr>
            <!-- Card -->
            <tr>
              <td style="background-color: #161616; border: 1px solid #2c2c2c; border-radius: 8px; overflow: hidden;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="height: 4px; background: linear-gradient(90deg, #2793c1 0%, #12455b 100%); background-color: #2793c1; font-size: 0; line-height: 0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 28px 24px 8px;">
                      <p style="margin: 0 0 4px; font-family: ${FONT}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #2793c1;">Formulario de contacto</p>
                      <h1 style="margin: 0; font-family: ${FONT}; font-size: 24px; font-weight: bold; color: #ffffff;">Nuevo mensaje de ${name}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 0 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${row('Nombre', name)}
                        ${row('Email', email, `mailto:${email}`)}
                        ${phone ? row('Teléfono', phone, `tel:${phone.replace(/[^+\d]/g, '')}`) : ''}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 24px 28px;">
                      <p style="margin: 0 0 8px; font-family: ${FONT}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #b0b0b0;">Mensaje</p>
                      <p style="margin: 0; font-family: ${FONT}; font-size: 15px; line-height: 1.7; color: #ffffff;">${message}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding: 24px 0 8px; text-align: center;">
                <p style="margin: 0; font-family: ${FONT}; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #2793c1;">Conectamos hoy, impulsamos el mañana</p>
                <p style="margin: 8px 0 0; font-family: ${FONT}; font-size: 11px; color: #6f6f6f;">Enviado desde el formulario de contacto de nextel.com — puedes responder directamente a este correo.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  // Plain-text alternative for clients (and spam filters) that skip HTML.
  const text = [
    'NEXTEL ADVISORS — Formulario de contacto',
    '',
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Teléfono: ${input.phone}` : null,
    '',
    'Mensaje:',
    input.message,
    '',
    'Conectamos hoy, impulsamos el mañana'
  ]
    .filter(line => line !== null)
    .join('\n');

  return { html, subject: `Nuevo mensaje de contacto — ${input.name}`, text };
}
