import { glue } from "@/components/home/typo";
import { ArrowButton, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";
import { airportLabel, boardLabel, dateRangeLabel, roomTypeLabel } from "./labels";

const tx = {
  date: { uk: "Дати", cs: "Termín" },
  roomBoard: { uk: "Номер і харчування", cs: "Pokoj a strava" },
  operator: { uk: "Туроператор", cs: "CK" },
  price: { uk: "Ціна", cs: "Cena" },
  open: { uk: "Деталі туру", cs: "Detail zájezdu" },
  from: { uk: "виліт:", cs: "odlet:" },
  lastMinute: { uk: "Гарячий тур", cs: "Last minute" },
  verified: { uk: "✓ Ціну перевірено", cs: "✓ Cena ověřena" },
};

/** " · " that never starts a line. */
const SEP = " · ";

/**
 * Departures of one hotel: a table on desktop, stacked rows below xl.
 * The table has five columns so it fits the ~48rem main column next to the hotel sidebar in both
 * languages: nights ride under the dates, the board under the room. If a provider ever sends text
 * too long for that, the row scrolls sideways while the arrow column stays pinned in view.
 */
export function DeparturesTable({ offers, locale }: { offers: OfferWithHotel[]; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <>
      <div className="hidden overflow-x-auto rounded-[2rem] bg-white p-2 xl:block">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-ink/75">
            <tr>
              <th className="px-4 py-3 font-semibold">{t(tx.date, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.roomBoard, locale)}</th>
              <th className="px-3 py-3 font-semibold">{t(tx.operator, locale)}</th>
              <th className="px-3 py-3 text-right font-semibold">{t(tx.price, locale)}</th>
              <th className="sticky right-0 bg-white px-4 py-3">
                <span className="sr-only">{t(tx.open, locale)}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {offers.map((o) => (
              <tr key={o.id} className="group transition hover:bg-paper">
                <td className="px-4 py-3">
                  <p className="font-semibold">{dateRangeLabel(o.departureDate, o.returnDate, locale)}</p>
                  <p className="text-xs text-ink/75">
                    <span className="whitespace-nowrap">
                      {o.nights} {dict.common.nights}
                    </span>
                    {o.departureAirport && (
                      <>
                        {SEP}
                        <span className="whitespace-nowrap">
                          {t(tx.from, locale)} {airportLabel(o.departureAirport, locale)}
                        </span>
                      </>
                    )}
                  </p>
                  {(o.isLastMinute || o.verified) && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {o.isLastMinute && <Pill tone="red">{t(tx.lastMinute, locale)}</Pill>}
                      {o.verified && <Pill tone="ice">{t(tx.verified, locale)}</Pill>}
                    </div>
                  )}
                </td>
                <td className="px-3 py-3">
                  {/* Glued: "pokoj s / výhledem" never leaves the one-letter preposition at a line end. */}
                  <p>{glue(roomTypeLabel(o.roomType, locale))}</p>
                  <p className="text-xs text-ink/75">
                    {boardLabel(o.board, locale)} ({o.board})
                  </p>
                </td>
                {/* nowrap: operator names like "Nev-Dama" must not split at the hyphen. */}
                <td className="whitespace-nowrap px-3 py-3">{o.touroperator}</td>
                <td className="whitespace-nowrap px-3 py-3 text-right">
                  {o.originalPrice && (
                    <p className="text-xs text-ink/75 line-through">{formatMoney(o.originalPrice, locale)}</p>
                  )}
                  <p className="font-display text-lg font-extrabold">{formatMoney(o.pricePerPerson, locale)}</p>
                  <p className="text-xs text-ink/75">{dict.common.perPerson}</p>
                </td>
                <td className="sticky right-0 bg-white px-4 py-3 text-right transition group-hover:bg-paper">
                  <ArrowButton href={routes.offer(locale, o.id)} label={t(tx.open, locale)} size={44} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="flex flex-col gap-3 xl:hidden">
        {offers.map((o) => (
          <li key={o.id} className="flex items-center gap-4 rounded-[1.75rem] bg-white p-4">
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{dateRangeLabel(o.departureDate, o.returnDate, locale)}</p>
              <p className="text-sm text-ink/70">
                <span className="whitespace-nowrap">
                  {o.nights} {dict.common.nights}
                </span>
                {SEP}
                <span className="whitespace-nowrap">{boardLabel(o.board, locale)}</span>
                {SEP}
                {glue(roomTypeLabel(o.roomType, locale))}
              </p>
              <p className="text-xs text-ink/75">
                <span className="whitespace-nowrap">{o.touroperator}</span>
                {o.departureAirport && (
                  <>
                    {SEP}
                    <span className="whitespace-nowrap">{airportLabel(o.departureAirport, locale)}</span>
                  </>
                )}
              </p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 font-display text-lg font-extrabold">
                <span className="whitespace-nowrap">{formatMoney(o.pricePerPerson, locale)}</span>
                <span className="whitespace-nowrap font-sans text-xs font-normal text-ink/75">{dict.common.perPerson}</span>
              </p>
            </div>
            <ArrowButton href={routes.offer(locale, o.id)} label={t(tx.open, locale)} size={48} />
          </li>
        ))}
      </ul>
    </>
  );
}
