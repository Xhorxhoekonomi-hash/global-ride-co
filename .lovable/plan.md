# Phase 3 Batch 2 — Implementation Plan

Base commit: `949720d1`. No code changes yet. Four new Albanian routes plus a safe calculator extraction.

## 1. Current-state inspection (verified)

- **Calculator (`src/routes/calculator.tsx`, 842 lines)** — single monolithic route. Inside it:
  - `CALCULATOR_FAQS` (inline)
  - `USD_TO_EUR`, `fmt`, `fmtInt`, `toTitle` helpers (inline)
  - `DESTINATIONS`, `SIZE_OPTIONS` constants (inline)
  - `CalculatorPage` shell (hero, "How it works", Included/Excluded, Ports, FAQ, Related links)
  - `UsaCalculator` — full state machine, WhatsApp text builder, result panel
  - `KoreaCalculator` — same shape for Korea
  - Shared UI: `Step`, `StepReveal`, `Row`
  - Rate/data imports already come from `src/data/{landTransport,oceanFreight,auctionFees,koreaShipping}.ts` — **already single-source**.
- **i18n layer (`src/lib/i18n-al.ts`)** — has nav, quote-form labels, origin/destination options, platform-badge labels. No calculator dictionary yet.
- **Sitemap (`src/routes/sitemap[.]xml.ts`)** — flat `PATHS` array; currently lists 3 AL routes.
- **Header (`src/components/site/Header.tsx`)** — reads `NAV_AL` for AL nav, `LANGUAGE_ROUTE_MAP` for reciprocal switch.
- **`submit-lead.ts`** — locale-aware WhatsApp builder; `source` string is caller-supplied → analytics attribution already works per page.
- **Existing AL pattern** — `/al/makina-nga-amerika` is a good depth reference (STEPS, INCLUDED/EXCLUDED, FAQ, Service + FAQPage schema, hreflang reciprocal, QuoteForm with `locale="sq"` and `source="al-usa"`).
- **`/import-korea`** — is a valid English counterpart for `/al/makina-nga-korea` (hreflang pair viable). No English `/copart` or `/iaai` route exists → those AL pages will be self-canonical, no hreflang.

## 2. Existing files to modify

| File | Change |
|---|---|
| `src/routes/calculator.tsx` | Slim to a thin route wrapper that renders shared `<Calculator locale="en" />`. **No behavior change.** |
| `src/lib/i18n-al.ts` | Add `CALCULATOR_DICT_AL` (all UI strings for calculator) and `CALCULATOR_FAQS_AL`. |
| `src/routes/sitemap[.]xml.ts` | Add the 4 new AL paths. |
| `src/routes/import-korea.tsx` | Add reciprocal hreflang → `/al/makina-nga-korea`. |
| `src/routes/calculator.tsx` (English head) | Add reciprocal hreflang → `/al/kalkulator-transporti`. |
| `src/lib/i18n-al.ts` → `NAV_AL` | Append `Makina nga Koreja`, `Kalkulator`. Copart/IAAI stay out of top-nav (kept as internal links to avoid clutter); listed in AL footer instead. |
| `src/components/site/Footer.tsx` | Add AL footer link group for the 4 new pages (SQ-side only). |

## 3. New files to create

**Calculator extraction (source of truth = shared components):**

- `src/components/calculator/dict.ts` — TypeScript type `CalculatorDict` (all UI strings). Exports `CALCULATOR_DICT_EN`. Imports `CALCULATOR_DICT_AL` from `i18n-al.ts`.
- `src/components/calculator/format.ts` — `USD_TO_EUR`, `fmt`, `fmtInt`, `toTitle` (moved verbatim).
- `src/components/calculator/constants.ts` — `DESTINATIONS`, `SIZE_OPTIONS`, `KOREA_TYPES` (labels come from dict at render).
- `src/components/calculator/CalculatorShell.tsx` — hero, How-it-works, Included/Excluded, Ports, FAQ, Related-links wrapper. Props: `{ locale, dict, faqs, relatedLinks }`.
- `src/components/calculator/UsaCalculator.tsx` — moved from `calculator.tsx` **byte-identical logic**; strings via `dict` prop; WhatsApp lines built from `dict.whatsapp.*`.
- `src/components/calculator/KoreaCalculator.tsx` — same treatment.
- `src/components/calculator/StepUI.tsx` — `Step`, `StepReveal`, `Row`.

**Route wrappers (thin):**

- `src/routes/al/makina-nga-korea.tsx` — content page (not the calculator).
- `src/routes/al/kalkulator-transporti.tsx` — imports `CalculatorShell` + `CALCULATOR_DICT_AL` + `CALCULATOR_FAQS_AL`; passes `locale="sq"` and `source="al-calculator"`.
- `src/routes/al/copart-shqiperi.tsx`
- `src/routes/al/iaai-shqiperi.tsx`

## 4. Shared calculator extraction architecture

```text
src/data/*                (rate tables — UNCHANGED, single source)
    ↓
src/components/calculator/
    format.ts             (fmt, fmtInt, USD_TO_EUR, toTitle)
    constants.ts          (DESTINATIONS, SIZE_OPTIONS, KOREA_TYPES)
    dict.ts               (CalculatorDict type + EN dict; re-export AL dict)
    StepUI.tsx            (Step, StepReveal, Row)
    UsaCalculator.tsx     (state + logic + result panel; strings via dict)
    KoreaCalculator.tsx   (same)
    CalculatorShell.tsx   (page chrome + Tabs + FAQ + JSON-LD content)
    ↓
src/routes/calculator.tsx                (wrapper, locale="en")
src/routes/al/kalkulator-transporti.tsx  (wrapper, locale="sq")
```

**Locale flow:** each route wrapper picks the dict and FAQ list, plus a `source` string (`en-calculator` / `al-calculator`), and passes them as props. `CalculatorShell` renders its own `head()` in the route wrapper (schema + hreflang stay per-route). No global locale context — pure prop drilling, easy to audit.

**FAQ schema:** each route file builds its own `FAQPage` JSON-LD from its own FAQ array, in its own language. AL wrapper uses `CALCULATOR_FAQS_AL`; EN wrapper uses `CALCULATOR_FAQS_EN` (moved from `calculator.tsx`, verbatim).

**Analytics:** `source` prop threads into WhatsApp button `trackEvent("whatsapp_clicked", { source })` and result-request. Values: `en-calculator-usa`, `en-calculator-korea`, `al-calculator-usa`, `al-calculator-korea`.

**Rate/behavior invariants preserved:**
- No number, formula, threshold, surcharge, unloading fee, USD/EUR/KRW rate, terminal-routing, or size-multiplier will be touched.
- All rate imports still come from `src/data/*` — unchanged files.
- Both wrappers import the **same** `UsaCalculator` / `KoreaCalculator` components → impossible to diverge.

## 5. Route-by-route content structure

### `/al/makina-nga-korea` (counterpart of `/import-korea`)
Sections: hero (SHBA-ja-style native SQ, slogan "Moving Cars Worldwide" preserved) → Encar/Autowini/KB Chachacha/shitës të përzgjedhur → 5-hap process (zgjedhja → inspektim, ku është i mundur → blerja → transporti nga Koreja e Jugut → doganë/dorëzim) → Kontenier vs RoRo (RoRo "kur është operativisht e disponueshme") → Çfarë përfshihet / nuk përfshihet → CTA kalkulatori → FAQ (unike) → QuoteForm `locale="sq"` `source="al-korea"`. Service + FAQPage JSON-LD, `inLanguage: "sq"`, reciprocal hreflang with `/import-korea`.

### `/al/kalkulator-transporti` (counterpart of `/calculator`)
Renders `<CalculatorShell locale="sq" dict={CALCULATOR_DICT_AL} faqs={CALCULATOR_FAQS_AL} source="al-calculator" />`. Reciprocal hreflang with `/calculator`. AL FAQPage schema.

### `/al/copart-shqiperi` (self-canonical, no hreflang)
Positioning: Albanian buyer-side Copart guidance, distinct from the general USA hub.
Sections: hero (Copart-specific SQ) → Si funksionon blerja në Copart me Alpha Worldwide → Dërgo numrin e lotit → Fotot e ankandit vs. inspektim i pavarur (kualifikuar; jo çdo lot është i inspektueshëm) → Interpretimi i titullit dhe dëmit → Limitet e ofertës dhe autorizimi → Tarifat e Copart dhe transporti tokësor (link → kalkulator) → Tërheqja nga oborri i Copart → Terminali dhe transporti detar me kontenier → Dokumentacioni doganor (autoritetet vendosin taksat) → Çfarë garanton dhe çfarë nuk garanton Alpha Worldwide (jo partneritet zyrtar me Copart; jo inspektim i garantuar) → Cross-links → `/al/makina-nga-amerika`, `/al/kalkulator-transporti`, `/al/kontakt` → FAQ unike (Copart-specifike) → QuoteForm `source="al-copart"`. Service + FAQPage JSON-LD.

### `/al/iaai-shqiperi` (self-canonical, no hreflang)
Same depth, IAAI-specific angle: seleksionimi i lotit, "Sale Information" & interpretimi i titullit/dëmit, asistencë në ankand, disponueshmëria e inspektimit (kualifikuar), tërheqja nga IAAI, transport tokësor, dokumentacion eksporti, transport detar me kontenier deri në Durrës, vlerësim çmimi, çfarë përfshihet/nuk përfshihet, cross-links, FAQ **e re** (jo ripërdorim i tekstit të Copart), QuoteForm `source="al-iaai"`.

Both Copart/IAAI pages will use different section ordering, different FAQ wording, different hero angle, and distinct WhatsApp intro strings to avoid near-duplicate content.

## 6. Albanian metadata themes

- `/al/makina-nga-korea` — Title: `Makina nga Koreja e Jugut për Shqipëri | Alpha Worldwide`. Desc: sourcing nga Encar, Autowini, KB Chachacha; inspektim kur është i mundur; transport në Durrës.
- `/al/kalkulator-transporti` — Title: `Kalkulator transporti automjetesh | Copart, IAAI dhe Koreja e Jugut`. Desc: kosto e detajuar për transportin e automjetit nga SHBA-ja dhe Koreja e Jugut drejt Shqipërisë, Holandës dhe Gjermanisë.
- `/al/copart-shqiperi` — Title: `Copart Shqipëri — Blerje makinash nga Copart | Alpha Worldwide`. Desc: si të blini në Copart nga Shqipëria me asistencë, transport dhe dokumentacion.
- `/al/iaai-shqiperi` — Title: `IAAI Shqipëri — Blerje makinash nga IAAI | Alpha Worldwide`. Desc: blerje IAAI nga Shqipëria me asistencë në ankand, transport tokësor, transport detar dhe koordinim dokumentesh.

Sentence casing throughout, no `&`, natural SQ (not literal translation).

## 7. Schema strategy

Each new page emits:
- `Service` JSON-LD (`inLanguage: "sq"`, `provider: Alpha Worldwide`, `areaServed: "Albania"`).
- `FAQPage` JSON-LD built from that page's own SQ FAQ array.
- Calculator page reuses the FAQ-schema pattern already in `/calculator`.

No cross-page schema reuse. No unverifiable claims (e.g. "partneritet zyrtar", "155-pikësh") anywhere in schemas.

## 8. Hreflang / canonical strategy

| AL page | Self-canonical | Hreflang pair | x-default |
|---|---|---|---|
| `/al/makina-nga-korea` | yes | ↔ `/import-korea` | `/import-korea` |
| `/al/kalkulator-transporti` | yes | ↔ `/calculator` | `/calculator` |
| `/al/copart-shqiperi` | yes | none (no EN counterpart) | — |
| `/al/iaai-shqiperi` | yes | none | — |

Reciprocal updates required on `/import-korea` and `/calculator` head() — add both `sq` and `en` alternates plus x-default.

## 9. Navigation / footer changes

- `NAV_AL`: append `{ to: "/al/makina-nga-korea", label: "Makina nga Koreja" }` and `{ to: "/al/kalkulator-transporti", label: "Kalkulator" }`. Keep Copart/IAAI out of top nav (avoid crowding + doorway-page vibe); link them from the AL homepage hub grid and the AL footer.
- `LANGUAGE_ROUTE_MAP` (`src/lib/site-data.ts`): add pairs for the two hreflang-linked pages.
- Footer: add an SQ-only column when `isAlbanian`, listing all 6 live AL routes.
- AL homepage (`/al`): add tiles/CTAs to the new pages (already the natural hub).

## 10. Form / WhatsApp / analytics behavior

- `QuoteForm` remains untouched. Each new page uses it with `locale="sq"` and a unique `source`:
  - `al-korea`, `al-copart`, `al-iaai` (+ hero WhatsApp variants `al-korea-hero`, etc.)
  - `al-calculator-usa`, `al-calculator-korea` (fired from inside the shared calculator components via the `source` prop).
- WhatsApp hero pre-fills in Albanian (unique intro string per page — not shared).
- Origin/destination submissions still use normalized machine values (`USA`, `South Korea`, `Albania`) via `ORIGIN_OPTIONS_AL` / `DESTINATION_OPTIONS_AL` — labels shown in SQ.
- `submit-lead.ts` locale-aware message builder is already correct — no changes.

## 11. Internal linking plan

- AL homepage → all 6 AL pages.
- `/al/makina-nga-amerika` → adds cross-links to `/al/copart-shqiperi`, `/al/iaai-shqiperi`, `/al/kalkulator-transporti`.
- `/al/copart-shqiperi` and `/al/iaai-shqiperi` → `/al/makina-nga-amerika` (hub), `/al/kalkulator-transporti`, `/al/kontakt`. Also link each to the other under "Platforma të tjera".
- `/al/makina-nga-korea` → `/al/kalkulator-transporti`, `/al/kontakt`.
- `/al/kalkulator-transporti` "Related pages" → the 4 other AL routes.

## 12. Sitemap plan

Append to `PATHS`:
```
/al/makina-nga-korea
/al/kalkulator-transporti
/al/copart-shqiperi
/al/iaai-shqiperi
```
Priority `0.8`, `changefreq: weekly` (matches existing convention).

## 13. Test plan

1. `tsgo --noEmit` — 0 errors.
2. `bun run build` — production build succeeds.
3. **Byte-diff verification of preserved calculator behavior:**
   - Before refactor: snapshot `git show HEAD:src/routes/calculator.tsx` for reference.
   - After extraction: `rg -n "USD_TO_EUR|KRW_TO_EUR_RATE|calculateAllAuctionFees|getLandTransport|getOceanFreight|UNLOADING_FEES|KOREA_SHIPPING"` in the extracted files must match the same call sites and arguments as before.
   - Confirm `src/data/*` files show `git diff --stat = 0` post-refactor.
4. **Manual calculator smoke** (Playwright, one script, both locales):
   - USA path: Houston TX / Sedan / no EV / bid 8000 / Albania → note totalUsd and totalEur.
   - Korea path: Sedan/Coupe / 20,000,000 KRW / Albania → note totalEur.
   - Repeat on `/al/kalkulator-transporti` with same inputs → totals must equal EN totals to the cent.
   - Screenshot result panels for the record.
5. **hreflang / canonical curl check** on `/calculator`, `/al/kalkulator-transporti`, `/import-korea`, `/al/makina-nga-korea`.
6. **Sitemap curl check** — all 4 new URLs present.
7. **Header language switch** — from `/calculator` → `/al/kalkulator-transporti` and back; from `/import-korea` → `/al/makina-nga-korea`. Copart/IAAI pages: SQ→EN falls back to `/` (documented, acceptable — no EN counterpart).
8. **No emoji regression** — `rg` for the standard emoji ranges over new files.
9. **Content dedupe** — compare Copart vs IAAI FAQ text; require zero paragraph-level overlap.

## 14. Regression safeguards

- Ship the calculator refactor as a **pure move** first (no visible or numeric changes), verified by the smoke test in step 13.4, before adding the AL wrapper.
- `src/data/*` files are read-only for this batch — plan will not open them for edits.
- Keep the same `USD_TO_EUR = 0.92` and `KRW_TO_EUR_RATE = 1/1450` constants (from `koreaShipping.ts`) — not touched, not re-declared.
- Function signatures of `getLandTransport`, `getOceanFreight`, `calculateAllAuctionFees` unchanged; call sites in extracted components identical.
- Dict keys are typed via `CalculatorDict` interface — missing SQ key is a build error.

## 15. Risks

1. **Calculator refactor scope** — 842-line file; extraction touches every section. Mitigation: split into a "refactor commit" (no visible/UX diff) then "AL wrapper commit" — Batch 2B sequencing (see below).
2. **AL Copart/IAAI dedupe risk** — high; twin platforms invite copy-paste. Mitigation: written top-to-bottom independently, different section order, different FAQs, cross-review before ship.
3. **Copart brand claims** — repo has no evidence of official partnership. Copy will say "asistencë për blerjen përmes Copart", never "partner zyrtar".
4. **Inspection promises** — Korea page will keep the qualified wording ("kur është e disponueshme / për automjete të kualifikuara"). Owner must confirm if the EN-side "free pre-purchase inspection for eligible vehicles" claim carries over — otherwise SQ version stays even more qualified.
5. **Language switcher UX** — from `/al/copart-shqiperi` clicking EN silently sends to `/`. Acceptable per current pattern; noted in prior audit as a broader UX item, out of scope here.
6. **Framer-motion payload** on the new AL calculator route — same as EN, no additional cost since shared component.

## 16. Recommended batch sequence

**Split into 2B.A and 2B.B.** Batch size and refactor risk make one-shot delivery unsafe.

- **Batch 2B.A — Content pages (no refactor):**
  1. `/al/makina-nga-korea`
  2. `/al/copart-shqiperi`
  3. `/al/iaai-shqiperi`
  4. `NAV_AL` additions (Korea link; Copart/IAAI in footer)
  5. `LANGUAGE_ROUTE_MAP` addition for `/import-korea` ↔ `/al/makina-nga-korea`
  6. Reciprocal hreflang on `/import-korea`
  7. Sitemap: add 3 paths
  8. Footer: SQ column

- **Batch 2B.B — Calculator extraction + AL calculator:**
  1. Pure extraction into `src/components/calculator/*` — EN `/calculator` byte-identical UX.
  2. `CALCULATOR_DICT_AL` + `CALCULATOR_FAQS_AL` in `i18n-al.ts`.
  3. `/al/kalkulator-transporti` wrapper.
  4. Reciprocal hreflang on `/calculator`.
  5. `NAV_AL` calculator link.
  6. `LANGUAGE_ROUTE_MAP` addition.
  7. Sitemap: add 1 path.
  8. Playwright numeric equivalence test EN ↔ SQ.

Rationale: 2B.A is additive-only (no touches to existing behavior beyond hreflang meta); 2B.B is contained to calculator files with a clear rollback (revert the calculator refactor commit, delete the AL wrapper). Batch sizes stay reviewable.

## 17. Owner decisions required

1. **Inspection wording for `/al/makina-nga-korea`** — mirror EN "Free pre-purchase inspection for eligible vehicles"? Or keep even more qualified ("Inspektimi është i mundur për automjete të përzgjedhura, në varësi të vendndodhjes dhe aksesit")?
2. **Copart / IAAI top-nav** — confirm they should stay out of `NAV_AL` (footer + hub tiles only), per plan.
3. **Calculator route name** — `/al/kalkulator-transporti` (proposed) vs. `/al/kalkulator` vs. `/al/llogarit-koston`. Choose one; will be locked at ship time.
4. **Reciprocal hreflang** on `/import-korea` and `/calculator` — confirm we're allowed to modify these two files as part of Batch 2B (per user directive not to touch completed pages unless a blocker).
5. **Batch sequencing** — approve 2B.A → 2B.B split.

Awaiting approval before implementation.
