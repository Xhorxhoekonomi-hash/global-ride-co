import { test } from "node:test";
import assert from "node:assert/strict";
import { buildHead, derivedHreflang, siteGraph, SITE_URL } from "./seo";

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

test("the office graph uses the owner's verified Google Maps details", () => {
  const office = JSON.parse(siteGraph("en").children)["@graph"][0].department[0];
  assert.equal(office.name, "Alpha Worldwide Albania");
  assert.deepEqual(office.address, { "@type": "PostalAddress", streetAddress: "Rruga Hafiz Podgorica", addressLocality: "Durrës", postalCode: "2001", addressCountry: "AL" });
  assert.deepEqual(office.geo, { "@type": "GeoCoordinates", latitude: 41.3173012, longitude: 19.4492877 });
  assert.equal(office.telephone, "+355 69 223 3416");
  assert.equal(office.email, "info@alphaworldwidealbania.com");
  assert.equal(office.url, SITE_URL);
  assert.equal(office.hasMap, "https://maps.app.goo.gl/FRhPvdgR3h79varSA");
  assert.deepEqual(office.openingHoursSpecification, { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" });
  assert.match(office.image, /^https:\/\//);
  assert.deepEqual(office.parentOrganization, { "@id": `${SITE_URL}/#organization` });
  assert.equal(office.aggregateRating, undefined);
  assert.equal(office.review, undefined);
});

test("both contact graphs reuse the office identity and localize their page", () => {
  const office = JSON.parse(siteGraph("en").children)["@graph"][0].department[0];
  for (const [lang, path] of [["en", "/contact"], ["sq", "/al/kontakt"]] as const) {
    const graph = JSON.parse(siteGraph(lang, path).children)["@graph"];
    assert.deepEqual(graph[0], office);
    assert.equal(graph[1].inLanguage, lang);
    assert.deepEqual(graph[1].mainEntity, { "@id": office["@id"] });
  }
});
