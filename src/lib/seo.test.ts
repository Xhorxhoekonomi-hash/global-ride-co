import { test } from "node:test";
import assert from "node:assert/strict";
import { buildHead, derivedHreflang } from "./seo";

test("an English page is paired with its Albanian counterpart", () => {
  assert.deepEqual(derivedHreflang("/airfreight", "en").hreflang, [
    { lang: "en", path: "/airfreight" },
    { lang: "sq", path: "/al/transport-ajror-makinash" },
  ]);
});

test("an Albanian page pairs back to English with English x-default", () => {
  const r = derivedHreflang("/al/transport-roro", "sq");
  assert.deepEqual(r.hreflang, [{ lang: "en", path: "/roro-shipping" }, { lang: "sq", path: "/al/transport-roro" }]);
  assert.equal(r.xDefault, "/roro-shipping");
});

test("heads that declare no alternates get en, sq and x-default", () => {
  const { links } = buildHead({ title: "t", description: "d", path: "/container-shipping" });
  assert.deepEqual(links.filter((l) => l.rel === "alternate").map((l) => l.hreflang), ["en", "sq", "x-default"]);
});
