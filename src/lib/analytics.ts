/**
 * Thin analytics wrapper. Pushes to GTM dataLayer when present; no-op otherwise.
 * Every contact click is tracked with its source so we can see which
 * placement (strip, bubble, tour card…) brings the most Telegram chats.
 */
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as DataLayerWindow).dataLayer?.push({ event, ...params });
}

export function trackContact(channel: "telegram" | "phone" | "email" | "form", source: string) {
  track("contact_click", { channel, source });
}
