import { ArrowButton, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDateRange, formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";
import { airportLabel, boardLabel } from "./labels";

const tx = {
  date: { uk: "Дати", cs: "Termín" },
  nights: { uk: "Ночей", cs: "Nocí" },
  board: { uk: "Харчування", cs: "Strava" },
  room: { uk: "Номер", cs: "Pokoj" },
  operator: { uk: "Туроператор", cs: "CK" },
  price: { uk: "Ціна", cs: "Cena" },
  open: { uk: "Відкрити тур", cs: "Otevřít termín" },
  from: { uk: "виліт", cs: "odlet" },
};

/** Departures of one hotel: a table on desktop, stacked rows on mobile. */
export function DeparturesTable({ offers, locale }: { offers: OfferWithHotel[]; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <div className="hidden overflow-hidden rounded-[2rem] bg-white p-2 md:block">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-ink/75">
            <tr>
              <th className="px-5 py-3 font-semibold">{t(tx.date, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.nights, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.board, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.room, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.operator, locale)}</th>
              <th className="px-3 py-3 text-right font-semibold">{t(tx.price, locale)}</th>
              <th className="px-5 py-3">
                <span className="sr-only">{t(tx.open, locale)}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {offers.map((o) => (
              <tr key={o.id} className="transition hover:bg-paper">
                <td className="px-5 py-3">
                  <p className="whitespace-nowrap font-semibold">{formatDateRange(o.departureDate, o.returnDate, locale)}</p>
                  {o.departureAirport && (
                    <p className="text-xs text-ink/75">
                      {t(tx.from, locale)} {airportLabel(o.departureAirport, locale)}
                    </p>
                  )}
                  <div className="mt-1 flex gap-1">
                    {o.isLastMinute && <Pill tone="red">Last minute</Pill>}
                    {o.verified && <Pill tone="ice">✓ online</Pill>}
                  </div>
                </td>
                <td className="px-3 py-3">{o.nights}</td>
                <td className="px-3 py-3" title={boardLabel(o.board, locale)}>
                  {o.board}
                </td>
                <td className="px-3 py-3">{o.roomType}</td>
                <td className="px-3 py-3">{o.touroperator}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  {o.originalPrice && (
                    <p className="text-xs text-ink/75 line-through">{formatMoney(o.originalPrice, locale)}</p>
                  )}
                  <p className="font-display text-lg font-extrabold">{formatMoney(o.pricePerPerson, locale)}</p>
                  <p className="text-xs text-ink/75">{dict.common.perPerson}</p>
                </td>
                <td className="px-5 py-3 text-right">
                  <ArrowButton href={routes.offer(locale, o.id)} label={t(tx.open, locale)} size={44} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 md:hidden">
        {offers.map((o) => (
          <li key={o.id} className="flex items-center gap-4 rounded-[1.75rem] bg-white p-4">
            <div className="min-w-0 flex-1">
              <p className="whitespace-nowrap font-semibold">{formatDateRange(o.departureDate, o.returnDate, locale)}</p>
              <p className="text-sm text-ink/70">
                {o.nights} {dict.common.nights} · {boardLabel(o.board, locale)} · {o.roomType}
              </p>
              <p className="text-xs text-ink/75">
                {o.touroperator}
                {o.departureAirport ? ` · ${airportLabel(o.departureAirport, locale)}` : ""}
              </p>
              <p className="mt-1 font-display text-lg font-extrabold">
                {formatMoney(o.pricePerPerson, locale)}
                <span className="ml-1 text-xs font-normal text-ink/75">{dict.common.perPerson}</span>
              </p>
            </div>
            <ArrowButton href={routes.offer(locale, o.id)} label={t(tx.open, locale)} size={48} />
          </li>
        ))}
      </ul>
    </>
  );
}
