import { hasAccents } from "@/components/home/typo";

/**
 * Leading for multi-line Unbounded Black caps headings (tour, hotel and offer H1s), from measured
 * glyph extents in em: caps 0.75, stacked accents (Č Ř Š Á, Ї Й) up to 1.01, descenders of Д Ц Щ
 * and the comma 0.15.
 * - No accents: tight 0.95 (a descender over plain caps still clears them).
 * - Accents: 1.1, so a caron sits ~0.1em below the line above and never reads as part of it ("LĄST").
 * - Accents plus Д/Ц/Щ or a comma: 1.2, room for an accent right under a descender ("ТУРИ ДО / ІСПАНІЇ").
 */
export function displayLeading(text: string): string {
  if (!hasAccents(text)) return "leading-[0.95]";
  return /[ДЦЩдцщ,]/.test(text) ? "leading-[1.2]" : "leading-[1.1]";
}
