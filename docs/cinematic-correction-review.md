# Cinematic visual correction — October 13

## Source changes
- `HomeExperience.tsx`: replaced left-aligned two-column Urus composite with centered localized “Your car. Without borders.” heading, one positioning sentence, and exactly two hero actions. Desktop uses the original landscape Gallardo; mobile keeps the original frontal Urus. Both originals show the actual Alpha plate artwork. No vehicle/background source pixels were edited.
- `styles.css`: desktop stage is 82svh, with a complete contained car image and softened duplicate of the same photograph extending the surrounding surface. Mobile is 80svh with independent focal framing. Quote-button foreground is explicitly semantic navy, correcting white-on-white inheritance discovered during screenshot review.
- Ocean Shipping is now a 12-column unboxed feature: genuine SLS/container photo occupies eight columns, concise heading/copy/actions occupy four. Mobile stacks copy/actions before the complete 4:3 container scene. The inspection and airfreight summaries are separate aligned editorial rows, not buried inside a giant pale panel.
- `HeroComposition.tsx` and stylesheet: photographic service/logistics introductions use centered concise typography and a full-width documentary stage preserving the entire original. Removed floating secondary-photo overlays and duplicate visible archive captions. This applies through existing family mapping to Services, container, RoRo, airfreight, process/about and available localized equivalents.
- Market archetypes: restrained off-white customer-path layout, region typography and source/inspect/ship sequence; removed dashed fake route tracks and giant globe. No owner image is passed off as proof of USA/Korea/UAE geography.
- Editorial introductions are shorter. Guide feature becomes text-first on mobile; meaningful Porsche image remains attached to the same article, with title/extract/read action preceding it. Gallery introductions become centered, compact and free of a repetitive standalone cover; all original albums/viewer remain.
- `AGENTS.md`: recorded the complete-photo/softened-duplicate staging boundary.

## Visual evidence actually reviewed
Before screenshots captured at 1440×900 and 390×844 for home, Ocean Shipping, Services, container, USA, guides and gallery. Personally inspected original contact sheet (all 30), full landscape Gallardo and SLS originals, rejected home/Ocean desktop and mobile hero, plus Services/container desktop.

After screenshots actually viewed for home desktop/mobile, Ocean desktop/mobile, Services desktop/mobile, container desktop/mobile, USA desktop/mobile, guides desktop/mobile and gallery desktop; Albanian home and container desktop; final Albanian Ocean desktop/mobile; final homepage 360 and 768. Iterated within this execution on CTA contrast, softened photograph edges, container band background, shorter editorial headings and mobile guide reading order. Screenshots live under `/tmp/browser/art-direction/`.

The original library is portrait-heavy and the three 4:3 originals have tight framing. The desktop Gallardo therefore uses a dual-layer stage rather than a fabricated sky/mountain setting or cropped front bumper. This is an adaptation of real operational photography, not a claim of Tesla/Apple studio-shot equivalence. A softened duplicate remains decorative, while the central vehicle stays sharp. Documentary stages retain their complete scene at a smaller scale than a purpose-shot widescreen image would allow.

## Runtime/function verification
- 66 public URLs at 360, 390 and 1440: 198 rendered states, no horizontal overflow, broken decoded images or page exceptions. Additional home computed styles captured at 768 and 1280. This sweep is not a claim of full-page visual perfection.
- Final computed desktop hero: 738px at 1440×900, `object-fit: contain`; mobile: 675px at 390×844, `cover` with Urus focal placement. Ocean photo computes 4:3. Both hero actions are readable 48–50px targets.
- Calculator/Get Quote reach their unchanged pages; mobile navigation and desktop import menu work. Existing container language switch falls back to `/al`; localized container URL independently renders. That existing map was preserved.
- Completed live Korea sedan estimate with €12,000 vehicle price and Durrës destination: €1,300 shipping, €13,300 displayed total from unchanged calculator logic. No quote was submitted.
- Gallery opens and keyboard traverses all 30 distinct original files, wraps, reverses and closes with Escape; full-size media computes `contain`.
- 12 existing tests passed. Automatic build log latest entry: build OK, 19:50:01 UTC.
- Read-only leaf metadata audit completed, including index. Relative owner media intentionally stays out of OG image tags; do not fabricate absolute URLs. `/shipping-calculator` is a 301-only alias, not a content page. SEO/canonical files remain unchanged.

## Preservation / limits
No changes to logo artwork/BrandLogo, original photo assets/manifest, routes, translations outside the requested home headline, calculator data, forms/submission, backend/auth/schema/security, generated backend types, analytics or SEO. No production lead submission, admin sign-in or exhaustive calculator rate testing. Existing server `hreflang` property warning is outside this presentation scope.

Managed checkpoint observed after source edits: `40aab8c` (`Changes`); documentation receives a subsequent managed save. No manual Git mutation, force push, publication or deployment.