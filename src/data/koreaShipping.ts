import type { Destination } from "./oceanFreight";

export type KoreaVehicleType = "Sedan/Coupe" | "SUV/Minivan" | "Oversized";
export type KoreaMethod = "roro" | "container";
type Rates = Record<KoreaVehicleType, number>;

// Shipping package only; customs/import taxes are excluded.
export const KOREA_SHIPPING = {
  Albania: {
    roro: { "Sedan/Coupe": 1750, "SUV/Minivan": 1850, Oversized: 1950 },
    container: { "Sedan/Coupe": 1090, "SUV/Minivan": 1090, Oversized: 1090 },
  },
  Germany: {
    roro: { "Sedan/Coupe": 1000, "SUV/Minivan": 1000, Oversized: 1000 },
  },
  Netherlands: {
    roro: { "Sedan/Coupe": 1000, "SUV/Minivan": 1000, Oversized: 1000 },
  },
} satisfies Record<Destination, Partial<Record<KoreaMethod, Rates>>>;

export const KOREA_METHODS_BY_DESTINATION: Record<Destination, readonly KoreaMethod[]> = {
  Albania: ["roro", "container"],
  Germany: ["roro"],
  Netherlands: ["roro"],
};

export function getKoreaShipping(destination: Destination, type: KoreaVehicleType, method: KoreaMethod): number {
  const rates: Partial<Record<KoreaMethod, Rates>> = KOREA_SHIPPING[destination];
  const selected = rates[method];
  if (!selected) throw new Error(`Shipping method ${method} is unavailable for ${destination}`);
  return selected[type];
}

export type KoreaIncludes = Record<KoreaMethod, string[]>;
export const KOREA_INCLUDES: KoreaIncludes = {
  roro: ["Local pickup anywhere in South Korea", "Export documentation", "RoRo ocean freight", "Alpha Worldwide service fee"],
  container: ["Local pickup anywhere in South Korea", "Export documentation", "Shared container ocean freight (4 cars per container)", "Alpha Worldwide service fee"],
};

export const KOREA_INCLUDES_SQ: KoreaIncludes = {
  roro: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me RoRo", "Tarifa e shërbimit të Alpha Worldwide"],
  container: ["Tërheqje lokale kudo në Korenë e Jugut", "Dokumentacioni i eksportit", "Transport detar me kontenier të përbashkët (4 makina për kontenier)", "Tarifa e shërbimit të Alpha Worldwide"],
};

export { KRW_TO_EUR_RATE } from "@/components/calculator/korea-public";
