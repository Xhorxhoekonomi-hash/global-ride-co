# Editorial design rebuild

## Exact implementation scope
- `src/components/site/HomeExperience.tsx`: shared EN/SQ editorial homepage recomposition.
- `src/components/site/PhotoGallery.tsx`: four-cover filmstrip presentation independent of the complete grouped viewer.
- `src/components/site/InnerPageHero.tsx` and `src/components/site/EditorialHero.tsx`: shared studio-like media stages and revised heading compositions.
- `src/components/site/Header.tsx` and `src/components/site/Footer.tsx`: shared presentation hooks; original BrandLogo preserved.
- `src/routes/services.tsx`: actual loading photo and hairline service presentation.
- `src/styles.css`: editorial grid, typography, surfaces, responsive framing and reduced-motion rules.
- `src/assets/abstract_route_relief.jpg`: genuinely AI-generated abstract porcelain/mist cartographic illustration, used decoratively behind origins; not shipment evidence or a vehicle photograph.
- `AGENTS.md`, `roadmap.md`, and this review: design conventions and verification record.

## Art direction
Replaced the repeated card-template homepage with an asymmetric original-car hero, compact numbered task navigation, one cohesive relief-map origin composition, loading-photo service storytelling, a single dark calculator band, four curated album covers and a photo/list guide composition. Hairlines, generous spacing, restrained turquoise and crisp CTAs unify the page. The original silver Ferrari image is framed with its full vehicle visible on tested desktop and phone sizes. No vehicle photo pixels, plates, artwork or backgrounds were AI-modified.

The calculator teaser links to the real calculator; it displays cost categories without invented numbers or live tracking. Shared hero conventions refine `/services`, `/import-usa` and `/import-uae` without rewriting their route content or SEO.

## Preview verification
- Localhost Playwright checked `/`, `/al/`, `/services`, `/import-usa`, `/import-uae` at widths 1440, 1280, 390 and 360, with a 1800px viewport height.
- All 20 route/width checks had no horizontal overflow, no detected broken rendered images, exactly one h1 and no page errors.
- Screenshots reviewed for desktop/phone hero framing, origin composition, service storytelling, calculator feature and gallery.
- English primary CTA reached `/calculator`; quote CTA reached `/contact`; Albanian calculator CTA reached `/al/kalkulator-transporti`.
- Albanian mobile menu opened and closed; localized next-photo control worked.
- Four homepage album covers shown: Urus, silver Ferrari, Porsche and Mercedes SLS container operation.
- All 30 unique original viewer images decoded successfully; angle selection, next/previous controls, arrow keys and Escape were exercised. Escape closure was confirmed after waiting for the dialog to disappear.
- Four owner-photography invariant tests passed, including all 30 originals and conservative album grouping.
- Automatic build log reported `build OK`. No manual build/typecheck was run during final verification.
- Browser evidence and scripts remain under `/tmp/browser/design_rebuild/`.

## Preserved boundaries
Original BrandLogo artwork, all 30 original photos, 20 album groups and full viewer retained. No calculator logic/data, forms, authentication, database, security policy, route SEO or analytics implementation was changed. No lead submission or external messaging delivery was attempted. Production was not deployed or published.