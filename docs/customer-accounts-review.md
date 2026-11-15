# Customer accounts — implementation and verification

## Built
- EN/SQ sign-up, sign-in, recovery and profile pages, all noindex with reciprocal account-only hreflang and no sitemap additions.
- Result-only USA/Korea gate, free-account/sign-in buttons, server-side price computation and sessionStorage restoration.
- Profile editing, optional unticked marketing consent, account deletion, session-aware header/menu.
- Staff-only customers table, search/consent filter, quote history and all/consented CSV exports.
- Welcome and fixed-owner new-account emails through the existing active sender; per-user idempotency keys. Triggered on first confirmed session, not via a background confirmation hook.
- EN/SQ privacy account-data section; five consent-aware analytics events without personal data.

## Migration
`0001_customer_accounts_quotes`: public.profiles (contact/locale/privacy and consent evidence), public.calculator_quotes (validated inputs, authoritative breakdown, total/currency, unique user/input fingerprint), explicit grants, owner/staff read policies, restricted profile field updates, validated signup metadata trigger and server-owned consent timestamps/wording. Quotes are server-written only to prevent forged totals. Profiles cascade from auth deletion; quotes cascade from profiles.

As approved in the plan, use profiles instead of customer_profiles. No unsubscribe token or app-owned unsubscribe route: managed app emails already carry hosted unsubscribe; future marketing must use a dedicated marketing sender, using exported consent data. No marketing sending is built.

## Price protection
Computation moved server-side behind validated confirmed authentication and customer-profile access. USA rate/fee/ocean tables and Korea shipping prices are not imported at runtime by calculator presentation. Public auction metadata contains only 251 names/cities/states. User-entered vehicle amounts/currency controls remain public. Signed-out generated result and method-price markup is absent; EV surcharge annotation is hidden while signed out. Conversion constants and non-price inclusion copy remain public.

All original rate files and calculation formulas are unchanged. Unit equivalence covers 251 locations × 3 sizes, approved six Albania Korea combinations and Germany/Netherlands totals.

## Verified
- 123 tests pass across 13 files; latest automatic build OK.
- Chromium 390×844 and 1440×900, EN/SQ: completed public USA → locked result → sign-up page.
- Temporary unconfirmed customers created through privileged test API, then confirmed only by exact test UUID; sign-in restores USA selections and shows land $345; all four locale/viewport combinations pass.
- Profile changes saved and read back after reload; customer refused staff customers route; staff sees both temporary customers and saved quotes.
- Repeated identical input yields one quote row per test customer. Test users removed afterwards.
- Customer browser checks reported zero page errors. Screenshots captured for locked/sign-up/unlocked/account and empty/populated staff views.

## Owner action and unverified items
- Hosted public signup is currently disabled (`disable_signup=true`), confirmation is required (`mailer_autoconfirm=false`), Google is disabled. No Google button is shown.
- Public signup must be enabled in More → Users → Auth settings. The agent could not safely change it through configure_auth because that tool also rewrites the current HIBP setting, which available hosted reads do not reveal; no unrelated security setting was guessed.
- Because signup remains disabled, actual public signup/check-inbox/resend and live confirmation-email delivery are unverified. Temporary admin-created users verify profile trigger and post-confirmation access but are not substitutes for public signup testing.
- Welcome/owner sends are implemented with idempotency but inbox delivery and lifetime idempotency are unverified; no durable email-send ledger added per platform constraints.
- Password recovery, permanent deletion UI, consent toggle persistence, actual downloaded CSV, Korea signed-in browser flow, and physical iPhone behavior require further verification. Unit tests cover Korea and CSV logic.
- Nothing published. Existing lead operations and admin lead guard are unchanged apart from the customer-page navigation link.
