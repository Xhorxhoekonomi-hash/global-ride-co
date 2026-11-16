import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isStale, krwChangePct, krwToEur, parseSeries } from "./krw-eur";

const json = { rates: { "2026-11-13": { KRW: 1477.8 }, "2026-11-16": { KRW: 1470.23 } } };
const close = (a: number, b: number, eps = 0.005) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);

describe("KRW/EUR", () => {
  test("uses the latest ECB day and the previous one", () => {
    const r = parseSeries(json, "x");
    assert.equal(r.eurToKrw, 1470.23);
    assert.equal(r.date, "2026-11-16");
    assert.equal(r.previousEurToKrw, 1477.8);
  });
  test("converts 1,000,000 KRW to EUR", () => close(krwToEur(1_000_000, 1470.23), 680.17));
  test("change only when a previous day exists", () => {
    close(krwChangePct({ eurToKrw: 1470.23, previousEurToKrw: 1477.8 })!, 0.5149, 0.001);
    assert.equal(krwChangePct({ eurToKrw: 1470.23, previousEurToKrw: null }), null);
  });
  test("flags stale rates", () => {
    assert.equal(isStale("2026-11-16", new Date("2026-11-17T10:00:00Z")), false);
    assert.equal(isStale("2026-11-10", new Date("2026-11-17T10:00:00Z")), true);
  });
  test("rejects empty data", () => assert.throws(() => parseSeries({ rates: {} }, "x")));
});
