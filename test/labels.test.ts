import { describe, expect, it } from "vitest";
import {
  airportLabel,
  boardLabel,
  countryName,
  formatDistance,
  transportLabel,
  travellersLabel,
} from "@/components/tours/labels";

describe("travellersLabel — pluralisation", () => {
  it("adults only", () => {
    expect(travellersLabel(2, [], "uk")).toBe("2 дорослих");
    expect(travellersLabel(1, [], "cs")).toBe("1 dospělý");
  });

  it("1 child → дитина / dítě", () => {
    expect(travellersLabel(2, [7], "uk")).toBe("2 дорослих + 1 дитина (7)");
    expect(travellersLabel(2, [7], "cs")).toBe("2 dospělí + 1 dítě (7)");
  });

  it("2–4 children → дитини / děti", () => {
    expect(travellersLabel(2, [3, 8], "uk")).toBe("2 дорослих + 2 дитини (3, 8)");
    expect(travellersLabel(2, [3, 8], "cs")).toBe("2 dospělí + 2 děti (3, 8)");
    expect(travellersLabel(1, [2, 4, 6, 9], "cs")).toBe("1 dospělý + 4 děti (2, 4, 6, 9)");
  });

  it("5+ children → дітей / dětí", () => {
    expect(travellersLabel(2, [1, 3, 5, 7, 9], "uk")).toBe("2 дорослих + 5 дітей (1, 3, 5, 7, 9)");
    expect(travellersLabel(2, [1, 3, 5, 7, 9], "cs")).toBe("2 dospělí + 5 dětí (1, 3, 5, 7, 9)");
  });

  it("lists the ages in the given order", () => {
    expect(travellersLabel(2, [9, 3], "cs")).toContain("(9, 3)");
  });
});

describe("boardLabel", () => {
  it("translates normalised board codes", () => {
    expect(boardLabel("AI", "cs")).toBe("All inclusive");
    expect(boardLabel("AI", "uk")).toBe("Все включено");
    expect(boardLabel("HB", "cs")).toBe("Polopenze");
    expect(boardLabel("HB", "uk")).toBe("Напівпансіон");
    expect(boardLabel("RO", "cs")).toBe("Bez stravy");
  });
});

describe("transportLabel", () => {
  it("translates transport modes", () => {
    expect(transportLabel("flight", "cs")).toBe("Letecky");
    expect(transportLabel("bus", "uk")).toBe("Автобусом");
  });
});

describe("airportLabel", () => {
  it("labels known airports with city and code", () => {
    expect(airportLabel("PRG", "cs")).toBe("Praha (PRG)");
    expect(airportLabel("PRG", "uk")).toBe("Прага (PRG)");
    expect(airportLabel("BRQ", "cs")).toBe("Brno (BRQ)");
  });

  it("falls back to the bare code for unknown airports", () => {
    expect(airportLabel("VIE", "cs")).toBe("VIE");
  });
});

describe("countryName", () => {
  it("translates known destination slugs", () => {
    expect(countryName("egypt", "uk")).toBe("Єгипет");
    expect(countryName("egypt", "cs")).toBe("Egypt");
    expect(countryName("uae", "cs")).toBe("SAE");
  });

  it("falls back to the provided fallback, then to the slug", () => {
    expect(countryName("narnia", "cs", "Narnie")).toBe("Narnie");
    expect(countryName("narnia", "cs")).toBe("narnia");
  });
});

describe("formatDistance", () => {
  it("shows metres below 1 km", () => {
    expect(formatDistance(300, "cs")).toBe("300 m");
    expect(formatDistance(300, "uk")).toBe("300 м");
    expect(formatDistance(999, "cs")).toBe("999 m");
  });

  it("shows kilometres with locale decimal comma from 1 km up", () => {
    expect(formatDistance(25000, "cs")).toBe("25 km");
    expect(formatDistance(25000, "uk")).toBe("25 км");
    expect(formatDistance(1550, "cs")).toBe("1,6 km");
    expect(formatDistance(1000, "uk")).toBe("1 км");
  });
});
