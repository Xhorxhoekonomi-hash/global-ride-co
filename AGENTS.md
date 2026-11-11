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
- Photo heroes never cover a vehicle with text or buttons: the HeroPanel homepage slider is full-bleed with the headline in the top scrim, buttons anchored to the panel bottom and dots just above them, the vehicle framed in the middle band via per-image --hero-pos/--hero-pos-m; interior HeroScene stacks photo over a dark copy panel on phones and splits copy column/photo from 768px. All text on photos is white: over-photo containers carry .on-photo and light-surface text colours must exclude .on-photo. Keyword pages pick photos from src/lib/scene-library.ts by category with rotation.
- Heading sizes come only from --fs-* tokens; never add font-size utilities to headings. Interior hero h1s carry data-len (s/m/l from title length via src/lib/heading-length.ts) mapped to --fs-hero-* tokens, so long titles shrink without copy changes. Headings balance and HeadingWidowGuard (from __root) joins the last two heading words unless that would overflow, so no single-word last lines.
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
- Form inputs use the shared .form-label/.form-control classes (same style as RouteFinder); dark form variants only change label colour, so there is one field style site-wide.
- Linked content cards use .alpha-card (or share its radius/border/hover rule in styles.css) so card treatment cannot drift per page.
- PAGES_WITH_OWN_END_CTA (src/lib/page-end-cta.ts) lists pages whose last section is already a CTA; __root skips the shared CtaBand for them so CTAs never stack. Add new pages that end in a form or quote CTA there.
- Footer link groups collapse on phones via CSS (display none), never conditional rendering, so internal links always stay in the DOM.
- SiteMotion (from __root) owns site-wide motion: CSS motion applies only under html.motion-ok (set after hydration, never under reduced motion) and it mutates sections only once React has hydrated them, so content is visible without JS and hydration stays clean; elements are hidden only once individually armed (reveal-armed/draw-armed), and a scroll fallback reveals anything already passed, so text can never stay invisible.
- .end-band (dark graphite) is the only page-end band; mid-page tinted sections use .section-mist, so every page ends the same way.
- Marquees render the list twice with the copy aria-hidden/untabbable and are static scrollable rows without motion.

- Hero button pairs are identical boxes (fixed --btn-h height, 1.5px border in their own fill, no transform); hover lifts apply only under (hover: hover) so iOS never keeps a tapped button shifted.
- HeadingWidowGuard also binds the phrase after " — " with non-breaking spaces (reverting if it would overflow), so headings break before the dash segment.
