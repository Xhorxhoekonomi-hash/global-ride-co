// Albanian-language navigation, form labels, and shared UI strings.
// Page-specific content (hero copy, FAQ, workflow steps) stays inline in
// each Albanian page file, matching the pattern already used across every
// English page — only genuinely reusable chrome strings live here.

export type NavItemAL = { to: string; label: string };

// Only pages that actually exist. Add entries exactly when their route ships.
export const NAV_AL: NavItemAL[] = [
  { to: "/al", label: "Kryefaqja" },
  { to: "/al/makina-nga-amerika", label: "Makina nga Amerika" },
  { to: "/al/kontakt", label: "Kontakt" },
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
  origin: "Importo nga",
  destination: "Destinacioni",
  vehicleLink: "Linku i automjetit ose numri i lotit",
  vehicleLinkPlaceholder: "Linku i Copart, IAAI, ose i një shpalljeje…",
  makeModel: "Marka & Modeli i Automjetit",
  makeModelPlaceholder: "p.sh. BMW X5",
  service: "Shërbimi i kërkuar",
  serviceFullProcess: "Procesi i plotë (rekomandohet)",
  serviceInspectionOnly: "Vetëm Inspektim",
  serviceAuctionPurchase: "Blerje në Ankand",
  serviceShippingOnly: "Vetëm Transport",
  serviceCustoms: "Koordinim Doganor",
  message: "Mesazhi",
  messagePlaceholder: "Na tregoni për automjetin, kohën, ose çdo preferencë…",
  submitCompact: "Merr Ofertë Falas",
  submitFull: "Kërko Ofertë në WhatsApp",
  submitting: "Duke dërguar…",
  submitHelper: "Duke dërguar hapet WhatsApp me detajet tuaja të plotësuara paraprakisht.",
  successTitle: "Dërguar në WhatsApp",
  successBody:
    "Kërkesa juaj u hap në WhatsApp me të gjitha detajet e plotësuara paraprakisht — thjesht shtypni dërgo dhe ekipi ynë do t'ju përgjigjet së shpejti.",
  tryAgain: "Plotësoni formularin përsëri",
  errorGeneric: "Diçka shkoi keq. Ju lutemi provoni përsëri ose na kontaktoni direkt në WhatsApp.",
};

// { value } is the normalized, language-neutral code stored in the lead
// payload and used for analytics/WhatsApp — { label } is what's displayed.
// Keeps Albanian and English submissions consistent on the backend side
// (e.g. "Amerikë" and "USA" both submit as origin value "USA") without a
// larger data-model refactor.
export const ORIGIN_OPTIONS_AL = [
  { value: "USA", label: "Amerikë" },
  { value: "South Korea", label: "Korea e Jugut" },
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
  eyebrow: "Aksesi i Licencuar · Rrjete të Besueshme Ankandesh & Shitësish",
  footer: "Shfletoni platformat zyrtare. Alpha Worldwide ju asiston me inspektim, blerje dhe transport.",
};
