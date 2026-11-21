import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fallbackRates, resolveRates, validFxRate, parseCalculatorSeries, FX_SOURCE, type FxRow } from './calculator-rates';
import { calculateKorea, calculateUsa } from '@/lib/customer/calculate.server';
import { convertKoreaPrice } from '@/components/calculator/korea-public';

const now = Date.parse('2026-11-21T21:00:00Z');
const rows: FxRow[] = [
  { pair: 'USD_EUR', rate: 0.8, source: FX_SOURCE, fetched_at: '2026-11-21T06:00:00Z', rate_date: '2026-11-20' },
  { pair: 'EUR_KRW', rate: 1500, source: FX_SOURCE, fetched_at: '2026-11-21T06:00:00Z', rate_date: '2026-11-20' },
];
test('missing FX rows fall back to USD 0.9117 and EUR/KRW 1474', () => {
  const r = resolveRates([], now);
  assert.equal(r.usdEur.rate, 0.9117); assert.equal(r.eurKrw.rate, 1474);
  assert.equal(r.usdEur.fallback, true); assert.equal(r.eurKrw.fallback, true);
});
test('FX fetch older than four days falls back', () => {
  const r = resolveRates(rows.map(v => ({ ...v, fetched_at: '2026-11-17T20:59:59Z' })), now);
  assert.equal(r.usdEur.rate, 0.9117); assert.equal(r.eurKrw.rate, 1474);
});
test('old ECB reference date falls back even when recently fetched', () => {
  const r = resolveRates(rows.map(v => ({ ...v, rate_date: '2026-11-16' })), now);
  assert.equal(r.usdEur.fallback, true); assert.equal(r.eurKrw.fallback, true);
});
test('invalid FX rates and timestamps fall back independently', () => {
  for (const rate of [0.59, 1.41, NaN, Infinity]) {
    assert.equal(resolveRates([{ ...rows[0] as FxRow, rate }], now).usdEur.rate, 0.9117);
  }
  for (const rate of [999, 2501, NaN]) assert.equal(resolveRates([{ ...rows[1] as FxRow, rate }], now).eurKrw.rate, 1474);
  assert.equal(resolveRates(rows.map(v => ({ ...v, fetched_at: 'not-a-date' })), now).usdEur.fallback, true);
  assert.equal(resolveRates(rows.map(v => ({ ...v, fetched_at: '2026-11-22T06:00:00Z' })), now).usdEur.fallback, true);
});
test('USD validation uses inclusive 0.6–1.4 bounds', () => {
  for (const v of [0.6, 0.9, 1.4]) assert.equal(validFxRate('USD_EUR', v), true);
  for (const v of [0.5999, 1.4001, 0, NaN]) assert.equal(validFxRate('USD_EUR', v), false);
});
test('KRW validation uses inclusive 1000–2500 bounds', () => {
  for (const v of [1000, 1474, 2500]) assert.equal(validFxRate('EUR_KRW', v), true);
  for (const v of [999.99, 2500.01, 0, Infinity]) assert.equal(validFxRate('EUR_KRW', v), false);
});
test('same-day ECB parser inverts USD and rejects out-of-range data', () => {
  const result = parseCalculatorSeries({ rates: { '2026-11-20': { USD: 1.25, KRW: 1500 } } }, new Date(now).toISOString());
  assert.equal(result[0]?.rate, 0.8); assert.equal(result[1]?.rate, 1500);
  assert.equal(result[0]?.rate_date, '2026-11-20');
  assert.throws(() => parseCalculatorSeries({ rates: { '2026-11-20': { USD: 10, KRW: 1500 } } }, new Date(now).toISOString()));
});
test('Korea totals use injected rates, with unchanged shipping costs', () => {
  const rates = resolveRates(rows, now);
  const base = { type: 'Sedan/Coupe', currency: 'USD', price: 10000 };
  assert.equal(calculateKorea({ ...base, destination: 'Albania', method: 'roro' }, rates).totalEur, 9750);
  assert.equal(calculateKorea({ ...base, destination: 'Albania', method: 'container' }, rates).totalEur, 9090);
  assert.equal(calculateKorea({ ...base, destination: 'Germany', method: 'roro' }, rates).totalEur, 9000);
});
test('server/client conversion equality holds for every currency and returned snapshot', () => {
  const rates = resolveRates(rows, now);
  for (const currency of ['USD', 'KRW', 'EUR'] as const) {
    const client = convertKoreaPrice(currency, 15000000, rates);
    const server = calculateKorea({ type: 'Sedan/Coupe', currency, price: 15000000, destination: 'Albania', method: 'roro' }, rates);
    assert.equal(server.priceEur, client.priceEur); assert.equal(server.priceKrw, client.priceKrw);
    assert.deepEqual(server.fxRates, rates);
  }
});
test('USA EUR totals use the injected USD rate without changing USD costs', () => {
  const input = { location: 'IAAI HOUSTON SOUTH', size: 'Sedan/Standard', bid: 10000, isEV: false, destination: 'Albania' };
  const rates = resolveRates(rows, now);
  const live = calculateUsa(input, rates), fallback = calculateUsa(input, fallbackRates());
  assert.equal(live.totalUsd, fallback.totalUsd);
  assert.equal(live.totalEur, live.totalUsd * 0.8);
  assert.deepEqual(live.fxRates, rates);
});