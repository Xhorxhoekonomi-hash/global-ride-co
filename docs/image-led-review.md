# Image-led correction — preview only

## Actual source changes
- `HomeExperience.tsx`: replaced the rejected oversized centered type and three-photo strip with one full-width editorial scene; concise left-aligned desktop heading, two refined actions, separate portrait art direction on phones. Removed archive triptych from the opening. Owner container photography remains in Ocean Shipping.
- `Header.tsx`: desktop customer-path links remain visible from 1024px; compact laptop spacing, original BrandLogo asset unchanged.
- `HeroComposition.tsx`: image-led brand/market introductions for import origins, Services, About and Why Alpha; clearly labelled editorial art, never shipment evidence. Shipping/logistics retains relevant owner documentary photography; guides/articles, tools/contact/legal retain task-appropriate hierarchy.
- `GuideFeature.tsx`: restored the original Porsche archive image with explicit non-origin attribution, integrated title/extract/read action.
- `styles.css`: coordinated scene/type/action styling, responsive subject framing, bounded documentary stories, readable guide feature and neighboring teasers. During actual screenshot inspection, corrected a white desktop hero edge caused by aspect-ratio/max-height sizing with explicit width:100%; corrected the initially disconnected giant guide portrait to a bounded integrated desktop feature.
- `AGENTS.md`: separates editorial brand artwork from owner documentary evidence; rejects triptych/text-first prominent openings and blurred duplicate fill.
- Two new generated JPEG assets; roadmap and this report. No changes to rate/calculator logic, forms, lead submission, database/auth/security, SEO, analytics, URLs, original logo or any of the 30 owner originals.

## New asset provenance
`src/assets/alpha-editorial-grand-tour.jpg`: generated editorial coastal automotive brand artwork, 1920px landscape. `src/assets/alpha-editorial-grand-tour-mobile.jpg`: separately generated 768px portrait editorial composition, not an edited original. Neither depicts an actual Alpha operation, delivered vehicle, inspection, or market origin. Visible EN/SQ artwork labels and descriptive alt text distinguish both from the unchanged owner archive. No Tesla/Apple assets reused. The generated desktop/mobile cars differ slightly; these are independent brand illustrations, not a claimed single vehicle inventory record.

## Native screenshot review, not thumbnail approval
Captured individual viewport images (never full-page screenshots) at 1440×900, 1280×900, 1024×900 and 390×844 for /, /al/, /services, /import-usa, /container-shipping, /guides/ and /about; additional Ocean Shipping and homepage guide scroll states at those widths. Actually opened readable individual screenshots for home at all four widths, /al at 360, Services desktop/390, import-USA desktop/390, container desktop and Albanian container 390, About desktop, guide index desktop/390, homepage guide feature desktop/390, and the USA-auctions article desktop. Iterated hero width and guide composition from these images. Whole editorial vehicle and clear actions remain visible in reviewed home scenes; original SLS and Alpha plate remain visible in shipping scenes. Not every public page was aesthetically inspected individually, and this report does not claim that.

## Functional evidence
- 66 public URLs at desktop 1440 and phone 390: 132 rendered states, zero broken image decodes, horizontal overflow or uncaught page errors. This is automated technical evidence, not aesthetic approval.
- EN hero calculator and quote destinations verified; mobile navigation and locale switch verified; desktop Buy/Import menu opened with preserved destinations.
- SQ primary actions reach /al/kalkulator-transporti and /al/kontakt.
- Existing calculator presentation/interactions checked without modifying rates or submission logic.
- Gallery retains 30 originals and uncropped contain lightbox; existing interaction checks passed without page errors.
- 12 existing Bun tests passed (owner originals, customer paths, photo presentation, media layouts). Harness build log reports build OK; no manual production build or deployment invoked.

## Limits
Reference review earlier in this execution included AlphaWorldwide.me and Apple; live Tesla returned Access Denied and was not treated as design evidence. Original operation photos are largely portrait/documentary, so they are retained in bounded stories/proof rather than enlarged into brand artwork. Public-page checks do not exercise authenticated admin or send real leads. Shared market pages reuse one coherent brand illustration rather than claiming unique geographic photography. Screenshot files and scripts remain in /tmp/browser/image-led, not served publicly. Managed save only; no publish/deploy.

## Automated route coverage
- `/`
- `/about`
- `/airfreight`
- `/al/`
- `/al/ankande-amerikane`
- `/al/copart-shqiperi`
- `/al/encar-shqiperi`
- `/al/iaai-shqiperi`
- `/al/inspektim-makinash`
- `/al/kalkulator-transporti`
- `/al/kontakt`
- `/al/makina-nga-amerika`
- `/al/makina-nga-dubai`
- `/al/makina-nga-korea`
- `/al/transport-ajror-makinash`
- `/al/transport-me-kontenier`
- `/al/transport-roro`
- `/auction-access`
- `/calculator`
- `/contact`
- `/container-shipping`
- `/cookie-policy`
- `/delivered-vehicles`
- `/en/albania`
- `/en/netherlands`
- `/en/shipping/south-korea-to-rotterdam`
- `/faq`
- `/guides/`
- `/guides/car-import-glossary`
- `/guides/car-shipping-costs-explained`
- `/guides/common-car-import-mistakes`
- `/guides/container-vs-roro-car-shipping`
- `/guides/copart-vs-iaai`
- `/guides/how-long-does-car-shipping-take`
- `/guides/how-to-buy-a-car-from-usa-auctions`
- `/guides/how-to-check-a-used-car-before-buying`
- `/guides/importing-electric-cars`
- `/guides/importing-luxury-cars`
- `/guides/vehicle-import-documents`
- `/how-it-works`
- `/import-austria`
- `/import-belgium`
- `/import-canada`
- `/import-czech-republic`
- `/import-europe`
- `/import-france`
- `/import-germany`
- `/import-italy`
- `/import-korea`
- `/import-netherlands`
- `/import-poland`
- `/import-romania`
- `/import-spain`
- `/import-switzerland`
- `/import-uae`
- `/import-usa`
- `/inspection-service`
- `/privacy-policy`
- `/reviews`
- `/roro-shipping`
- `/services`
- `/shipping-calculator`
- `/shipping-estimate-disclaimer`
- `/terms`
- `/vehicle-history-check`
- `/why-alpha-worldwide`
