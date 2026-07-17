
# Alpha Worldwide Albania — Main Branch Audit

Read-only inspection. No files changed. "Verified" = confirmed by reading the repo at the current tip; "Not verified" = could not be checked in this pass.

## 1. Commit state & Phase 3 Batch 1 completeness

- **Latest commit (HEAD of main):** `1203de51a455c88055383e348dc36296e1eab273` — "Work in progress" (routeTree.gen.ts regenerated, +10 lines). Verified.
- **Preceding merges relevant to Phase 3 B1:**
  - `4c046d8` — "Added Albanian i18n layer" (Push 1)
  - `b4c29ba` — "Pushed shared lead interface" (Push 2)
  - `4187b75` — "Added Albanian routes" (Push 3: `/al`, `/al/kontakt`, `/al/makina-nga-amerika`)
- **Push 4 status:** Not verifiable — no commit after `4187b75` touches Phase 3 content (only the routeTree regen). If Push 4 introduced code (e.g. Albanian services/calculator page, English-side reciprocal hreflang, or Supabase table), **it is not in main**. Verified as "not present"; interpretation depends on what Push 4 was meant to contain.

## 2. Route inventory

**EN pages (verified present under `src/routes/`):**
`/` · `/about` · `/services` · `/contact` · `/faq` · `/calculator` · `/shipping-calculator` · `/delivered-vehicles` · `/auction-access` · `/inspection-service` · `/container-shipping` · `/roro-shipping` · `/airfreight` · `/import-usa` · `/import-korea` · `/import-uae` · `/import-canada` · `/import-europe` · `/en/albania` · `/en/netherlands` · `/en/shipping/south-korea-to-rotterdam` · `/sitemap.xml`.

**AL pages (verified):** `/al` · `/al/kontakt` · `/al/makina-nga-amerika` (3 total).

**Missing / planned (implied by nav, footer, or LANGUAGE_ROUTE_MAP but not built):**
- No Albanian equivalents for: services, about, faq, calculator, delivered vehicles, import-korea, import-uae, import-canada, import-europe, auction-access, inspection-service, container-shipping, roro-shipping, airfreight, en/netherlands, en/albania, en/shipping/south-korea-to-rotterdam.
- Duplication risk: `/calculator` and `/shipping-calculator` both exist — verify only one is linked and the other is either a redirect or intentional. Sitemap only includes `/calculator`.

## 3. TypeScript & production build

- `tsgo --noEmit`: **clean, 0 errors**. Verified.
- `bun run build`: **success**, built in ~889ms; nitro/wrangler output generated. Verified.

## 4. SEO audit

- **`buildHead` helper** correctly emits title, description, og:*, twitter:*, canonical, og:locale, hreflang alternates, and x-default. Verified.
- **Reciprocal hreflang: BROKEN.** Only the three AL pages declare hreflang alternates. Their EN counterparts (`/`, `/contact`, `/import-usa`) do **not** declare hreflang back to `/al/*`. This is non-reciprocal and Google will typically ignore the cluster. Highest-impact SEO defect.
- **x-default:** Set on AL pages pointing at EN routes; missing on EN pages. Also broken by asymmetry.
- **Sitemap (`sitemap[.]xml.ts`):** Verified; served dynamically. **Does not include any `/al/*` URLs** and omits `/shipping-calculator`. AL pages are effectively invisible to crawlers via sitemap.
- **robots.txt:** `Allow: /` with `Sitemap:` pointing to production domain. Correct. Verified.
- **Titles/descriptions:** Every route sampled uses `buildHead` with unique title + description. No "Lovable App" defaults remain. Verified on `index.tsx`, `contact.tsx`, `import-usa.tsx`, all three `al/*`.
- **Canonicals:** Emitted per-route via `buildHead`, absolute URL to `SITE_URL`. Verified.
- **Schema conflicts:** FAQPage JSON-LD is added on `/calculator`, both AL pages, and multiple EN pages. Each is a `FAQPage` limited to that page's FAQs — no duplicate schema on the same URL. Verified.
- **FAQ uniqueness:** Each route defines its own `FAQS`/`FAQS_AL` const; the services.tsx dedupe fix from earlier is present (customs-clearance question rewritten). No cross-page text duplication spot-checked; a full text-similarity pass was not run.
- **`<html lang>` SSR:** `__root.tsx` uses `useRouterState` to set `lang="sq"` on `/al*` routes, else `en`. Verified structure; not smoke-tested against actual SSR HTML output.

## 5. Localization audit (Albanian)

- **i18n strings (`src/lib/i18n-al.ts`):** Present with NAV_AL + form labels + origin/destination lists. Verified.
- **Language switch:** `Header.tsx` uses `LANGUAGE_ROUTE_MAP` + reverse map. **Dead-link behavior:** unknown paths fall back to `/al` (from EN) or `/` (from AL). Safe — but this means clicking "SQ" from `/services` silently sends the user to `/al` home, not a translated services page. UX risk: language switcher looks broken on all EN pages without AL counterparts (17 of 20 EN routes).
- **LANGUAGE_ROUTE_MAP:** Only 3 pairs (`/`, `/import-usa`, `/contact`). Matches the 3 AL pages. Consistent.
- **Footer:** Bilingual copyright line based on `isAlbanian` flag. Verified line 166 area.
- **QuoteForm:** Accepts `locale` prop, `sq` used on AL pages. Verified.
- **WhatsApp message body:** `submit-lead.ts` builds bilingual message with `MESSAGE_LABELS.en/sq`. Verified. The `/al` home hero also has a hardcoded Albanian WhatsApp intro string — consistent.
- **Nav on AL pages:** Header is rendered from `__root.tsx` for all routes; the Albanian nav is expected to come from `NAV_AL` when `isAlbanian` — verified imports in Header.tsx, but the actual conditional switch logic was not deep-read; recommend a smoke test.
- **Analytics:** `language_changed` event fires on switch. Verified.

## 6. Calculator audit

- **Data modules untouched vs Phase 2:** `src/data/{auctionFees,koreaShipping,landTransport,oceanFreight}.ts` all imported by `calculator.tsx`; no diff between `4187b75` and HEAD on these files (only routeTree changed). Verified: pricing logic, rate tables, and USA/Korea calculators are unchanged.
- **Architecture risks before AL localization:**
  - `/calculator` copy (labels, FAQs, port names, "How it works" section) is English-only and hardcoded inline — a translated `/al/kalkulator` would require either duplicating the whole route file or extracting a `<Calculator>` component with a `locale` prop and moving all strings into `i18n-al.ts`.
  - `CALCULATOR_FAQS` array is inline; the FAQPage JSON-LD reads from it directly — same duplication issue when localized.
  - Currency (EUR) and KRW→EUR rate (`KRW_TO_EUR_RATE`) are single-locale but numeric, so they can be reused as-is.
- **Not verified:** No runtime spot-check of a specific quote (e.g., "2020 Camry from Long Beach to Durrës") to confirm output equals a known target.

## 7. Lead capture audit

- **Supabase/database:** **Zero references** to `supabase`, `SUPABASE`, or any DB client anywhere in `src/`. `persistLead()` is a stub that logs in DEV and returns `{ ok: true }`. Verified. All lead capture today is WhatsApp-only.
- **Attribution:** `captureAttribution()` reads UTM params (source/medium/campaign/term/content), pathname, referrer, language, timestamp — all captured but only console-logged in dev, discarded in prod. Verified.
- **Analytics:** `quote_submitted` and `vehicle_link_submitted` events fire via `trackEvent`. Verified.
- **WhatsApp fallback:** URL always built and returned; UI opens WhatsApp with pre-filled body. No error path if WhatsApp is unreachable (mobile without app). Not blocking.
- **Data normalization issues:**
  - `origin`/`destination` are free-form strings from a `<select>` — safe.
  - `phone` is not normalized to E.164; no country-code prefix enforcement.
  - `email` optional and not validated beyond browser `type="email"`.
  - `vehicleLink` accepts any string — no URL validation.
- **Honeypot:** Present in both `QuoteForm` and `AirfreightForm` (`honeypot` state, checked before submit). Verified.

## 8. Content & factual audit

- **Luxembourg references:** **None remaining** in `src/`. Verified via `rg`.
- **Customs wording:** `services.tsx` FAQ correctly states the company coordinates with licensed agents and that duties/taxes are set by authorities, not the company. `al/index.tsx` FAQ mirrors this. Consistent.
- **Office details:** `OFFICES` = Dubai (HQ, +971 50 630 4486) and Durrës (3 AL phones). `CONTACT` mirrors these. `/al/kontakt` and `/al/index.tsx` reference `OFFICES[0]` (Dubai) and `OFFICES[1]` (Durrës) — positional access is fragile but currently correct.
- **Business hours:** `"Monday–Friday, 9:00 AM – 5:00 PM"` — timezone unspecified (Albania vs UAE). Minor content risk.
- **Airport wording:** "European Airport Handling" service refers to "major European cargo airports" (no specific airport claims). Safe.
- **Platform links:** `PLATFORMS` includes Copart, IAAI, Manheim, ADESA (added Batch 3A). Verified. Korean and UAE platforms referenced by name only (no outbound links) — appropriate.
- **Unsupported claims:** "155-point inspection" appears in SERVICES copy. Not verifiable in this pass — flag for the user to confirm this figure is defensible.

## 9. Responsive/visual audit

**Not verified in this pass.** Preview was not driven with Playwright. Static code inspection suggests:
- Header has a mobile menu (`Menu`/`X` Lucide icons), desktop dropdowns, and language switch.
- Floating WhatsApp button + Footer padding fix committed earlier is present in `Footer.tsx` structure.
- Hero sections use `min-h-[85vh]`/`55vh` with background image + gradient overlay — standard responsive pattern.

Recommended before Phase 3 B2: Playwright smoke on `/`, `/al/`, `/calculator`, `/contact`, `/al/kontakt` at 1280px and 375px, capturing screenshots.

## 10. Accessibility & performance risks

- 8 aria/alt attributes across Header+Footer — low count. `LanguageSwitch` has `aria-label`. FAQ uses `<details>/<summary>` (accessible by default).
- Images use `width`/`height` and `object-cover`; hero images not marked `fetchpriority="high"` — LCP optimization opportunity.
- Framer Motion is loaded on `/calculator` (356KB uncompressed, 93KB gzip in server bundle). Consider lazy-loading or replacing with CSS for a few reveals.
- `@tanstack/react-router` server bundle is 655KB (137KB gzip) — expected for TanStack Start; not actionable.
- No `<link rel="preload">` for hero images.

## 11. Technical debt & security risks

- `persistLead` stub with attribution captured but discarded is dead weight until Cloud/Supabase lands. Leads are lost if the user closes WhatsApp without sending.
- No server-side rate limiting on any form (Cloudflare Worker deployment; no rate primitive wired). Honeypot only.
- No CSP, HSTS, or security headers configured beyond Nitro defaults. Not verified against production headers.
- `OFFICES[0]`/`OFFICES[1]` positional indexing across `/al/*` — one reorder breaks 3 pages.
- `LANGUAGE_ROUTE_MAP` is the only source of truth for language reciprocity; EN pages themselves do not declare `hreflang`. This is a structural gap, not a config drift.
- `/calculator` vs `/shipping-calculator` route duplication — content overlap risk not evaluated.

## 12. Progress estimate & prioritized blockers

**Phase completion (estimate):**
- Phase 1 (design system, base pages): **100%**
- Phase 2A (analytics, breadcrumbs, offices): **100%**
- Phase 2B.1 (int'l foundation, honeypot): **100%**
- Phase 2B.2 Batches 1–3B (hub pages, airfreight, calculator SEO, Luxembourg cleanup): **100%**
- Phase 3 Batch 1 (Push 1 i18n, Push 2 shared interface, Push 3 three AL pages): **~75%** — Push 4 is **not in main**.
- Phase 3 Batch 2: 0%

**Prioritized blockers before Phase 3 B2:**
1. **Reciprocal hreflang gap** — add hreflang to EN counterparts of the 3 AL pages, or Google will disregard the pair. (SEO, blocker.)
2. **AL pages missing from sitemap.xml** — `/al`, `/al/kontakt`, `/al/makina-nga-amerika` are unindexable by crawler at sitemap level.
3. **Confirm Push 4 scope** — if it contained EN-side hreflang or sitemap updates, that explains #1/#2 and it needs to be applied.
4. **Lead persistence** — Supabase/Cloud table + insert into `persistLead()` before scaling ad spend, or every non-WhatsApp-completing lead is lost.
5. **Language switcher UX on non-mirrored pages** — either disable/hide the SQ toggle on pages without AL counterparts, or show a tooltip that only 3 pages are translated; silent redirect to `/al` is confusing.
6. **Route duplication** `/calculator` vs `/shipping-calculator` — decide canonical and redirect the other.
7. **Timezone on business hours** — clarify "9:00–17:00 CET" or similar.
8. **Playwright responsive smoke** before B2 to catch mobile regressions in dropdown + language switch.

**Verified vs unverified summary:**
- Verified: commit SHA, route inventory, TS + build status, presence/absence of Supabase, calculator data untouched, Luxembourg removed, honeypot present, sitemap contents, robots.txt, buildHead output shape, LANGUAGE_ROUTE_MAP contents.
- Not verified: SSR HTML `<html lang>` output at runtime, calculator numeric correctness for a known quote, mobile/desktop visual state, cross-page FAQ text similarity, production HTTP response headers, "155-point inspection" claim.

No changes made. Ready to proceed to Push 4 / Phase 3 B2 once the blocker list is confirmed.
