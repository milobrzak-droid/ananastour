import { notFound } from "next/navigation";

/**
 * Catch-all under [locale]: any URL that matches no real route renders the
 * branded 404 (../not-found.tsx) instead of Next's default one.
 */
export default function CatchAllNotFound() {
  notFound();
}
