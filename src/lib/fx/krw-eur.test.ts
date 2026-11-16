import { describe, expect, it } from "vitest";
import { isStale, krwChangePct, krwToEur, parseSeries } from "./krw-eur";

const json = { rates: { "2026-11-13": { KRW: 1477.8 }, "2026-11-16": { KRW: 1470.23 } } };

describe("KRW/EUR", () => {
  it("uses the latest ECB day and the previous one", () => {
    const r = parseSeries(json, "x");
    expect(r.eurToKrw).toBe(1470.23);
    expect(r.date).toBe("2026-11-16");
    expect(r.previousEurToKrw).toBe(1477.8);
  });
  it("converts 1,000,000 KRW to EUR", () => {
    expect(krwToEur(1_000_000, 1470.23)).toBeCloseTo(680.17, 2);
  });
  it("change only when a previous day exists", () => {
    expect(krwChangePct({ eurToKrw: 1470.23, previousEurToKrw: 1477.8 })).toBeCloseTo(0.5149, 3);
    expect(krwChangePct({ eurToKrw: 1470.23, previousEurToKrw: null })).toBeNull();
  });
  it("flags stale rates", () => {
    expect(isStale("2026-11-16", new Date("2026-11-17T10:00:00Z"))).toBe(false);
    expect(isStale("2026-11-10", new Date("2026-11-17T10:00:00Z"))).toBe(true);
  });
  it("rejects empty data", () => {
    expect(() => parseSeries({ rates: {} }, "x")).toThrow();
  });
});
