import { test } from "node:test";
import assert from "node:assert/strict";
import { glueLastWords } from "./HeadingWidowGuard";

test("joins the last two heading words with a non-breaking space", () => {
  assert.equal(glueLastWords("Inspection and documentation"), "Inspection and\u00a0documentation");
});

test("leaves a single word unchanged", () => {
  assert.equal(glueLastWords("Houston"), "Houston");
});
