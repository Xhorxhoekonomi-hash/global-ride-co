# Phase 2 visual review

Implemented the requested light interior-page presentation without publishing or deploying.

## Pages actually changed

- `/services`
- `/import-usa`
- `/import-korea`
- `/import-uae`
- `/calculator` — via shared calculator presentation components; route metadata unchanged.
- `/contact`
- `/delivered-vehicles`
- `/al/makina-nga-amerika`
- `/al/makina-nga-korea`
- `/al/kalkulator-transporti` — via shared calculator presentation components; route metadata unchanged.
- `/al/kontakt`
- `/how-it-works`
- `/inspection-service`

Shared components: new `InnerPageHero` and `JourneySteps`; restyled `CalculatorShell`, `StepUI`, `UsaCalculator`, and `KoreaCalculator`; added a readable warning color token.

## Preservation

The original BrandLogo and TD_LOGO_2023.png asset were not modified. No replacement artwork or logo blocker exists for this phase.

No backend, database, authentication, lead-submission, pricing-data, or form-validation changes. Calculator state, numerical expressions and WhatsApp construction were compared with pre-edit copies and are unchanged. Existing SEO/structured data, analytics and locale mappings remain in place.

## Verification

- Automatic preview build reported `build OK` after final UI edits; no manual build or typecheck was run.
- All 13 pages rendered at 360, 390, 1280 and 1440 widths with no horizontal overflow, missing images or runtime page errors in the page-render checks.
- Full USA estimate: Abilene, standard vehicle, $5,000 bid, Albania returned $8,490 / approximately €7,811, with existing itemized fees and disclaimers.
- Korea estimate: sedan/coupe, ₩14,500,000, Albania returned €11,300 including €1,300 shipping, in English and Albanian.
- USA/Korea WhatsApp buttons produced the existing correctly populated handoff URLs; external WhatsApp delivery itself was not tested.
- English-to-Albanian links were exercised for USA import, Korea import, calculator and contact.
- Empty EN/SQ full contact forms showed three required-field errors. No test enquiry was submitted to the live database.
- Desktop/mobile hero, calculator summary and localized form screenshots were inspected.

## Remaining limitations

The delivery gallery is intentionally withheld because available vehicle-photo provenance is uncorroborated. The page provides Instagram, contact and calculator links rather than implying stock images prove delivery. Verified owner delivery originals are needed for a genuine gallery.

Real lead persistence, external map availability, WhatsApp delivery, and an exhaustive keyboard/screen-reader audit were not end-to-end tested during this presentation-only phase. No claim is made that those checks passed.

## Preview

Review in this project's existing Lovable Preview, starting at `/services`, `/calculator`, or `/al/kontakt`. The sandbox preview is available at `http://localhost:8080/services`; it is not a public production link. Production URLs were not changed.