import { createFileRoute } from "@tanstack/react-router";
import { Clock, DollarSign, Ship } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/roro-shipping")({
  head: () => {
    const base = buildHead({ title: "RoRo Car Shipping to Albania | Alpha Worldwide", description: "Roll-on/Roll-off vehicle shipping to Durrës, Albania and European ports from USA, Korea, UAE and Canada — fast, economical, scheduled sailings.", path: "/roro-shipping", image: heroImg });
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
              "@type": "LocalBusiness",
              name: "Alpha Worldwide Albania",
              url: "https://www.alphaworldwidealbania.com",
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: "https://www.alphaworldwidealbania.com/roro-shipping",
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
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="RoRo vessel shipping" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">RoRo shipping</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              The Fast, Economical Route to Albania
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Roll-on/Roll-off shipping to Durrës, Albania and European ports — the standard choice for everyday vehicles.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Get a rate</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
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
