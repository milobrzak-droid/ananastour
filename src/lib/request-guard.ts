import "server-only";
import type { NextRequest } from "next/server";

/**
 * Small request-hardening helpers shared by the API routes: client IP
 * extraction, in-memory per-IP rate limiting and size-limited JSON parsing.
 */

/**
 * Client IP for rate limiting. Trusts only the standard headers the hosting
 * platform sets (Vercel writes the real client IP as the first value of
 * x-forwarded-for); everything else falls back to one shared bucket.
 */
export function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/**
 * Fixed-window in-memory rate limiter (per instance — good enough against
 * casual abuse/spam; serious abuse is the platform firewall's job).
 * Returns a function that is `true` when the key is over the limit.
 */
export function createRateLimiter(limit: number, windowMs: number): (key: string) => boolean {
  const hits = new Map<string, number[]>();
  return function rateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return true;
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) {
      for (const [k, times] of hits) if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return false;
  };
}

export type JsonBody = { ok: true; json: unknown } | { ok: false; error: "too-large" | "invalid-json" };

/** Default body limit — the biggest legitimate form payload is well under 4 KB. */
export const MAX_JSON_BYTES = 10 * 1024;

/** Reads the request body as JSON, rejecting oversized payloads before parsing. */
export async function readJsonBody(req: NextRequest, maxBytes = MAX_JSON_BYTES): Promise<JsonBody> {
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > maxBytes) return { ok: false, error: "too-large" };
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return { ok: false, error: "invalid-json" };
  }
  if (raw.length > maxBytes) return { ok: false, error: "too-large" };
  try {
    return { ok: true, json: JSON.parse(raw) };
  } catch {
    return { ok: false, error: "invalid-json" };
  }
}

/**
 * Random 300–800 ms pause before answering a honeypot hit, so the fake
 * "success" takes roughly as long as a real Telegram send and bots cannot
 * detect the honeypot by response time.
 */
export function decoyDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 500));
}
