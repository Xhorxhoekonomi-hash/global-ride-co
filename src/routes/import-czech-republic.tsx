import { KeywordText } from "@/components/site/KeywordText";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { sceneForPath } from "@/lib/scene-library";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Anchor, FileText, ShieldCheck, Ship, Truck, Car, MessageCircle, Calculator, Award } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-czech-republic")({
  head: () => {
    const base = buildHead({
      title: "Import a Vehicle to the Czech Republic | Alpha Worldwide",
      description: "Vehicle sourcing and shipping to the Czech Republic from the USA, South Korea, Dubai, and Canada — technical approval overview, documentation, and full-service coordination.",
      path: "/import-czech-republic",
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Vehicle Import to the Czech Republic", description: "Sourcing, inspection, shipping, and documentation coordination for vehicles imported into the Czech Republic from the USA, South Korea, Dubai, and Canada.", provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, areaServed: "Czech Republic", url: `${SITE_URL}/import-czech-republic` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: ImportCzechRepublic,
});

const VEHICLES_IMPORTED = ["Trucks and SUVs from the USA", "Well-documented sedans from South Korea", "Luxury vehicles from Dubai", "SUVs and pickups from Canada"];

const FAQS = [
  { q: "How does a vehicle typically reach the Czech Republic from overseas?", a: "As a landlocked country, the Czech Republic is usually reached via a European seaport — commonly Hamburg, Bremerhaven, or Rotterdam — followed by onward road transport." },
  { q: "What is technical approval, and is it required for imports?", a: "Technical approval confirms a vehicle meets applicable Czech and EU standards. It's typically part of the registration process for imported vehicles — requirements vary and should be confirmed with the local authority." },
  { q: "What documentation is typically needed to register an imported vehicle?", a: "Commonly required documents include proof of ownership, technical approval or conformity documentation, and customs paperwork confirming the import. Exact requirements vary by vehicle and should be confirmed locally." },
  { q: "Is inspection available before I commit to buying a vehicle?", a: "Where operationally possible, we coordinate pre-purchase inspection at origin — availability depends on the seller, the auction, and access to the vehicle." },
  { q: "Do you handle both container and RoRo shipping to the Czech Republic?", a: "Yes — depending on the vehicle and route, we arrange either container shipping for full protection or RoRo for standard, driveable vehicles." },
];

function ImportCzechRepublic() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like to import a vehicle into the Czech Republic.")}`;
  return (
    <>
      <PageHero scene={sceneForPath("/import-czech-republic").en} breadcrumbs={[{ label: "Import to Czech Republic" }]} eyebrow="Import to Czech Republic" title="Vehicle Sourcing and Shipping to the Czech Republic" description={<><KeywordText text={"From the USA, South Korea, Dubai, or Canada — sourced, documented, and routed via Hamburg, Bremerhaven, or Rotterdam."} /></>}>
        <Button asChild><Link to="/contact" search={{ from: "", to: "Czech Republic", vehicle: "" }} onClick={() => trackEvent("quote_started", { source: "eu-czech-republic-hero" })}>Get a quote</Link></Button>
        <Button asChild variant="outline"><Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "eu-czech-republic-hero" })}>Calculate cost</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Anchor className="h-5 w-5" /></div><h2 className="mt-4 text-navy">Gateway Ports</h2><p className="mt-3 text-slate-body"><KeywordText text={"The Czech Republic is typically reached via Hamburg, Bremerhaven, or Rotterdam, with onward road transport across Germany or Austria."} /></p></div>
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><Award className="h-5 w-5" /></div><h2 className="mt-4 text-navy">Technical Approval</h2><p className="mt-3 text-slate-body">Registration typically requires technical approval confirming the vehicle meets applicable standards. Requirements vary and should always be confirmed with the local authority.</p></div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl"><div className="eyebrow">Shipping options</div><h2 className="mt-3 text-navy">Container or RoRo</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link to="/container-shipping" className="rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal"><Ship className="h-6 w-6 text-teal" /><h3 className="mt-3 text-navy">Container Shipping</h3><p className="mt-2 text-sm text-slate-body">Full protection for higher-value or modified vehicles.</p></Link>
            <Link to="/roro-shipping" className="rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-teal"><Truck className="h-6 w-6 text-teal" /><h3 className="mt-3 text-navy">RoRo</h3><p className="mt-2 text-sm text-slate-body">A cost-effective option for standard, driveable vehicles.</p></Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl"><div className="eyebrow">Frequently imported</div><h2 className="mt-3 text-navy">What Customers Bring In</h2></div>
          <div className="mt-8 max-w-2xl rounded-xl border border-border bg-card p-7 shadow-card"><ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">{VEHICLES_IMPORTED.map((v) => <li key={v} className="flex gap-2"><Car className="mt-0.5 h-4 w-4 shrink-0 text-teal" /><KeywordText text={v} /></li>)}</ul></div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl"><div className="eyebrow">Inspection & why us</div><h2 className="mt-3 text-navy">Why Alpha Worldwide</h2></div>
          <div className="grid gap-10 mt-10 lg:grid-cols-2 lg:gap-16">
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><ShieldCheck className="h-5 w-5" /></div><h3 className="mt-4 text-navy">Inspection</h3><p className="mt-2 text-sm text-slate-body">Where operationally possible, we coordinate pre-purchase inspection with photos, video, and a technical check — never guaranteed for every listing.</p></div>
            <div><div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><FileText className="h-5 w-5" /></div><h3 className="mt-4 text-navy">Documentation Support</h3><p className="mt-2 text-sm text-slate-body">We help prepare export and approval documentation before your vehicle reaches the Czech Republic.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-2xl"><div className="eyebrow">Questions</div><h2 className="mt-3 text-navy">Frequently Asked</h2></div>
          <div className="mt-10 max-w-2xl divide-y divide-border rounded-xl border border-border bg-card">
            {FAQS.map((f) => (<details key={f.q} className="group p-5"><summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-slate-body"><KeywordText text={f.a} /></p></details>))}
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
          <div><div className="eyebrow text-teal-glow">Get started</div><h2 className="mt-3 text-white">Send Us a Vehicle Link</h2><p className="mt-5 max-w-md text-white/70">We'll confirm feasibility and return an itemised quote to your Czech destination.</p></div>
          <QuoteForm variant="full" onDark source="eu-czech-republic" />
        </div>
      </section>
    </>
  );
}
