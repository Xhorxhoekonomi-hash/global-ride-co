<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared BrandLogo is the single presentation boundary for owner-supplied artwork so header and footer always use the same unchanged original asset.
- Shared EmailContact presents the owner mailbox beside WhatsApp; mailto links are contact options, never substitutes for stored enquiry submissions.
- The EN and SQ homepages share HomeExperience presentation with localized copy and valid existing links; route-specific SEO remains in each leaf route to preserve indexing.
- Visual redesigns may restyle calculator presentation but must not modify calculation logic/data, lead submission, auth or database schema, keeping operational behavior independent of presentation.
- src/styles.css is one layer: tokens (:root + @theme inline), base, utilities, then component sections and one responsive block; replace superseded rules in place instead of appending override layers, so the cascade stays readable.
- Solid teal buttons use --teal-button (#0E8290, white text = 4.55:1 contrast) with hover on --teal-dark; #0F8796 remains for icons, accents, links on dark and counter numbers. Never hardcode either value in components — use the tokens.
- Full-bleed photo heroes use HeroPanel (homepage slider) or HeroScene (single interior panel via PageHero `scene`), always with a <picture> pairing 9:16 mobile art below 768px and 16:9 desktop art above, so vehicles are never center-cropped away.
- Owner hero photos live as Lovable asset pointers under src/assets/heroes (2560/1440 desktop + 1080 mobile WebP) and are mapped in src/lib/hero-scenes.ts or HomeExperience, keeping binaries out of the repo.
- PageHero is the only interior hero (photo scene, light text, or navy text when no real photo exists); TextHero wraps bespoke light headings. Interior pages get the shared CtaBand, and guide articles get GuideToc/RelatedGuides, from __root so the pattern cannot drift per page.
- Named owner-photo selections and vehicle/session albums in alpha-photos are the single source for documentary/proof imagery; EditorialMedia and photo-presentation own their dimensions and focal points, while the full-size viewer preserves complete originals.
- LANGUAGE_ROUTE_MAP in site-data is the single EN↔SQ page map; shared components on SQ pages resolve links through localPath so no SQ page links to English content and the switcher round-trips.
- Customer entry destinations are resolved in the shared customer-paths module, with explicit localized routes and English fallbacks, so selected tasks and origins cannot drift from tested navigation.
- Homepage entry and journey interactions are presentational tabs independent of operational calculators and forms, so discovery improvements do not affect lead or pricing behavior.
- The homepage RouteFinder resolves targets in src/lib/route-finder.ts; calculator and quote form only read its ?from/&to/&vehicle params as initial UI state, so prefill never touches pricing math or lead submission.
- buildHead derives hreflang from LANGUAGE_ROUTE_MAP when a route passes none, so every EN/SQ pair stays reciprocal without per-route lists.
- Let the bundler resolve each email dependency's own entities version; global entities aliases break the incompatible v4 and v7 export paths used by email rendering.
- Airport and keyword page registries own bilingual paths and conditional service status; shared page templates and inline keyword links keep navigation, metadata and sitemap entries aligned without changing operational forms or rates.
