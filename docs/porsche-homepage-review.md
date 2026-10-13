# Owner-selected Porsche homepage artwork — 13 October 2026

## Exact scope and provenance
- Saved the owner's completed `alpha-porsche-logistics-hero.png` unchanged through Lovable Assets as `src/assets/alpha-porsche-logistics-hero.png.asset.json` (1672 × 941).
- HomeExperience now uses this one asset for both EN and SQ, replacing the Ferrari homepage selection. No generation, retouching, slideshow or alternate mobile car.
- Accessible localized descriptions identify the owner's bronze Porsche and AI-edited port background as brand illustration, not shipping/delivery evidence. The existing discreet artwork attribution remains.
- Homepage CSS uses the source aspect ratio and `object-fit: contain` without a desktop maximum-height crop. Removed conflicting desktop copy-width declarations and inherited white text shadows. Mobile copy sits above the complete landscape scene.
- Original logo, all 30 archival photographs, interior-page artwork, calculator logic/rates, forms, backend, auth, SEO, analytics and URLs remain unchanged.

## Verification actually performed
- Opened and visually inspected eight native-viewport screenshots: EN and SQ at 1440 × 900, 1280 × 900, 1024 × 900 and 390 × 844.
- The full Porsche and both open doors are visible; desktop heading/actions occupy the left negative space without touching the vehicle. Desktop navigation remains visible at 1024 and above. Mobile deliberately shows the complete landscape below copy rather than filling the phone with a crop.
- Browser checks confirmed the exact Porsche URL decoded at its expected width, computed image fit was `contain`, and no horizontal overflow or page exceptions occurred in these eight states.
- Clicked both homepage CTAs in both languages and waited for the destination to replace the homepage: `/calculator`, `/contact`, `/al/kalkulator-transporti`, `/al/kontakt` displayed their own headings.
- All 12 existing photography, customer-path and media-layout tests passed. Automatic preview build log reported `build OK` after the source edits; no manual build was run.
- Screenshots and browser verification script are under `/tmp/browser/porsche-hero/`; these are temporary QA artifacts, not bundled site assets.

## Limits and save status
- This was a targeted homepage asset update, not another sitewide visual audit. Mobile keeps the car whole at the cost of a smaller subject within the original landscape.
- No quote was submitted and no operational calculator logic was changed or revalidated beyond the existing tests and destination checks.
- Source/image presentation changes were managed-saved as `b21249c`; this report and task completion record follow that save. No publishing or deployment was requested or performed.