import { describe, expect, it } from "vitest";
import { formatDate, formatDateRange, formatMoney } from "@/lib/format";

const NBSP = " ";

describe("formatMoney", () => {
  it("formats CZK for Czech with non-breaking spaces", () => {
    expect(formatMoney({ amount: 18990, currency: "CZK" }, "cs")).toBe(`18${NBSP}990${NBSP}Kč`);
  });

  it("formats CZK for Ukrainian with non-breaking spaces", () => {
    expect(formatMoney({ amount: 18990, currency: "CZK" }, "uk")).toBe(`18${NBSP}990${NBSP}CZK`);
  });

  it("formats EUR in both locales", () => {
    expect(formatMoney({ amount: 18990, currency: "EUR" }, "cs")).toBe(`18${NBSP}990${NBSP}€`);
    expect(formatMoney({ amount: 18990, currency: "EUR" }, "uk")).toBe(`18${NBSP}990${NBSP}EUR`);
  });

  it("never uses a plain ASCII space (prices must not wrap)", () => {
    for (const locale of ["uk", "cs"] as const) {
      expect(formatMoney({ amount: 1234567, currency: "CZK" }, locale)).not.toContain(" ");
    }
  });

  it("rounds to whole currency units", () => {
    expect(formatMoney({ amount: 1234.56, currency: "CZK" }, "cs")).toBe(`1${NBSP}235${NBSP}Kč`);
    expect(formatMoney({ amount: 990, currency: "CZK" }, "cs")).toBe(`990${NBSP}Kč`);
  });
});

describe("formatDate", () => {
  it("formats day + short month by default", () => {
    expect(formatDate("2026-05-01", "cs")).toBe("1. 5.");
    expect(formatDate("2026-05-01", "uk")).toBe("1 трав.");
  });

  it("accepts explicit options (with year)", () => {
    const opts = { day: "numeric", month: "short", year: "numeric" } as const;
    expect(formatDate("2026-05-09", "cs", opts)).toBe("9. 5. 2026");
    expect(formatDate("2026-05-09", "uk", opts)).toBe("9 трав. 2026 р.");
  });

  it("keeps the calendar date stable (parsed as UTC midnight)", () => {
    // 1 January: a mis-parse into a behind-UTC zone would render 31 December.
    expect(formatDate("2026-01-01", "cs")).toBe("1. 1.");
  });
});

describe("formatDateRange", () => {
  it("joins short departure and full return date with an en dash", () => {
    expect(formatDateRange("2026-05-01", "2026-05-09", "cs")).toBe("1. 5. – 9. 5. 2026");
    expect(formatDateRange("2026-05-01", "2026-05-09", "uk")).toBe("1 трав. – 9 трав. 2026 р.");
  });

  it("spans a year boundary without surprises", () => {
    expect(formatDateRange("2026-12-28", "2027-01-04", "cs")).toBe("28. 12. – 4. 1. 2027");
  });
});
