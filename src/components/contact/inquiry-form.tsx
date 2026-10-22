"use client";

import type { Locale } from "@/i18n/config";

/**
 * Inquiry form used across the site. Submits to POST /api/inquiry, which
 * forwards the inquiry to Aljona's Telegram via bot instantly.
 *
 * STUB — final implementation is owned by the "contact & backend" agent.
 * The props below are the stable contract other pages rely on.
 */
export type InquiryKind = "pick-tour" | "offer" | "service" | "contact" | "callback";

export type InquiryFormProps = {
  locale: Locale;
  kind: InquiryKind;
  /** Offer id when asking about a concrete departure. */
  offerId?: string;
  /** Human-readable context (hotel + dates, service name…) included in the Telegram message. */
  context?: string;
  /** Which fields to show beyond name + phone. */
  fields?: Array<"email" | "destination" | "dates" | "nights" | "travellers" | "message">;
  /** Where on the site the form is placed — for analytics. */
  source: string;
  variant?: "light" | "dark" | "ice";
  title?: string;
  submitLabel?: string;
};

export function InquiryForm(props: InquiryFormProps) {
  return <div data-inquiry-stub={props.kind} />;
}
