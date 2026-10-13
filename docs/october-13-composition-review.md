# Purpose-specific visual rebuild

Preview-only presentation changes; no publishing or production deployment.

## Actual implementation
- `HeroComposition.tsx` now composes purpose-specific heroes; `InnerPageHero.tsx` and `EditorialHero.tsx` expose an explicit `variant` override and use centralized pathname mapping by default.
- `media-layouts.ts` maps localized routes to market, logistics, service, editorial, gallery or contact archetypes. Guide paths are evaluated first so an auction/shipping article remains typography-first.
- `HomeExperience.tsx`: immersive, blended Urus stage instead of a detached JPEG; existing hero actions retained; integrated container shipping story; new editorial guide feature and full-width neighboring teasers. Mobile retains an edge-to-edge original frontal Urus photo.
- `GuideFeature.tsx`: original Porsche integrated with article heading, short extract, reading action and archive attribution; shared by homepage EN/SQ and guides index.
- `guides/index.tsx`: featured story with readable neighboring articles, category buttons, and aligned article rows.
- `styles.css`: replaced the legacy universal hero/photo layer with variant compositions. Logistics uses a heading-led documentary diptych; service uses an offset operational story; markets use region-marked abstract route artwork rather than undocumented origin photography; guides use bounded secondary media and reading-first typography; gallery retains curated proof albums. Absolute image positioning prevents portrait intrinsic dimensions from expanding editorial frames. Ocean Shipping now uses native 4:3 geometry with the complete SLS rear and container visible.
- Container EN/SQ hero pairs the genuine SLS scene with an actual Ferrari container scene, not an unrelated road loading photo. About uses real transporter context. Inspection/history pages without verified inspection photos use a restrained explanatory review/documentation graphic instead of manufactured evidence.
- `media-layouts.test.ts` protects family mapping and guide precedence.

## Family mapping
- Home: `/`, `/al/` — immersive original-car stage, task/origin flow, shipping story, four-cover gallery and editorial guides.
- Markets: all `/import-*` routes, auction assistance, Albanian market/auction routes, `/en/albania`, `/en/netherlands` — region-marked nonphotographic customer-path artwork, existing copy/actions unchanged.
- Logistics: container, RoRo, airfreight, how-it-works and `/en/shipping/*`; localized shipping equivalents — operational documentary story when a relevant original is supplied. The Korea-to-Rotterdam route remains text-led because originals do not establish that shipment.
- Services: services, about, why-alpha, inspection/history and Albanian inspection — offset operational photos or explanatory graphics where photographic evidence is unavailable.
- Editorial: guide hub/articles and FAQ — reading-first headings; supplied original photos remain bounded supporting context rather than giant cover images.
- Gallery: delivered vehicles/reviews — proof-oriented heading; supplied gallery hero photo and unchanged album viewer. Reviews has no fabricated hero proof photo.
- Contact/calculators: text-led actionable heading; no arbitrary car image ahead of forms/tools.
- Legal policies: intentionally untouched text-first layouts.

## Verification
- Automated browser sweep: 66 public routes at 360, 390, 768, 1280 and 1440px (330 page states), zero horizontal overflow, zero broken loaded images, zero page exceptions.
- Before screenshots were inspected for the homepage, Services, container and homepage guide problems. After screenshots were actually viewed for the required homepage, Services, USA, container, guides hub/article and Albanian home/container at 1440 and 390px. Additional category screenshots captured at 360, 768 and 1280px; representative market, inspection, RoRo and gallery images inspected.
- Iterated after image inspection: fixed editorial frame expansion, restored complete SLS framing in Ocean Shipping, replaced the container secondary with genuine container context, added distinctive regional artwork, removed empty review hero grid, and used stable reduced-motion captures to avoid photographing fade-in text mid-animation.
- Hero calculator and quote actions reach `/calculator` and `/contact`; mobile menu calculator works; desktop Buy / Import dropdown opens with its preserved destinations.
- Language switching preserves the existing route map: container switching currently falls back to `/al`, not its localized equivalent. Both direct container routes render correctly. No route-map/business-logic changes were made.
- Gallery opens, decodes all 30 distinct originals through keyboard navigation, wraps reliably, goes backwards, closes with Escape, and computes `object-fit: contain` in the lightbox.
- 12 tests passed across photo manifest, photo presentation, customer paths and media layouts; automatic build reported OK.

## Preservation and honest limits
Original photo assets, plates, `alpha-photos.ts`, exact `BrandLogo`, calculators/rates, quote/lead handling, backend/auth/security, analytics and SEO configuration were not edited. Existing route copy and business actions were retained; only the guide feature has a new localized editorial extract and archive credit.

The 330-state sweep is runtime evidence, not a claim that every full page was visually reviewed. Visual review focused on the required and representative page families. Cover images intentionally crop surrounding context; the lightbox alone guarantees uncropped originals. Road-transporter photos are operational context, not proof of RoRo or airfreight transport. No production forms were submitted and authenticated admin behavior was not retested because neither was changed.

Screenshots and browser scripts are temporary sandbox artifacts under `/tmp/browser/composition/`, not production assets. Source changes are saved by Lovable's managed history; no manual Git commit, force push or deployment was performed.