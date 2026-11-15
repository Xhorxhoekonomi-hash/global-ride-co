# Free customer accounts and calculator access

## Scope and safeguards

Build the EN/SQ customer account experience, gate only calculated prices and quote-request actions, and add the owner's customer list. Keep both calculator pages public and server-rendered, with their current content, FAQs, URLs and SEO output. Preserve all rates, formulas, existing lead forms/notifications, analytics events and staff access. Do not publish.

The requested account fields establish that user profiles are needed; no further profile decision is required.

## 1. Calculator result access

- Visitors can finish every USA/Korea input step. Replace the completed result with the requested localized lock panel and free-account/sign-in actions when signed out or not email-confirmed.
- Hide all generated breakdown amounts, totals, Korea method prices and result WhatsApp actions from signed-out HTML. User-entered purchase prices and currency labels remain input controls, not unlocked estimates.
- Move calculation into an authenticated server function that uses the existing rate modules and formulas unchanged. Send only location names/cities/states, terminal names, shipping method availability and non-price copy to visitors.
- Keep existing input controls and result presentation. Fetch method prices only for authenticated customers. Compute and save quotes server-side; never accept client-provided totals.
- Preserve tab and all selections in sessionStorage before account navigation and restore them after sign-in/confirmation, including destination, EV, currency and Korea method. Validate restored state and preserve homepage prefill behavior.
- Debounce new inputs and deduplicate identical saved quotes per user/input fingerprint. Clear protected results and cached data on sign-out.

## 2. Bilingual account pages

Create exactly these pairs, all noindex and excluded from the sitemap, with unique metadata and reciprocal account-only language alternates:

| English | Albanian |
|---|---|
| `/account/sign-up` | `/al/llogaria/regjistrohu` |
| `/account/sign-in` | `/al/llogaria/hyr` |
| `/account/reset-password` | `/al/llogaria/rivendos-fjalekalimin` |
| `/account` | `/al/llogaria` |

- Sign-up: full name, email, international phone, country default Albania, password minimum eight characters, required Privacy/Terms agreement and optional unticked marketing consent.
- Require email confirmation; provide check-inbox and resend states, safe same-origin calculator return paths, forgotten-password and recovery-password forms.
- Check hosted Google provider availability without enabling a new provider; show its correctly branded button only if already available. Do not change staff sign-in.
- Account: editable name/phone/country, marketing preference, sign-out and explicit confirmed account deletion through an authenticated server function.
- Add a compact session-aware account icon on desktop and a localized account link in the mobile menu. Preserve the existing menu portal and layout.

## 3. Private customer data

### Necessary schema adjustment

Lovable Cloud permits direct `auth.users` foreign keys only on `public.profiles` and `public.user_roles`. Use **`public.profiles`** for the requested customer profile fields rather than `customer_profiles`; quotes reference `public.profiles(id)` and cascade on profile deletion. This preserves the requested user identity/deletion behavior while following managed schema rules.

- Profiles hold name, email, phone, country, locale, marketing consent/date/exact wording, privacy acceptance and creation/update dates.
- Create customer profiles from validated sign-up metadata using an app-owned auth lifecycle trigger; ordinary existing staff accounts are unaffected. Handle an already-configured Google account with a required profile/privacy-completion step.
- Quote rows hold user, tab, validated inputs, server-generated breakdown, total, currency and a unique input fingerprint.
- Explicit grants and RLS: no anonymous access; customers read their own profile/quotes and edit only permitted profile fields; staff read all using the existing `staff_users` mechanism. Customer signup can never create staff membership.
- Validate writes with Zod and database safeguards. Restrict ownership, consent evidence and quote result fields against direct-client tampering. Delete auth users only after revalidating the caller; never expose privileged credentials.

## 4. Welcome and owner emails

**Verified:** the existing sender domain is active; no new sender setup or DNS changes are needed.

- Extend the existing email registry with localized welcome and fixed-owner new-account notices. Use the existing sender helper and event-based idempotency keys.
- Send only after the server verifies email confirmation, on the first post-confirmation account/calculator session; use the verified account email and stored profile, never a browser-supplied recipient. No marketing content or bulk sending.
- Welcome includes calculator access, localized calculator link, verified WhatsApp and owner email. Owner notice includes the requested account/consent fields.
- Sending failures must not block account access; report failures honestly. Managed email handles delivery retries and suppression; no email queues or email-related tables/migrations.

### Unsubscribe constraint

Lovable app emails already include a compulsory hosted unsubscribe footer. Platform rules prohibit adding an app-owned unsubscribe-token system or `/unsubscribe` route. **Do not add the requested token column or route.** Keep the separate, editable marketing-consent record for owner CSV export; future marketing campaigns must use a dedicated marketing service with its own unsubscribe handling. Welcome and owner notices continue to use managed app emails.

## 5. Owner customer list

- Add `/admin/customers`, guarded with the same verified-user plus `staff_users` check as leads; every server read separately verifies staff status.
- Match the current staff page style; add navigation between leads and customers without changing lead operations.
- Table: requested profile fields, confirmation status, consent evidence, quote count and latest route/vehicle/total; search, consent filter and expandable customer quote history.
- Export all or consented-only customers as correctly escaped CSV, protect against spreadsheet formula injection and never export passwords/tokens.

## 6. Privacy and analytics

- Add a concise factual account-data section to both Privacy Policies, covering stored profile/estimate data, purposes, optional marketing, preference management/deletion and contact email; preserve existing metadata and other legal copy.
- Add the five requested analytics events without personal data, through the existing consent-aware tracking helper; avoid duplicate events from re-renders.

## 7. Verification and final report

- Unit tests for confirmed-session gating, no rendered breakdown prices while locked, profile/consent mapping, input validation, deduplication and CSV escaping/filtering.
- Price-equivalence tests against unchanged existing calculation functions, including all approved Korea combinations and USA routing/multipliers.
- End-to-end EN/SQ checks at 390×844 and 1440×900: complete signed-out USA/Korea flows, lock panel, sign-up/inbox states, restored unlocked result, account edits and staff customer list/quote expansion/exports.
- Create isolated temporary test users, confirm only those through privileged test tooling, verify customer refusal on staff reads/pages, then remove test users and their data. Never relax production confirmation or grant a customer staff access.
- Look at screenshots for all requested states; run all existing/new tests and inspect automatic build and console signals. Preserve existing calculator SEO output and sitemap exclusions.
- Report actual schema differences, server-side price protection, Google availability, email outcomes, any owner action and anything unverified. No publication.

## Known checks still required during implementation

Hosted email confirmation/signup/HIBP settings and Google availability have not yet been established by the available project-info read. Inspect hosted settings before making changes; preserve unrelated auth settings. Email inbox delivery, production webhook behavior and physical-iPhone behavior must not be claimed from local browser checks.
