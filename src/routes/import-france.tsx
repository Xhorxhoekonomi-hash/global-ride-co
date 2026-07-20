import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, FileText, ShieldCheck, Ship, Truck, Plane, Car, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-france")({
  head: () => {
    const base = buildHead({
      title: "Import a Vehicle to France | USA, Korea, Dubai, Canada",
      description: "Vehicle sourcing and shipping into France from the USA, South Korea, Dubai, and Canada — arrival at Le Havre or Marseille, Carte Grise registration overview, and full-service coordination.",
      path: "/import-france",
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
            name: "Vehicle Import to France",
            description: "Sourcing, inspection, shipping, and customs-document coordination for vehicles imported into France from the USA, South Korea, Dubai, and Canada.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "France",
            url: `${SITE_URL}/import-france`,
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
  component: ImportFrance,
});

const VEHICLES_IMPORTED = ["Pickup trucks and SUVs from the USA", "Fuel-efficient sedans from South Korea", "Luxury and performance vehicles from Dubai", "SUVs from Canada"];

const FAQS = [
  { q: "Which French port does my vehicle arrive at?", a: "Depending on the origin and shipping route, vehicles typically arrive at Le Havre in the north or Marseille in the south of France." },
  { q: "How does vehicle registration (Carte Grise) work in France?", a: "French registration requires a Carte Grise (registration certificate), which generally involves a technical inspection and customs proof of import. Requirements vary and should always be confirmed with the local registration authority." },
  { q: "Why might a vehicle arrive at Marseille instead of Le Havre?", a: "The choice of port depends on the shipping line, route, and origin — Marseille is often used for Mediterranean and Middle East routes, while Le Havre handles more North Atlantic traffic. We confirm the actual routing once your shipment is booked." },
  { q: "Can I get my vehicle inspected before shipping to France?", a: "Where operationally possible, we coordinate pre-purchase inspection at origin — availability depends on the seller, the auction, and access to the vehicle, and is never guaranteed for every listing." },
  { q: "Do you handle French customs clearance?", a: "We coordinate customs paperwork with licensed local agents at the port of entry. Customs values, taxes, and clearance decisions are set by the relevant customs authority, not by Alpha Worldwide." },
];

function ImportFrance() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to import a vehicle into France.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Import to France" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle prepared for international shipping" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import to · France</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Sourcing and Shipping to France
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              From the USA, South Korea, Dubai, or Canada — sourced, inspected where possible, and shipped through Le Havre or Marseille.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "eu-france-hero" })} className="btn-primary">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "eu-france-hero" })} className="btn-outline-light">
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Anchor className="h-5 w-5" /></div>
              <h2 className="font-display mt-4 text-2xl font-bold text-navy">Arrival at Le Havre or Marseille</h2>
              <p className="mt-3 text-slate-body">France's two main vehicle-import ports serve different regions and shipping routes. We coordinate unloading and terminal handling at whichever port your shipment routes through.</p>
            </div>
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><FileText className="h-5 w-5" /></div>
              <h2 className="font-display mt-4 text-2xl font-bold text-navy">Carte Grise Registration Overview</h2>
              <p className="mt-3 text-slate-body">French registration requires a Carte Grise, typically involving a technical inspection and customs proof of import. Requirements vary and should always be confirmed with the local registration authority.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Shipping options</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Container, RoRo, or Airfreight</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Link to="/container-shipping" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal">
              <Ship className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">Container Shipping</h3>
              <p className="mt-2 text-sm text-slate-body">Full protection for higher-value or modified vehicles.</p>
            </Link>
            <Link to="/roro-shipping" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal">
              <Truck className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">RoRo</h3>
              <p className="mt-2 text-sm text-slate-body">A cost-effective option for standard, driveable vehicles.</p>
            </Link>
            <Link to="/airfreight" className="rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal">
              <Plane className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">Airfreight</h3>
              <p className="mt-2 text-sm text-slate-body">For urgent or exceptionally high-value vehicles, via our verified European airport network.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Frequently imported</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">What Customers Bring In</h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {VEHICLES_IMPORTED.map((v) => <li key={v} className="flex gap-2"><Car className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{v}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Inspection & delivery</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Before and After Shipping</h2>
          </div>
          <div className="grid gap-10 mt-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><ShieldCheck className="h-5 w-5" /></div>
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Inspection</h3>
              <p className="mt-2 text-sm text-slate-body">Where operationally possible, we coordinate pre-purchase inspection with photos, video, and a technical check — never guaranteed for every listing.</p>
            </div>
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Truck className="h-5 w-5" /></div>
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Delivery</h3>
              <p className="mt-2 text-sm text-slate-body">Once cleared at the port, we coordinate onward delivery anywhere in France.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Questions</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Frequently Asked</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
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
            <Link to="/how-it-works" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">How it works</Link>
            <Link to="/why-alpha-worldwide" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Why Alpha Worldwide</Link>
            <Link to="/vehicle-history-check" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Vehicle history checks</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Get started</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">Send Us a Vehicle Link</h2>
            <p className="mt-5 max-w-md text-white/70">We'll confirm feasibility and return an itemised quote to your French destination.</p>
          </div>
          <QuoteForm variant="full" onDark source="eu-france" />
        </div>
      </section>
    </>
  );
}
