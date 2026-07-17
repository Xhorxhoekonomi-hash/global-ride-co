// Albanian-language navigation, form labels, and shared UI strings.
// Page-specific content (hero copy, FAQ, workflow steps) stays inline in
// each Albanian page file, matching the pattern already used across every
// English page — only genuinely reusable chrome strings live here.

export type NavItemAL = { to: string; label: string };

// Only pages that actually exist. Add entries exactly when their route ships.
export const NAV_AL: NavItemAL[] = [
  { to: "/al", label: "Kryefaqja" },
  { to: "/al/makina-nga-amerika", label: "Makina nga Amerika" },
  { to: "/al/makina-nga-korea", label: "Makina nga Koreja" },
  { to: "/al/kontakt", label: "Kontakt" },
];

// Additional AL pages surfaced only in the footer/hub — kept out of the
// top nav to avoid overcrowding while still being discoverable.
export const AL_FOOTER_EXTRAS: NavItemAL[] = [
  { to: "/al/copart-shqiperi", label: "Copart Shqipëri" },
  { to: "/al/iaai-shqiperi", label: "IAAI Shqipëri" },
];

export const QUOTE_FORM_LABELS_AL = {
  fullName: "Emri i plotë",
  fullNamePlaceholder: "Emri juaj",
  fullNameRequired: "Ju lutemi shkruani emrin tuaj të plotë.",
  phone: "Telefon / WhatsApp",
  phonePlaceholder: "+355 …",
  phoneRequired: "Ju lutemi shkruani një numër telefoni/WhatsApp të vlefshëm.",
  email: "Email",
  emailPlaceholder: "juaj@shembull.com",
  emailInvalid: "Ju lutemi shkruani një adresë email të vlefshme.",
  origin: "Origjina e automjetit",
  destination: "Destinacioni",
  vehicleLink: "Linku i automjetit ose numri i lotit",
  vehicleLinkPlaceholder: "Linku i Copart, IAAI, ose i një shpalljeje…",
  makeModel: "Marka dhe modeli i automjetit",
  makeModelPlaceholder: "p.sh. BMW X5",
  service: "Shërbimi i kërkuar",
  serviceFullProcess: "Procesi i plotë (rekomandohet)",
  serviceInspectionOnly: "Vetëm inspektim",
  serviceAuctionPurchase: "Blerje në ankand",
  serviceShippingOnly: "Vetëm transport",
  serviceCustoms: "Koordinim doganor",
  message: "Mesazhi",
  messagePlaceholder: "Na tregoni për automjetin, kohën, ose çdo preferencë…",
  submitCompact: "Merr një ofertë falas",
  submitFull: "Kërko një ofertë në WhatsApp",
  submitting: "Duke dërguar…",
  submitHelper: "Pas dërgimit të formularit, WhatsApp do të hapet me të dhënat tuaja të plotësuara paraprakisht.",
  successTitle: "Dërguar në WhatsApp",
  successBody:
    "WhatsApp u hap me të dhënat e kërkesës suaj. Kontrollojini dhe shtypni 'Dërgo' për t'ia dërguar ekipit tonë.",
  tryAgain: "Plotësojeni sërish formularin",
  errorGeneric: "Diçka shkoi keq. Ju lutemi provoni përsëri ose na kontaktoni drejtpërdrejt në WhatsApp.",
};

// { value } is the normalized, language-neutral code stored in the lead
// payload and used for analytics/WhatsApp — { label } is what's displayed.
// Keeps Albanian and English submissions consistent on the backend side
// (e.g. "Amerikë" and "USA" both submit as origin value "USA") without a
// larger data-model refactor.
export const ORIGIN_OPTIONS_AL = [
  { value: "USA", label: "Amerikë" },
  { value: "South Korea", label: "Koreja e Jugut" },
  { value: "UAE", label: "Emiratet e Bashkuara Arabe" },
  { value: "Canada", label: "Kanada" },
  { value: "Europe", label: "Evropë" },
  { value: "Other", label: "Tjetër" },
];

export const DESTINATION_OPTIONS_AL = [
  { value: "Albania", label: "Shqipëri" },
  { value: "Germany", label: "Gjermani" },
  { value: "Italy", label: "Itali" },
  { value: "Belgium", label: "Belgjikë" },
  { value: "Netherlands", label: "Holandë" },
  { value: "France", label: "Francë" },
  { value: "Other", label: "Tjetër" },
];

export const PLATFORM_BADGES_LABELS_AL = {
  eyebrow: "Akses në platforma të njohura ankandesh dhe shitësish",
  footer: "Shfletoni platformat zyrtare. Alpha Worldwide ju ndihmon me verifikimin, blerjen dhe transportin e automjetit.",
};
