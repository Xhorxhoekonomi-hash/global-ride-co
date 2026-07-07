import carG63 from "@/assets/car-g63.jpg";
import carFerrari from "@/assets/car-ferrari.jpg";
import carUrus from "@/assets/car-urus.jpg";
import carMclaren from "@/assets/car-mclaren.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carDefender from "@/assets/car-defender.jpg";
import carGhost from "@/assets/car-ghost.jpg";
import carM5 from "@/assets/car-m5.jpg";

export const CONTACT = {
  location: "Durrës, Albania",
  email: "info@alphaworldwidealbania.com",
  phones: ["+355 69 223 3416", "+355 69 301 2101", "+355 69 294 0040"],
  uae: "+971 50 630 4486",
  hours: "Monday–Friday, 9:00 AM – 5:00 PM",
  whatsapp: "355692233416",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/import-usa", label: "Import From USA" },
  { to: "/import-korea", label: "Import From South Korea" },
  { to: "/import-uae", label: "Import From UAE" },
  { to: "/delivered-vehicles", label: "Delivered Vehicles" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { value: "130+", label: "Countries Served" },
  { value: "7,800+", label: "Successful Shipments" },
  { value: "10+", label: "Years International Experience" },
  { value: "5", label: "Continental Networks: USA · Korea · UAE · Canada · Europe" },
];

export const PLATFORMS = [
  "Copart",
  "IAAI",
  "Manheim",
  "Encar",
  "Autowini",
  "Dubizzle",
  "Emirates Auction",
  "AutoScout24",
  "Authorized Dealerships",
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
    id: "cullinan-mansory",
    name: "Rolls Royce Cullinan Mansory",
    year: 2022,
    image: carG63,
    origin: "UAE",
    destination: "Durrës, Albania",
    category: "Luxury",
    services: ["Purchase", "Shipping", "Delivery"],
    caption: "Sourced, shipped, and delivered to Durrës, Albania.",
  },
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
  {
    id: "ghost-bb",
    name: "Rolls Royce Ghost Black Badge",
    year: 2023,
    image: carGhost,
    origin: "USA",
    destination: "Durrës, Albania",
    category: "Luxury",
    services: ["Purchase", "Shipping", "Delivery"],
    caption: "Purchased, shipped, delivered to Durrës, Albania.",
  },
  {
    id: "audi-a6",
    name: "Audi A6 40 TDI",
    year: 2020,
    image: carM5,
    origin: "Europe",
    destination: "Albania",
    category: "Dealer Stock",
    services: ["Dealer", "Shipping", "Customs"],
    caption: "Delivered to Albania · total 16,100€ all-in.",
  },
  {
    id: "bmw-x5",
    name: "BMW X5 sDrive 40i",
    year: 2024,
    image: carG63,
    origin: "USA",
    destination: "Albania",
    category: "SUV",
    services: ["Auction", "Shipping", "Delivery"],
    caption: "Delivered to Albania · total 39,000€ all-in.",
  },
];

export const IMPORT_STEPS = [
  { n: 1, title: "Vehicle Search", body: "We help you find the right car — auction listing, dealer stock, or your own link." },
  { n: 2, title: "Inspection & Verification", body: "Title, history, mechanical condition and service records — verified before purchase." },
  { n: 3, title: "Purchase / Bidding", body: "Our licensed agents handle bidding and paperwork securely on your behalf." },
  { n: 4, title: "Inland Transport", body: "Vehicle is moved to the nearest export port by trusted carriers." },
  { n: 5, title: "International Shipping", body: "Container or RoRo to Durrës, or ports in Germany, Belgium, and Italy." },
  { n: 6, title: "Customs & Delivery", body: "Full customs clearance, port handling, and door delivery anywhere in Europe." },
];
