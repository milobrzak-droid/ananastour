import { describe, expect, it } from "vitest";
import { site } from "@/config/site";
import { phoneLink, telegramLink } from "@/lib/contact/telegram";

const BASE = `https://t.me/${site.contact.telegramUsername}`;

describe("telegramLink", () => {
  it("returns the bare chat link without text", () => {
    expect(telegramLink()).toBe(BASE);
    expect(telegramLink("")).toBe(BASE);
  });

  it("pre-fills the message via ?text=", () => {
    expect(telegramLink("Hello")).toBe(`${BASE}?text=Hello`);
  });

  it("encodes newlines and Cyrillic so the URL is pure ASCII", () => {
    const text = "Привіт! Цікавить тур:\nEgypt, 7 ночей — 18 990 Kč";
    const url = telegramLink(text);
    expect(url).toBe(`${BASE}?text=${encodeURIComponent(text)}`);
    expect(url).toContain("%0A"); // newline
    expect(url).toContain("%D0%9F"); // "П"
    // Safe to drop into an href attribute: printable ASCII only, no raw spaces.
    expect(url).toMatch(/^[\x21-\x7E]+$/);
  });

  it("round-trips the text through decodeURIComponent", () => {
    const text = "Ціна 24 490 Kč?\nДякую 🙏";
    const encoded = telegramLink(text).slice(`${BASE}?text=`.length);
    expect(decodeURIComponent(encoded)).toBe(text);
  });

  it("encodes characters that would break the query string (&, =, #, ?)", () => {
    const url = telegramLink("a&b=c#d?e");
    expect(url).toBe(`${BASE}?text=a%26b%3Dc%23d%3Fe`);
  });
});

describe("phoneLink", () => {
  it("strips all whitespace from the configured phone number", () => {
    const link = phoneLink();
    expect(link).toMatch(/^tel:\+?\d+$/);
    expect(link).not.toMatch(/\s/);
  });

  it("keeps the leading + and all digits", () => {
    const digits = site.contact.phone.replace(/\s+/g, "");
    expect(phoneLink()).toBe(`tel:${digits}`);
  });
});
