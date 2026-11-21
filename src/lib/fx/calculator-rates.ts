import { USD_TO_EUR, RATES_UPDATED } from "@/components/calculator/format";
import { KRW_TO_EUR_RATE } from "@/components/calculator/korea-public";
import { parseSeries } from "./krw-eur";
import { z } from "zod";

export const FX_SOURCE = "European Central Bank (via Frankfurter)";
export const FX_MAX_AGE = 4 * 86400000;
export const FX_CACHE_TTL = 3600000;
export type FxPair = "USD_EUR" | "EUR_KRW";
export type FxRow = { pair: string; rate: number; source: string; fetched_at: string; rate_date: string };
export type FxValue = { rate: number; date: string; fetchedAt: string; source: string; fallback: boolean };
export type CalculatorRates = { usdEur: FxValue; eurKrw: FxValue };
export const validFxRate = (pair: FxPair, rate: number) => Number.isFinite(rate) &&
  (pair === "USD_EUR" ? rate >= 0.6 && rate <= 1.4 : rate >= 1000 && rate <= 2500);
export function fallbackRates(): CalculatorRates {
  const base = { date: RATES_UPDATED, fetchedAt: `${RATES_UPDATED}T00:00:00Z`, source: "Owner-approved xe.com reference (fallback)", fallback: true };
  return { usdEur: { ...base, rate: USD_TO_EUR }, eurKrw: { ...base, rate: Math.round(1 / KRW_TO_EUR_RATE) } };
}
export function resolveRates(rows: readonly FxRow[], now = Date.now()): CalculatorRates {
  const fallback = fallbackRates();
  const pick = (pair: FxPair, backup: FxValue): FxValue => {
    const row = rows.find(r => r.pair === pair);
    if (!row || !validFxRate(pair, Number(row.rate)) || !row.source.trim()) return backup;
    const fetched = Date.parse(row.fetched_at), dated = Date.parse(`${row.rate_date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.rate_date) || !Number.isFinite(fetched) || !Number.isFinite(dated) ||
      fetched > now + 60000 || dated > now + 60000 || now - fetched > FX_MAX_AGE || now - dated > FX_MAX_AGE) return backup;
    return { rate: Number(row.rate), date: row.rate_date, fetchedAt: row.fetched_at, source: row.source, fallback: false };
  };
  return { usdEur: pick("USD_EUR", fallback.usdEur), eurKrw: pick("EUR_KRW", fallback.eurKrw) };
}
const seriesSchema = z.object({ rates: z.record(z.object({ USD: z.number().positive(), KRW: z.number().positive() })) });
/** Reuses the existing ECB/Frankfurter KRW parser; USD is inverted from the same EUR-base day. */
export function parseCalculatorSeries(json: unknown, fetchedAt: string): FxRow[] {
  const series = seriesSchema.parse(json);
  const krw = parseSeries(series, fetchedAt);
  const usd = series.rates[krw.date]?.USD;
  if (!usd) throw new Error("Missing same-day USD rate");
  // Every displayed decimal is identical to the rate used in calculations.
  const usdEur = Math.round((1 / usd) * 1e8) / 1e8;
  if (!validFxRate("USD_EUR", usdEur) || !validFxRate("EUR_KRW", krw.eurToKrw)) throw new Error("FX rate outside approved bounds");
  return [
    { pair: "USD_EUR", rate: usdEur, source: FX_SOURCE, fetched_at: fetchedAt, rate_date: krw.date },
    { pair: "EUR_KRW", rate: krw.eurToKrw, source: FX_SOURCE, fetched_at: fetchedAt, rate_date: krw.date },
  ];
}
export function fxDate(date: string, sq: boolean) {
  const value = new Date(`${date}T00:00:00Z`);
  if (sq) {
    const months = ["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor"];
    return `${value.getUTCDate()} ${months[value.getUTCMonth()] ?? ""} ${value.getUTCFullYear()}`;
  }
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(value);
}
export const fxNumber = (rate: number, sq: boolean, digits = 8) => rate.toLocaleString(sq ? "de-DE" : "en-US", { maximumFractionDigits: digits });
export function usdRateNote(rates: CalculatorRates, sq: boolean) {
  const v = rates.usdEur;
  return sq
    ? `* USD→EUR në ${fxNumber(v.rate, true)} (kurs mesatar i tregut, përditësuar më ${fxDate(v.date, true)}) · ${v.source}${v.fallback ? " · kurs rezervë" : ""}`
    : `* USD→EUR at ${fxNumber(v.rate, false)} (mid-market rate, updated ${fxDate(v.date, false)}) · ${v.source}${v.fallback ? " · fallback rate" : ""}`;
}
export function koreaRateHelper(converted: string, rates: CalculatorRates, sq: boolean) {
  const v = rates.eurKrw;
  return sq
    ? `≈ ${converted} (₩${fxNumber(v.rate, true)} = €1, përditësuar më ${fxDate(v.date, true)}) · ${v.source}${v.fallback ? " · kurs rezervë" : ""}`
    : `≈ ${converted} (₩${fxNumber(v.rate, false)} = €1, updated ${fxDate(v.date, false)}) · ${v.source}${v.fallback ? " · fallback rate" : ""}`;
}