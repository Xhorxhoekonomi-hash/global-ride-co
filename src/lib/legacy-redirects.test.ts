import { test } from "node:test";
import assert from "node:assert/strict";
import { legacyRedirect } from "./legacy-redirects";

const CASES: [string, string][] = [
  ["/car-shipping-services", "/services"],
  ["/about-us", "/about"],
  ["/sq", "/al"],
  ["/sq/about-us", "/al/rreth-nesh"],
  ["/sq/contact", "/al/kontakt"],
  ["/sq/reviews", "/al/pervoja-e-klienteve"],
  ["/sq/car-shipping-services", "/al/sherbimet"],
  ["/sq/anything-else", "/al"],
  ["/de", "/"],
  ["/it", "/"],
  ["/de/contact", "/contact"],
  ["/it/contact", "/contact"],
  ["/it/about-us", "/about"],
  ["/de/about-us", "/about"],
  ["/it/reviews", "/reviews"],
  ["/de/reviews", "/reviews"],
  ["/it/car-shipping-services", "/services"],
  ["/de/car-shipping-services", "/services"],
  ["/de/something", "/"],
  ["/it/other/page", "/"],
  ["/blog", "/guides"],
  ["/blog/some-post", "/guides"],
  ["/post/some-post", "/guides"],
  ["/home", "/"],
  ["/al/", "/al"],
];

for (const [from, to] of CASES) {
  test(`${from} redirects to ${to}`, () => assert.equal(legacyRedirect(from), to));
  if (from !== "/al/") test(`${from}/ (trailing slash) redirects to ${to}`, () => assert.equal(legacyRedirect(`${from}/`), to));
}

test("live pages and unknown URLs are not redirected", () => {
  for (const p of ["/", "/al", "/services", "/about", "/guides/copart-vs-iaai", "/nope-xyz", "/delivery", "/italy"]) assert.equal(legacyRedirect(p), null);
});
