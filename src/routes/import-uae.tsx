import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Phone, MapPin, ShoppingBag, ShieldCheck, FileText, Truck, Ship, Plane, MessageCircle, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-uae")({
  head: () => {
    const base = buildHead({
      title: "Import a Car from Dubai/UAE | Alpha Worldwide",
      description: "Vehicle sourcing from Dubai, Abu Dhabi and Sharjah — luxury, standard, and dealer inventory — with inspection, export coordination, and shipping to Albania and Europe.",
      path: "/import-uae",
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
            name: "Vehicle Sourcing and Shipping from the UAE",
            description: "Vehicle sourcing from Dubai, Abu Dhabi and Sharjah, with inspection coordination, export documentation, and container, RoRo, or airfreight shipping to Albania and Europe.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Italy"],
            url: `${SITE_URL}/import-uae`,
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
  component: ImportUAE,
});

const MARKET_TYPES = [
  "Luxury & supercar market",
  "Standard passenger vehicles",
  "SUVs",
  "Dealer inventory",
  "Specialist & collector vehicles",
];

const STEPS = [
  { n: 1, title: "Vehicle Search", body: "Choose your car, or send listings from Emirates Auction or Dubizzle." },
  { n: 2, title: "Vehicle Inspection", body: "Ownership, chassis number, accident history and condition — verified on the ground where available." },
  { n: 3, title: "Purchase Handling", body: "Our UAE team negotiates and coordinates the purchase on your behalf." },
  { n: 4, title: "Export Documentation", body: "RTA clearance, deregistration and export paperwork coordinated in Dubai." },
  { n: 5, title: "Shipping to Europe", body: "Container, RoRo where operationally available, or airfreight — matched to your vehicle and timeline." },
  { n: 6, title: "Destination Handling & Delivery", body: "We coordinate port or airport handling, customs paperwork, and onward delivery." },
];

const SHIPPING_OPTIONS = [
  { icon: Ship, title: "Container Shipping", body: "The standard route for most vehicles — fully enclosed ocean freight to your destination port." },
  { icon: Truck, title: "RoRo", body: "Available where operationally suited to the route and vehicle — ask us to confirm for your shipment." },
  { icon: Plane, title: "Airfreight", body: "For urgent or exceptionally high-value vehicles. See our dedicated airfreight hub for full details." },
];

const DESTINATIONS = [
  { name: "Albania", body: "Delivered through the Port of Durrës.", to: "/en/albania" },
  { name: "Netherlands", body: "Onward delivery across Western Europe.", to: "/en/netherlands" },
  { name: "Germany", body: "Available on request — ask us for current options.", to: "/contact" },
  { name: "Italy & Wider Europe", body: "Additional European destinations — ask us for a route.", to: "/contact" },
];

const FAQS = [
  { q: "Are all vehicles from the UAE luxury or supercars?", a: "No. While the UAE is well known for its luxury and supercar market, we also source standard passenger vehicles, SUVs, dealer inventory, and specialist or collector vehicles." },
  { q: "Do I need a Carnet de Passage?", a: "Temporary-import and Carnet procedures depend on the vehicle, ownership documents, route and destination-country requirements. Not every shipment requires or qualifies for a Carnet — we'll confirm what applies to your specific case." },
  { q: "Can you ship by RoRo from the UAE?", a: "RoRo is available where operationally suited to the specific route and vehicle. Container shipping is the standard option — ask us to confirm RoRo availability for your shipment." },
  { q: "Can you airfreight a vehicle from Dubai?", a: "Yes, for urgent or exceptionally high-value vehicles. Visit our dedicated airfreight hub for the full service breakdown, or contact us directly to discuss your timeline." },
  { q: "Why work with Alpha Worldwide's Dubai office specifically?", a: "Our Dubai headquarters means local sourcing coordination, direct seller and dealer communication, inspection coordination, and export preparation all happen on the ground — not remotely." },
  { q: "Do you handle customs clearance at the destination?", a: "We coordinate customs paperwork with licensed local agents at the destination port. Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide." },
];

function ImportUAE() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to source and ship a vehicle from the UAE.",
  )}`;
  const dubai = OFFICES[0];

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Import From UAE" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Dubai skyline with luxury vehicle" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · UAE</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Sourcing & Shipping from Dubai, Abu Dhabi & Sharjah
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Sourced from Dubizzle, Emirates Auction and official dealerships — inspected, documented, and shipped to Albania and across Europe, backed by our Dubai headquarters.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "import-uae-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a>
              <a
                href={`tel:${CONTACT.uae.replace(/\s/g, "")}`}
                onClick={() => trackEvent("phone_clicked", { location: "import-uae-hero" })}
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-teal-glow" /> UAE Office: {CONTACT.uae}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <MapPin className="mx-auto h-8 w-8 text-teal" />
            <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">A Dubai Headquarters Advantage</h2>
            <p className="mt-4 text-slate-body">
              Being based in {dubai.city} means local UAE sourcing coordination, direct seller and dealer communication, inspection coordination, export preparation, and inland vehicle movement all happen on the ground — not remotely.
            </p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Beyond luxury</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">A Broader Market Than You'd Expect</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {MARKET_TYPES.map((m) => (
              <span key={m} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Dubai to Your Driveway</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-5xl font-bold text-teal">{String(s.n).padStart(2, "0")}</div>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Shipping options</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Container, RoRo, or Airfreight</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SHIPPING_OPTIONS.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{s.body}</p>
                {s.title === "Airfreight" && (
                  <Link to="/airfreight" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">
                    Visit airfreight hub <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we ship to</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Destination Options</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <Link key={d.name} to={d.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <h3 className="font-display text-base font-bold text-navy">{d.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{d.body}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
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

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Send Us a Dubizzle or Emirates Auction Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL — our Dubai team handles inspection coordination, negotiation, RTA export, and shipping to your destination.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
