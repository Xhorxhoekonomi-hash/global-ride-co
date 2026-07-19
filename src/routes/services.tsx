import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { SERVICES } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Import Services | Sourcing, Inspection, Shipping",
      description: "Auction access, pre-purchase inspection, container and RoRo shipping, airfreight, and customs-clearance coordination — full-service vehicle import.",
      path: "/services",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vehicle Import Services",
            description: "Vehicle sourcing, auction access, pre-purchase inspection, container and RoRo shipping, airfreight, and customs-clearance coordination.",
            provider: {
              "@type": "Organization",
              name: "Alpha Worldwide",
              url: SITE_URL,
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: `${SITE_URL}/services`,
          }),
        },
      ],
    };
  },
  component: ServicesPage,
});

const FAQS = [
  { q: "How long does shipping take?", a: "As a general guide, USA-to-Durrës routes typically run several weeks by container and somewhat longer by RoRo; Korea and UAE routes are broadly similar. These are estimates, not guarantees — we confirm an exact timeline once the origin port and vessel are booked." },
  { q: "What does the pre-purchase inspection cover?", a: "Title verification, VIN check, accident and service history, mechanical assessment, tyre and interior condition, plus a photo/video report before we commit to purchase." },
  { q: "How are total costs calculated?", a: "Vehicle price + inspection + inland transport + international freight + insurance + customs duties + our service fee. We provide a fully itemised quote up front — no surprises." },
  { q: "Is customs clearance included in your service fee?", a: "Customs-clearance coordination with licensed local agents is part of our full-service process. Customs duties, taxes, and the customs authority's own fees are separate from our service fee and are the customer's responsibility." },
];

function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Car carrier ship at sea" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Services</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Comprehensive Vehicle Sourcing, Inspection & Shipping Services
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Make a confident, informed purchase decision — we handle the entire process with efficiency and professionalism.
            </p>
          </div>
        </div>
      </section>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={s.to}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal"
              >
                <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  {s.hasDedicatedPage ? "Learn more" : "Enquire"} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Market-specific import</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Dedicated origin markets</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { to: "/import-usa", name: "USA", body: "Copart, IAAI, Manheim and dealer network — bidding, US-side transport, container/RoRo shipping to Europe." },
              { to: "/import-korea", name: "South Korea", body: "Encar and Autowini sourcing, local inspection, Busan/Incheon export, delivery to Durrës or EU ports." },
              { to: "/import-uae", name: "UAE", body: "Dubizzle, Emirates Auction and dealership sourcing, RTA export clearance, direct shipping to Europe." },
            ].map((m) => (
              <Link key={m.name} to={m.to} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <div className="eyebrow">Import from</div>
                <h3 className="font-display mt-2 text-2xl font-bold text-navy">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{m.body}</p>
                <div className="mt-4 text-sm font-semibold text-teal">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks variant="dark" />

      <section className="bg-background">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Start Your Car Import Today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              One quote. Every step covered.
            </h2>
            <p className="mt-5 text-slate-body">
              Share the vehicle link, lot number or dealer listing — we'll return a complete, itemised quote and a timeline for your import.
            </p>

            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-navy">Frequently asked</h3>
              <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
                {FAQS.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                      {f.q}
                      <span className="text-teal transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <QuoteForm variant="full" />
        </div>
      </section>
    </>
  );
}
