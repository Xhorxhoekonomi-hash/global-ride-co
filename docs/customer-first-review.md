# Customer-first Alpha refinement

## Changed files
- `src/components/site/HomeExperience.tsx`: source/inspect/ship headline in EN/SQ, bounded documentary hero, stateful entry and interactive journey integration. Original enquiry form remains unchanged.
- `src/components/site/CustomerEntry.tsx`: accessible four-task tabs, real origin selector, contextual content and localized Get Started destinations.
- `src/components/site/HomeJourney.tsx`: selectable four-step journey with meaningful links to existing contact, inspection and shipping pages.
- `src/lib/customer-paths.ts` and `src/lib/customer-paths.test.ts`: centralized, tested EN/SQ task destinations; Europe explicitly falls back to English.
- `src/components/site/Header.tsx`: Buy/Import, Shipping & Services, Calculator, Our Work, Contact; desktop dropdowns and mobile accordions; retained language switch, quote and WhatsApp. Existing primary destinations remain reachable; auction/help links are also surfaced.
- `src/components/site/InnerPageHero.tsx` and `src/components/site/EditorialHero.tsx`: clean shared original-photo stages without repetitive captions.
- `src/styles.css`: compact hero rhythm, practical task controls, readable microcopy, four-step interaction, separate decorative cartographic banner, refined documentary filmstrip and selected interior photo framing.
- `AGENTS.md`, `roadmap.md`, this review: architecture conventions and actual verification record.

## Art direction
White/mist stages, restrained navy/teal, confident literal service headline and immediate practical actions. Hero full-car focal position was iterated after screenshots: an initial whole-photo contain treatment made the portrait too small, so the final landscape crop trims surroundings while keeping the car visible. Interior Porsche framing was similarly rechecked. Original vehicle pixels, plates and logo remain unchanged.

The existing AI-created relief image is reused only as a separate decorative cartographic banner. Origin labels sit below it rather than over unrelated geographic positions. No new AI graphics or synthetic vehicle/container imagery were created. Four homepage covers remain Urus, silver Ferrari, Porsche and SLS container operation; the complete viewer retains 30 photos in 20 albums. Homepage filmstrip changes are CSS-only; the existing viewer logic was not modified.

Shared presentation reaches services, USA/UAE imports and the existing Korea/contact headings; no indiscriminate route rewrite. Calculator/contact screens retain functional content and are unified through the shared navigation and existing light system.

## Verification actually run
- Before screenshots of the homepage at 1440, 1280, 390 and 360.
- After screenshots of `/`, `/al/`, `/services`, `/import-usa`, `/import-korea`, `/import-uae`, `/calculator`, `/contact` at all four widths: **32 checks**, no horizontal overflow, no detected broken rendered images or uncaught page errors.
- Visually reviewed desktop/mobile final homepage, USA hero, and element screenshots of service story, journey and four-cover gallery. Rechecked after photo/atlas composition changes.
- Clicked all four buying-origin choices in EN and SQ, followed Get Started and confirmed all eight actual destination URLs.
- Clicked shipping, estimates and inspection tasks in both languages and confirmed all six destination URLs; origin field disappears appropriately on non-buying tasks.
- Selected inspection journey step and confirmed localized inspection link.
- Desktop Buy/Import dropdown selection and mobile Shipping/Services accordion navigation exercised in both languages.
- English hero Calculate Shipping reached `/calculator`; Albanian quote reached `/al/kontakt`; language switch reached corresponding `/contact`.
- Opened homepage gallery in both languages and decoded all 30 viewer frames; full gallery exposed 20 albums. Gallery arrow keys and Escape closure exercised.
- `bun test src/lib/customer-paths.test.ts src/lib/alpha-photos.test.ts`: **7 passed, 0 failed**. Initial Node-only test attempt could not resolve an extensionless TypeScript import; the successful project-compatible Bun run supersedes it.
- Automatic preview build log: **build OK**, latest verified entry after final CSS edits. No manual build/typecheck invoked.
- Content route audit: all 67 rendered content routes retain their own `buildHead` calls; `/shipping-calculator` is a 301 redirect, not a content page. Shared helper includes title, description, Open Graph and Twitter metadata. No SEO edits made.
- Scripts, screenshots and result records: `/tmp/browser/customer-refresh/` (sandbox evidence, not shipped app assets).

## Boundaries and limitations
BrandLogo, all 30 original files/manifests and album grouping unchanged. No calculator logic/rates, existing forms, lead handling, authentication, database/security, route SEO or analytics implementation modified. Existing event calls are preserved; task estimate/inspection actions use the existing event names.

Calculator navigation was verified; a new completed pricing calculation, actual lead submission, external WhatsApp delivery, hosted sign-in and live Maps behavior were not tested in this presentation pass. No reference-site code or imagery copied. No publication/deployment attempted. Git history is platform-managed; no manual Git commit or other stateful Git command was run.