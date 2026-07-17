// Calculator UI dictionary type + English strings. Albanian counterpart
// lives in src/lib/i18n-al.ts as CALCULATOR_DICT_AL. Both must implement
// the same CalculatorDict shape — missing keys are a build error.

import type { Destination } from "@/data/oceanFreight";

export type CalculatorFAQ = { q: string; a: string };

export type RelatedLink = { to: string; label: string };

export type SizeOption = { value: "Sedan/Standard" | "Large SUV/Truck" | "Oversized"; title: string; body: string };
export type KoreaType = "Sedan/Coupe" | "SUV/Minivan" | "Oversized";
export type KoreaTypeOption = { value: KoreaType; label: string };
export type DestinationOption = { value: Destination; code: string; label: string; port: string };

export type CalculatorDict = {
  hero: { eyebrow: string; title: string; subtitle: string };
  tabs: { usa: string; korea: string };
  howItWorks: {
    eyebrow: string;
    heading: string;
    usaTitle: string;
    usaBody: string;
    koreaTitle: string;
    koreaBody: string;
  };
  included: { title: string; items: string[] };
  excluded: { title: string; items: string[]; note: string };
  ports: {
    eyebrow: string;
    heading: string;
    durres: { title: string; body: string };
    rotterdam: { title: string; body: string };
    bremerhaven: { title: string; body: string };
  };
  faq: { eyebrow: string; heading: string };
  relatedCta: { eyebrow: string; heading: string; links: RelatedLink[] };
  usa: {
    step1: { title: string; placeholder: string };
    step2: { title: string; sizes: SizeOption[]; evLabel: string };
    step3: { title: string; helper: string };
    step4: { title: string; destinations: DestinationOption[] };
    routedVia: string;
    breakdown: {
      title: string; // "Cost Breakdown"
      landTransportSection: string;
      auctionFeesSection: string;
      oceanSection: string;
      terminalToDest: (terminal: string, destination: string) => string;
      unloadingAt: (destination: string) => string;
      totalShipping: string;
      landTransportRow: string;
      buyerFee: (base: string) => string;
      virtualBidFee: string;
      gateFee: string;
      titleFee: string;
      envFee: string;
      brokerFee: string;
      evSurcharge: string;
      totalAuctionFees: string;
      winningBid: string;
      plusAuctionFees: string;
      plusLandTransport: string;
      plusOceanUnloading: string;
      estimatedTotalUsd: string;
      estimatedTotalEurApprox: string;
      notes: {
        buyerFeeNote: string;
        containerNote: string;
        usdEurNote: string;
        customsWarning: string;
        estimatesWarning: string;
      };
    };
    emptyState: string;
    requestOnWhatsApp: string;
    requestFullQuote: string;
    wa: {
      greeting: string;
      resultLead: string;
      auctionLocation: string; // label
      routedVia: string;
      destination: string;
      vehicle: string;
      evTag: string;
      winningBid: string;
      landTransport: string;
      auctionFees: string;
      oceanFreight: string;
      unloading: string;
      separator: string;
      estimatedTotal: string;
      closingConfirm: string;
      closingThanks: string;
    };
  };
  korea: {
    step1: { title: string; roroTag: string; types: KoreaTypeOption[] };
    step2: { title: string; helper: (converted: string) => string };
    step3: { title: string; destinations: DestinationOption[] };
    breakdown: {
      title: (destination: string) => string;
      vehicleLine: (type: string) => string;
      vehiclePrice: string;
      allInTitle: string;
      fixedShipping: string;
      plusShipping: string;
      estimatedTotal: string;
      notes: { customsWarning: string; estimatesWarning: string };
    };
    emptyState: string;
    requestOnWhatsApp: string;
    requestFullQuote: string;
    wa: {
      greeting: string;
      resultLead: (destination: string) => string;
      vehicle: string;
      vehiclePrice: string;
      fixedShipping: string;
      separator: string;
      estimatedTotal: string;
      closingConfirm: string;
      closingThanks: string;
    };
  };
};

const KOREA_INCLUDES_EN = [
  "Local pickup in South Korea",
  "Export documentation",
  "RoRo ocean freight",
  "Alpha Worldwide service fee",
];

export const CALCULATOR_FAQS_EN: CalculatorFAQ[] = [
  { q: "How is my USA shipping estimate calculated?", a: "We combine the real land-transport rate from your auction location to the nearest export terminal, the full Copart/IAAI buyer-fee bracket for your winning bid, and the ocean-freight rate for that terminal-to-destination route — all from the same tables our team uses internally." },
  { q: "How is my South Korea shipping estimate calculated?", a: "South Korea uses a fixed all-in price by vehicle type and destination, covering local pickup, export documentation, and RoRo ocean freight — so the estimate is simpler and doesn't require a separate fee breakdown." },
  { q: "What's included in the estimate?", a: "Land transport (USA), auction fees (USA), ocean freight, and destination unloading. The Korea estimate additionally bundles pickup and export documentation into one fixed price." },
  { q: "What's excluded from the estimate?", a: "Customs duties and import taxes are not included in either calculator, since these depend on your destination country's regulations and the vehicle's declared value. We'll help confirm these once we know your destination." },
  { q: "Why might my final price change from the estimate?", a: "Vehicle dimensions, condition, exact loading requirements, and current carrier schedules can all affect the final price. The calculator gives a real, itemized estimate — your case handler confirms the final number before booking." },
  { q: "Is this a binding quote?", a: "No — all figures are estimates based on real rate tables, confirmed by our team before any booking is made. Nothing is charged or booked automatically from the calculator." },
];

export const CALCULATOR_DICT_EN: CalculatorDict = {
  hero: {
    eyebrow: "Shipping calculator",
    title: "Real Costs. No Guessing.",
    subtitle: "Every fee itemized — land transport, auction fees, ocean freight, and unloading — calculated from real rate tables.",
  },
  tabs: { usa: "USA — Copart / IAAI", korea: "South Korea — Encar" },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Real Rate Tables, Not Guesses",
    usaTitle: "USA Estimate",
    usaBody: "Combines the real land-transport rate from your auction location to the nearest export terminal, the full Copart/IAAI buyer-fee bracket for your winning bid, and the ocean-freight rate for that route.",
    koreaTitle: "South Korea Estimate",
    koreaBody: "A fixed all-in price by vehicle type and destination — bundling local pickup, export documentation, and RoRo ocean freight into one figure.",
  },
  included: {
    title: "What's Included",
    items: [
      "Land transport to the export terminal (USA)",
      "Full auction buyer fees (USA)",
      "Local pickup & export documentation (South Korea)",
      "Ocean freight to your destination port",
      "Destination unloading",
    ],
  },
  excluded: {
    title: "What's Excluded",
    items: [
      "Customs duties and import taxes",
      "Vehicle registration and homologation fees",
      "Onward delivery beyond the destination port, unless separately quoted",
    ],
    note: "Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide.",
  },
  ports: {
    eyebrow: "Destination ports",
    heading: "Where Your Vehicle Arrives",
    durres: { title: "Port of Durrës", body: "Albania's main port and our home operational base." },
    rotterdam: { title: "Rotterdam", body: "Our Netherlands gateway, with onward delivery across Western Europe." },
    bremerhaven: { title: "Bremerhaven", body: "A German destination option, available on request." },
  },
  faq: { eyebrow: "Questions", heading: "Frequently Asked" },
  relatedCta: {
    eyebrow: "Ready to move forward?",
    heading: "Explore Your Route",
    links: [
      { to: "/import-usa", label: "Import from USA" },
      { to: "/import-korea", label: "Import from South Korea" },
      { to: "/en/albania", label: "Shipping to Albania" },
      { to: "/en/netherlands", label: "Shipping to Netherlands" },
    ],
  },
  usa: {
    step1: { title: "Search your auction location", placeholder: "e.g. Houston TX, Miami FL, Atlanta GA…" },
    step2: {
      title: "Vehicle size",
      sizes: [
        { value: "Sedan/Standard", title: "Sedan / Standard", body: "Sedan, standard SUV, standard van, standard pickup" },
        { value: "Large SUV/Truck", title: "Large SUV / Large Truck", body: "Large SUV, large pickup · ×1.5 land transport" },
        { value: "Oversized", title: "Oversized", body: "Large van, oversized pickup · ×2.0 land transport" },
      ],
      evLabel: "This is an electric or hybrid vehicle (+$300)",
    },
    step3: { title: "Winning bid at auction", helper: "Enter the hammer price — all Copart/IAAI fees are calculated automatically." },
    step4: {
      title: "Destination",
      destinations: [
        { value: "Albania", code: "AL", label: "Albania", port: "Port of Durrës" },
        { value: "Germany", code: "DE", label: "Germany", port: "Port of Bremerhaven" },
        { value: "Netherlands", code: "NL", label: "Netherlands", port: "Port of Rotterdam" },
      ],
    },
    routedVia: "Routed via",
    breakdown: {
      title: "Cost Breakdown",
      landTransportSection: "Land Transport",
      auctionFeesSection: "Auction Fees",
      oceanSection: "Ocean Freight & Destination",
      terminalToDest: (t, d) => `${t} → ${d}`,
      unloadingAt: (d) => `Unloading at ${d}`,
      totalShipping: "Total Shipping",
      landTransportRow: "Land Transport",
      buyerFee: (base) => `Buyer Fee (on ${base})`,
      virtualBidFee: "Virtual Bid Fee",
      gateFee: "Gate Fee",
      titleFee: "Title Shipping Fee",
      envFee: "Environmental Fee",
      brokerFee: "Alpha Worldwide Broker Fee",
      evSurcharge: "EV Surcharge",
      totalAuctionFees: "Total Auction Fees",
      winningBid: "Winning Bid",
      plusAuctionFees: "+ Auction Fees",
      plusLandTransport: "+ Land Transport",
      plusOceanUnloading: "+ Ocean Freight + Unloading",
      estimatedTotalUsd: "Estimated Total (USD)",
      estimatedTotalEurApprox: "Estimated Total (EUR ~)",
      notes: {
        buyerFeeNote: "* Buyer fee applied on (bid + $100) per Copart rules",
        containerNote: "* Shared 40'HC container — typically 4 cars",
        usdEurNote: "* USD→EUR at ~0.92 (approximate rate)",
        customsWarning: "Customs & import duties NOT included",
        estimatesWarning: "All figures are estimates. Final confirmed by team.",
      },
    },
    emptyState: "Complete each step — location, size, bid, destination — to see your itemized cost breakdown.",
    requestOnWhatsApp: "Request This Quote on WhatsApp",
    requestFullQuote: "Request Full Quote →",
    wa: {
      greeting: "Hello Alpha Worldwide,",
      resultLead: "My shipping calculator result:",
      auctionLocation: "Auction Location",
      routedVia: "Routed via",
      destination: "Destination",
      vehicle: "Vehicle",
      evTag: " (EV/Hybrid)",
      winningBid: "Winning Bid",
      landTransport: "Land Transport",
      auctionFees: "Auction Fees",
      oceanFreight: "Ocean Freight",
      unloading: "Unloading",
      separator: "──────────────────────",
      estimatedTotal: "Estimated Total",
      closingConfirm: "Please confirm and send next steps.",
      closingThanks: "Thank you.",
    },
  },
  korea: {
    step1: {
      title: "Vehicle type",
      roroTag: "RoRo shipping — included in fixed price",
      types: [
        { value: "Sedan/Coupe", label: "Sedan/Coupe" },
        { value: "SUV/Minivan", label: "SUV/Minivan" },
        { value: "Oversized", label: "Oversized" },
      ],
    },
    step2: {
      title: "Vehicle price",
      helper: (converted) => `≈ ${converted} (approximate rate, ₩1,450 = €1)`,
    },
    step3: {
      title: "Destination",
      destinations: [
        { value: "Albania", code: "AL", label: "Albania", port: "Port of Durrës" },
        { value: "Germany", code: "DE", label: "Germany", port: "Port of Bremerhaven" },
        { value: "Netherlands", code: "NL", label: "Netherlands", port: "Port of Rotterdam" },
      ],
    },
    breakdown: {
      title: (d) => `Cost Breakdown — South Korea → ${d}`,
      vehicleLine: (t) => `Vehicle: ${t}`,
      vehiclePrice: "Vehicle Price",
      allInTitle: "All-In Shipping Package",
      fixedShipping: "Fixed Shipping Price",
      plusShipping: "+ All-In Shipping",
      estimatedTotal: "Estimated Total",
      notes: {
        customsWarning: "Customs & import duties not included",
        estimatesWarning: "Estimates only. Final confirmed by team.",
      },
    },
    emptyState: "Complete vehicle type, price, and destination to see your cost breakdown.",
    requestOnWhatsApp: "Request This Quote on WhatsApp",
    requestFullQuote: "Request Full Quote →",
    wa: {
      greeting: "Hello Alpha Worldwide,",
      resultLead: (d) => `My shipping calculator result — South Korea → ${d}`,
      vehicle: "Vehicle",
      vehiclePrice: "Vehicle Price",
      fixedShipping: "Fixed Shipping Price",
      separator: "──────────────────────",
      estimatedTotal: "Estimated Total",
      closingConfirm: "Please confirm and send next steps.",
      closingThanks: "Thank you.",
    },
  },
};

export const KOREA_INCLUDES_BY_LOCALE = {
  en: KOREA_INCLUDES_EN,
};
