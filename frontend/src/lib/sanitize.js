// Helpers for text that comes from outside the site (e.g. the `?subject=` link
// parameter or form fields). No imports, so they can be tested with plain Node.

const CONTROL_CHARS = /[\u0000-\u001f\u007f]/g

export const LIMITS = { name: 100, email: 254, subject: 120, message: 2000 }

// One short line: strips line breaks and control characters so a crafted link
// can't pre-fill the form with hidden or multi-line text.
export function cleanLine(value, max) {
  return String(value ?? '')
    .replace(CONTROL_CHARS, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

// Every part is URL-encoded, so text like "&bcc=someone@evil.example" stays
// inside the subject/body and can't add recipients or headers to the email.
export function buildMailto(address, subject, body) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
