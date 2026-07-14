import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShoppingBag, Ship, ShieldCheck, FileText, Plane, Check, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-about.jpg";
import { buildHead } from "@/lib/seo";
import { TrustStats } from "@/components/site/TrustStats";
import { OFFICES } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () =>
    buildHead({
      title: "About Alpha Worldwide | Dubai HQ, Durrës Operations",
      description: "Alpha Worldwide is an international vehicle logistics company headquartered in Dubai, UAE, with European operations in Durrës, Albania. 10+ years, 15,000+ vehicles moved.",
      path: "/about",
      image: heroImg,
    }),
  component: About,
});

const CAPABILITIES = [
  { icon: ShoppingBag, title: "Auction Brokerage", body: "Licensed access to Copart, IAAI, Manheim, Encar, and other major platforms." },
  { icon: ShieldCheck, title: "Pre-Purchase Inspection", body: "Independent inspection with photo, video, and mechanical condition reporting." },
  { icon: Truck, title: "Inland Transportation", body: "Insured pickup and delivery to the nearest export port in the origin country." },
  { icon: Ship, title: "Ocean Freight", body: "Container and RoRo shipping across established USA, Korea, UAE, and Canada lanes." },
  { icon: Plane, title: "Vehicle Airfreight", body: "Premium airfreight for urgent or exceptionally high-value shipments." },
  { icon: FileText, title: "Customs & Documentation", body: "Customs-clearance coordination and export documentation handled with licensed local agents." },
];

const PRINCIPLES = [
  "Every vehicle is inspected before purchase, not after.",
  "Pricing is itemized — no bundled or hidden fees.",
  "One case handler from first enquiry through final delivery.",
  "Direct WhatsApp contact, not a ticket queue.",
];

function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Alpha Worldwide international operations" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Moving Cars Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              An International Vehicle Logistics Company
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Headquartered in Dubai, UAE, with European and Albanian operations in Durrës — sourcing, inspecting, and shipping vehicles from the USA, South Korea, UAE, and Canada.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">Who we are</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              10+ years moving vehicles across continents.
            </h2>
            <p className="mt-6 text-slate-body">
              Alpha Worldwide is an international vehicle logistics, sourcing, and auction-services company. We help private buyers, dealers, and automotive businesses source, inspect, purchase, and ship vehicles from major global markets — the USA, South Korea, UAE, and Canada — to Albania and across Europe.
            </p>
            <p className="mt-4 text-slate-body">
              Over more than 10 years, we've bought and transported more than 15,000 vehicles through our international network.
            </p>
          </div>
          <div className="space-y-4">
            {OFFICES.map((office) => (
              <div key={office.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-teal" />
                  <div className="eyebrow">{office.role}</div>
                </div>
                <div className="font-display mt-2 text-2xl font-bold text-navy">{office.city}, {office.country}</div>
                <div className="mt-2 text-sm text-slate-body">
                  {"phone" in office
                    ? <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-teal">{office.phone}</a>
                    : office.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-teal">{p}</a>
                        {i < office.phones.length - 1 && ", "}
                      </span>
                    ))}
                </div>
              </div>
            ))}
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
            {CAPABILITIES.map((s) => (
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
              <div className="eyebrow text-teal-glow">How we operate</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
                Operational principles.
              </h2>
            </div>
            <ul className="space-y-3">
              {PRINCIPLES.map((w) => (
                <li key={w} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
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
