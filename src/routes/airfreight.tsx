import { createFileRoute } from "@tanstack/react-router";
import { Zap, ShieldCheck, Plane } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/airfreight")({
  head: () => ({
    meta: [
      { title: "Airfreight Vehicle Delivery | Urgent & High-Value Shipments" },
      { name: "description", content: "Premium airfreight vehicle delivery for urgent or exceptionally high-value shipments from USA, Korea, UAE and Canada to Albania and Europe." },
      { property: "og:title", content: "Airfreight Vehicle Delivery" },
      { property: "og:description", content: "The fastest way to move a vehicle internationally." },
      { property: "og:url", content: "/airfreight" },
    ],
    links: [{ rel: "canonical", href: "/airfreight" }],
  }),
  component: Airfreight,
});

const POINTS = [
  { icon: Zap, title: "Fastest Transit", body: "Days instead of weeks — the only option when timing matters more than cost." },
  { icon: ShieldCheck, title: "Minimal Handling", body: "Fewer touchpoints than ocean freight means lower risk for exceptionally high-value vehicles." },
  { icon: Plane, title: "Global Airport Network", body: "Coordinated pickup and delivery through major cargo airports near your origin and destination." },
];

function Airfreight() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Airfreight vehicle delivery" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Airfreight</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              When It Absolutely Has to Arrive Fast
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Premium airfreight vehicle delivery for urgent timelines and exceptionally high-value cars.
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
              Request an Airfreight Quote
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us the origin, destination, and timeline — we'll confirm feasibility and pricing.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
