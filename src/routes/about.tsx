import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShoppingBag, Ship, ShieldCheck, FileText, Globe2, Check } from "lucide-react";
import heroImg from "@/assets/hero-about.jpg";
import { TrustStats } from "@/components/site/TrustStats";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Alpha Worldwide Albania | International Vehicle Logistics" },
      { name: "description", content: "10+ years sourcing, inspecting, and shipping vehicles from the USA, South Korea, UAE, Canada and Europe to Albania." },
      { property: "og:title", content: "About Alpha Worldwide Albania" },
      { property: "og:description", content: "International vehicle sourcing, auction brokerage and shipping — managed end to end." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const SERVICES = [
  { icon: Truck, title: "Local Transportation", body: "Inland pickup and delivery to the nearest export port, insured and tracked." },
  { icon: ShoppingBag, title: "Purchases", body: "Auction bidding and dealer negotiation handled by licensed local agents." },
  { icon: Ship, title: "Loading & Shipping", body: "Container, RoRo, and airfreight across our established global lanes." },
  { icon: ShieldCheck, title: "Inspections", body: "Independent pre-purchase inspection with photo/video reporting." },
  { icon: FileText, title: "Export Documentation", body: "Origin-country paperwork, deregistration, and shipping documents." },
];

const WHY = [
  "Over 10 years of international experience.",
  "Access to trusted auctions and dealers in the USA, UAE, and South Korea.",
  "Full service from sourcing to home delivery.",
  "Licensed for export, registered in Albania and the European Union.",
  "Trusted by hundreds of clients across Albania, Italy, Germany, France, Belgium and the Netherlands.",
];

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Alpha Worldwide team overlooking Durrës port" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">"Empowering your success, one step at a time."</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              International Vehicle Import, Auction Brokerage & Shipping — Managed End to End
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">Our story</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              A trusted partner across five continental networks.
            </h2>
            <p className="mt-6 text-slate-body">
              Alpha Worldwide Albania helps private buyers, dealers, and automotive businesses source, inspect, purchase, and ship vehicles from major global markets. Our network covers the USA, South Korea, UAE, Canada, and Europe, with logistics routes into Albania and every major European port.
            </p>
            <p className="mt-4 text-slate-body">
              Based in Durrës, Albania — a natural gateway between Europe and the wider international shipping network — we operate as a single point of contact for every step of the import chain.
            </p>
          </div>
          <div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="eyebrow">Markets covered</div>
              <div className="mt-4 grid gap-3">
                {[
                  { from: "USA", to: "Albania · Germany · Italy · Belgium" },
                  { from: "South Korea", to: "Albania · EU Ports" },
                  { from: "UAE", to: "Albania · Italy · Germany · France" },
                  { from: "Canada", to: "Albania · Europe" },
                  { from: "Europe", to: "Albania · UAE · Global" },
                ].map((m) => (
                  <div key={m.from} className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Globe2 className="h-4 w-4 text-teal" />
                      <span className="font-semibold text-navy">{m.from}</span>
                    </div>
                    <span className="text-right text-xs text-slate-body">{m.to}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What we do</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Core capabilities</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="eyebrow text-teal-glow">Why Alpha Worldwide</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
                Different by design.
              </h2>
            </div>
            <ul className="space-y-3">
              {WHY.map((w) => (
                <li key={w} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                  <span className="text-sm leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TrustStats />

      <section className="bg-background">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <h2 className="font-display max-w-3xl text-3xl font-bold text-navy md:text-5xl">
            Ready to move your next vehicle?
          </h2>
          <p className="max-w-xl text-slate-body">
            Send us the details and we'll build a delivered-price quote — from origin listing to your driveway.
          </p>
          <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}
