import { site } from "@/config/site";

/**
 * Deep link to the agent's Telegram chat. `text` pre-fills the message box
 * (t.me/<username>?text=…), so the customer only presses Send — the agent
 * immediately sees which tour, date and price the question is about.
 */
export function telegramLink(text?: string): string {
  const base = `https://t.me/${site.contact.telegramUsername}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function phoneLink(): string {
  return `tel:${site.contact.phone.replace(/\s+/g, "")}`;
}
