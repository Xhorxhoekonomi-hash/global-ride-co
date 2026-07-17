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

// ─── Calculator (Albanian) ─────────────────────────────────────────────────
// Mirrors CalculatorDict from src/components/calculator/dict.ts. Rate tables,
// formulas, and numeric constants live in src/data/* and are NEVER duplicated
// here — this file only carries UI copy.

import type { CalculatorDict, CalculatorFAQ } from "@/components/calculator/dict";

export const KOREA_INCLUDES_AL: string[] = [
  "Tërheqja lokale në Korenë e Jugut",
  "Dokumentacioni i eksportit",
  "Transport detar me RoRo",
  "Tarifa e shërbimit të Alpha Worldwide",
];

export const CALCULATOR_FAQS_AL: CalculatorFAQ[] = [
  { q: "Si llogaritet përllogaritja për transportin nga SHBA-ja?", a: "Kombinojmë tarifën reale të transportit tokësor nga vendndodhja e ankandit deri në terminalin më të afërt të eksportit, shkallën e plotë të tarifave të blerësit të Copart/IAAI për ofertën tuaj fituese, dhe tarifën e transportit detar për atë rrugë — të gjitha nga tabelat që përdor ekipi ynë." },
  { q: "Si llogaritet përllogaritja për transportin nga Koreja e Jugut?", a: "Koreja e Jugut përdor një çmim të fiksuar 'all-in' sipas llojit të automjetit dhe destinacionit, duke mbuluar tërheqjen lokale, dokumentacionin e eksportit dhe transportin detar RoRo — kështu që përllogaritja është më e thjeshtë dhe nuk kërkon ndarje të veçantë të tarifave." },
  { q: "Çfarë përfshihet në përllogaritje?", a: "Transporti tokësor (SHBA-ja), tarifat e ankandit (SHBA-ja), transporti detar dhe shkarkimi në portin e destinacionit. Për Korenë e Jugut, tërheqja dhe dokumentacioni i eksportit janë të përfshira në një çmim të fiksuar." },
  { q: "Çfarë nuk përfshihet në përllogaritje?", a: "Taksat doganore dhe importi nuk përfshihen në asnjë nga kalkulatorët, sepse varen nga rregullat e vendit të destinacionit dhe nga vlera e deklaruar e automjetit. Ne ju ndihmojmë t'i konfirmoni pasi të dimë destinacionin." },
  { q: "Pse mund të ndryshojë çmimi im final nga përllogaritja?", a: "Përmasat e automjetit, gjendja, kërkesat e sakta të ngarkimit dhe oraret aktuale të transportuesve mund të ndikojnë në çmimin final. Kalkulatori jep një përllogaritje reale të detajuar — menaxheri i rastit konfirmon shifrën përfundimtare para rezervimit." },
  { q: "A është kjo një ofertë detyruese?", a: "Jo — të gjitha shifrat janë përllogaritje mbi bazën e tabelave reale të tarifave, të konfirmuara nga ekipi ynë përpara çdo rezervimi. Asgjë nuk faturohet ose rezervohet automatikisht nga kalkulatori." },
];

export const CALCULATOR_DICT_AL: CalculatorDict = {
  hero: {
    eyebrow: "Kalkulator transporti",
    title: "Kosto reale. Pa hamendësime.",
    subtitle: "Çdo tarifë e detajuar — transport tokësor, tarifa ankandi, transport detar dhe shkarkim — e llogaritur nga tabela reale.",
  },
  tabs: { usa: "SHBA-ja — Copart / IAAI", korea: "Koreja e Jugut — Encar" },
  howItWorks: {
    eyebrow: "Si funksionon",
    heading: "Tabela reale tarifash, jo hamendësime",
    usaTitle: "Përllogaritja për SHBA-në",
    usaBody: "Kombinon tarifën reale të transportit tokësor nga vendndodhja e ankandit deri në terminalin më të afërt të eksportit, shkallën e plotë të tarifave të blerësit të Copart/IAAI për ofertën fituese, dhe tarifën e transportit detar për atë rrugë.",
    koreaTitle: "Përllogaritja për Korenë e Jugut",
    koreaBody: "Një çmim i fiksuar 'all-in' sipas llojit të automjetit dhe destinacionit — që bashkon tërheqjen lokale, dokumentacionin e eksportit dhe transportin detar RoRo në një shifër të vetme.",
  },
  included: {
    title: "Çfarë përfshihet",
    items: [
      "Transporti tokësor deri në terminalin e eksportit (SHBA-ja)",
      "Tarifat e plota të blerësit në ankand (SHBA-ja)",
      "Tërheqja lokale dhe dokumentacioni i eksportit (Koreja e Jugut)",
      "Transporti detar deri në portin e destinacionit",
      "Shkarkimi në destinacion",
    ],
  },
  excluded: {
    title: "Çfarë nuk përfshihet",
    items: [
      "Taksat doganore dhe importi",
      "Regjistrimi dhe homologimi i automjetit",
      "Dorëzimi përtej portit të destinacionit, nëse nuk është ofertuar veçmas",
    ],
    note: "Vlerat doganore, shumat e taksave dhe vendimet e zhdoganimit përcaktohen nga autoriteti doganor përkatës, jo nga Alpha Worldwide.",
  },
  ports: {
    eyebrow: "Portet e destinacionit",
    heading: "Ku mbërrin automjeti juaj",
    durres: { title: "Porti i Durrësit", body: "Porti kryesor i Shqipërisë dhe baza jonë kryesore operative." },
    rotterdam: { title: "Rotterdam", body: "Porta jonë holandeze, me dorëzim të mëtejshëm në Evropën Perëndimore." },
    bremerhaven: { title: "Bremerhaven", body: "Një opsion destinacioni në Gjermani, i disponueshëm me kërkesë." },
  },
  faq: { eyebrow: "Pyetje", heading: "Pyetje të shpeshta" },
  relatedCta: {
    eyebrow: "Gati për të vazhduar?",
    heading: "Shfletoni rrugën tuaj",
    links: [
      { to: "/al/makina-nga-amerika", label: "Import nga SHBA-ja" },
      { to: "/al/makina-nga-korea", label: "Import nga Koreja e Jugut" },
      { to: "/al/copart-shqiperi", label: "Copart Shqipëri" },
      { to: "/al/iaai-shqiperi", label: "IAAI Shqipëri" },
      { to: "/al/kontakt", label: "Kontakt" },
    ],
  },
  usa: {
    step1: { title: "Kërkoni vendndodhjen e ankandit", placeholder: "p.sh. Houston TX, Miami FL, Atlanta GA…" },
    step2: {
      title: "Përmasa e automjetit",
      sizes: [
        { value: "Sedan/Standard", title: "Sedan / Standard", body: "Sedan, SUV standard, furgon standard, pikap standard" },
        { value: "Large SUV/Truck", title: "SUV i madh / Pikap i madh", body: "SUV i madh, pikap i madh · ×1.5 transport tokësor" },
        { value: "Oversized", title: "I mbi-madhësuar", body: "Furgon i madh, pikap i mbi-madhësuar · ×2.0 transport tokësor" },
      ],
      evLabel: "Ky është një automjet elektrik ose hibrid (+300 USD)",
    },
    step3: { title: "Oferta fituese në ankand", helper: "Vendosni çmimin e fitimit — të gjitha tarifat e Copart/IAAI llogariten automatikisht." },
    step4: {
      title: "Destinacioni",
      destinations: [
        { value: "Albania", code: "AL", label: "Shqipëri", port: "Porti i Durrësit" },
        { value: "Germany", code: "DE", label: "Gjermani", port: "Porti i Bremerhaven" },
        { value: "Netherlands", code: "NL", label: "Holandë", port: "Porti i Rotterdamit" },
      ],
    },
    routedVia: "E rrugëzuar përmes",
    breakdown: {
      title: "Detajimi i kostos",
      landTransportSection: "Transporti tokësor",
      auctionFeesSection: "Tarifat e ankandit",
      oceanSection: "Transporti detar dhe destinacioni",
      terminalToDest: (t, d) => `${t} → ${d}`,
      unloadingAt: (d) => `Shkarkimi në ${d}`,
      totalShipping: "Totali i transportit",
      landTransportRow: "Transporti tokësor",
      buyerFee: (base) => `Tarifa e blerësit (mbi ${base})`,
      virtualBidFee: "Tarifa e ofertës virtuale",
      gateFee: "Tarifa e portës",
      titleFee: "Tarifa e dërgimit të titullit",
      envFee: "Tarifa mjedisore",
      brokerFee: "Tarifa e brokerit Alpha Worldwide",
      evSurcharge: "Mbitarifa për automjete elektrike",
      totalAuctionFees: "Totali i tarifave të ankandit",
      winningBid: "Oferta fituese",
      plusAuctionFees: "+ Tarifat e ankandit",
      plusLandTransport: "+ Transporti tokësor",
      plusOceanUnloading: "+ Transporti detar + shkarkimi",
      estimatedTotalUsd: "Totali i përllogaritur (USD)",
      estimatedTotalEurApprox: "Totali i përllogaritur (EUR ~)",
      notes: {
        buyerFeeNote: "* Tarifa e blerësit aplikohet mbi (oferta + 100 USD) sipas rregullave të Copart",
        containerNote: "* Kontenier i përbashkët 40'HC — zakonisht 4 automjete",
        usdEurNote: "* USD→EUR në ~0.92 (kurs i përafërt)",
        customsWarning: "Taksat doganore dhe importi NUK janë të përfshira",
        estimatesWarning: "Të gjitha shifrat janë përllogaritje. Konfirmohen nga ekipi.",
      },
    },
    emptyState: "Plotësoni çdo hap — vendndodhjen, përmasën, ofertën dhe destinacionin — për të parë detajimin e kostos.",
    requestOnWhatsApp: "Kërko këtë ofertë në WhatsApp",
    requestFullQuote: "Kërko një ofertë të plotë →",
    wa: {
      greeting: "Përshëndetje Alpha Worldwide,",
      resultLead: "Rezultati im nga kalkulatori i transportit:",
      auctionLocation: "Vendndodhja e ankandit",
      routedVia: "E rrugëzuar përmes",
      destination: "Destinacioni",
      vehicle: "Automjeti",
      evTag: " (Elektrik/Hibrid)",
      winningBid: "Oferta fituese",
      landTransport: "Transporti tokësor",
      auctionFees: "Tarifat e ankandit",
      oceanFreight: "Transporti detar",
      unloading: "Shkarkimi",
      separator: "──────────────────────",
      estimatedTotal: "Totali i përllogaritur",
      closingConfirm: "Ju lutem konfirmoni dhe më dërgoni hapat e mëtejshëm.",
      closingThanks: "Faleminderit.",
    },
  },
  korea: {
    step1: {
      title: "Lloji i automjetit",
      roroTag: "Transporti me RoRo — i përfshirë në çmimin e fiksuar",
      types: [
        { value: "Sedan/Coupe", label: "Sedan/Kupe" },
        { value: "SUV/Minivan", label: "SUV/Minivan" },
        { value: "Oversized", label: "I mbi-madhësuar" },
      ],
    },
    step2: {
      title: "Çmimi i automjetit",
      helper: (converted) => `≈ ${converted} (kurs i përafërt, ₩1.450 = €1)`,
    },
    step3: {
      title: "Destinacioni",
      destinations: [
        { value: "Albania", code: "AL", label: "Shqipëri", port: "Porti i Durrësit" },
        { value: "Germany", code: "DE", label: "Gjermani", port: "Porti i Bremerhaven" },
        { value: "Netherlands", code: "NL", label: "Holandë", port: "Porti i Rotterdamit" },
      ],
    },
    breakdown: {
      title: (d) => `Detajimi i kostos — Koreja e Jugut → ${d}`,
      vehicleLine: (t) => `Automjeti: ${t}`,
      vehiclePrice: "Çmimi i automjetit",
      allInTitle: "Paketa 'all-in' e transportit",
      fixedShipping: "Çmimi i fiksuar i transportit",
      plusShipping: "+ Transporti 'all-in'",
      estimatedTotal: "Totali i përllogaritur",
      notes: {
        customsWarning: "Taksat doganore dhe importi nuk përfshihen",
        estimatesWarning: "Vetëm përllogaritje. Konfirmohet nga ekipi.",
      },
    },
    emptyState: "Plotësoni llojin e automjetit, çmimin dhe destinacionin për të parë detajimin e kostos.",
    requestOnWhatsApp: "Kërko këtë ofertë në WhatsApp",
    requestFullQuote: "Kërko një ofertë të plotë →",
    wa: {
      greeting: "Përshëndetje Alpha Worldwide,",
      resultLead: (d) => `Rezultati im nga kalkulatori — Koreja e Jugut → ${d}`,
      vehicle: "Automjeti",
      vehiclePrice: "Çmimi i automjetit",
      fixedShipping: "Çmimi i fiksuar i transportit",
      separator: "──────────────────────",
      estimatedTotal: "Totali i përllogaritur",
      closingConfirm: "Ju lutem konfirmoni dhe më dërgoni hapat e mëtejshëm.",
      closingThanks: "Faleminderit.",
    },
  },
};

