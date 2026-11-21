import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { SITE_URL } from "@/lib/seo";
import { resolveRates, parseCalculatorSeries, FX_CACHE_TTL, type FxRow } from "./calculator-rates";

const cacheRequest = () => new Request(`${SITE_URL}/api/public/calculator-fx-cache`);
const workerCache = () => (globalThis.caches as (CacheStorage & { default?: Cache }) | undefined)?.default;
export async function loadCalculatorRates() {
  const cache = workerCache();
  try {
    const cached = await cache?.match(cacheRequest());
    if (cached) return resolveRates(await cached.json() as FxRow[]);
  } catch { /* Cache availability must never block the calculator. */ }
  try {
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'] ?? process.env['SUPABASE_ANON_KEY'];
    const url = process.env['SUPABASE_URL'];
    if (!key || !url) return resolveRates([]);
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data, error } = await client.from('fx_rates').select('pair,rate,source,fetched_at,rate_date');
    if (error) return resolveRates([]);
    const rows = data ?? [];
    try {
      await cache?.put(cacheRequest(), Response.json(rows, { headers: { 'Cache-Control': `public, max-age=${FX_CACHE_TTL / 1000}` } }));
    } catch { /* Database remains the durable source of truth. */ }
    return resolveRates(rows);
  } catch { return resolveRates([]); }
}
export async function refreshCalculatorRates() {
  const start = new Date(Date.now() - 10 * 86400000).toISOString().slice(0, 10);
  const response = await fetch(`https://api.frankfurter.dev/v1/${start}..?base=EUR&symbols=KRW,USD`, {
    headers: { accept: 'application/json' }, signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('FX provider unavailable');
  const rows = parseCalculatorSeries(await response.json(), new Date().toISOString());
  if (resolveRates(rows).usdEur.fallback || resolveRates(rows).eurKrw.fallback) throw new Error('FX provider data is stale');
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('fx_rates').upsert(rows, { onConflict: 'pair' });
  if (error) throw new Error('FX rates could not be saved');
  try { await workerCache()?.delete(cacheRequest()); } catch { /* Existing cache expires within an hour. */ }
  return resolveRates(rows);
}