# Shared sitewide photo presentation review

## Implemented changes
- Added typed photo-presentation metadata for all 30 owner originals: dimensions, desktop/mobile focal points, orientation and feature-frame ratios.
- Added EditorialMedia as the shared picture/image boundary with role-specific framing, optional mobile original, localized alternative text, intrinsic dimensions and eager/lazy/priority controls.
- Migrated InnerPageHero and EditorialHero, propagating framing to their English and Albanian consumers without changing route content or metadata.
- Homepage retains the desktop Urus composition and original front-view mobile photo. Ocean shipping now places copy and existing Container/RoRo actions before a compact 4:3 original SLS container photograph on phones. Guide feature uses the Porsche original with an attached guide link; two remaining guides remain text-led.
- Gallery covers and full-size viewer use the same component; full-size viewing retains contain rather than cropping. All 30 originals remain in their existing albums.
- Container-shipping English hero now includes existing Contact and Calculator destinations; Albanian keeps its existing WhatsApp action.
- Consolidated authoritative photo geometry in src/styles.css and removed stale conflicting rules. Removed the redundant breadcrumb top margin that separated the header from interior content.

## Preservation
BrandLogo, TD_LOGO_2023.png, every photo asset pointer and alpha-photos.ts are unchanged against baseline 25cecad. No calculator, form persistence, authentication, database, analytics, translation dictionary or SEO logic was changed. No car, plate or original image was edited. No new geographic/delivery claims were added.

## Actual QA
- Playwright: all 66 discovered non-admin public routes at 360, 390, 768, 1280 and 1440 pixels, plus another complete 390-pixel census: 396 page checks, zero horizontal overflow, zero broken decoded images and zero page errors.
- An early fast scan counted not-yet-loaded images as broken; reran after every image decode completed, with zero failures. An initial network-idle exhaustive run timed out; completed the DOM-ready/decode-based rerun instead.
- English and Albanian hero calculator/quote actions, shipping/estimate/inspection task destinations and homepage guide links passed. Both locale viewers decoded all 30 originals; keyboard next/previous/Escape and close passed.
- Nine tests passed across original-photo manifest, customer paths and new photo-presentation tests.
- Automatic harness build log reports build OK after the final source edits; no manual build/typecheck was run.
- Settled screenshots reviewed for USA import, container shipping, homepage Ocean Shipping, guides and desktop hero; preserved full visible Porsche, SLS and desktop Urus without grey letterboxes. Screenshots and machine-readable QA are in /tmp/browser/site-photos, with settled captures in its final directory.

## Limitations and publishing
Covers deliberately crop background to fill their compact frames; transporter/loading context uses square frames to keep stacked vehicles visible. Full originals remain available in the viewer. Text-led legal/guides/tool routes were not given gratuitous photos. Existing Albanian guide links still point to the English articles and retain their EN labels. Airfreight/RoRo photos describe vehicle handling, not evidence of a specific flight or sailing. Authenticated admin routes were excluded; no enquiry was submitted or backend state modified. Browser page errors were monitored, not an exhaustive third-party analytics network audit.

No publishing or deployment was performed. Git state and normal saves are managed by the platform; no manual commit, push or history rewrite was attempted.

## Public route census
| Route | Source | Presentation type |
| --- | --- | --- |
| `/about` | `src/routes/about.tsx` | shared photo hero |
| `/airfreight` | `src/routes/airfreight.tsx` | shared photo hero |
| `/al/ankande-amerikane` | `src/routes/al/ankande-amerikane.tsx` | shared photo hero |
| `/al/copart-shqiperi` | `src/routes/al/copart-shqiperi.tsx` | shared photo hero |
| `/al/encar-shqiperi` | `src/routes/al/encar-shqiperi.tsx` | shared photo hero |
| `/al/iaai-shqiperi` | `src/routes/al/iaai-shqiperi.tsx` | shared photo hero |
| `/al/` | `src/routes/al/index.tsx` | homepage photos |
| `/al/inspektim-makinash` | `src/routes/al/inspektim-makinash.tsx` | shared photo hero |
| `/al/kalkulator-transporti` | `src/routes/al/kalkulator-transporti.tsx` | text/tool-led; no new photo |
| `/al/kontakt` | `src/routes/al/kontakt.tsx` | shared photo hero |
| `/al/makina-nga-amerika` | `src/routes/al/makina-nga-amerika.tsx` | shared photo hero |
| `/al/makina-nga-dubai` | `src/routes/al/makina-nga-dubai.tsx` | shared photo hero |
| `/al/makina-nga-korea` | `src/routes/al/makina-nga-korea.tsx` | shared photo hero |
| `/al/transport-ajror-makinash` | `src/routes/al/transport-ajror-makinash.tsx` | shared photo hero |
| `/al/transport-me-kontenier` | `src/routes/al/transport-me-kontenier.tsx` | shared photo hero |
| `/al/transport-roro` | `src/routes/al/transport-roro.tsx` | shared photo hero |
| `/auction-access` | `src/routes/auction-access.tsx` | shared photo hero |
| `/calculator` | `src/routes/calculator.tsx` | text/tool-led; no new photo |
| `/contact` | `src/routes/contact.tsx` | shared photo hero |
| `/container-shipping` | `src/routes/container-shipping.tsx` | shared photo hero |
| `/cookie-policy` | `src/routes/cookie-policy.tsx` | text/tool-led; no new photo |
| `/delivered-vehicles` | `src/routes/delivered-vehicles.tsx` | shared photo hero |
| `/en/albania` | `src/routes/en/albania.tsx` | shared photo hero |
| `/en/netherlands` | `src/routes/en/netherlands.tsx` | shared photo hero |
| `/en/shipping/south-korea-to-rotterdam` | `src/routes/en/shipping/south-korea-to-rotterdam.tsx` | shared photo hero |
| `/faq` | `src/routes/faq.tsx` | shared photo hero |
| `/guides/car-import-glossary` | `src/routes/guides/car-import-glossary.tsx` | shared photo hero |
| `/guides/car-shipping-costs-explained` | `src/routes/guides/car-shipping-costs-explained.tsx` | shared photo hero |
| `/guides/common-car-import-mistakes` | `src/routes/guides/common-car-import-mistakes.tsx` | shared photo hero |
| `/guides/container-vs-roro-car-shipping` | `src/routes/guides/container-vs-roro-car-shipping.tsx` | shared photo hero |
| `/guides/copart-vs-iaai` | `src/routes/guides/copart-vs-iaai.tsx` | shared photo hero |
| `/guides/how-long-does-car-shipping-take` | `src/routes/guides/how-long-does-car-shipping-take.tsx` | shared photo hero |
| `/guides/how-to-buy-a-car-from-usa-auctions` | `src/routes/guides/how-to-buy-a-car-from-usa-auctions.tsx` | shared photo hero |
| `/guides/how-to-check-a-used-car-before-buying` | `src/routes/guides/how-to-check-a-used-car-before-buying.tsx` | shared photo hero |
| `/guides/importing-electric-cars` | `src/routes/guides/importing-electric-cars.tsx` | shared photo hero |
| `/guides/importing-luxury-cars` | `src/routes/guides/importing-luxury-cars.tsx` | shared photo hero |
| `/guides/` | `src/routes/guides/index.tsx` | shared photo hero |
| `/guides/vehicle-import-documents` | `src/routes/guides/vehicle-import-documents.tsx` | shared photo hero |
| `/how-it-works` | `src/routes/how-it-works.tsx` | shared photo hero |
| `/import-austria` | `src/routes/import-austria.tsx` | shared photo hero |
| `/import-belgium` | `src/routes/import-belgium.tsx` | shared photo hero |
| `/import-canada` | `src/routes/import-canada.tsx` | shared photo hero |
| `/import-czech-republic` | `src/routes/import-czech-republic.tsx` | shared photo hero |
| `/import-europe` | `src/routes/import-europe.tsx` | shared photo hero |
| `/import-france` | `src/routes/import-france.tsx` | shared photo hero |
| `/import-germany` | `src/routes/import-germany.tsx` | shared photo hero |
| `/import-italy` | `src/routes/import-italy.tsx` | shared photo hero |
| `/import-korea` | `src/routes/import-korea.tsx` | shared photo hero |
| `/import-netherlands` | `src/routes/import-netherlands.tsx` | shared photo hero |
| `/import-poland` | `src/routes/import-poland.tsx` | shared photo hero |
| `/import-romania` | `src/routes/import-romania.tsx` | shared photo hero |
| `/import-spain` | `src/routes/import-spain.tsx` | shared photo hero |
| `/import-switzerland` | `src/routes/import-switzerland.tsx` | shared photo hero |
| `/import-uae` | `src/routes/import-uae.tsx` | shared photo hero |
| `/import-usa` | `src/routes/import-usa.tsx` | shared photo hero |
| `/` | `src/routes/index.tsx` | homepage photos |
| `/inspection-service` | `src/routes/inspection-service.tsx` | shared photo hero |
| `/privacy-policy` | `src/routes/privacy-policy.tsx` | text/tool-led; no new photo |
| `/reviews` | `src/routes/reviews.tsx` | shared photo hero |
| `/roro-shipping` | `src/routes/roro-shipping.tsx` | shared photo hero |
| `/services` | `src/routes/services.tsx` | shared photo hero |
| `/shipping-calculator` | `src/routes/shipping-calculator.tsx` | text/tool-led; no new photo |
| `/shipping-estimate-disclaimer` | `src/routes/shipping-estimate-disclaimer.tsx` | text/tool-led; no new photo |
| `/terms` | `src/routes/terms.tsx` | text/tool-led; no new photo |
| `/vehicle-history-check` | `src/routes/vehicle-history-check.tsx` | shared photo hero |
| `/why-alpha-worldwide` | `src/routes/why-alpha-worldwide.tsx` | shared photo hero |
