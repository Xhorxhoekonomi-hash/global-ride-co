import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, FileText, ShieldCheck, Ship, Truck, Car, MessageCircle, Calculator, Zap } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-poland")({
  head: () => {
    const base = buildHead({
      title: "Import a Vehicle to Poland | USA, Korea, Dubai, Canada",
      description: "Vehicle sourcing and shipping to Poland from the USA, South Korea, Dubai, and Canada — arrival at Gdynia or Gdańsk, vehicle history and registration overview.",
      path: "/import-poland",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Vehicle Import to Poland", description: "Sourcing, inspection, shipping, and documentation coordination for vehicles imported into Poland from the USA, South Korea, Dubai, and Canada.", provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, areaServed: "Poland", url: `${SITE_URL}/import-poland` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: ImportPoland,
});

const VEHICLES_IMPORTED = ["Commercial vehicles and trucks from the USA", "SUVs and sedans from South Korea", "Luxury vehicles from Dubai", "Electric vehicles from multiple origins"];

const FAQS = [
  { q: "Which Polish ports handle vehicle imports?", a: "Vehicles typically arrive at Gdynia or Gdańsk on the Baltic coast, or via Hamburg or Rotterdam with onward road transport into Poland." },
  { q: "Is a vehicle history check important for imports into Poland?", a: "Yes — reviewing available title, condition, and history information before purchase helps confirm what you're buying, alongside any inspection we're able to coordinate." },
  { q: "Are electric vehicles handled differently for import into Poland?", a: "Electric vehicles may involve additional considerations around battery documentation and shipping classification — we confirm specifics for your particular vehicle before booking." },
  { q: "Do you handle commercial vehicle imports as well as passenger cars?", a: "Yes — we assist with commercial vehicles and trucks as well as SUVs and passenger cars, sourced from the USA, South Korea, Dubai, or Canada." },
  { q: "Can I get my vehicle inspected before shipping to Poland?", a: "Where operationally possible, we coordinate pre-purchase inspection at origin — availability depends on the seller, the auction, and access to the vehicle." },
];

function ImportPoland() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like to import a vehicle into Poland.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Import to Poland" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Container terminal used for Baltic vehicle imports" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import to · Poland</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">Vehicle Sourcing and Shipping to Poland</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">From the USA, South Korea, Dubai, or Canada — sourced, inspected where possible, and shipped through Gdynia, Gdańsk, Hamburg, or Rotterdam.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "eu-poland-hero" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
              <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "eu-poland-hero" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Anchor className="h-5 w-5" /></div><h2 className="font-display mt-4 text-2xl font-bold text-navy">Baltic and North Sea Gateways</h2><p className="mt-3 text-slate-body">Gdynia and Gdańsk offer direct Baltic access, while Hamburg or Rotterdam are common alternates with onward road transport into Poland.</p></div>
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Zap className="h-5 w-5" /></div><h2 className="font-display mt-4 text-2xl font-bold text-navy">Vehicle Range</h2><p className="mt-3 text-slate-body">We source commercial vehicles, SUVs, and electric vehicles alike — each with its own documentation considerations that we confirm before booking.</p></div>
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
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><FileText className="h-5 w-5" /></div><h3 className="font-display mt-4 text-xl font-bold text-navy">Documentation</h3><p className="mt-2 text-sm text-slate-body">We review available history information and prepare export paperwork before your vehicle reaches Poland.</p></div>
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
          <div><div className="eyebrow text-teal-glow">Get started</div><h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">Send Us a Vehicle Link</h2><p className="mt-5 max-w-md text-white/70">We'll confirm feasibility and return an itemised quote to your Polish destination.</p></div>
          <QuoteForm variant="full" onDark source="eu-poland" />
        </div>
      </section>
    </>
  );
}
