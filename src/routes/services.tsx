import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldCheck, Gavel, Handshake, Lock, FileText, Truck, Container, Ship, Plane, Anchor, FileCheck } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";

export const Route = createFileRoute("/services")({
  head: () => buildHead({ title: "Vehicle Import Services | Sourcing, Inspection, Shipping", description: "Auction brokerage Albania, vehicle inspection before purchase, container and RoRo car shipping, customs and door delivery — full-service import.", path: "/services", image: heroImg }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Search, title: "Vehicle Sourcing", body: "We locate the exact car you want — auction, dealer, or private listing — across the USA, Korea, UAE, Canada and Europe." },
  { icon: ShieldCheck, title: "Pre-Purchase Inspection", body: "Independent inspection of title, mileage, service records, accident history and mechanical condition." },
  { icon: Gavel, title: "Auction Brokerage", body: "Licensed access to Copart, IAAI, Manheim, Encar, Emirates Auction and more — we bid on your behalf." },
  { icon: Handshake, title: "Dealer Negotiation", body: "Our teams negotiate price and terms directly with dealerships, saving you time and money." },
  { icon: Lock, title: "Secure Purchase Handling", body: "Escrow-safe payment routes, verified documentation and secure title transfer for every purchase." },
  { icon: FileText, title: "Export Documentation", body: "Bills of lading, export permits, deregistration and origin-country paperwork handled in full." },
  { icon: Truck, title: "Inland Transportation", body: "Enclosed and open trailer transport to nearest export port — insured door-to-port coverage." },
  { icon: Container, title: "Container Shipping", body: "Secure, weatherproof container shipping — ideal for high-value and specialty vehicles." },
  { icon: Ship, title: "RoRo Shipping", body: "Cost-effective Roll-on/Roll-off shipping for standard vehicles on our regular European routes." },
  { icon: Plane, title: "Airfreight Vehicle Delivery", body: "Expedited air delivery for time-critical shipments and ultra-high-value cars." },
  { icon: Anchor, title: "Port Unloading & Customs", body: "Unloading, port handling and full customs support at Durrës and major EU ports." },
  { icon: FileCheck, title: "Homologation & Delivery", body: "EU homologation, registration paperwork and final door delivery anywhere in the region." },
];

const FAQS = [
  { q: "How long does shipping take?", a: "Typically 25–45 days from USA to Durrës via container, 30–50 days RoRo. Korea and UAE routes average 30–45 days. We provide an exact timeline once the origin port and vessel are booked." },
  { q: "What does the pre-purchase inspection cover?", a: "Title verification, VIN check, accident and service history, mechanical assessment, tyre and interior condition, plus a photo/video report before we commit to purchase." },
  { q: "How are total costs calculated?", a: "Vehicle price + inspection + inland transport + international freight + insurance + customs duties + our service fee. We provide a fully itemised quote up front — no surprises." },
  { q: "Is customs clearance included?", a: "Yes. We handle port unloading, customs declarations, duty payment and release for all standard routes into Albania and the EU." },
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

      {/* 12-SERVICE GRID */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETS */}
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

      {/* QUOTE + FAQ */}
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
