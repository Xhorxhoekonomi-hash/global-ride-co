import { test } from "node:test";
import assert from "node:assert/strict";
import { glueLastWords } from "./HeadingWidowGuard";

test("joins the last two heading words with a non-breaking space", () => {
  assert.equal(glueLastWords("Inspection and documentation"), "Inspection and\u00a0documentation");
});

test("leaves a single word unchanged", () => {
  assert.equal(glueLastWords("Houston"), "Houston");
});

test("binds the phrase after an em dash so the break falls before the dash", async () => {
  const { bindDashPhrase } = await import("./HeadingWidowGuard");
  assert.equal(bindDashPhrase("From Choosing a Vehicle to Collection — Ten Steps, One Team"), "From Choosing a Vehicle to Collection —\u00a0Ten\u00a0Steps,\u00a0One\u00a0Team");
  assert.equal(bindDashPhrase("No dash here"), "No dash here");
});
