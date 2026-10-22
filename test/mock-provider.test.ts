import { beforeAll, describe, expect, it } from "vitest";
import { MockTourProvider } from "@/lib/tours/mock-provider";
import type { OfferWithHotel, SearchParams, SearchResult } from "@/lib/tours/types";

/**
 * Behavioural contract of the TourProvider interface, exercised against the
 * mock. When the AnChoice adapter lands, pointing these expectations at it
 * (where data allows) documents exactly what the UI relies on.
 */

const provider = new MockTourProvider();

/** Base params: the site's default party of 2 adults. */
const p = (over: Partial<SearchParams> = {}): SearchParams => ({
  adults: 2,
  childrenAges: [],
  ...over,
});

/** Mock dates are relative to "today" in Prague — mirror that here. */
function pragueToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const daysFromToday = (iso: string) =>
  Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${pragueToday()}T00:00:00Z`)) / 86_400_000);

// One broad search reused by several tests (search() has a simulated delay).
let egypt: SearchResult;
beforeAll(async () => {
  egypt = await provider.search(p({ destination: "egypt", pageSize: 100 }));
});

describe("search — filters", () => {
  it("destination filter returns only hotels of that country slug", () => {
    expect(egypt.total).toBeGreaterThan(0);
    expect(egypt.items.length).toBeGreaterThan(0);
    for (const o of egypt.items) expect(o.hotel.countrySlug).toBe("egypt");
  });

  it("board, stars, transport, airports and priceMax compose", async () => {
    const res = await provider.search(
      p({
        destination: "egypt",
        board: ["AI", "UAI"],
        stars: [4, 5],
        transport: ["flight"],
        departureAirports: ["PRG", "BRQ"],
        priceMax: 200_000,
        pageSize: 100,
      }),
    );
    expect(res.total).toBeGreaterThan(0);
    for (const o of res.items) {
      expect(o.hotel.countrySlug).toBe("egypt");
      expect(["AI", "UAI"]).toContain(o.board);
      expect([4, 5]).toContain(o.hotel.stars);
      expect(o.transport).toBe("flight");
      expect(["PRG", "BRQ"]).toContain(o.departureAirport);
      expect(o.totalPrice.amount).toBeLessThanOrEqual(200_000);
    }
  });

  it("touroperator filter narrows results to that operator", async () => {
    const operator = egypt.items[0].touroperator;
    const res = await provider.search(p({ destination: "egypt", touroperators: [operator], pageSize: 100 }));
    expect(res.total).toBeGreaterThan(0);
    expect(res.total).toBeLessThanOrEqual(egypt.total);
    for (const o of res.items) expect(o.touroperator).toBe(operator);
  });

  it("priceMax caps the total price for the whole group", async () => {
    const cheapest = egypt.items[0].totalPrice.amount; // default sort = price_asc
    const res = await provider.search(p({ destination: "egypt", priceMax: cheapest, pageSize: 100 }));
    expect(res.total).toBeGreaterThanOrEqual(1);
    for (const o of res.items) expect(o.totalPrice.amount).toBeLessThanOrEqual(cheapest);
  });

  it("date window filters departures", async () => {
    const from = egypt.items[0].departureDate;
    const res = await provider.search(p({ destination: "egypt", dateFrom: from, dateTo: from, pageSize: 100 }));
    expect(res.total).toBeGreaterThanOrEqual(1);
    for (const o of res.items) expect(o.departureDate).toBe(from);
  });
});

describe("search — sorting", () => {
  it("price_asc orders by ascending total price (the default)", async () => {
    const res = await provider.search(p({ destination: "turkey", sort: "price_asc", pageSize: 50 }));
    const totals = res.items.map((o) => o.totalPrice.amount);
    expect(totals.length).toBeGreaterThan(1);
    for (let i = 1; i < totals.length; i++) expect(totals[i]).toBeGreaterThanOrEqual(totals[i - 1]);
  });

  it("date_asc orders by ascending departure date", async () => {
    const res = await provider.search(p({ destination: "turkey", sort: "date_asc", pageSize: 50 }));
    const dates = res.items.map((o) => o.departureDate);
    expect(dates.length).toBeGreaterThan(1);
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i] >= dates[i - 1]).toBe(true);
    }
  });

  it("rating_desc orders by descending hotel rating", async () => {
    const res = await provider.search(p({ destination: "turkey", sort: "rating_desc", pageSize: 50 }));
    const scores = res.items.map((o) => o.hotel.rating?.score ?? 0);
    expect(scores.length).toBeGreaterThan(1);
    for (let i = 1; i < scores.length; i++) expect(scores[i]).toBeLessThanOrEqual(scores[i - 1]);
  });
});

describe("search — pagination", () => {
  it("keeps total stable across pages and slices without overlap", async () => {
    const pageSize = 7;
    const page1 = await provider.search(p({ destination: "egypt", pageSize }));
    const page2 = await provider.search(p({ destination: "egypt", pageSize, page: 2 }));

    expect(page1.total).toBe(egypt.total);
    expect(page2.total).toBe(page1.total);
    expect(page1.page).toBe(1);
    expect(page2.page).toBe(2);
    expect(page1.pageSize).toBe(pageSize);
    expect(page1.items).toHaveLength(pageSize); // Egypt has far more than 14 offers
    expect(page2.items.length).toBeGreaterThan(0);

    const ids1 = new Set(page1.items.map((o) => o.id));
    for (const o of page2.items) expect(ids1.has(o.id)).toBe(false);
  });

  it("the last page holds the remainder; pages beyond are empty", async () => {
    const pageSize = 7;
    const pages = Math.ceil(egypt.total / pageSize);
    const last = await provider.search(p({ destination: "egypt", pageSize, page: pages }));
    expect(last.items).toHaveLength(egypt.total - (pages - 1) * pageSize);

    const beyond = await provider.search(p({ destination: "egypt", pageSize, page: pages + 1 }));
    expect(beyond.items).toHaveLength(0);
    expect(beyond.total).toBe(egypt.total);
  });
});

describe("search — facets", () => {
  it("counts for a filter's own selected value are >= the result total", async () => {
    const res = await provider.search(p({ destination: "egypt", board: ["AI"], pageSize: 1 }));
    expect(res.total).toBeGreaterThan(0);
    const facets = res.facets!;
    expect(facets).toBeDefined();
    // Each facet ignores its own filter, so the selected value's count can
    // never be below the number of matching results.
    expect(facets.destination.egypt).toBeGreaterThanOrEqual(res.total);
    expect(facets.board.AI).toBeGreaterThanOrEqual(res.total);
  });

  it("disjunctive facets keep sibling options visible", async () => {
    const res = await provider.search(p({ destination: "egypt", board: ["AI"], pageSize: 1 }));
    const boards = Object.keys(res.facets!.board);
    expect(boards.length).toBeGreaterThan(1); // other boards still offered
    const destinations = Object.keys(res.facets!.destination);
    expect(destinations.length).toBeGreaterThan(1); // other countries still offered
  });
});

describe("group pricing", () => {
  const hotelIdOf = (items: OfferWithHotel[]) => items[0].hotelId;

  it("more adults -> higher total, same per-person price", async () => {
    const hotelId = hotelIdOf(egypt.items);
    const for2 = await provider.getHotelOffers(hotelId, p());
    const for3 = await provider.getHotelOffers(hotelId, p({ adults: 3 }));
    expect(for2.length).toBeGreaterThan(0);
    const by3 = new Map(for3.map((o) => [o.id, o]));
    for (const o2 of for2) {
      const o3 = by3.get(o2.id)!;
      expect(o3).toBeDefined();
      expect(o3.totalPrice.amount).toBeGreaterThan(o2.totalPrice.amount);
      expect(o3.pricePerPerson.amount).toBe(o2.pricePerPerson.amount);
    }
  });

  it("children increase the total, but by less than an adult", async () => {
    const hotelId = hotelIdOf(egypt.items);
    const adultsOnly = await provider.getHotelOffers(hotelId, p());
    const withChild = await provider.getHotelOffers(hotelId, p({ childrenAges: [6] }));
    const withAdult = await provider.getHotelOffers(hotelId, p({ adults: 3 }));
    const child = new Map(withChild.map((o) => [o.id, o]));
    const adult = new Map(withAdult.map((o) => [o.id, o]));
    expect(adultsOnly.length).toBeGreaterThan(0);
    for (const base of adultsOnly) {
      const c = child.get(base.id)!;
      const a = adult.get(base.id)!;
      expect(c.totalPrice.amount).toBeGreaterThan(base.totalPrice.amount);
      expect(c.totalPrice.amount).toBeLessThan(a.totalPrice.amount);
    }
  });

  it("an infant (age < 2) adds a flat fee smaller than an older child's price", async () => {
    const hotelId = hotelIdOf(egypt.items);
    const base = await provider.getHotelOffers(hotelId, p());
    const infant = await provider.getHotelOffers(hotelId, p({ childrenAges: [1] }));
    const kid = await provider.getHotelOffers(hotelId, p({ childrenAges: [6] }));
    const infantBy = new Map(infant.map((o) => [o.id, o]));
    const kidBy = new Map(kid.map((o) => [o.id, o]));
    expect(base.length).toBeGreaterThan(0);
    for (const b of base) {
      expect(infantBy.get(b.id)!.totalPrice.amount).toBeGreaterThan(b.totalPrice.amount);
      expect(infantBy.get(b.id)!.totalPrice.amount).toBeLessThanOrEqual(kidBy.get(b.id)!.totalPrice.amount);
    }
  });

  it("a solo traveller pays a per-person surcharge", async () => {
    const hotelId = hotelIdOf(egypt.items);
    const duo = await provider.getHotelOffers(hotelId, p());
    const solo = await provider.getHotelOffers(hotelId, p({ adults: 1 }));
    const soloBy = new Map(solo.map((o) => [o.id, o]));
    expect(duo.length).toBeGreaterThan(0);
    for (const d of duo) {
      expect(soloBy.get(d.id)!.pricePerPerson.amount).toBeGreaterThan(d.pricePerPerson.amount);
    }
  });
});

describe("getHotTours", () => {
  it("returns only discounted last-minute departures within ~3 weeks", async () => {
    const hot = await provider.getHotTours(12);
    expect(hot.length).toBeGreaterThan(0);
    expect(hot.length).toBeLessThanOrEqual(12);
    for (const o of hot) {
      expect(o.isLastMinute).toBe(true);
      expect(o.originalPrice).toBeDefined();
      expect(o.originalPrice!.amount).toBeGreaterThan(o.pricePerPerson.amount);
      const d = daysFromToday(o.departureDate);
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThanOrEqual(23); // generated for departures <= 21 days out
    }
  });

  it("prefers variety: no duplicate hotel until every hot hotel is shown", async () => {
    const hot = await provider.getHotTours(6);
    const hotelIds = hot.map((o) => o.hotelId);
    expect(new Set(hotelIds).size).toBe(hotelIds.length);
  });
});

describe("getFeatured", () => {
  it("returns at most `limit` unique, regular-priced hotels", async () => {
    const featured = await provider.getFeatured(6);
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(6);
    const hotelIds = featured.map((o) => o.hotelId);
    expect(new Set(hotelIds).size).toBe(hotelIds.length);
    for (const o of featured) {
      expect(o.isLastMinute ?? false).toBe(false);
      expect(o.hotel.stars).toBe(5);
    }
  });
});

describe("getOffer / getHotel", () => {
  it("resolves an existing offer with its hotel attached", async () => {
    const id = egypt.items[0].id;
    const offer = await provider.getOffer(id);
    expect(offer).not.toBeNull();
    expect(offer!.id).toBe(id);
    expect(offer!.hotel.id).toBe(offer!.hotelId);
  });

  it("returns null for a bogus offer id", async () => {
    expect(await provider.getOffer("does-not-exist-1")).toBeNull();
  });

  it("resolves an existing hotel and nulls a bogus one", async () => {
    const hotelId = egypt.items[0].hotelId;
    const hotel = await provider.getHotel(hotelId);
    expect(hotel).not.toBeNull();
    expect(hotel!.id).toBe(hotelId);
    expect(hotel!.images.length).toBeGreaterThan(0);
    expect(await provider.getHotel("no-such-hotel")).toBeNull();
  });
});

describe("checkAvailability", () => {
  it("returns the AvailabilityCheck shape for an existing offer", { timeout: 15_000 }, async () => {
    const id = egypt.items[0].id;
    const check = await provider.checkAvailability(id);
    expect(check.offerId).toBe(id);
    expect(typeof check.available).toBe("boolean");
    expect(Number.isNaN(Date.parse(check.checkedAt))).toBe(false);
    if (check.available) {
      expect(check.price).toBeDefined();
      expect(check.price!.currency).toBe("CZK");
      expect(check.price!.amount).toBeGreaterThan(0);
    }
  });

  it("reports a bogus offer as unavailable", { timeout: 15_000 }, async () => {
    const check = await provider.checkAvailability("does-not-exist-1");
    expect(check.available).toBe(false);
    expect(check.price).toBeUndefined();
  });
});

describe("book", () => {
  it("returns an inquiry with an AT- reference", { timeout: 15_000 }, async () => {
    const result = await provider.book({
      offerId: egypt.items[0].id,
      customer: { name: "Тест Тестенко", phone: "+420 777 111 222" },
      travellers: [{ age: 30 }, { age: 30 }],
    });
    expect(result.status).toBe("inquiry");
    if (result.status === "inquiry") {
      expect(result.reference).toMatch(/^AT-[A-Z]{2}\d{6}$/);
    }
  });

  it("still yields an inquiry for an unknown offer (agent follows up by hand)", async () => {
    const result = await provider.book({
      offerId: "ghost-offer",
      customer: { name: "Test", phone: "123456" },
      travellers: [{ age: 30 }],
    });
    expect(result.status).toBe("inquiry");
    if (result.status === "inquiry") expect(result.reference).toMatch(/^AT-XX\d{6}$/);
  });
});

describe("determinism", () => {
  it("two provider instances return an identical first page for the same params", async () => {
    const a = new MockTourProvider();
    const b = new MockTourProvider();
    const params = p({ destination: "turkey", sort: "price_asc", pageSize: 20 });
    const [ra, rb] = await Promise.all([a.search(params), b.search(params)]);
    expect(rb.total).toBe(ra.total);
    expect(rb.items).toEqual(ra.items);
    expect(rb.facets).toEqual(ra.facets);
  });
});
