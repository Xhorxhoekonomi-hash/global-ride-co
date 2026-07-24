# Visual QA Checklist — Alpha Worldwide Albania

This is a manual checklist for browser/device testing. Nothing in this
document has been executed — it is a checklist for a human (or a future
session with live browser access) to work through on the deployed or
preview site. No results are recorded here.

## Viewports to test

**Desktop widths:** 1920px, 1440px, 1280px, 1024px
**Tablet widths:** 834px (iPad portrait), 1024px (iPad landscape)
**Mobile widths:** 390px (iPhone 14/15), 375px (iPhone SE), 360px (common Android), 320px (smallest common baseline)

## Browsers / platforms

- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Chrome (desktop)
- [ ] Chrome (Android)
- [ ] Firefox (desktop, spot check)

## Pages to check

### Core pages
- [ ] Homepage (`/`)
- [ ] Calculator (`/calculator`) — both USA and Korea calculator flows
- [ ] Contact (`/contact`) — form rendering and submission
- [ ] Services (`/services`)
- [ ] About (`/about`)
- [ ] Delivered Vehicles (`/delivered-vehicles`)

### Origin pages
- [ ] `/import-usa`, `/import-korea`, `/import-uae`, `/import-canada`, `/import-europe`
- [ ] `/auction-access`, `/inspection-service`

### Shipping-method pages
- [ ] `/container-shipping`, `/roro-shipping`, `/airfreight`

### Authority pages
- [ ] `/why-alpha-worldwide` (long page, many sections — check scroll rhythm)
- [ ] `/how-it-works` (timeline layout — check the connecting line renders correctly at all widths, check step numbers don't overlap on narrow screens)
- [ ] `/reviews` (vehicle photo grid — check aspect ratios hold on mobile)
- [ ] `/faq` (category pills + accordion — check pill row wraps cleanly, check accordion open/close on touch)
- [ ] `/vehicle-history-check`

### European destination pages (11 total)
- [ ] `/import-netherlands`, `/import-germany`, `/import-belgium`, `/import-france`, `/import-italy`
- [ ] `/import-switzerland`, `/import-austria`, `/import-spain`, `/import-poland`, `/import-czech-republic`, `/import-romania`
- [ ] Spot-check long country names don't break the hero eyebrow/H1 layout (e.g. "Czech Republic", "Switzerland")
- [ ] Spot-check the cross-link pill row at the bottom of each page wraps cleanly at 320–375px

### Albanian pages (14 total)
- [ ] `/al/`, `/al/makina-nga-amerika`, `/al/makina-nga-korea`, `/al/makina-nga-dubai`, `/al/kontakt`, `/al/kalkulator-transporti`
- [ ] `/al/copart-shqiperi`, `/al/iaai-shqiperi`, `/al/ankande-amerikane`, `/al/encar-shqiperi`, `/al/inspektim-makinash`
- [ ] `/al/transport-me-kontenier`, `/al/transport-roro`, `/al/transport-ajror-makinash`
- [ ] Confirm the comparison table on `/al/ankande-amerikane` scrolls horizontally on narrow screens rather than breaking layout
- [ ] Confirm Albanian diacritics (ë, ç) render correctly on all tested platforms

### Shared components (check on at least 3 different pages each)
- [ ] Header / navigation — desktop dropdown, mobile menu open/close, tap targets
- [ ] Footer — column stacking on mobile, all links tappable, no overlapping text
- [ ] WhatsApp floating button — doesn't obscure content or overlap other sticky elements
- [ ] QuoteForm — field stacking, validation message placement, submit button state

## Specific things to look for

- [ ] **Layout shift**: does any image, font swap, or async content cause visible content jump after initial paint? (Throttle to Slow 3G in DevTools and watch.)
- [ ] **Horizontal scroll**: at 320px, does the page ever scroll horizontally when it shouldn't? (Check html/body overflow.)
- [ ] **CTA wrapping**: do the "WhatsApp Us" / "Calculate Shipping Cost" button pairs wrap onto separate lines cleanly on mobile, or do they clip/overlap?
- [ ] **Card stacking**: do multi-column grids (service cards, FAQ categories, "what customers bring in" lists) collapse to single-column cleanly below the `md:` breakpoint?
- [ ] **Image cropping**: do hero images crop acceptably at ultra-wide (1920px+) and ultra-narrow (320px) — check no important subject matter is cut off by `object-cover`.
- [ ] **Tap target size**: are footer links, pill-style cross-links, and accordion triggers large enough to tap reliably on a real touchscreen (not just a resized desktop browser)?
- [ ] **Form submission**: does the contact form actually submit successfully in a live (non-preview) environment? Confirm success and failure states both render legibly.
- [ ] **Schema spot check**: on 3–5 representative pages, paste the rendered HTML into Google's Rich Results Test or Schema.org validator and confirm no errors.
- [ ] **Slow network**: load the homepage and calculator on a throttled connection (Slow 3G) and confirm the page remains usable before full load — no blank screen for an extended period.

## Out of scope for this checklist

This document does not cover: load testing, penetration testing, cross-browser
JavaScript polyfill needs for very old browsers, or automated regression
testing setup. Those are separate efforts if ever needed.
