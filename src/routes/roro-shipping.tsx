import { PageHero } from "@/components/site/PageHero";
import { ROLLS_ROYCE_PORT } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, DollarSign, Ship } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/roro-shipping")({
  head: () => {
    const base = buildHead({ title: "RoRo Car Shipping to Albania | Alpha Worldwide", description: "Roll-on/Roll-off vehicle shipping to Durrës, Albania and European ports from USA, Korea, UAE and Canada — fast, economical, scheduled sailings.", path: "/roro-shipping", });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "RoRo Car Shipping",
            description: "Roll-on/Roll-off vehicle shipping to Durrës, Albania and European ports.",
            provider: {
              "@type": "Organization",
              name: "Alpha Worldwide",
              url: SITE_URL,
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: `${SITE_URL}/roro-shipping`,
          }),
        },
      ],
    };
  },
  component: RoroShipping,
});

const POINTS = [
  { icon: DollarSign, title: "More Economical", body: "The vehicle is driven on and off the vessel on its own wheels — no container costs." },
  { icon: Clock, title: "Frequent Sailings", body: "Regular scheduled RoRo sailings from major export ports keep transit times predictable." },
  { icon: Ship, title: "Best for Standard Vehicles", body: "Ideal for everyday sedans, SUVs, and dealer stock moving in regular volume." },
];

function RoroShipping() {
  return (
    <>
      <PageHero scene={ROLLS_ROYCE_PORT.en} breadcrumbs={[{ label: "Services", to: "/services" }, { label: "RoRo Shipping" }]} eyebrow="RoRo shipping" title={<>The Fast, Economical Route to Albania</>} description={<>Roll-on/Roll-off shipping to Durrës, Albania and European ports — the standard choice for everyday vehicles.</>}>
        <Button asChild><Link to="/contact">Get a quote</Link></Button>
        <Button asChild variant="outline"><Link to="/calculator">Calculate shipping</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="grid gap-5 md:grid-cols-3">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 section-y lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Get a rate</div>
            <h2 className="mt-3 text-white">
              Calculate RoRo Shipping
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us the origin, destination, and vehicle — we'll send an accurate RoRo shipping quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
