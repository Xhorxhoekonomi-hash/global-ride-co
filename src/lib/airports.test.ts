import { describe, expect, test } from "bun:test";
import { AIRPORTS, airportPath } from "./airports";
import { KEYWORD_PAGES } from "./keyword-pages";

describe("airport handling commitments", () => {
  test.each(["amsterdam-schiphol", "milan-malpensa", "leipzig-halle"])("%s retains verified handling", slug => {
    expect(AIRPORTS.find(airport => airport.slug === slug)?.verified).toBe(true);
  });
  test("Frankfurt remains available on request, not verified", () => {
    expect(AIRPORTS.find(airport => airport.slug === "frankfurt")?.verified).toBe(false);
  });
  test("every airport has separate English and Albanian destinations", () => {
    for (const airport of AIRPORTS) {
      expect(airportPath(airport, false)).toBe(`/airfreight/${airport.slug}`);
      expect(airportPath(airport, true)).toBe(`/al/transport-ajror-makinash/${airport.slug}`);
    }
  });
  test("dedicated keyword destinations are unique and paired", () => {
    expect(new Set(KEYWORD_PAGES.map(page => page.en)).size).toBe(KEYWORD_PAGES.length);
    expect(new Set(KEYWORD_PAGES.map(page => page.sq)).size).toBe(KEYWORD_PAGES.length);
    for (const page of KEYWORD_PAGES) expect(page.sq.startsWith("/al/")).toBe(true);
  });
});