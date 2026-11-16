import { createServerFn } from "@tanstack/react-start";
import { parseSeries, type KrwEurRate } from "./krw-eur";

const TTL = 3 * 60 * 60 * 1000; // refresh at most every 3h (ECB updates once per business day)
let cache: { at: number; value: KrwEurRate } | null = null;

export const getKrwEurRate = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ rate: KrwEurRate | null; error: string | null; cached: boolean }> => {
    if (cache && Date.now() - cache.at < TTL) return { rate: cache.value, error: null, cached: true };
    try {
      const start = new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10);
      const res = await fetch(`https://api.frankfurter.dev/v1/${start}..?base=EUR&symbols=KRW`, {
        headers: { accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const value = parseSeries(await res.json(), new Date().toISOString());
      cache = { at: Date.now(), value };
      return { rate: value, error: null, cached: false };
    } catch (e) {
      console.error("KRW/EUR fetch failed", e);
      // Serve the last good value (marked by its date) rather than nothing.
      return { rate: cache?.value ?? null, error: "unavailable", cached: !!cache };
    }
  },
);
