"use client";

import { useEffect, useState } from "react";
import { PineappleSpinner } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { t, type Locale } from "@/i18n/config";
import { formatMoney } from "@/lib/format";
import type { AvailabilityCheck as Check, Money } from "@/lib/tours/types";

type State = { kind: "checking" } | { kind: "done"; check: Check } | { kind: "error" };

const tx = {
  checking: { uk: "Перевіряємо ціну та наявність у туроператора…", cs: "Ověřujeme cenu a dostupnost u cestovní kanceláře…" },
  ok: { uk: "Місця є — ціну перевірено онлайн", cs: "Volná místa — cena ověřena online" },
  at: { uk: "о", cs: "v" },
  changed: { uk: "Актуальна ціна за всіх:", cs: "Aktuální cena za všechny:" },
  unavailable: {
    uk: "Цей термін щойно розпродали. Альона знайде схожий варіант — напишіть їй.",
    cs: "Tento termín se právě vyprodal. Aljona najde podobnou variantu — napište jí.",
  },
  alt: { uk: "Знайти альтернативу", cs: "Najít alternativu" },
  error: {
    uk: "Зараз не вдалося перевірити онлайн — Альона підтвердить наявність вручну.",
    cs: "Teď se nepodařilo ověřit online — Aljona dostupnost potvrdí ručně.",
  },
};

/** Live availability badge. Runs on mount against GET /api/availability (uncached). */
export function AvailabilityCheck({
  offerId,
  locale,
  totalPrice,
  telegramMessage,
}: {
  offerId: string;
  locale: Locale;
  /** Price shown on the page, to detect a change. */
  totalPrice: Money;
  telegramMessage: string;
}) {
  const [state, setState] = useState<State>({ kind: "checking" });

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`/api/availability?offerId=${encodeURIComponent(offerId)}`, { cache: "no-store", signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        setState({ kind: "done", check: (await r.json()) as Check });
      })
      .catch((e: unknown) => {
        if (!(e instanceof DOMException && e.name === "AbortError")) setState({ kind: "error" });
      });
    return () => ctrl.abort();
  }, [offerId]);

  if (state.kind === "checking") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-paper/10 p-4 text-sm" aria-live="polite">
        <PineappleSpinner size={28} />
        <span>{t(tx.checking, locale)}</span>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <p className="rounded-2xl bg-paper/10 p-4 text-sm" aria-live="polite">
        {t(tx.error, locale)}
      </p>
    );
  }

  const { check } = state;
  if (!check.available) {
    return (
      <div className="rounded-2xl bg-red p-4 text-sm text-white" aria-live="polite">
        <p className="font-semibold">✕ {t(tx.unavailable, locale)}</p>
        <TelegramButton
          locale={locale}
          source="offer-unavailable"
          size="sm"
          message={telegramMessage}
          label={t(tx.alt, locale)}
          className="mt-3"
        />
      </div>
    );
  }

  const time = new Date(check.checkedAt).toLocaleTimeString(locale === "uk" ? "uk-UA" : "cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const changed = check.price && check.price.amount !== totalPrice.amount;
  return (
    <div className="rounded-2xl bg-ice p-4 text-sm text-ink" aria-live="polite">
      <p className="font-semibold">
        ✓ {t(tx.ok, locale)} {t(tx.at, locale)} {time}
      </p>
      {changed && check.price && (
        <p className="mt-1">
          {t(tx.changed, locale)} <strong>{formatMoney(check.price, locale)}</strong>
        </p>
      )}
    </div>
  );
}
