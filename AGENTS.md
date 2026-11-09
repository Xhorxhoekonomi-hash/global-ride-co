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
- Photo heroes use HeroPanel (homepage slider) or HeroScene (interior via PageHero `scene`) with a no-overlap layout so text never covers a vehicle: stacked photo (4:3 art, 75vw tall, <768px; 16:9 at 768–1099) above a dark copy panel, and a minmax(460px,42%)/rest split from 1100px whose height is a minimum set by the copy (never a fixed height with hidden overflow, so laptop screens can't clip text); per-image object-position via --hero-pos/--hero-pos-m; keyword pages pick photos from src/lib/scene-library.ts by category with rotation.
- Heading sizes come only from the --fs-* tokens applied to h1/h2/h3 in the base layer; never add font-size utilities or component overrides to headings, so the scale stays single (desktop H1 is fluid via clamp). Headings balance and HeadingWidowGuard (from __root) joins the last two heading words unless that would overflow, so no single-word last lines.
- All solid/outline buttons share --btn-h/--btn-fs (Button data-variant attributes + .btn-pair/btn-* utilities); labels never wrap, and button pairs flex-wrap to stack instead, so side-by-side buttons always match height.
- The header is one row; desktop WhatsApp/email appear as icon links in it (xl+) and in the footer, keeping laptop screen height for content.
- SITE_URL in src/lib/seo.ts is the only origin for canonical, hreflang, og:url, sitemap and JSON-LD; never hardcode another host.
- siteGraph shares one office identity between Organization departments and contact-page JSON-LD; localize ContactPage with inLanguage because that property does not apply to LocalBusiness.
- Legacy-URL 301s live in src/lib/legacy-redirects.ts and run in src/server.ts before the app, so they are server-side and covered by unit tests.
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
