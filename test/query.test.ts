import { describe, expect, it } from "vitest";
import { DEFAULT_SEARCH, parseSearchParams, toQueryString } from "@/lib/tours/query";
import type { SearchParams } from "@/lib/tours/types";

/** Simulate what Next.js hands a page: the parsed query string object. */
const throughUrl = (qs: string) => Object.fromEntries(new URLSearchParams(qs));

describe("parseSearchParams / toQueryString round-trip", () => {
  it("survives a round-trip with every field set", () => {
    const full: SearchParams = {
      destination: "egypt",
      hotelId: "eg-rixos-premium-seagate",
      dateFrom: "2026-11-01",
      dateTo: "2026-11-30",
      nightsMin: 7,
      nightsMax: 10,
      adults: 3,
      childrenAges: [5, 9],
      transport: ["flight", "bus"],
      departureAirports: ["PRG", "BRQ"],
      board: ["AI", "UAI"],
      stars: [4, 5],
      priceMax: 80000,
      touroperators: ["FISCHER", "ČEDOK"],
      sort: "date_asc",
      page: 3,
    };
    expect(parseSearchParams(throughUrl(toQueryString(full)))).toEqual(full);
  });

  it("keeps non-ASCII operator names intact through URL encoding", () => {
    const qs = toQueryString({ touroperators: ["ČEDOK", "Join UP!"] });
    expect(parseSearchParams(throughUrl(qs)).touroperators).toEqual(["ČEDOK", "Join UP!"]);
  });

  it("is stable: parse → serialize → parse yields the same result", () => {
    const first = parseSearchParams({ destination: "turkey", adults: "4", kids: "3,7" });
    const second = parseSearchParams(throughUrl(toQueryString(first)));
    expect(second).toEqual(first);
  });
});

describe("parseSearchParams — malformed input", () => {
  it("falls back to 2 adults on non-numeric input", () => {
    expect(parseSearchParams({ adults: "abc" }).adults).toBe(2);
  });

  it("falls back to 2 adults on zero or negative input", () => {
    expect(parseSearchParams({ adults: "0" }).adults).toBe(2);
    expect(parseSearchParams({ adults: "-3" }).adults).toBe(2);
  });

  it("clamps adults to 9", () => {
    expect(parseSearchParams({ adults: "99" }).adults).toBe(9);
  });

  it("filters child ages outside 0–17 and non-integers", () => {
    expect(parseSearchParams({ kids: "99,5,-1,2.5,abc,17,0" }).childrenAges).toEqual([5, 17, 0]);
  });

  it("drops negative or non-numeric nights and price", () => {
    const p = parseSearchParams({ nmin: "-5", nmax: "abc", pmax: "-100" });
    expect(p.nightsMin).toBeUndefined();
    expect(p.nightsMax).toBeUndefined();
    expect(p.priceMax).toBeUndefined();
  });

  it("takes the first value when a key is repeated (array input)", () => {
    const p = parseSearchParams({ destination: ["egypt", "greece"], adults: ["4", "7"] });
    expect(p.destination).toBe("egypt");
    expect(p.adults).toBe(4);
  });

  it("filters invalid stars (0, NaN)", () => {
    expect(parseSearchParams({ stars: "4,0,x,5" }).stars).toEqual([4, 5]);
  });
});

describe("page handling", () => {
  it("omits page <= 1 from the query string", () => {
    expect(toQueryString({ page: 1 })).toBe("");
    expect(toQueryString({ page: 2 })).toBe("page=2");
  });

  it("parses page > 1 and rejects page 0", () => {
    expect(parseSearchParams({ page: "2" }).page).toBe(2);
    expect(parseSearchParams({ page: "0" }).page).toBeUndefined();
  });

  it("round-trips page=1 to undefined (canonical first page)", () => {
    const p = parseSearchParams(throughUrl(toQueryString({ adults: 2, page: 1 })));
    expect(p.page).toBeUndefined();
  });
});

describe("empty query", () => {
  it("parses {} to DEFAULT_SEARCH equivalents", () => {
    const p = parseSearchParams({});
    expect(p.adults).toBe(DEFAULT_SEARCH.adults);
    expect(p.childrenAges).toEqual(DEFAULT_SEARCH.childrenAges);
    expect(p.destination).toBeUndefined();
    expect(p.hotelId).toBeUndefined();
    expect(p.dateFrom).toBeUndefined();
    expect(p.dateTo).toBeUndefined();
    expect(p.priceMax).toBeUndefined();
    expect(p.sort).toBeUndefined();
    expect(p.page).toBeUndefined();
    expect(p.transport).toEqual([]);
    expect(p.departureAirports).toEqual([]);
    expect(p.board).toEqual([]);
    expect(p.stars).toEqual([]);
    expect(p.touroperators).toEqual([]);
  });

  it("serializes an empty object to an empty string", () => {
    expect(toQueryString({})).toBe("");
  });

  it("serializes DEFAULT_SEARCH to just the adults count", () => {
    // Documents current behavior: adults=2 is always emitted even though it is
    // the default (empty childrenAges are dropped).
    expect(toQueryString(DEFAULT_SEARCH)).toBe("adults=2");
  });
});
