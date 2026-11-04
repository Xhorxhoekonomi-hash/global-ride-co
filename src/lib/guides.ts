import { Gavel, Scale, Ship, Search, FileText, Calculator, Battery, Gem, Clock, AlertTriangle, BookOpen } from "lucide-react";
import type { GuideCategory } from "@/components/guides/GuideMeta";

export type Guide = {
  to: string;
  icon: typeof Gavel;
  category: GuideCategory;
  title: string;
  summary: string;
  readingTime: string;
  featured?: boolean;
};

export const GUIDES: Guide[] = [
  { to: "/guides/how-to-buy-a-car-from-usa-auctions", icon: Gavel, category: "auctions", title: "How to Buy a Car From USA Auctions", summary: "The full process from choosing a platform to registration considerations — bidding, fees, inland transport, and the mistakes that trip up first-time buyers.", readingTime: "5 min", featured: true },
  { to: "/guides/copart-vs-iaai", icon: Scale, category: "auctions", title: "Copart vs IAAI: A Neutral Comparison", summary: "Inventory, condition information, buyer eligibility, and pickup logistics compared side by side — without pretending either platform eliminates purchase risk.", readingTime: "4 min" },
  { to: "/guides/container-vs-roro-car-shipping", icon: Ship, category: "shipping", title: "Container vs RoRo Car Shipping", summary: "When shared or dedicated container shipping makes sense, when RoRo is the more practical option, and the factors that actually decide it.", readingTime: "3 min", featured: true },
  { to: "/guides/how-to-check-a-used-car-before-buying", icon: Search, category: "inspection", title: "How to Check a Used Car Before Buying", summary: "A practical, honest checklist — from VIN and service history to OBD scans and cold-start behavior — plus where inspection limits really are.", readingTime: "3 min", featured: true },
  { to: "/guides/vehicle-import-documents", icon: FileText, category: "documentation", title: "Vehicle Import Documents Explained", summary: "What a bill of lading, COC, export certificate, and the rest of the paperwork actually do — and why requirements vary by destination.", readingTime: "3 min" },
  { to: "/guides/car-shipping-costs-explained", icon: Calculator, category: "shipping", title: "Car Shipping Costs Explained", summary: "Every line item that can appear on an import — purchase price, freight, port charges, customs duties, and the ones people forget to budget for.", readingTime: "3 min", featured: true },
  { to: "/guides/importing-electric-cars", icon: Battery, category: "shipping", title: "Importing Electric Cars", summary: "Battery-related shipping regulations, RoRo restrictions, container recommendations, and the myths worth clearing up.", readingTime: "6 min" },
  { to: "/guides/importing-luxury-cars", icon: Gem, category: "buying", title: "Importing Luxury Cars", summary: "Ferrari, Lamborghini, Bentley, Rolls-Royce, Porsche — insurance, enclosed transport, and conformity documentation considerations.", readingTime: "6 min" },
  { to: "/guides/how-long-does-car-shipping-take", icon: Clock, category: "shipping", title: "How Long Does Car Shipping Take?", summary: "A stage-by-stage look at what affects your timeline, in realistic ranges rather than fixed promises.", readingTime: "5 min" },
  { to: "/guides/common-car-import-mistakes", icon: AlertTriangle, category: "buying", title: "Common Car Import Mistakes", summary: "The seven mistakes that cost buyers the most time and money — and how to avoid each one.", readingTime: "6 min" },
  { to: "/guides/car-import-glossary", icon: BookOpen, category: "documentation", title: "Car Import Glossary", summary: "Plain-language definitions for Bill of Lading, COC, RoRo, FCL, LCL, demurrage, and the other terms that come up most often.", readingTime: "7 min" },
];
