import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { mediaLayout } from "./media-layouts";

describe("purpose-specific media layouts", () => {
  test("localized routes retain the same presentation family", () => {
    for (const [en, sq] of [["/import-usa", "/al/makina-nga-amerika"], ["/import-korea", "/al/makina-nga-korea"], ["/container-shipping", "/al/transport-me-kontenier"], ["/airfreight", "/al/transport-ajror-makinash"], ["/inspection-service", "/al/inspektim-makinash"], ["/contact", "/al/kontakt"]]) {
      assert.equal(mediaLayout(en), mediaLayout(sq));
    }
  });
  test("articles lead with typography instead of inheriting shipping or market layouts", () => {
    assert.equal(mediaLayout("/guides/container-vs-roro-car-shipping"), "editorial");
    assert.equal(mediaLayout("/guides/how-to-buy-a-car-from-usa-auctions"), "editorial");
    assert.equal(mediaLayout("/guides/"), "editorial");
  });
  test("proof, brand story and shopper routes have deliberate archetypes", () => {
    assert.equal(mediaLayout("/reviews"), "gallery");
    assert.equal(mediaLayout("/delivered-vehicles"), "gallery");
    assert.equal(mediaLayout("/about"), "service");
    assert.equal(mediaLayout("/import-germany"), "market");
    assert.equal(mediaLayout("/en/shipping/south-korea-to-rotterdam"), "logistics");
  });
});