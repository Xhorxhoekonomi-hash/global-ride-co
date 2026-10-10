# Mobile photo display correction — 10 October 2026

## Actual changes
- `src/components/site/HomeExperience.tsx`: a single responsive original-photo hero; frontal Urus on phones and three-quarter Urus on desktop. Removed archive captions and the hero rule/frame. Compact localized supporting copy and two equal-width CTA links. CustomerEntry remains immediately after the hero. Ocean-shipping story now shows the original dark Ferrari inside a container without a caption strip.
- `src/styles.css`: removed competing hero/service/guide/interior media definitions and consolidated authoritative stage rules. Mobile hero is 78svh (560–780px bounds), full-width, with a semantic white-to-transparent copy wash. Desktop retains an independent editorial split with the full car and Alpha plate visible. Service uses a full-width 4:5 image, guides 5:4 desktop / 4:3 mobile, and interior images lose grey padding. No immersive stage uses contain.
- `src/lib/alpha-photos.ts`: added a named `urusFront` reference to an existing original; no assets or album records removed.
- `src/components/site/WhatsAppFloat.tsx`: modest 44px mobile contact button and semantic brand colors, avoiding hero CTA and vehicle overlap.
- `AGENTS.md`, `roadmap.md`: recorded presentation boundaries and completed scope.

## Checks actually run
- Before and after Playwright screenshots at 390 and 1440; final EN and SQ hero/service screenshots at 390, 360 and 1440. Reviewed mobile full-car/plate framing and container-photo fill; adjusted desktop photo position to preserve the bumper and plate.
- Both localized hero links clicked through to calculator and contact pages.
- Both-language CustomerEntry origin selection changed to Korea and navigated to its correct page; shipping, estimate and inspection tabs clicked and their destinations opened.
- Gallery opened, keyboard next exercised, Escape closed it.
- Seven existing photo preservation and navigation-rule tests passed, including all 30 originals and original-only curated selections.
- Services, USA and UAE interior pages checked at 390 and 1440 for image loading and horizontal overflow. Guide photograph reviewed separately.
- No horizontal overflow on tested pages; no captured JavaScript page errors. Latest automatic build: OK.

## Preserved and limitations
Original BrandLogo, all 30 photos, full gallery, rates/calculation logic, forms, lead handling, auth, security and leaf SEO remain unchanged. No dependencies, generated imagery, carousel, fake offers or claimed delivery metadata added. No production deployment or publication. Real-phone Safari and external WhatsApp delivery were not tested. Git state is managed by Lovable; no manual git commit operation was run.

Preview: https://id-preview--2c14f629-3cb6-43be-bfe3-20e2e6dd0c2f.lovable.app