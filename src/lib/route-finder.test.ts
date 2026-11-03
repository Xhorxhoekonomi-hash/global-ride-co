import { test } from "node:test";
import assert from "node:assert/strict";
import { routeFinderTarget, quotePrefill, calculatorPrefill } from "./route-finder";

test("USA goes to the calculator with prefill", () => {
  assert.deepEqual(routeFinderTarget("en", "USA", "Albania", "Car / SUV"), { to: "/calculator", search: { from: "usa", to: "Albania", vehicle: "Car / SUV" } });
});
test("South Korea goes to the SQ calculator", () => {
  assert.equal(routeFinderTarget("sq", "South Korea", "Germany", "Other").to, "/al/kalkulator-transporti");
});
test("Dubai and Canada go to the contact form", () => {
  assert.deepEqual(routeFinderTarget("en", "UAE", "Kosovo", "Motorcycle"), { to: "/contact", search: { from: "UAE", to: "Kosovo", vehicle: "Motorcycle" } });
  assert.equal(routeFinderTarget("sq", "Canada", "Italy", "Other").to, "/al/kontakt");
});
test("quote prefill maps unknown destination to Other and writes message", () => {
  const p = quotePrefill(new URLSearchParams("from=UAE&to=Kosovo&vehicle=Motorcycle"), ["USA", "UAE"], ["Albania", "Other"]);
  assert.deepEqual(p, { origin: "UAE", destination: "Other", message: "From: UAE\nTo: Kosovo\nVehicle: Motorcycle" });
});
test("calculator prefill only accepts rate-table destinations", () => {
  assert.deepEqual(calculatorPrefill(new URLSearchParams("from=korea&to=Netherlands")), { tab: "korea", destination: "Netherlands" });
  assert.deepEqual(calculatorPrefill(new URLSearchParams("from=usa&to=Kosovo")), { tab: "usa", destination: undefined });
});
