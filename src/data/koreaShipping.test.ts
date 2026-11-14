import { test } from "node:test";
import assert from "node:assert/strict";
import { getKoreaShipping, KOREA_METHODS_BY_DESTINATION, type KoreaVehicleType, type KoreaMethod } from "./koreaShipping";

const albania: [KoreaVehicleType, KoreaMethod, number][] = [
  ["Sedan/Coupe", "roro", 1750], ["SUV/Minivan", "roro", 1850], ["Oversized", "roro", 1950],
  ["Sedan/Coupe", "container", 1090], ["SUV/Minivan", "container", 1090], ["Oversized", "container", 1090],
];
for (const [type, method, expected] of albania) {
  test(`Albania ${type} ${method} costs EUR ${expected}`, () => {
    assert.equal(getKoreaShipping("Albania", type, method), expected);
    assert.equal(10000 + getKoreaShipping("Albania", type, method), 10000 + expected);
  });
}
for (const destination of ["Germany", "Netherlands"] as const) {
  for (const type of ["Sedan/Coupe", "SUV/Minivan", "Oversized"] as const) {
    test(`${destination} ${type} stays EUR 1000 RoRo`, () => assert.equal(getKoreaShipping(destination, type, "roro"), 1000));
  }
  test(`${destination} has no container option`, () => {
    assert.deepEqual(KOREA_METHODS_BY_DESTINATION[destination], ["roro"]);
    assert.throws(() => getKoreaShipping(destination, "Sedan/Coupe", "container"));
  });
}
test("Albania offers both methods", () => assert.deepEqual(KOREA_METHODS_BY_DESTINATION.Albania, ["roro", "container"]));