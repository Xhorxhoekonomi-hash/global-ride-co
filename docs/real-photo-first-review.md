# Real-photo-first review

## Result
- All rendered vehicle photography now comes from the 30 owner-original photos. No synthetic hero/car imports remain in src.
- 20 conservatively grouped vehicle/session cards retain all 30 originals in a continuous viewer, with per-album thumbnails and English/Albanian controls.
- Both homepages feature IMG_7334 (Urus); origin choices use icons rather than undocumented country imagery.
- Shipping uses real container/handling/transporter photographs. Unsupported port, inspection, auction and country pictures are omitted in favor of light editorial headings.
- Removed all eight unverified VEHICLES delivery records and the country-specific review showcases using them. Reviews now shows original operational albums without invented year, model variant or route metadata.
- Relative image metadata is omitted rather than claiming a public absolute image URL.
- Original BrandLogo artwork, calculator calculations/rate tables, forms, leads, auth, analytics, legal text and routes unchanged. Removed unused calculator photo props only.
- Existing root error-component typing repaired for the current router version.

## Verification
- Automatic build: OK after presentation edits; final test typing correction checked separately.
- 61 changed content routes checked at 360 and 1440; 21 key pages also checked at 390 and 1280. No overflow, broken images, missing headings, page errors or broken internal links (65 links checked).
- Gallery: 20 cards, all 30 distinct photos navigable; angle thumbnails, keyboard arrows, Escape and SQ next/close controls exercised. Screenshots inspected for homepage and viewer.
- Four photo-manifest rule tests passed.

## Limitations
- Original images are unchanged; no alternate-resolution WebP/AVIF copies added.
- No completed shipment destinations, years or client identities inferred. Ambiguous Rolls-Royce sessions remain separate.
- Existing business copy and non-gallery claims preserved; this is not a factual audit of every historical page statement.
- External WhatsApp/Google/Instagram outcomes and lead persistence were not exercised; no backend changes or deployment.
- Unused legacy synthetic binary files remain in the repository but have no application references.

## Exact changed route files
- `src/routes/about.tsx`
- `src/routes/airfreight.tsx`
- `src/routes/al/ankande-amerikane.tsx`
- `src/routes/al/copart-shqiperi.tsx`
- `src/routes/al/encar-shqiperi.tsx`
- `src/routes/al/iaai-shqiperi.tsx`
- `src/routes/al/index.tsx`
- `src/routes/al/inspektim-makinash.tsx`
- `src/routes/al/kalkulator-transporti.tsx`
- `src/routes/al/kontakt.tsx`
- `src/routes/al/makina-nga-amerika.tsx`
- `src/routes/al/makina-nga-dubai.tsx`
- `src/routes/al/makina-nga-korea.tsx`
- `src/routes/al/transport-ajror-makinash.tsx`
- `src/routes/al/transport-me-kontenier.tsx`
- `src/routes/al/transport-roro.tsx`
- `src/routes/auction-access.tsx`
- `src/routes/calculator.tsx`
- `src/routes/contact.tsx`
- `src/routes/container-shipping.tsx`
- `src/routes/delivered-vehicles.tsx`
- `src/routes/en/albania.tsx`
- `src/routes/en/netherlands.tsx`
- `src/routes/en/shipping/south-korea-to-rotterdam.tsx`
- `src/routes/faq.tsx`
- `src/routes/guides/car-import-glossary.tsx`
- `src/routes/guides/car-shipping-costs-explained.tsx`
- `src/routes/guides/common-car-import-mistakes.tsx`
- `src/routes/guides/container-vs-roro-car-shipping.tsx`
- `src/routes/guides/copart-vs-iaai.tsx`
- `src/routes/guides/how-long-does-car-shipping-take.tsx`
- `src/routes/guides/how-to-buy-a-car-from-usa-auctions.tsx`
- `src/routes/guides/how-to-check-a-used-car-before-buying.tsx`
- `src/routes/guides/importing-electric-cars.tsx`
- `src/routes/guides/importing-luxury-cars.tsx`
- `src/routes/guides/index.tsx`
- `src/routes/guides/vehicle-import-documents.tsx`
- `src/routes/how-it-works.tsx`
- `src/routes/import-austria.tsx`
- `src/routes/import-belgium.tsx`
- `src/routes/import-canada.tsx`
- `src/routes/import-czech-republic.tsx`
- `src/routes/import-europe.tsx`
- `src/routes/import-france.tsx`
- `src/routes/import-germany.tsx`
- `src/routes/import-italy.tsx`
- `src/routes/import-korea.tsx`
- `src/routes/import-netherlands.tsx`
- `src/routes/import-poland.tsx`
- `src/routes/import-romania.tsx`
- `src/routes/import-spain.tsx`
- `src/routes/import-switzerland.tsx`
- `src/routes/import-uae.tsx`
- `src/routes/import-usa.tsx`
- `src/routes/index.tsx`
- `src/routes/inspection-service.tsx`
- `src/routes/reviews.tsx`
- `src/routes/roro-shipping.tsx`
- `src/routes/services.tsx`
- `src/routes/vehicle-history-check.tsx`
- `src/routes/why-alpha-worldwide.tsx`

## Shared and supporting files
- `src/lib/alpha-photos.ts`
- `src/lib/alpha-photos.test.ts`
- `src/lib/site-data.ts`
- `src/lib/seo.ts`
- `src/components/site/HomeExperience.tsx`
- `src/components/site/PhotoGallery.tsx`
- `src/components/site/EditorialHero.tsx`
- `src/components/site/InnerPageHero.tsx`
- `src/components/guides/GuideMeta.tsx`
- `src/components/calculator/CalculatorShell.tsx`
- `src/routes/__root.tsx`
- `src/styles.css`
- `AGENTS.md`
- `roadmap.md`
