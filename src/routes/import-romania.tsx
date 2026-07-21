import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, FileText, ShieldCheck, Ship, Truck, Car, MessageCircle, Calculator, Waves } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-romania")({
  head: () => {
    const base = buildHead({
      title: "Import a Vehicle to Romania | USA, Korea, Dubai, Canada",
      description: "Vehicle sourcing and shipping to Romania from the USA, South Korea, Dubai, and Canada — arrival at Constanța, registration overview, and full-service coordination.",
      path: "/import-romania",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Vehicle Import to Romania", description: "Sourcing, inspection, shipping, and documentation coordination for vehicles imported into Romania from the USA, South Korea, Dubai, and Canada.", provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, areaServed: "Romania", url: `${SITE_URL}/import-romania` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: ImportRomania,
});

const VEHICLES_IMPORTED = ["Trucks and SUVs from the USA", "Sedans from South Korea", "Luxury vehicles from Dubai", "SUVs from Canada"];

const FAQS = [
  { q: "Does Romania have a direct sea route for vehicle imports?", a: "Yes — Constanța on the Black Sea is Romania's principal port and offers a direct maritime route, distinct from the North Sea gateways used for many other European destinations." },
  { q: "Is Constanța used for shipments from all origin countries?", a: "Constanța's Black Sea routing can be well suited to certain origins, but the specific port used depends on the shipping line and schedule — we confirm the actual routing once your shipment is booked." },
  { q: "What does Romanian vehicle registration typically require?", a: "Registration generally requires proof of ownership, customs documentation confirming the import, and evidence the vehicle meets applicable technical standards. Requirements vary and should always be confirmed with the local authority." },
  { q: "Can a vehicle also reach Romania via North Sea ports?", a: "Yes — vehicles can also be routed through Hamburg, Bremerhaven, or Rotterdam with onward transport, depending on which option best suits your timeline and budget." },
  { q: "Is pre-purchase inspection available for vehicles headed to Romania?", a: "Where operationally possible, we coordinate pre-purchase inspection at origin — availability depends on the seller, the auction, and access to the vehicle." },
];

function ImportRomania() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like to import a vehicle into Romania.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Import to Romania" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle prepared for shipping to Romania" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import to · Romania</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">Vehicle Sourcing and Shipping to Romania</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">From the USA, South Korea, Dubai, or Canada — sourced, inspected where possible, and shipped via Constanța on the Black Sea or a North Sea gateway port.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "eu-romania-hero" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
              <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "eu-romania-hero" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Waves className="h-5 w-5" /></div><h2 className="font-display mt-4 text-2xl font-bold text-navy">Black Sea Logistics</h2><p className="mt-3 text-slate-body">Constanța offers a direct Black Sea route for vehicles into Romania — a logistics profile distinct from the North Sea ports used for most Western European destinations.</p></div>
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><FileText className="h-5 w-5" /></div><h2 className="font-display mt-4 text-2xl font-bold text-navy">Registration Overview</h2><p className="mt-3 text-slate-body">Registration typically requires proof of ownership, customs documentation, and technical conformity evidence. Requirements vary and should always be confirmed with the local registration authority.</p></div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center"><div className="eyebrow">Shipping options</div><h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Container or RoRo</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link to="/container-shipping" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal"><Ship className="h-6 w-6 text-teal" /><h3 className="font-display mt-3 text-lg font-bold text-navy">Container Shipping</h3><p className="mt-2 text-sm text-slate-body">Full protection for higher-value or modified vehicles.</p></Link>
            <Link to="/roro-shipping" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal"><Truck className="h-6 w-6 text-teal" /><h3 className="font-display mt-3 text-lg font-bold text-navy">RoRo</h3><p className="mt-2 text-sm text-slate-body">A cost-effective option for standard, driveable vehicles.</p></Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center"><div className="eyebrow">Frequently imported</div><h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">What Customers Bring In</h2></div>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card"><ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">{VEHICLES_IMPORTED.map((v) => <li key={v} className="flex gap-2"><Car className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{v}</li>)}</ul></div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center"><div className="eyebrow">Inspection & why us</div><h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Why Alpha Worldwide</h2></div>
          <div className="grid gap-10 mt-10 lg:grid-cols-2 lg:gap-16">
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><ShieldCheck className="h-5 w-5" /></div><h3 className="font-display mt-4 text-xl font-bold text-navy">Inspection</h3><p className="mt-2 text-sm text-slate-body">Where operationally possible, we coordinate pre-purchase inspection with photos, video, and a technical check — never guaranteed for every listing.</p></div>
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Anchor className="h-5 w-5" /></div><h3 className="font-display mt-4 text-xl font-bold text-navy">Delivery</h3><p className="mt-2 text-sm text-slate-body">Once cleared at the port, we coordinate onward delivery anywhere in Romania.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center"><div className="eyebrow">Questions</div><h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Frequently Asked</h2></div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((f) => (<details key={f.q} className="group p-5"><summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p></details>))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 text-center md:py-16">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            <Link to="/import-usa" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">USA sourcing</Link>
            <Link to="/import-korea" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">South Korea sourcing</Link>
            <Link to="/import-uae" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Dubai sourcing</Link>
            <Link to="/inspection-service" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Inspection service</Link>
            <Link to="/airfreight" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Airfreight</Link>
            <Link to="/how-it-works" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">How it works</Link>
            <Link to="/why-alpha-worldwide" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Why Alpha Worldwide</Link>
            <Link to="/vehicle-history-check" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Vehicle history checks</Link>
            <Link to="/faq" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">FAQ hub</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div><div className="eyebrow text-teal-glow">Get started</div><h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">Send Us a Vehicle Link</h2><p className="mt-5 max-w-md text-white/70">We'll confirm feasibility and return an itemised quote to your Romanian destination.</p></div>
          <QuoteForm variant="full" onDark source="eu-romania" />
        </div>
      </section>
    </>
  );
}
