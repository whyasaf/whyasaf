export const CONTACT_EMAIL = "whyasaf.wa@gmail.com";

const templates = {
  tr: {
    subject: "Merhaba Asaf!",
    body: "Merhaba Asaf,\n\nSitenden yazıyorum. Seninle şu konuda konuşmak istiyorum:\n\n",
  },
  en: {
    subject: "Hello Asaf!",
    body: "Hi Asaf,\n\nI'm writing from your website. I'd like to talk to you about:\n\n",
  },
} as const;

export function mailtoHref(language: "tr" | "en", note?: string): string {
  const { subject, body } = templates[language];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(note ?? body)}`;
}
