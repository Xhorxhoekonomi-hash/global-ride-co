import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
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
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
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
      <InnerPageHero eyebrow="Services" title="Comprehensive Vehicle Sourcing, Inspection & Shipping Services" description="Make a confident, informed purchase decision — we handle the entire process with efficiency and professionalism." image={heroImg} imageAlt="Car carrier ship at sea">
        <Button asChild className="h-auto min-h-12 whitespace-normal py-3"><Link to="/contact">Get a Quote <ArrowRight /></Link></Button>
        <Button asChild variant="outline" className="h-auto min-h-12 whitespace-normal py-3"><Link to="/calculator">Calculate Shipping</Link></Button>
      </InnerPageHero>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={s.to}
                className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary"
              >
                <h3 className="font-display text-lg font-bold text-secondary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors">
                  {s.hasDedicatedPage ? "Learn more" : "Enquire"} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Market-specific import</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Dedicated origin markets</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { to: "/import-usa", name: "USA", body: "Copart, IAAI, Manheim and dealer network — bidding, US-side transport, container/RoRo shipping to Europe." },
              { to: "/import-korea", name: "South Korea", body: "Encar and Autowini sourcing, local inspection, Busan/Incheon export, delivery to Durrës or EU ports." },
              { to: "/import-uae", name: "UAE", body: "Dubizzle, Emirates Auction and dealership sourcing, RTA export clearance, direct shipping to Europe." },
            ].map((m) => (
              <Link key={m.name} to={m.to} className="rounded-lg border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary">
                <div className="eyebrow">Import from</div>
                <h3 className="font-display mt-2 text-2xl font-bold text-secondary">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary">Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks variant="light" />

      <section className="bg-background">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Start Your Car Import Today</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">
              One quote. Every step covered.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Share the vehicle link, lot number or dealer listing — we'll return a complete, itemised quote and a timeline for your import.
            </p>

            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-secondary">Frequently asked</h3>
              <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-card">
                {FAQS.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="min-h-11 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-secondary">
                      {f.q}
                      <span className="text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
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
