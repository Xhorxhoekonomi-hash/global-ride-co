import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShoppingBag, ShieldCheck, FileText, Ship, Landmark, Truck, MessageCircle, Calculator, Package } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const WORKFLOW = [
  { n: 1, icon: ShoppingBag, title: "Sourcing", body: "We assist customers with vehicles listed through Encar, Autowini, KB Chachacha and approved Korean dealers." },
  { n: 2, icon: ShieldCheck, title: "Pre-Purchase Inspection", body: "Local partners verify condition, mileage, accident history, and documents before purchase." },
  { n: 3, icon: FileText, title: "Purchase & Export Documentation", body: "Secure purchase handling, followed by export paperwork prepared for the Korean side of the shipment." },
  { n: 4, icon: Truck, title: "Korean Inland Transport", body: "The vehicle is moved to the export port — Busan or Incheon — for loading." },
  { n: 5, icon: Ship, title: "Ocean Freight to Rotterdam", body: "RoRo or container shipping to the Port of Rotterdam, depending on vehicle type and your preference." },
  { n: 6, icon: Landmark, title: "Port Handling & Customs Coordination", body: "Arrival handling at Rotterdam and customs-clearance coordination with licensed local agents." },
  { n: 7, icon: Truck, title: "Onward Delivery", body: "Release and onward transport to the Netherlands, Germany, Belgium, France, or Luxembourg." },
];

const INCLUDED = [
  "Vehicle sourcing assistance and purchase coordination",
  "Pre-purchase inspection (where selected)",
  "Export documentation from South Korea",
  "Ocean freight to Rotterdam",
  "Port handling and customs-clearance coordination at Rotterdam",
];

const EXCLUDED = [
  "Import duties, VAT, and destination-country taxes",
  "Vehicle registration and homologation fees",
  "Onward transport beyond Rotterdam (quoted separately per destination)",
];

const DOCUMENTS = [
  "Commercial invoice or purchase invoice",
  "Vehicle registration or ownership document",
  "Export documentation from South Korea",
  "Bill of Lading",
  "Importer identification and contact details",
  "Customs or transit documentation required for the destination",
  "Power of attorney where required",
  "Additional documents requested for temporary import, company ownership, or onward transit",
];

const FAQS = [
  { q: "How long does shipping from South Korea to Rotterdam take?", a: "Transit time depends on the departure port, shipping method, carrier schedule, transshipment plan and vessel availability. The estimated schedule is confirmed before booking. As a general guide, ocean transport typically takes several weeks." },
  { q: "Can you deliver beyond Rotterdam?", a: "Yes. Rotterdam is our entry gateway for onward delivery to the Netherlands, Germany, Belgium, France, and Luxembourg. Onward transport is quoted separately based on the final destination." },
  { q: "Is this a single shipment, or two separate legs?", a: "It's coordinated as one shipment for you. The ocean freight from Korea to Rotterdam and the onward road transport to your final destination are booked together, so you deal with one point of contact throughout." },
  { q: "Do you handle customs clearance yourselves?", a: "We coordinate customs paperwork and clearance with licensed local agents at the port of entry. We are not a customs authority — customs, transit and destination procedures depend on the vehicle, importer, destination country and applicable regulations." },
  { q: "What documents will I need?", a: "Typically a commercial invoice, vehicle registration or ownership document, export documentation from South Korea, Bill of Lading, importer identification, and any customs or transit documentation required for your destination. Required documents vary according to the importer, vehicle, customs procedure and final destination country." },
  { q: "Can multiple vehicles be shipped together to Rotterdam?", a: "Yes. Consolidating more than one vehicle in the same container or sailing can reduce the per-vehicle shipping cost — ask us about consolidation options when you send your vehicle details." },
];

export const Route = createFileRoute("/en/shipping/south-korea-to-rotterdam")({
  head: () => {
    const base = buildHead({
      title: "Car Shipping from South Korea to Rotterdam | Alpha Worldwide",
      description: "Vehicle sourcing, inspection, and shipping from South Korea to Rotterdam — with onward delivery to the Netherlands, Germany, Belgium, France, and Luxembourg.",
      path: "/en/shipping/south-korea-to-rotterdam",
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
            name: "Vehicle Shipping from South Korea to Rotterdam",
            description: "Vehicle sourcing, pre-purchase inspection, export documentation, and ocean freight from South Korea to Rotterdam, with onward delivery across Western Europe.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Netherlands", "Germany", "Belgium", "France", "Luxembourg"],
            url: `${SITE_URL}/en/shipping/south-korea-to-rotterdam`,
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
  component: KoreaToRotterdam,
});

function KoreaToRotterdam() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like a quote for shipping a vehicle from South Korea to Rotterdam.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Import From South Korea", to: "/import-korea" }, { label: "Shipping to Rotterdam" }]} />

      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Container terminal at the Port of Rotterdam" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">South Korea → Rotterdam</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Shipping from South Korea to Rotterdam
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Sourcing, inspection, and ocean freight from Busan or Incheon to Rotterdam — with onward delivery across the Netherlands, Germany, Belgium, France, and Luxembourg.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "korea-rotterdam-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a>
              <a
                href="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "korea-rotterdam-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">How it works</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Korea to Rotterdam</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.n}. {s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-24">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="flex items-center gap-2 text-teal"><Package className="h-5 w-5" /><h3 className="font-display text-lg font-bold text-navy">What's Included</h3></div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {INCLUDED.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="flex items-center gap-2 text-navy/60"><Package className="h-5 w-5" /><h3 className="font-display text-lg font-bold text-navy">What's Excluded</h3></div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {EXCLUDED.map((i) => <li key={i} className="flex gap-2"><span className="text-navy/40">•</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Paperwork</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Documents Typically Required</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {DOCUMENTS.map((d) => <li key={d} className="flex gap-2"><span className="text-teal">•</span>{d}</li>)}
            </ul>
            <p className="mt-5 text-xs text-slate-body">
              Required documents vary according to the importer, vehicle, customs procedure and final destination country.
            </p>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-teal-glow">Beyond Rotterdam</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">Onward Delivery Across Western Europe</h2>
            <p className="mt-4 text-white/70">
              Rotterdam is our entry gateway — from there we arrange onward transport to your final destination.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Netherlands", "Germany", "Belgium", "France", "Luxembourg"].map((d) => (
              <span key={d} className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85">
                {d}
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
            <div className="eyebrow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Send Us a Vehicle Link from South Korea
            </h2>
            <p className="mt-5 text-slate-body">
              Share an Encar, Autowini, or KB Chachacha listing — we'll confirm feasibility and return an itemised shipping quote to Rotterdam.
            </p>
          </div>
          <QuoteForm variant="full" />
        </div>
      </section>
    </>
  );
}
