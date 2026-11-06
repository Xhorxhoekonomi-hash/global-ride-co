import { describe, expect, test } from "bun:test";
import { glueLastWords } from "./HeadingWidowGuard";

describe("glueLastWords", () => {
  test("joins the last two words with a non-breaking space", () => {
    expect(glueLastWords("Inspection and documentation")).toBe("Inspection and\u00a0documentation");
  });
  test("leaves a single word unchanged", () => {
    expect(glueLastWords("Houston")).toBe("Houston");
  });
});
