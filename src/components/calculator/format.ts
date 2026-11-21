// Source: xe.com mid-market rates, updated 21 Nov 2026
export const USD_TO_EUR = 0.9117;
export const RATES_UPDATED = "2026-11-21";

export const ratesUpdatedLabel = (locale: "en-GB" | "sq-AL") => {
  const date = new Date(`${RATES_UPDATED}T00:00:00Z`);
  // Explicit SQ month names also work on runtimes without Albanian ICU data.
  if (locale === "sq-AL") {
    const months = ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"];
    return `${date.getUTCDate()} ${months[date.getUTCMonth()] ?? ""} ${date.getUTCFullYear()}`;
  }
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
};

export const fmt = (n: number, currency: "$" | "€" = "$") =>
  `${currency}${Math.round(n).toLocaleString("en-US")}`;

export const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

export function toTitle(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
