/** RouteFinder destination resolution — presentation only, never touches calculator math. */
export const RF_ORIGINS = ["USA", "South Korea", "UAE", "Canada", "Europe"] as const;
export const RF_DESTINATIONS = ["Albania", "Kosovo", "Germany", "Netherlands", "Belgium", "France", "Italy", "Other"] as const;
export const RF_VEHICLES = ["Car / SUV", "Pickup / Van", "Motorcycle", "Other"] as const;
export type RfOrigin = (typeof RF_ORIGINS)[number];
export type RfDestination = (typeof RF_DESTINATIONS)[number];
export type RfVehicle = (typeof RF_VEHICLES)[number];

/** Origins backed by real rate tables in the calculator. */
const CALCULATOR_ORIGINS: Partial<Record<RfOrigin, "usa" | "korea">> = { USA: "usa", "South Korea": "korea" };

export function routeFinderTarget(locale: "en" | "sq", from: RfOrigin, to: RfDestination, vehicle: RfVehicle) {
  const calc = CALCULATOR_ORIGINS[from];
  if (calc) return { to: locale === "sq" ? "/al/kalkulator-transporti" : "/calculator", search: { from: calc, to, vehicle } };
  return { to: locale === "sq" ? "/al/kontakt" : "/contact", search: { from, to, vehicle } };
}

/** Reads ?from=&to=&vehicle= for the quote form; unknown values fall back. */
export function quotePrefill(params: URLSearchParams, originValues: string[], destinationValues: string[]) {
  const from = params.get("from"); const to = params.get("to"); const vehicle = params.get("vehicle");
  if (!from && !to && !vehicle) return null;
  return {
    origin: from && originValues.includes(from) ? from : undefined,
    destination: to ? (destinationValues.includes(to) ? to : "Other") : undefined,
    message: [from && `From: ${from}`, to && `To: ${to}`, vehicle && `Vehicle: ${vehicle}`].filter(Boolean).join("\n"),
  };
}

/** Reads calculator prefill: tab + destination only where a rate table exists. */
export function calculatorPrefill(params: URLSearchParams) {
  const from = params.get("from"); const to = params.get("to");
  const tab = from === "korea" ? "korea" : from === "usa" ? "usa" : undefined;
  const destination = to === "Albania" || to === "Germany" || to === "Netherlands" ? to : undefined;
  return { tab, destination } as { tab?: "usa" | "korea"; destination?: "Albania" | "Germany" | "Netherlands" };
}
