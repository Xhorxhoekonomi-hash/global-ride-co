import { test } from "node:test";
import assert from "node:assert/strict";

/**
 * Crawls the sitemap served by the running app (BASE_URL, default the local dev server) and asserts
 * every internal href on every listed page resolves with HTTP 200.
 */
const BASE = process.env.BASE_URL ?? "http://localhost:8080";
const SITE = /^https:\/\/www\.alphaworldwidealbania\.com/;

test("every internal link on every sitemap page resolves 200", { timeout: 600_000 }, async () => {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const pages = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
  assert.ok(pages.length > 100, `sitemap lists ${pages.length} pages`);
  const status = new Map<string, number>();
  const check = async (path: string) => {
    if (!status.has(path)) status.set(path, (await fetch(`${BASE}${path}`, { redirect: "manual" })).status);
    return status.get(path)!;
  };
  const broken: string[] = [];
  for (const page of pages) {
    assert.equal(await check(page), 200, `sitemap page ${page}`);
    const html = await (await fetch(`${BASE}${page}`)).text();
    const hrefs = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map((m) => m[1].replace(SITE, ""))
      .filter((h) => h.startsWith("/") && !h.startsWith("//")).map((h) => h.split("#")[0].split("?")[0]).filter(Boolean);
    for (const h of new Set(hrefs)) if ((await check(h)) !== 200) broken.push(`${page} -> ${h} (${status.get(h)})`);
  }
  assert.deepEqual(broken, []);
});
