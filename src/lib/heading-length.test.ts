import { test } from "node:test";
import assert from "node:assert/strict";
import { headingLength } from "./heading-length";
test("a 28-character hero title is short", () => assert.equal(headingLength("a".repeat(28)), "s"));
test("a 29-character hero title is medium", () => assert.equal(headingLength("a".repeat(29)), "m"));
test("a 48-character hero title is medium", () => assert.equal(headingLength("a".repeat(48)), "m"));
test("a 49-character hero title is long", () => assert.equal(headingLength("a".repeat(49)), "l"));
