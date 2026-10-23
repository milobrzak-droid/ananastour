import type { CSSProperties } from "react";

/** Any Latin (incl. Czech) or Cyrillic letter, as a regex character-class body. */
const LETTER = "A-Za-z\\u00C0-\\u024F\\u0400-\\u04FF";
const NBSP = "\u00A0";
const ONE_LETTER = new RegExp(`(^|[\\s(«„“"])([${LETTER}]) `, "g");
const NUMBER_WORD = new RegExp(`(\\d) (?=[${LETTER}])`, "g");

/**
 * Typographic glue for visible copy (COPY-GUIDE §3.5): a non-breaking space after
 * one-letter words (uk з, в, у, і, й, а, о, я · cs z, v, k, s, o, u, a, i), between a
 * number and the word after it ("15 хвилин", "21 h") and before a spaced dash, so a line
 * never ends on a lone letter or a bare number and never starts with a dash.
 * Only for rendered text — never for Telegram prefills or URLs.
 */
export function glue(text: string): string {
  return text
    .replace(ONE_LETTER, `$1$2${NBSP}`)
    .replace(ONE_LETTER, `$1$2${NBSP}`) // second pass catches runs like "a v Praze"
    .replace(NUMBER_WORD, `$1${NBSP}`)
    .replace(/ ([—–]) /g, `${NBSP}$1 `);
}

const WORD_JOINER = "⁠"; // invisible, default-ignorable: forbids a line break at its position
const CYR = "\\u0400-\\u04FF";
const UK_PARTICLE = new RegExp(
  `(^|[^${CYR}])(будь|казна|хтозна)-(?=[${CYR}])|([${CYR}])-(?=(?:от|бо|но|то|таки|небудь)(?![${CYR}]))`,
  "giu",
);

/**
 * Ukrainian particles written with a hyphen stay with their word (будь-якою, як-от, все-таки): the browser would
 * otherwise break after the hyphen ("будь- / якою"). Opt-in, for body copy; Latin text is left untouched.
 */
export function keepParticles(text: string): string {
  return text.replace(UK_PARTICLE, (_m, before: string | undefined, prefix: string | undefined, letter: string | undefined) =>
    prefix ? `${before}${prefix}-${WORD_JOINER}` : `${letter}-${WORD_JOINER}`,
  );
}

/**
 * True when the text has stacked accents (Č Ř Š Á, Ї Й…). In Unbounded caps those rise ~0.99em
 * above the baseline, so multi-line display type needs a leading of ~1.06 to keep them
 * off the line above; accent-free lines can stay tighter.
 */
export function hasAccents(text: string): boolean {
  return /[\u0300-\u036f]/.test(text.normalize("NFD"));
}

/** Cyrillic caps that hang below the baseline in Unbounded: at 0.95 a wrapped "ДРІБНОГО" sat ~1px above "ШРИФТУ". */
const DESCENDERS = /[ДЦЩдцщ]/;

/**
 * Leading for a section H2 (Unbounded Black caps): tight 0.95, or 1.06 when a wrapped line could carry accents
 * (rising into the line above) or descenders (hanging into the line below).
 */
export function leadingFor(title: string): string {
  return hasAccents(title) || DESCENDERS.test(title) ? "leading-[1.06]" : "leading-[0.95]";
}

// Advance widths of Unbounded ExtraBold/Black caps, in em (measured): most letters 0.8–0.98,
// I/І/Ї and punctuation ≈ 0.35, Д Ц Л ≈ 1.05, M W Ж Ф Ш Щ Ю 1.25–1.46. Rounded up to stay on the safe side.
const NARROW = /[IÍІЇ1.,:;!’'\u00A0-]/;
const SEMI_WIDE = /[ДЦЛ]/;
const WIDE = /[MWМЖФШЩЮ]/;

function capsEm(word: string): number {
  let em = 0;
  for (const ch of word.toUpperCase()) em += NARROW.test(ch) ? 0.4 : WIDE.test(ch) ? 1.4 : SEMI_WIDE.test(ch) ? 1.08 : 0.96;
  return em;
}

/**
 * `--fit`: the font size, in cqi of the nearest `@container`, at which the longest word of `text` still fits
 * on one line in Unbounded caps. Use as `text-[clamp(<min>,var(--fit),<max>)]` so long words (hotel names,
 * ЗАХИСТОМ) shrink with their box instead of splitting mid-word, and short ones keep the full size.
 */
export function fitLongestWord(text: string): CSSProperties {
  // Measured on the glued text: "Я АЛЬОНА" / "V SUCHU" can no longer break, so they count as one word.
  const em = Math.max(1, ...glue(text).split(/[ \t\n]+/).map(capsEm));
  return { "--fit": `${(97 / em).toFixed(2)}cqi` } as CSSProperties;
}
