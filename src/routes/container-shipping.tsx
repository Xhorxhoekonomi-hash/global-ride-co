import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Lock, PackageCheck } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/container-shipping")({
  head: () => {
    const base = buildHead({ title: "Container Car Shipping Europe | Alpha Worldwide", description: "Fully enclosed container car shipping to Europe and Albania — for high-value, exotic and modified vehicles from USA, Korea, UAE and Canada.", path: "/container-shipping", image: heroImg });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Container Car Shipping",
            description: "Fully enclosed container car shipping to Europe and Albania for high-value, exotic and modified vehicles.",
            provider: {
              "@type": "LocalBusiness",
              name: "Alpha Worldwide Albania",
              url: "https://www.alphaworldwidealbania.com",
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: "https://www.alphaworldwidealbania.com/container-shipping",
          }),
        },
      ],
    };
  },
  component: ContainerShipping,
});

const POINTS = [
  { icon: Lock, title: "Fully Enclosed", body: "Your vehicle travels sealed inside a container, protected from weather, salt air, and handling damage." },
  { icon: ShieldCheck, title: "Best for High-Value Cars", body: "The preferred method for luxury, exotic, and modified vehicles where extra protection matters." },
  { icon: PackageCheck, title: "Solo or Consolidated", body: "Ship alone for maximum security, or share container space with another vehicle to reduce cost." },
];

function ContainerShipping() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Container shipping at port" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Container shipping</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Maximum Protection, Ocean to Port
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Container car shipping to Europe and vehicle shipping to Durrës, fully enclosed from origin port to Albania — the safest way to move a high-value or modified vehicle.
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
              Calculate Container Shipping
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us the origin, destination, and vehicle — we'll send an accurate container shipping quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
