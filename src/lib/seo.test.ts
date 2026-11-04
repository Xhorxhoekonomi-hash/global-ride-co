import { describe, expect, it } from "vitest";
import { buildHead, derivedHreflang } from "./seo";

describe("derived hreflang", () => {
  it("pairs an English page with its Albanian counterpart", () => {
    expect(derivedHreflang("/airfreight", "en").hreflang).toEqual([
      { lang: "en", path: "/airfreight" },
      { lang: "sq", path: "/al/transport-ajror-makinash" },
    ]);
  });
  it("pairs an Albanian page back to English with English x-default", () => {
    const r = derivedHreflang("/al/transport-roro", "sq");
    expect(r.hreflang).toEqual([{ lang: "en", path: "/roro-shipping" }, { lang: "sq", path: "/al/transport-roro" }]);
    expect(r.xDefault).toBe("/roro-shipping");
  });
  it("adds alternates to heads that declare none", () => {
    const { links } = buildHead({ title: "t", description: "d", path: "/container-shipping" });
    expect(links.filter((l) => l.rel === "alternate").map((l) => l.hreflang)).toEqual(["en", "sq", "x-default"]);
  });
});
