import { test } from "node:test";
import assert from "node:assert/strict";
import { customerPath } from "./customer-paths";

test("buy origin selection navigates to each existing English import route", () => {
  assert.equal(customerPath("en", "buy", "usa"), "/import-usa");
  assert.equal(customerPath("en", "buy", "korea"), "/import-korea");
  assert.equal(customerPath("en", "buy", "uae"), "/import-uae");
  assert.equal(customerPath("en", "buy", "europe"), "/import-europe");
});
test("Albanian origins use existing localized routes and the English Europe fallback", () => {
  assert.equal(customerPath("sq", "buy", "usa"), "/al/makina-nga-amerika");
  assert.equal(customerPath("sq", "buy", "korea"), "/al/makina-nga-korea");
  assert.equal(customerPath("sq", "buy", "uae"), "/al/makina-nga-dubai");
  assert.equal(customerPath("sq", "buy", "europe"), "/import-europe");
});
test("shipping, estimates and inspections navigate to existing services in both languages", () => {
  assert.equal(customerPath("en", "ship"), "/container-shipping");
  assert.equal(customerPath("en", "estimate"), "/calculator");
  assert.equal(customerPath("en", "inspect"), "/inspection-service");
  assert.equal(customerPath("sq", "ship"), "/al/transport-me-kontenier");
  assert.equal(customerPath("sq", "estimate"), "/al/kalkulator-transporti");
  assert.equal(customerPath("sq", "inspect"), "/al/inspektim-makinash");
});