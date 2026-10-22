import { NextResponse, type NextRequest } from "next/server";
import { tours } from "@/lib/tours";

/**
 * GET /api/availability?offerId=… — live price/availability check right before
 * booking. Never cached: the answer must reflect the operator's system now.
 * TODO(anchoice): each call costs compute units; consider rate limiting per IP.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

export async function GET(req: NextRequest) {
  const offerId = req.nextUrl.searchParams.get("offerId")?.trim();
  if (!offerId || offerId.length > 200) {
    return NextResponse.json({ error: "offerId-required" }, { status: 400, headers: noStore });
  }
  try {
    const check = await tours().checkAvailability(offerId);
    return NextResponse.json(check, { headers: noStore });
  } catch (err) {
    console.error("[availability]", offerId, err);
    return NextResponse.json({ error: "provider-unavailable" }, { status: 502, headers: noStore });
  }
}
