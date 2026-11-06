import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { AIRPORTS, airportPath } from "./airports";
import { KEYWORD_PAGES } from "./keyword-pages";

describe("airport handling commitments", () => {
  for (const slug of ["amsterdam-schiphol", "milan-malpensa", "leipzig-halle"]) {
    test(`${slug} retains verified handling`, () => {
      assert.equal(AIRPORTS.find(airport => airport.slug === slug)?.verified, true);
    });
  }
  test("Frankfurt remains available on request, not verified", () => {
    assert.equal(AIRPORTS.find(airport => airport.slug === "frankfurt")?.verified, false);
  });
  test("every airport has separate English and Albanian destinations", () => {
    for (const airport of AIRPORTS) {
      assert.equal(airportPath(airport, false), `/airfreight/${airport.slug}`);
      assert.equal(airportPath(airport, true), `/al/transport-ajror-makinash/${airport.slug}`);
    }
  });
  test("dedicated keyword destinations are unique and paired", () => {
    assert.equal(new Set(KEYWORD_PAGES.map(page => page.en)).size, KEYWORD_PAGES.length);
    assert.equal(new Set(KEYWORD_PAGES.map(page => page.sq)).size, KEYWORD_PAGES.length);
    for (const page of KEYWORD_PAGES) assert.equal(page.sq.startsWith("/al/"), true);
  });
});