# Read-only site audit (no edits, no publishing)

The audit report is the only output. No project files, settings or data change, and nothing is published.

## Scope
Every public route in EN and SQ (about 180 pages), checked on two sources:
- **Latest code**: the local preview, plus reading the source.
- **Production**: https://www.alphaworldwidealbania.com, the live published build.

Each finding is labelled **code inspection**, **local rendered test** or **live deployed test**.

## Checks (every count is given as X of N pages)
1. **SEO and metadata**: title and description (present, unique, length), canonical, og:* and twitter tags, hreflang pairs that point back to each other, JSON-LD types and validity, robots.txt, sitemap coverage versus the full route list, and HTTP status and redirects for legacy URLs.
2. **Headings**: exactly one h1 per page, no skipped heading levels, and no empty or duplicate h1s.
3. **Internal linking**: broken links, orphan pages (in the sitemap but never linked), SQ pages that link to EN pages, and how many links each page receives.
4. **Images**: real size versus displayed size, file weight, format, alt text, missing width and height, how photos are cropped on 390px and 1440px screens (so vehicles are not cut off), lazy loading, and the main above-the-fold image.
5. **Navigation**: how the header, mega menu, footer and phone menu are organized, how deep menus go, and dead ends.
6. **Bilingual consistency**: EN and SQ page counts, coverage of the EN↔SQ page map, untranslated text, and mismatched metadata.
7. **Accessibility**: axe-core automated scan on each page at 390px and 1440px, contrast, tap targets of 44px or more, form labels, focus order, and reduced-motion behavior.
8. **Performance**: total page weight, number of requests, JS and CSS size, and loading timings (TTFB, FCP, LCP, CLS) measured with Playwright. These are lab measurements in a simulated browser, not Lighthouse scores. No Google ranking figures.
9. **Analytics and consent**: whether GA4 and Clarity load before or after consent, network beacons on the live site, and how the consent banner behaves. IDs are shown only as present or absent, never their values.
10. **Search Console**: connection status and the verified property using the read-only Search Console snapshot. If no connection or data is available, that is reported as unknown.
11. **Production vs latest code**: compare titles, meta tags, sitemap, the main JS file and key page content between live and preview. Unpublished changes are listed, such as customer accounts, Korea and USA rates, and the 155 new auction locations.

## Deliverable
A detailed report saved to /mnt/documents/site-audit-2026-11-15.md, with:
- summary tables
- issues for each page, with evidence: URL, measured value and test type
- severity ranking
- what could not be verified

Recommendations are listed but not applied.
