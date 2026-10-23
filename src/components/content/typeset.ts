import { glue } from "@/components/home/typo";

const WORD_JOINER = "⁠"; // invisible: forbids a line break at its position
const NBSP = " ";
/** An en dash between two non-space characters: a range like "10–12", "листопад–квітень", "3–6". */
const RANGE_DASH = /(?<=[^\s⁠])–(?=[^\s⁠])/g;
/** A one-letter word (uk з, в, у, і, й, а, о, я · cs z, v, k, s, o, u, a, i) followed by a plain space. */
const ONE_LETTER = /(^|[\s(«„“"])([A-Za-zÀ-ɏЀ-ӿ]) /g;

/**
 * Ranges never split after the dash ("листопад– / квітень", "3– / 6"): word joiners hold the dash to both
 * ends, the same convention the copy uses for "Пунта-⁠Кана". Text already glued in the copy is left as is.
 */
export function keepRanges(text: string): string {
  return text.replace(RANGE_DASH, `${WORD_JOINER}–${WORD_JOINER}`);
}

/** Body copy (Montserrat, wide columns): glue() — one-letter words, number + word, spaced dashes — plus ranges. */
export function typeset(text: string): string {
  return keepRanges(glue(text));
}

/**
 * Display copy in narrow boxes (FAQ questions in Unbounded): only one-letter words and ranges are glued.
 * glue() would also chain a number to the next word ("о 18:00 ресторани"), a run too wide for a 320px phone.
 */
export function typesetDisplay(text: string): string {
  return keepRanges(text.replace(ONE_LETTER, `$1$2${NBSP}`).replace(ONE_LETTER, `$1$2${NBSP}`));
}
