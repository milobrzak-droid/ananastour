"use client";

/**
 * GET form with a <select> that submits itself on change. Without JS the
 * <noscript> button submits it, so sorting still works.
 */
export function SortSelect({
  action,
  name,
  value,
  options,
  hidden,
  label,
  submitLabel,
}: {
  action: string;
  name: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  /** Other query params to keep, as [key, value] pairs. */
  hidden: Array<[string, string]>;
  label: string;
  submitLabel: string;
}) {
  return (
    <form action={action} method="get" className="flex items-center gap-2">
      {hidden.map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <label className="flex items-center gap-2 text-sm">
        <span className="sr-only text-ink/75 sm:not-sr-only sm:inline">{label}</span>
        <select
          name={name}
          defaultValue={value}
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
          className="shape-pill border-2 border-ink/15 bg-white px-4 py-2 text-sm font-semibold focus:border-ink focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <noscript>
        <button type="submit" className="shape-pill bg-ink px-4 py-2 text-sm font-semibold text-paper">
          {submitLabel}
        </button>
      </noscript>
    </form>
  );
}
