import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Gavel, Scale, Ship, Search, FileText, Calculator, ArrowRight, Battery, Gem, Clock, AlertTriangle, BookOpen } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GUIDE_CATEGORIES, type GuideCategory } from "@/components/guides/GuideMeta";

export const Route = createFileRoute("/guides/")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Import Guides | Alpha Worldwide",
      description: "Practical, plain-language guides on buying from US auctions, comparing Copart and IAAI, container vs RoRo shipping, pre-purchase inspection, import documents, EVs, luxury cars, and shipping costs.",
      path: "/guides",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Vehicle Import Guides",
            description: "Educational guides on vehicle sourcing, auctions, shipping, inspection, and import documentation.",
            url: `${SITE_URL}/guides`,
            hasPart: GUIDES.map((g) => ({
              "@type": "Article",
              headline: g.title,
              url: `${SITE_URL}${g.to}`,
            })),
          }),
        },
      ],
    };
  },
  component: GuidesHub,
});

type Guide = {
  to: string;
  icon: typeof Gavel;
  category: GuideCategory;
  title: string;
  summary: string;
  readingTime: string;
  featured?: boolean;
};

const GUIDES: Guide[] = [
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

const CATEGORY_FILTERS: Array<{ value: GuideCategory | "all"; label: string }> = [
  { value: "all", label: "All Topics" },
  ...Object.entries(GUIDE_CATEGORIES).map(([value, label]) => ({ value: value as GuideCategory, label })),
];

function GuidesHub() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GuideCategory | "all">("all");

  const featured = useMemo(() => GUIDES.filter((g) => g.featured), []);
  const newest = useMemo(() => GUIDES.slice(-3), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GUIDES.filter((g) => {
      const matchesCategory = category === "all" || g.category === category;
      const matchesQuery = !q || g.title.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Reference documents used when planning a vehicle import" width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[40vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Guides</div>
          <h1 className="font-display mt-4 text-4xl font-bold md:text-6xl">Vehicle Import Guides</h1>
          <p className="mt-4 max-w-2xl text-white/75">Practical answers to the questions that come up before, during, and after buying a vehicle abroad — written to help you decide, not to sell you.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="eyebrow">Featured guides</div>
          <h2 className="font-display mt-2 text-2xl font-bold text-navy">Start here</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {featured.map((g) => (
              <Link key={g.to} to={g.to} className="group flex flex-col rounded-2xl border border-teal/30 bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/10 text-teal"><g.icon className="h-5 w-5" /></div>
                <h3 className="font-display mt-3 text-base font-bold text-navy">{g.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal">Read the guide <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-10">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-body" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search guides by title or topic..."
                className="w-full rounded-full border border-border bg-card py-2.5 pl-11 pr-4 text-sm text-navy placeholder:text-slate-body focus:border-teal focus:outline-none"
                aria-label="Search guides"
              />
            </div>
          </div>
          <div className="mx-auto mt-4 flex max-w-4xl flex-wrap justify-center gap-2">
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c.value ? "border-teal bg-teal/10 text-teal" : "border-border bg-card text-navy hover:border-teal/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-slate-body">No guides match that search. Try a different term or category.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <Link key={g.to} to={g.to} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                  <div className="flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><g.icon className="h-5 w-5" /></div>
                    <span className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-semibold text-navy">{GUIDE_CATEGORIES[g.category]}</span>
                  </div>
                  <h2 className="font-display mt-4 text-lg font-bold text-navy">{g.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-slate-body">{g.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-body">{g.readingTime} read</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal">
                      Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="eyebrow">Newest guides</div>
          <h2 className="font-display mt-2 text-2xl font-bold text-navy">Recently added</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {newest.map((g) => (
              <Link key={g.to} to={g.to} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
                {g.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
