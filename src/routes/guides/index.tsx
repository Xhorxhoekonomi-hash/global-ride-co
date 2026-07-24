import { createFileRoute, Link } from "@tanstack/react-router";
import { Gavel, Scale, Ship, Search, FileText, Calculator, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export const Route = createFileRoute("/guides/")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Import Guides | Alpha Worldwide",
      description: "Practical, plain-language guides on buying from US auctions, comparing Copart and IAAI, container vs RoRo shipping, pre-purchase inspection, import documents, and shipping costs.",
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

const GUIDES = [
  { to: "/guides/how-to-buy-a-car-from-usa-auctions", icon: Gavel, category: "Auctions", title: "How to Buy a Car From USA Auctions", summary: "The full process from choosing a platform to registration considerations — bidding, fees, inland transport, and the mistakes that trip up first-time buyers." },
  { to: "/guides/copart-vs-iaai", icon: Scale, category: "Auctions", title: "Copart vs IAAI: A Neutral Comparison", summary: "Inventory, condition information, buyer eligibility, and pickup logistics compared side by side — without pretending either platform eliminates purchase risk." },
  { to: "/guides/container-vs-roro-car-shipping", icon: Ship, category: "Shipping", title: "Container vs RoRo Car Shipping", summary: "When shared or dedicated container shipping makes sense, when RoRo is the more practical option, and the factors that actually decide it." },
  { to: "/guides/how-to-check-a-used-car-before-buying", icon: Search, category: "Inspection", title: "How to Check a Used Car Before Buying", summary: "A practical, honest checklist — from VIN and service history to OBD scans and cold-start behavior — plus where inspection limits really are." },
  { to: "/guides/vehicle-import-documents", icon: FileText, category: "Documentation", title: "Vehicle Import Documents Explained", summary: "What a bill of lading, COC, export certificate, and the rest of the paperwork actually do — and why requirements vary by destination." },
  { to: "/guides/car-shipping-costs-explained", icon: Calculator, category: "Costs", title: "Car Shipping Costs Explained", summary: "Every line item that can appear on an import — purchase price, freight, port charges, customs duties, and the ones people forget to budget for." },
];

function GuidesHub() {
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
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.to} to={g.to} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <g.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-xs font-bold uppercase tracking-wider text-teal">{g.category}</div>
                <h2 className="font-display mt-1 text-lg font-bold text-navy">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-body">{g.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Read the guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
