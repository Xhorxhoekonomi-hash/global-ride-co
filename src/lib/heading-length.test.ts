import { test, expect } from "vitest";
import { headingLength } from "./heading-length";
test("28 chars is short", () => expect(headingLength("a".repeat(28))).toBe("s"));
test("29 chars is medium", () => expect(headingLength("a".repeat(29))).toBe("m"));
test("48 chars is medium", () => expect(headingLength("a".repeat(48))).toBe("m"));
test("49 chars is long", () => expect(headingLength("a".repeat(49))).toBe("l"));
