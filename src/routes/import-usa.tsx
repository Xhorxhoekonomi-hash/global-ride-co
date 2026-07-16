import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Search, Gavel, ShieldCheck, DollarSign, FileText, Truck, Ship, Landmark, MessageCircle, Calculator, ArrowRight, Package, PackageCheck } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { CONTACT } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-usa")({
  head: () => {
    const base = buildHead({
      title: "Import a Car from USA | Copart, IAAI, Manheim, ADESA",
      description: "Source, inspect, and ship a vehicle from the USA — Copart, IAAI, Manheim and ADESA purchase assistance, with shipping to Albania and across Europe.",
      path: "/import-usa",
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
            name: "Vehicle Sourcing and Shipping from the USA",
            description: "Auction and dealer purchase assistance through Copart, IAAI, Manheim, and ADESA, with inland transport, export documentation, and container or RoRo shipping to Albania and Europe.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Belgium", "France"],
            url: `${SITE_URL}/import-usa`,
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
  component: ImportUSA,
});

const STEPS = [
  { n: 1, icon: Search, title: "Vehicle or Lot Selection", body: "You send a lot number or listing, or tell us what you're looking for." },
  { n: 2, icon: Gavel, title: "Auction or Dealer Review", body: "We review the listing, condition report, and history before you commit." },
  { n: 3, icon: ShieldCheck, title: "Inspection Where Available", body: "Inspection availability depends on the auction location, seller access and vehicle condition." },
  { n: 4, icon: Gavel, title: "Bidding or Purchase Assistance", body: "We bid or negotiate on your behalf, within your budget." },
  { n: 5, icon: DollarSign, title: "Payment & Document Coordination", body: "Secure payment handling and accurate paperwork at every step." },
  { n: 6, icon: Truck, title: "Auction-Yard Collection", body: "The vehicle is collected from the auction yard or dealer lot." },
  { n: 7, icon: Truck, title: "Inland Transportation", body: "Moved to the appropriate export terminal — Savannah, Elizabeth, Houston, Los Angeles, or Indianapolis." },
  { n: 8, icon: FileText, title: "Export-Document Coordination", body: "Export paperwork prepared and coordinated ahead of loading." },
  { n: 9, icon: Package, title: "Shared or Full-Container Loading", body: "Loaded into a shared or dedicated container, depending on your shipment." },
  { n: 10, icon: Ship, title: "Ocean Freight", body: "Container or RoRo shipping to your destination port." },
  { n: 11, icon: Landmark, title: "Destination Handling & Delivery Coordination", body: "We coordinate port handling, customs paperwork, and onward delivery." },
];

const SHIPPING_METHODS = [
  { icon: PackageCheck, title: "Shared Container", body: "Suitable when consolidating multiple vehicles, subject to schedule and space. A cost-effective option when your timeline allows for consolidation." },
  { icon: Package, title: "Full Container", body: "Suitable for dedicated shipments, multiple vehicles, or customers requiring greater control over loading. Capacity depends on vehicle dimensions, loading method, and condition — we don't promise a fixed number of vehicles per container." },
];

const DESTINATIONS = [
  { name: "Albania", body: "Delivered through the Port of Durrës.", to: "/en/albania" },
  { name: "Netherlands (via Rotterdam)", body: "Onward delivery across Western Europe.", to: "/en/netherlands" },
  { name: "Germany (Bremerhaven)", body: "A dedicated route is planned — ask us for current options.", to: "/contact" },
  { name: "Wider Europe", body: "Additional European destinations — ask us for a route.", to: "/contact" },
];

const FAQS = [
  { q: "Which US auction platforms can you help me buy from?", a: "Alpha Worldwide assists customers with vehicle purchases through Copart, IAAI, Manheim, ADESA and selected dealers." },
  { q: "Will my vehicle be inspected before purchase?", a: "Inspection availability depends on the auction location, seller access and vehicle condition — it isn't automatically available for every auction vehicle. Auction photographs and condition codes are not the same as an independent inspection; we'll confirm what's possible for your specific lot." },
  { q: "What's the difference between shared and full container shipping?", a: "Shared container consolidates your vehicle with others, subject to schedule and available space — generally more economical. Full container is dedicated to your shipment, better suited when you need more control over loading or are shipping multiple vehicles." },
  { q: "Where can you ship to from the USA?", a: "Albania (via the Port of Durrës) and the Netherlands (via our Rotterdam route) both have dedicated delivery options today. Germany and other European destinations are available on request while dedicated routes are being built." },
  { q: "Do you own or operate Copart, IAAI, Manheim, or ADESA?", a: "No. Alpha Worldwide assists customers with vehicle purchases through these platforms and selected dealers — we are not affiliated with or an official partner of any auction platform unless separately stated." },
  { q: "Who handles customs paperwork when my vehicle arrives?", a: "We coordinate customs paperwork with licensed local agents at the destination port — whether that's Durrës, Rotterdam, or elsewhere in Europe. Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide." },
];

function ImportUSA() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to source and ship a vehicle from the USA.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Import From USA" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="US port with vehicles" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · USA</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Purchase and Ship a Vehicle from the United States
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Alpha Worldwide assists customers with vehicle purchases through Copart, IAAI, Manheim, ADESA and selected dealers — with shipping to Albania and across Europe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "import-usa-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "import-usa-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">11-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From US Listing to Your Driveway</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display mt-3 text-xs font-bold uppercase tracking-wider text-teal">Step {s.n}</div>
                <h3 className="font-display mt-1 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Shipping methods</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Shared or Full Container</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SHIPPING_METHODS.map((m) => (
              <div key={m.title} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-navy">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{m.body}</p>
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
              Send Us Your Lot Number or Vehicle Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a Copart or IAAI lot, a Manheim or ADESA listing, or a dealer URL. We'll return a full delivered-price quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
