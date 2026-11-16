// Pure helpers for the KRW↔EUR display. Source: ECB euro reference rates via Frankfurter.
export type KrwEurRate = {
  eurToKrw: number;
  date: string; // ECB reference date (YYYY-MM-DD)
  previousEurToKrw: number | null;
  previousDate: string | null;
  fetchedAt: string; // ISO time our server fetched it
  source: "European Central Bank (via Frankfurter)";
};

export function parseSeries(json: unknown, fetchedAt: string): KrwEurRate {
  const rates = (json as { rates?: Record<string, { KRW?: number }> })?.rates;
  if (!rates) throw new Error("No rates");
  const days = Object.keys(rates).filter((d) => typeof rates[d]?.KRW === "number" && rates[d]!.KRW! > 0).sort();
  if (!days.length) throw new Error("No KRW rate");
  const date = days[days.length - 1]!;
  const prev = days.length > 1 ? days[days.length - 2]! : null;
  return {
    eurToKrw: rates[date]!.KRW!,
    date,
    previousEurToKrw: prev ? rates[prev]!.KRW! : null,
    previousDate: prev,
    fetchedAt,
    source: "European Central Bank (via Frankfurter)",
  };
}

export const krwToEur = (krw: number, eurToKrw: number) => (eurToKrw > 0 && krw >= 0 ? krw / eurToKrw : 0);

/** % change of the EUR value of KRW vs the previous ECB day (positive = KRW stronger). */
export function krwChangePct(r: Pick<KrwEurRate, "eurToKrw" | "previousEurToKrw">): number | null {
  if (!r.previousEurToKrw) return null;
  return (r.previousEurToKrw / r.eurToKrw - 1) * 100;
}

/** ECB publishes on TARGET business days; older than 4 calendar days means stale. */
export function isStale(date: string, now = new Date()): boolean {
  return now.getTime() - new Date(date + "T16:00:00Z").getTime() > 4 * 86400000;
}
