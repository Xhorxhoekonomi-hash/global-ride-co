import type {KoreaMethod} from "@/data/koreaShipping";
export type KoreaIncludes = Record<KoreaMethod, string[]>;
export const KOREA_INCLUDES: KoreaIncludes = {
  roro: ["Local pickup anywhere in South Korea", "Export documentation", "RoRo ocean freight", "Alpha Worldwide service fee"],
  container: ["Local pickup anywhere in South Korea", "Export documentation", "Shared container ocean freight (4 cars per container)", "Alpha Worldwide service fee"],
};

export const KOREA_INCLUDES_SQ: KoreaIncludes = {
  roro: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me RoRo", "Tarifa e shërbimit të Alpha Worldwide"],
  container: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me kontenier të përbashkët (4 makina për kontenier)", "Tarifa e shërbimit të Alpha Worldwide"],
};

export const KRW_TO_EUR_RATE = 1 / 1450;
