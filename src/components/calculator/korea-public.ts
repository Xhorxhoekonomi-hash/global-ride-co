import type {KoreaMethod} from "@/data/koreaShipping";
import {USD_TO_EUR} from "./format";
import type { CalculatorRates } from "@/lib/fx/calculator-rates";
export type KoreaIncludes = Record<KoreaMethod, string[]>;
export const KOREA_INCLUDES: KoreaIncludes = {
  roro: ["Local pickup anywhere in South Korea", "Export documentation", "RoRo ocean freight", "Alpha Worldwide service fee"],
  container: ["Local pickup anywhere in South Korea", "Export documentation", "Shared container ocean freight (4 cars per container)", "Alpha Worldwide service fee"],
};

export const KOREA_INCLUDES_SQ: KoreaIncludes = {
  roro: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me RoRo", "Tarifa e shërbimit të Alpha Worldwide"],
  container: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me kontenier të përbashkët (4 makina për kontenier)", "Tarifa e shërbimit të Alpha Worldwide"],
};

// Source: xe.com mid-market rates, updated 21 Nov 2026
export const KRW_TO_EUR_RATE = 1 / 1474;

export type KoreaCurrency = "KRW" | "USD" | "EUR";
export const KOREA_CURRENCIES: readonly KoreaCurrency[] = ["KRW", "USD", "EUR"];
export const KOREA_CURRENCY_SYMBOL: Record<KoreaCurrency, string> = { KRW: "₩", USD: "$", EUR: "€" };
/** Shared by the browser and the authenticated server calculation so both agree. */
export function convertKoreaPrice(currency: KoreaCurrency, price: number, rates?: CalculatorRates) {
  const usdEur = rates?.usdEur.rate ?? USD_TO_EUR;
  const eurKrw = rates?.eurKrw.rate ?? Math.round(1 / KRW_TO_EUR_RATE);
  const priceEur = currency === "KRW" ? price / eurKrw : currency === "USD" ? price * usdEur : price;
  return { priceEur, priceKrw: priceEur * eurKrw, priceUsd: priceEur / usdEur };
}
