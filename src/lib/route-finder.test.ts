import { describe, expect, test } from "bun:test";
import { routeFinderTarget, quotePrefill, calculatorPrefill } from "./route-finder";

describe("route finder", () => {
  test("USA goes to the calculator with prefill", () => {
    expect(routeFinderTarget("en", "USA", "Albania", "Car / SUV")).toEqual({ to: "/calculator", search: { from: "usa", to: "Albania", vehicle: "Car / SUV" } });
  });
  test("South Korea goes to the SQ calculator", () => {
    expect(routeFinderTarget("sq", "South Korea", "Germany", "Other").to).toBe("/al/kalkulator-transporti");
  });
  test("Dubai goes to the contact form", () => {
    expect(routeFinderTarget("en", "UAE", "Kosovo", "Motorcycle")).toEqual({ to: "/contact", search: { from: "UAE", to: "Kosovo", vehicle: "Motorcycle" } });
    expect(routeFinderTarget("sq", "Canada", "Italy", "Other").to).toBe("/al/kontakt");
  });
  test("quote prefill maps unknown destination to Other and writes message", () => {
    const p = quotePrefill(new URLSearchParams("from=UAE&to=Kosovo&vehicle=Motorcycle"), ["USA", "UAE"], ["Albania", "Other"]);
    expect(p).toEqual({ origin: "UAE", destination: "Other", message: "From: UAE\nTo: Kosovo\nVehicle: Motorcycle" });
  });
  test("calculator prefill only accepts rate-table destinations", () => {
    expect(calculatorPrefill(new URLSearchParams("from=korea&to=Netherlands"))).toEqual({ tab: "korea", destination: "Netherlands" });
    expect(calculatorPrefill(new URLSearchParams("from=usa&to=Kosovo"))).toEqual({ tab: "usa", destination: undefined });
  });
});
