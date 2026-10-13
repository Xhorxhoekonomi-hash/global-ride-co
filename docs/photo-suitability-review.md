# Photo suitability and light editorial correction

## Implemented direction

The homepage now leads with a centered navy headline, a concise positioning sentence and two clear actions on white. The rejected warehouse Lamborghini and its blurred duplicate are no longer a dominant hero. Three modest, uncropped original photographs form a supporting evidence strip below the actions; the mobile version shows the port Urus rather than stacking three portrait photographs. Originals were not retouched, recolored, masked or replaced.

Ocean Shipping retains the genuine Mercedes SLS container scene, paired with a compact copy column and working Container/RoRo actions. Its frame preserves the subject rather than forcing a universal landscape crop. Inspection and airfreight remain quieter, text-led neighboring stories. No documentary image is represented as evidence of an undocumented geographic route.

Shared page families now use purpose-led introductions:

| Family | Presentation / photo decision |
| --- | --- |
| Home, English and Albanian | Typography-first white introduction; bounded supporting originals, no duplicate blur |
| Import, auction and destination markets | Region and source/inspect/ship explanation; no warehouse Porsche suggesting USA provenance |
| Services | Typographic introduction and restrained process rail, not oversized dark loading photography |
| Logistics | Bounded genuine documentary media where useful; no fake airfreight/RoRo evidence or artificial ambient duplicate |
| Guides, glossary and articles | Typography-first editorial hierarchy; homepage feature has readable extract, CTA and neighboring teasers, without gratuitous Porsche photo |
| Gallery and reviews | Quiet archive introduction; existing grouped originals and uncropped lightbox retained |
| Contact and calculator | Form/tool-first introduction; operational components untouched |
| FAQ and legal | Existing content retained; restrained typography, no gratuitous car hero |

## Photo-selection decisions

- Warehouse/front-facing white Lamborghini: unsuitable for a premium dominant stage because of background clutter and limited negative space; retained only in the original archive.
- Port Urus (`PHOTO_SELECTIONS.urus`): a clearly contextual operational photograph, used modestly below the headline rather than pretending it is studio advertising.
- Silver Ferrari (`PHOTO_SELECTIONS.silverFerrari`): outdoor context and whole vehicle suitable for a bounded desktop evidence image; not geographic delivery proof.
- SLS (`PHOTO_SELECTIONS.container`): relevant, genuine container context for shipping and supporting evidence; no plate or vehicle alterations.
- Porsche: removed from the guide feature/market introduction because it does not explain auction geography or the article topic.
- Loading/transporter and darker container images: documentary/album material, not compulsory large hero imagery. All 30 originals remain navigable.

## Exact route coverage and visual-review limits

The inventory contains **66 public URL entries, not 132 routes**. Each was captured at 1440×900 and 390×844: **132 rendered states**. Long pages were captured in viewport-sized tiles and assembled outside the repository. All 22 labeled coverage sheets (11 per width) were opened and visually reviewed, including below-the-fold content. This is a page-length overview review, not a pixel-level examination of every paragraph or a claim that every page is visually perfect.

Reviewed entries:

```text
/
/about
/airfreight
/al/
/al/ankande-amerikane
/al/copart-shqiperi
/al/encar-shqiperi
/al/iaai-shqiperi
/al/inspektim-makinash
/al/kalkulator-transporti
/al/kontakt
/al/makina-nga-amerika
/al/makina-nga-dubai
/al/makina-nga-korea
/al/transport-ajror-makinash
/al/transport-me-kontenier
/al/transport-roro
/auction-access
/calculator
/contact
/container-shipping
/cookie-policy
/delivered-vehicles
/en/albania
/en/netherlands
/en/shipping/south-korea-to-rotterdam
/faq
/guides/
/guides/car-import-glossary
/guides/car-shipping-costs-explained
/guides/common-car-import-mistakes
/guides/container-vs-roro-car-shipping
/guides/copart-vs-iaai
/guides/how-long-does-car-shipping-take
/guides/how-to-buy-a-car-from-usa-auctions
/guides/how-to-check-a-used-car-before-buying
/guides/importing-electric-cars
/guides/importing-luxury-cars
/guides/vehicle-import-documents
/how-it-works
/import-austria
/import-belgium
/import-canada
/import-czech-republic
/import-europe
/import-france
/import-germany
/import-italy
/import-korea
/import-netherlands
/import-poland
/import-romania
/import-spain
/import-switzerland
/import-uae
/import-usa
/inspection-service
/privacy-policy
/reviews
/roro-shipping
/services
/shipping-calculator
/shipping-estimate-disclaimer
/terms
/vehicle-history-check
/why-alpha-worldwide
```

`/shipping-calculator` is a redirect alias, not an independent visual design. Coverage is of existing public routes, not invented Albanian equivalents.

Full-size viewport images were additionally opened for homepage desktop/mobile, Services desktop, container shipping desktop, USA import desktop, and the calculator estimate. The remaining page-length reviews used the coverage sheets; small text/detail is not asserted to have been inspected at native resolution. Evidence is under `/tmp/browser/editorial-audit/`, with interaction captures under `/tmp/browser/composition/` and calculator evidence under `/tmp/browser/art-direction/`.

## Checks and limitations

- 132 captured states: no detected horizontal overflow, broken images or page errors. These checks supplement, rather than establish, aesthetic approval.
- Re-tested hero Calculate Shipping → `/calculator`, Get a Quote → `/contact`, mobile navigation and desktop origin menu.
- Locale action from container shipping currently goes to `/al`; this existing behavior was observed, not silently claimed to be a page-matched translation or changed in a presentation-only task.
- Lightbox keyboard cycling decoded all 30 originals, wrapped correctly, closed on Escape, and computed `object-fit: contain`.
- South Korea calculator: sedan, EUR 12,000, Albania produced EUR 1,300 shipping and EUR 13,300 estimated total. Calculations/rate data unchanged.
- Existing photo, customer-path, presentation and layout tests: 12 passed, zero failed.
- Automatic project build previously reported successful during implementation; no manual build or deployment command was run in this final verification pass.
- Alpha reference and Apple screenshots were opened. The captured Alpha reference had an unloaded/gray media area; only its visible brand/navigation/hierarchy were assessable. Tesla returned Access Denied, so no successful live Tesla visual review is claimed.
- Portrait-heavy documentary originals cannot produce a clean studio-style full-width hero without subject loss or fabrication. The deliberate alternative is light typography with honest, smaller evidence imagery.
- Existing long mobile footers, some repetitive content cards and detailed SEO/configuration behavior were not rewritten. No claim of exact Apple/Tesla quality or owner approval is made.

## Changed files and preservation

Presentation source: `src/components/site/HomeExperience.tsx`, `src/components/site/HeroComposition.tsx`, `src/components/site/GuideFeature.tsx`, `src/styles.css`. Guidance/report: `AGENTS.md`, `roadmap.md`, this document. The obsolete rule mandating a softened duplicate backdrop has been removed in favor of purpose-based photo selection.

The original BrandLogo asset, all 30 original photos/plates, route addresses, translations outside hero presentation, calculators, quote/lead logic, auth, database, generated Supabase types, security, analytics and SEO implementations were not modified.

## Save status

The managed system saved the substantive presentation revision as `191c2cfb9d3605b4bff54d61bd4e880d9a41f531` (preceded by `edd9756` for the initial light-layout changes). This report/roadmap update is saved separately through the same managed system; no manual Git state-changing command, force push, publishing or production deployment was performed.