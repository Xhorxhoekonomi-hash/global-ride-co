import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Zap, ShieldCheck, Plane, Package, FileText, Landmark, Battery, Gauge, Users, Truck, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo";
import { AirfreightForm } from "@/components/site/AirfreightForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const POINTS = [
  { icon: Zap, title: "Fastest Transit", body: "Days instead of weeks — the only option when timing matters more than cost." },
  { icon: ShieldCheck, title: "Minimal Handling", body: "Fewer touchpoints than ocean freight means lower risk for exceptionally high-value vehicles." },
  { icon: Plane, title: "Verified Airport Network", body: "Coordinated handling through Amsterdam Schiphol, Milan Malpensa, and Leipzig/Halle." },
];

const SERVICE_TYPES = [
  {
    title: "Complete Vehicle Airfreight",
    body: "Alpha Worldwide coordinates the airfreight shipment from origin through European arrival and delivery — sourcing, documentation, booking, and final-mile transport, all in one process.",
    icon: Package,
  },
  {
    title: "European Airport Handling Only",
    body: "The customer or another forwarder has already booked the flight. Alpha Worldwide coordinates the arrival-side handling — cargo-terminal release, customs paperwork, and onward transport.",
    icon: Landmark,
  },
];

const ACCEPTANCE = [
  { icon: Battery, title: "EV & Hybrid Considerations", body: "Electric and hybrid vehicles are accepted subject to airline and cargo-terminal battery and fuel-level requirements." },
  { icon: Gauge, title: "Fuel Level & Battery Requirements", body: "Airlines set specific fuel-level and battery-charge limits for cargo acceptance — we confirm these ahead of booking." },
  { icon: Truck, title: "Non-Running Vehicles", body: "Non-running vehicles may be accepted subject to airline and ground-handler approval on a case-by-case basis." },
];

const DOCUMENTATION = [
  "Air Waybill coordination",
  "Cargo-terminal unloading and release",
  "Customs-clearance coordination",
  "T1 transit support",
  "Carnet de Passage handling",
  "Temporary admission support where applicable",
];

const AIRPORTS = [
  { name: "Amsterdam Schiphol", verified: true },
  { name: "Milan Malpensa", verified: true },
  { name: "Leipzig/Halle", verified: true },
  { name: "Frankfurt", verified: false },
];

const CLIENT_TYPES = [
  "High-value and time-sensitive vehicles",
  "Luxury and supercar owners",
  "Dealers and collectors",
  "Freight forwarders seeking a European handling partner",
];

const FAQS = [
  { q: "What's the difference between complete airfreight and airport handling only?", a: "Complete Vehicle Airfreight means we coordinate the entire shipment from origin through European arrival and delivery. European Airport Handling Only is for customers or forwarders who've already booked the flight themselves — we handle only the arrival side: cargo-terminal release, customs paperwork, and onward transport." },
  { q: "Which European airports do you handle?", a: "We prioritize Amsterdam Schiphol, Milan Malpensa, and Leipzig/Halle, where we have verified handling experience. Frankfurt may be available depending on the specific shipment — ask us to confirm. Vehicle acceptance and handling are subject to airline, cargo-terminal, ground-handler and vehicle-specific requirements." },
  { q: "Can you airfreight an electric or hybrid vehicle?", a: "Yes, subject to the airline's and cargo-terminal's battery-charge and fuel-level requirements at the time of booking — we'll confirm what applies to your specific vehicle." },
  { q: "Can you airfreight a non-running vehicle?", a: "Non-running vehicles may be accepted, subject to airline and ground-handler approval on a case-by-case basis. Let us know the vehicle's condition when you enquire so we can confirm feasibility." },
  { q: "Do you work with freight forwarders?", a: "Yes. If you're a forwarder looking for a European vehicle-handling partner, select 'Freight Forwarder Partnership' in the enquiry form and tell us your routes and expected volume." },
  { q: "Do you handle customs clearance for airfreight shipments?", a: "We coordinate customs paperwork, T1 transit support, and Carnet de Passage handling with licensed local agents. Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide." },
];

export const Route = createFileRoute("/airfreight")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Airfreight | Complete Service & Airport Handling",
      description: "Complete vehicle airfreight coordination or European airport handling only — Amsterdam Schiphol, Milan Malpensa, and Leipzig/Halle, with customs and transit-document support.",
      path: "/airfreight",
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
            name: "Vehicle Airfreight",
            description: "Complete vehicle airfreight coordination from origin through European arrival and delivery, or European airport handling only for vehicles already booked on a flight — including customs-clearance coordination, T1 transit support, and Carnet de Passage handling.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Italy"],
            url: `${SITE_URL}/airfreight`,
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
  component: Airfreight,
});

function Airfreight() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I have an airfreight enquiry.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Airfreight" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Airfreight vehicle delivery" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Airfreight</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              When It Absolutely Has to Arrive Fast
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Complete airfreight coordination or European airport handling only — for urgent timelines and exceptionally high-value vehicles.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "airfreight-hero" })}
              className="btn-primary mt-8 inline-flex"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
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

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Two ways we can help</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Complete Service or Handling Only</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SERVICE_TYPES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Before you book</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Vehicle Acceptance Requirements</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ACCEPTANCE.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{a.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-semibold text-navy/70">
            Vehicle acceptance and handling are subject to airline, cargo-terminal, ground-handler and vehicle-specific requirements.
          </p>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Paperwork</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Documentation We Coordinate</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {DOCUMENTATION.map((d) => (
                <li key={d} className="flex gap-2"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we handle</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Verified Airport Network</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AIRPORTS.map((a) => (
              <div key={a.name} className={`rounded-2xl border p-6 text-center shadow-card ${a.verified ? "border-teal/40 bg-card" : "border-dashed border-border bg-mist"}`}>
                <Plane className={`mx-auto h-6 w-6 ${a.verified ? "text-teal" : "text-navy/40"}`} />
                <h3 className="font-display mt-3 text-base font-bold text-navy">{a.name}</h3>
                <p className="mt-1 text-xs text-slate-body">{a.verified ? "Verified handling" : "Available on request"}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-body">
            Handling can also be coordinated at other major European cargo airports through Alpha Worldwide's logistics network, subject to confirmation.
          </p>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-teal-glow">Who this serves</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">Built for These Situations</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {CLIENT_TYPES.map((c) => (
              <span key={c} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85">
                <Users className="h-4 w-4 text-teal-glow" /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Questions</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Frequently Asked</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
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
      </section>

      <section className="section-mist">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Get started</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Request an Airfreight Enquiry
            </h2>
            <p className="mt-5 max-w-md text-slate-body">
              Select the enquiry type that matches your situation and we'll confirm feasibility and next steps. Also related: our <Link to="/import-uae" className="font-semibold text-teal hover:underline">UAE sourcing page</Link> or <Link to="/contact" className="font-semibold text-teal hover:underline">general contact</Link>.
            </p>
          </div>
          <AirfreightForm />
        </div>
      </section>
    </>
  );
}
