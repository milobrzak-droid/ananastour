import { NextResponse, type NextRequest } from "next/server";
import { clientIp, createRateLimiter } from "@/lib/request-guard";
import { tours } from "@/lib/tours";

/**
 * GET /api/availability?offerId=… — live price/availability check right before
 * booking. Never cached: the answer must reflect the operator's system now.
 * Rate limited per IP because each call costs AnChoice compute units.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

// Light limit: a human checks a handful of offers; 30/min stops scripted scraping.
const rateLimited = createRateLimiter(30, 60 * 1000);

export async function GET(req: NextRequest) {
  const offerId = req.nextUrl.searchParams.get("offerId")?.trim();
  if (!offerId || offerId.length > 200) {
    return NextResponse.json({ error: "offerId-required" }, { status: 400, headers: noStore });
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429, headers: noStore });
  }
  try {
    const check = await tours().checkAvailability(offerId);
    return NextResponse.json(check, { headers: noStore });
  } catch (err) {
    console.error("[availability]", offerId, err);
    return NextResponse.json({ error: "provider-unavailable" }, { status: 502, headers: noStore });
  }
}
