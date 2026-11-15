// Single switch for customer-facing Google sign-in.
//
// false -> the "Continue with Google" / "Vazhdo me Google" button and its "or"
// divider are not rendered on any account page (EN + SQ). The provider stays
// configured in auth settings and the sign-in code below is untouched, so
// flipping this back to true restores the button with no other change.
export const GOOGLE_SIGN_IN_ENABLED = false;
