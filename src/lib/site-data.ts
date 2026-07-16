import carG63 from "@/assets/car-g63.jpg";
import carFerrari from "@/assets/car-ferrari.jpg";
import carUrus from "@/assets/car-urus.jpg";
import carMclaren from "@/assets/car-mclaren.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carDefender from "@/assets/car-defender.jpg";
import carGhost from "@/assets/car-ghost.jpg";
import carM5 from "@/assets/car-m5.jpg";

export type ServiceItem = {
  slug: string;
  title: string;
  body: string;
  to: string;
  hasDedicatedPage: boolean;
};

export const SERVICES: ServiceItem[] = [
  { slug: "sourcing", title: "Vehicle Sourcing", body: "We locate the exact vehicle you want across auctions, dealers, and private listings worldwide.", to: "/contact", hasDedicatedPage: false },
  { slug: "auction-access", title: "Auction Access", body: "Licensed access to Copart, IAAI, Manheim, Encar, and other major platforms — we bid on your behalf.", to: "/auction-access", hasDedicatedPage: true },
  { slug: "dealer-purchasing", title: "Dealer Purchasing Assistance", body: "Direct negotiation with dealerships on price, terms, and paperwork.", to: "/contact", hasDedicatedPage: false },
  { slug: "inspection", title: "Pre-Purchase Inspection", body: "155-point inspection with photos, video, OBD scan, and paint-meter reading before you buy.", to: "/inspection-service", hasDedicatedPage: true },
  { slug: "inland-transport", title: "Inland Transportation", body: "Insured pickup and delivery to the nearest export port in the origin country.", to: "/contact", hasDedicatedPage: false },
  { slug: "container-shipping", title: "Container Shipping", body: "Fully enclosed ocean shipping for high-value or modified vehicles.", to: "/container-shipping", hasDedicatedPage: true },
  { slug: "roro-shipping", title: "RoRo Shipping", body: "Roll-on/roll-off ocean shipping — the economical route for standard vehicles.", to: "/roro-shipping", hasDedicatedPage: true },
  { slug: "airfreight", title: "Vehicle Airfreight", body: "Premium airfreight for urgent or exceptionally high-value shipments.", to: "/airfreight", hasDedicatedPage: true },
  { slug: "airport-handling", title: "European Airport Handling", body: "Arrival coordination, cargo-terminal handling, and release at major European cargo airports.", to: "/airfreight", hasDedicatedPage: true },
  { slug: "customs", title: "Customs-Clearance Coordination", body: "We coordinate customs paperwork and clearance with licensed local agents at the port of entry.", to: "/contact", hasDedicatedPage: false },
  { slug: "transit", title: "T1 Transit Support", body: "Transit-document coordination for vehicles moving under bond between EU customs points.", to: "/contact", hasDedicatedPage: false },
  { slug: "carnet", title: "Carnet de Passage Handling", body: "Coordination support for temporary vehicle admission using a Carnet de Passage.", to: "/contact", hasDedicatedPage: false },
  { slug: "port-handling", title: "Port Handling", body: "Unloading, terminal coordination, and release at Durrës and major European ports.", to: "/contact", hasDedicatedPage: false },
  { slug: "final-mile", title: "Final-Mile Delivery", body: "Delivery from port or airport to your exact address, anywhere in Albania or Europe.", to: "/contact", hasDedicatedPage: false },
];

// Single source of truth for the EN/SQ language switch. Only routes that
// actually exist in both languages belong here — never generate a
// translated URL by string manipulation. Grows as Albanian pages ship.
export const LANGUAGE_ROUTE_MAP: Record<string, string> = {
  "/": "/al",
  "/import-usa": "/al/makina-nga-amerika",
  "/contact": "/al/kontakt",
};

export const OFFICES = [
  {
    id: "dubai",
    label: "Dubai, UAE — Global Headquarters",
    city: "Dubai",
    country: "United Arab Emirates",
    countryCode: "AE",
    role: "Global Headquarters",
    phone: "+971 50 630 4486",
  },
  {
    id: "durres",
    label: "Durrës, Albania — European & Albanian Operations",
    city: "Durrës",
    country: "Albania",
    countryCode: "AL",
    role: "European & Albanian Operations",
    phones: ["+355 69 223 3416", "+355 69 301 2101", "+355 69 294 0040"],
  },
] as const;


export const CONTACT = {
  location: "Durrës, Albania",
  email: "info@alphaworldwidealbania.com",
  phones: ["+355 69 223 3416", "+355 69 301 2101", "+355 69 294 0040"],
  uae: "+971 50 630 4486",
  hours: "Monday–Friday, 9:00 AM – 5:00 PM",
  whatsapp: "355692233416",
};

export type NavItem =
  | { type: "link"; to: string; label: string }
  | { type: "dropdown"; label: string; items: { to: string; label: string }[] };

export const NAV_STRUCTURE: NavItem[] = [
  { type: "link", to: "/", label: "Home" },
  { type: "link", to: "/services", label: "Services" },
  {
    type: "dropdown",
    label: "Import From",
    items: [
      { to: "/import-usa", label: "USA" },
      { to: "/import-korea", label: "South Korea" },
      { to: "/import-uae", label: "UAE" },
      { to: "/import-canada", label: "Canada" },
      { to: "/import-europe", label: "Europe" },
    ],
  },
  { type: "link", to: "/airfreight", label: "Air Freight" },
  { type: "link", to: "/calculator", label: "Shipping Calculator" },
  { type: "link", to: "/delivered-vehicles", label: "Delivered Vehicles" },
  { type: "link", to: "/about", label: "About" },
  { type: "link", to: "/contact", label: "Contact" },
];

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/calculator", label: "Shipping Calculator" },
  { to: "/import-usa", label: "Import From USA" },
  { to: "/import-korea", label: "Import From South Korea" },
  { to: "/import-uae", label: "Import From UAE" },
  { to: "/import-canada", label: "Import From Canada" },
  { to: "/import-europe", label: "Import From Europe" },
  { to: "/airfreight", label: "Air Freight" },
  { to: "/delivered-vehicles", label: "Delivered Vehicles" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { target: 15000, suffix: "+", label: "Vehicles Bought & Transported" },
  { target: 10, suffix: "+", label: "Years International Experience" },
];

export type Platform = { name: string; url?: string };

export const PLATFORMS: Platform[] = [
  { name: "Copart", url: "https://www.copart.com/" },
  { name: "IAAI", url: "https://www.iaai.com/" },
  { name: "Manheim" },
  { name: "ADESA", url: "https://www.adesa.com/" },
  { name: "Encar", url: "https://car.encar.com/" },
  { name: "Autowini", url: "https://www.autowini.com/" },
  { name: "Dubizzle", url: "https://uae.dubizzle.com/motors/used-cars/" },
  { name: "Emirates Auction", url: "https://www.emiratesauction.com/motors" },
  { name: "AutoScout24", url: "https://www.autoscout24.com/" },
  { name: "Authorized Dealerships" },
];

export type Vehicle = {
  id: string;
  name: string;
  year: number;
  image: string;
  origin: "USA" | "Korea" | "UAE" | "Canada" | "Europe";
  destination: string;
  category: "Luxury" | "SUV" | "Sports Car" | "EV" | "Dealer Stock";
  services: string[];
  caption: string;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "bmw-m5",
    name: "BMW M5",
    year: 2025,
    image: carM5,
    origin: "USA",
    destination: "Durrës, Albania",
    category: "Luxury",
    services: ["Auction", "Shipping", "Delivery"],
    caption: "Purchased, shipped, delivered to Durrës, Albania.",
  },
  {
    id: "mclaren-600lt",
    name: "McLaren 600LT",
    year: 2023,
    image: carMclaren,
    origin: "USA",
    destination: "Durrës, Albania",
    category: "Sports Car",
    services: ["Purchase", "Shipping", "Delivery"],
    caption: "Purchased, shipped, and delivered to Durrës, Albania.",
  },
  {
    id: "g63",
    name: "Mercedes-Benz G63 AMG",
    year: 2023,
    image: carG63,
    origin: "USA",
    destination: "Durrës, Albania",
    category: "SUV",
    services: ["Auction", "Shipping", "Customs"],
    caption: "US auction purchase, shipped, delivered to Durrës.",
  },
  {
    id: "ferrari-296",
    name: "Ferrari 296 GTB",
    year: 2024,
    image: carFerrari,
    origin: "UAE",
    destination: "Durrës, Albania",
    category: "Sports Car",
    services: ["Purchase", "Shipping", "Unloading"],
    caption: "Purchased, shipped, unloaded in Durrës, Albania.",
  },
  {
    id: "porsche-st",
    name: "Porsche 911 S/T 60 Years Edition",
    year: 2024,
    image: carPorsche,
    origin: "USA",
    destination: "Europe",
    category: "Sports Car",
    services: ["Purchase", "Shipping"],
    caption: "Purchased and shipped through our EU logistics network.",
  },
  {
    id: "defender-octa",
    name: "Land Rover Defender OCTA",
    year: 2025,
    image: carDefender,
    origin: "Europe",
    destination: "Dubai, UAE",
    category: "SUV",
    services: ["Purchase", "Export", "Shipping"],
    caption: "Purchased, shipped, exported from Durrës to Dubai, UAE.",
  },
  {
    id: "ghost-korea",
    name: "Rolls Royce Ghost Series II",
    year: 2025,
    image: carGhost,
    origin: "Korea",
    destination: "Albania",
    category: "Luxury",
    services: ["Sourcing", "Purchase", "Shipping"],
    caption: "Purchased in South Korea, en route to Albania.",
  },
  {
    id: "urus-mansory",
    name: "Lamborghini Urus Mansory",
    year: 2024,
    image: carUrus,
    origin: "USA",
    destination: "Durrës, Albania",
    category: "SUV",
    services: ["Purchase", "Shipping", "Delivery"],
    caption: "Purchased, shipped, and delivered to Durrës, Albania.",
  },
];

// NOTE: Rolls Royce Cullinan Mansory, Rolls Royce Ghost Black Badge, Audi A6
// 40 TDI, and BMW X5 sDrive 40i were removed from this list. They previously
// pointed at stock/placeholder images belonging to other vehicles (e.g. a
// Cullinan card showing a G63 photo), which is misleading on a page that
// claims to show "real" deliveries. Re-add them once a real, unique delivery
// photo exists for that exact vehicle — every `image` field above should be
// a genuine photo of that specific car, never a reused stand-in.

export const IMPORT_STEPS = [
  { n: 1, title: "Find a Vehicle", body: "Browse any auction, dealership, or marketplace worldwide — Copart, IAAI, Encar, Dubizzle, or anywhere else." },
  { n: 2, title: "Send Us the Link", body: "Share the listing, lot number, or VIN. We review the vehicle and confirm feasibility before you commit." },
  { n: 3, title: "Professional Inspection", body: "Photos, videos, OBD scan, paint meter reading, and a full mechanical condition report before purchase." },
  { n: 4, title: "Purchase", body: "We purchase or bid on your behalf, securely and transparently, with no hidden markups." },
  { n: 5, title: "Shipping", body: "Container, RoRo, or airfreight — we choose the safest, fastest route for that specific vehicle." },
  { n: 6, title: "Receive Your Vehicle", body: "Delivered to Albania, Kosovo, or anywhere in Europe, fully cleared through customs." },
];

export type Country = {
  slug: string;
  name: string;
  hook: string;
  to: string;
};

export const COUNTRIES: Country[] = [
  { slug: "usa", name: "USA", hook: "Copart · IAAI · Manheim · Dealer networks", to: "/import-usa" },
  { slug: "korea", name: "South Korea", hook: "Encar · Autowini · KB Chachacha", to: "/import-korea" },
  { slug: "uae", name: "United Arab Emirates", hook: "Dubizzle · Emirates Auction · Official dealers", to: "/import-uae" },
  { slug: "canada", name: "Canada", hook: "Auction access & dealer sourcing coast to coast", to: "/import-canada" },
  { slug: "europe", name: "Europe", hook: "AutoScout24 · Dealer stock · Cross-border transport", to: "/import-europe" },
];

export const WHY_US = [
  { title: "Professional inspections", body: "155-point mechanical, paint, and history checks before you ever pay for a vehicle." },
  { title: "Worldwide logistics", body: "Container, RoRo, and airfreight routes covering every major origin and destination port." },
  { title: "Official documentation", body: "Export papers, customs filings, and transit documents handled correctly the first time." },
  { title: "Container consolidation", body: "Share container space securely to reduce cost without compromising safety." },
  { title: "Trusted global partners", body: "Vetted inspectors, agents, and carriers on the ground in every market we serve." },
  { title: "Fast communication", body: "Direct WhatsApp contact with your case handler — no call centers, no ticket queues." },
  { title: "Real support", body: "A dedicated team from first inquiry through final delivery, not a hand-off between departments." },
  { title: "Transparent pricing", body: "Clear cost breakdowns for purchase, inspection, shipping, and customs — no surprise fees." },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "How does shipping a car to Albania actually work?", a: "You send us the vehicle link or lot number, we inspect and purchase it on your behalf, then ship it by container or RoRo to the Port of Durrës. We handle customs clearance and can deliver it to your door anywhere in Albania or Europe." },
  { q: "Can I buy from Copart or IAAI if I'm not based in the USA?", a: "Yes. As a licensed broker we bid and purchase on major US auction platforms on your behalf, so you don't need a US auction account, a US address, or a US bank account." },
  { q: "What does the pre-purchase inspection include?", a: "Photos, video walk-arounds, an OBD diagnostic scan, paint-meter readings to check for prior bodywork, and a full mechanical and title-history report — before you commit to buying." },
  { q: "How long does shipping take from the USA, Korea, or UAE to Albania?", a: "Transit times vary by origin port and shipping method. As a general guide, ocean shipping typically runs several weeks depending on the route and vessel schedule; we confirm exact timing once we have your vehicle's specific origin port." },
  { q: "What's the difference between container and RoRo shipping?", a: "RoRo (Roll-on/Roll-off) ships the vehicle on its own wheels and is typically more economical. Container shipping is fully enclosed and better suited to higher-value or modified vehicles, or when consolidating multiple vehicles." },
  { q: "How do I pay, and is it safe?", a: "We provide a transparent cost breakdown before any payment is made, and funds are only released for auction bids or dealer purchases once you've approved the vehicle and price." },
  { q: "Do you handle customs clearance in Albania?", a: "Yes — customs clearance, port handling, and paperwork at the Port of Durrës are managed for you as part of the full-service process." },
  { q: "Can you ship to Kosovo or other parts of Europe, not just Albania?", a: "Yes. In addition to Durrës, we regularly arrange delivery to Kosovo and destinations across Italy, Germany, Belgium, the Netherlands, France, and Switzerland." },
];

export type Testimonial = { name: string; location: string; quote: string; rating: number };

// Intentionally empty: we don't publish testimonials that can't be verified
// as real Alpha Worldwide Albania customers. Populate this with genuine
// Google/Facebook reviews (with permission) to activate the Testimonials
// section on the homepage.
export const TESTIMONIALS: Testimonial[] = [];
