import { describe, expect, it } from "vitest";
import { defaultLocale, isLocale, locales, t } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

describe("locales", () => {
  it("supports exactly uk and cs, defaulting to uk", () => {
    expect([...locales]).toEqual(["uk", "cs"]);
    expect(defaultLocale).toBe("uk");
  });
});

describe("isLocale", () => {
  it("accepts supported locales", () => {
    expect(isLocale("uk")).toBe(true);
    expect(isLocale("cs")).toBe(true);
  });

  it("rejects anything else (case-sensitive)", () => {
    expect(isLocale("en")).toBe(false);
    expect(isLocale("UK")).toBe(false);
    expect(isLocale("cz")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("uk-UA")).toBe(false);
  });
});

describe("t()", () => {
  it("picks the requested locale", () => {
    const value = { uk: "Привіт", cs: "Ahoj" };
    expect(t(value, "uk")).toBe("Привіт");
    expect(t(value, "cs")).toBe("Ahoj");
  });

  it("falls back to the default locale when the variant is missing", () => {
    const partial: Record<"uk" | "cs", string | undefined> = { uk: "Привіт", cs: undefined };
    expect(t(partial, "cs")).toBe("Привіт");
  });

  it("keeps an intentionally empty string (nullish fallback only)", () => {
    expect(t({ uk: "x", cs: "" }, "cs")).toBe("");
  });

  it("works with non-string values", () => {
    expect(t({ uk: 1, cs: 2 }, "cs")).toBe(2);
  });
});

describe("languageAlternates", () => {
  it("maps every locale plus x-default to the default locale path", () => {
    expect(languageAlternates((l) => routes.about(l))).toEqual({
      uk: "/uk/about",
      cs: "/cs/about",
      "x-default": "/uk/about",
    });
  });

  it("x-default points at the /uk variant for parametrised routes", () => {
    const alt = languageAlternates((l) => routes.destination(l, "egypt"));
    expect(alt["x-default"]).toBe("/uk/destinations/egypt");
    expect(alt.uk).toBe("/uk/destinations/egypt");
    expect(alt.cs).toBe("/cs/destinations/egypt");
  });

  it("covers the home route", () => {
    expect(languageAlternates((l) => routes.home(l))).toEqual({
      uk: "/uk",
      cs: "/cs",
      "x-default": "/uk",
    });
  });
});

describe("routes", () => {
  it("appends an optional query string to tours and hotel routes", () => {
    expect(routes.tours("uk")).toBe("/uk/tours");
    expect(routes.tours("cs", "destination=egypt&adults=2")).toBe("/cs/tours?destination=egypt&adults=2");
    expect(routes.hotel("uk", "eg-kurumba")).toBe("/uk/hotels/eg-kurumba");
    expect(routes.hotel("uk", "eg-kurumba", "from=2026-11-01")).toBe("/uk/hotels/eg-kurumba?from=2026-11-01");
  });

  it("prefixes every route with the locale", () => {
    expect(routes.offer("cs", "abc-1")).toBe("/cs/offers/abc-1");
    expect(routes.hot("uk")).toBe("/uk/hot-tours");
    expect(routes.post("cs", "jak-vybrat")).toBe("/cs/blog/jak-vybrat");
  });
});
