// The public contact address, sourced from the same env var the contact form delivers to,
// so the address on the page and the inbox that receives submissions can never drift apart.
//
// SERVER ONLY. `CONTACT_EMAIL_TO` is deliberately not NEXT_PUBLIC_, so it exists only in the
// server runtime. Calling this from a Client Component would compile the lookup down to
// `undefined` and silently render the fallback — pass the value down as a prop instead, the
// way Header does for MobileNav.

/** Rendered only when CONTACT_EMAIL_TO is unset, so the markup never shows "undefined". */
const FALLBACK_CONTACT_EMAIL = 'info@nextel.com';

export function getContactEmail(): string {
  // Trimmed because this value is routinely pasted into a dashboard, where a trailing
  // newline is easy to introduce and invisible afterwards.
  const configured = process.env.CONTACT_EMAIL_TO?.trim();

  if (!configured) {
    return FALLBACK_CONTACT_EMAIL;
  }

  // The same var doubles as Resend's `to` field, which also accepts a display name
  // ("Nextel Advisors <hola@…>"). Only the bare address works in a mailto: or as visible
  // text, so unwrap it when one is present.
  return configured.match(/<([^>]+)>/)?.[1]?.trim() ?? configured;
}
