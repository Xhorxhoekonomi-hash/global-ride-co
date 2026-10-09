import { PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { JourneySteps } from "@/components/site/JourneySteps";
import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Search, Gavel, ShieldCheck, DollarSign, FileText, Truck, Ship, Landmark, MessageCircle, Calculator, ArrowRight, Package, PackageCheck } from "lucide-react";
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
      lang: "en",
      hreflang: [
        { lang: "en", path: "/import-usa" },
        { lang: "sq", path: "/al/makina-nga-amerika" },
      ],
      xDefault: "/import-usa",
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
      <InnerPageHero eyebrow="Import from · USA" title="Purchase and Ship a Vehicle from the United States" description="Alpha Worldwide assists customers with vehicle purchases through Copart, IAAI, Manheim, ADESA and selected dealers — with shipping to Albania and across Europe." image={PHOTO_SELECTIONS.porsche.src} imageAlt={PHOTO_SELECTIONS.porsche.en}>

              <Button asChild className="h-auto min-h-11 whitespace-normal py-3"><a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "import-usa-hero" })}
                >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a></Button>
              <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "import-usa-hero" })}
                >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link></Button>
            
      </InnerPageHero>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">11-step process</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">From US Listing to Your Driveway</h2>
          </div>
          <JourneySteps steps={STEPS} />
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Shipping methods</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Shared or Full Container</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SHIPPING_METHODS.map((m) => (
              <div key={m.title} className="rounded-lg border border-border bg-card p-7 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
                  <m.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-secondary">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we ship to</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Destination Options</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map((d) => (
              <Link key={d.name} to={d.to} className="group rounded-lg border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-primary">
                <h3 className="font-display text-base font-bold text-secondary">{d.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d.body}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Questions</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Frequently Asked</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-lg border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="min-h-11 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-secondary">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent border-y border-border">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-primary">Start today</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">
              Send Us Your Lot Number or Vehicle Link
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Share a Copart or IAAI lot, a Manheim or ADESA listing, or a dealer URL. We'll return a full delivered-price quote.
            </p>
          </div>
          <QuoteForm variant="full" />
        </div>
      </section>
    </>
  );
}
