import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

type FaqItem = { q: string; a: string; to: string; label: string };
type Category = { name: string; items: FaqItem[] };

const CATEGORIES: Category[] = [
  {
    name: "USA",
    items: [
      { q: "Which US platforms can I buy from?", a: "Alpha Worldwide assists customers with vehicle purchases through Copart, IAAI, Manheim, ADESA and selected dealers.", to: "/import-usa", label: "Full USA sourcing guide" },
      { q: "Do I need a US auction account?", a: "No — as a broker, we bid and purchase on your behalf, so you don't need your own auction account, US address, or bank account.", to: "/auction-access", label: "How auction access works" },
    ],
  },
  {
    name: "South Korea",
    items: [
      { q: "Which Korean platforms can I buy from?", a: "We assist customers with vehicles listed through Encar, Autowini, KB Chachacha and approved Korean dealers.", to: "/import-korea", label: "Full South Korea sourcing guide" },
      { q: "Why do Korean vehicles have a good maintenance reputation?", a: "South Korea requires periodic mandatory technical inspections, which contributes to more documented service history and typically lower mileage.", to: "/import-korea", label: "South Korea sourcing details" },
    ],
  },
  {
    name: "Dubai",
    items: [
      { q: "Is every vehicle from Dubai a luxury vehicle?", a: "No — while Dubai is known for luxury and supercars, standard passenger vehicles, SUVs, and dealer inventory are also available.", to: "/import-uae", label: "Full UAE/Dubai sourcing guide" },
    ],
  },
  {
    name: "Container Shipping",
    items: [
      { q: "Shared or full container — what's the difference?", a: "Shared container consolidates your vehicle with others and is generally more economical. Full container is dedicated to your shipment, with more control over loading.", to: "/container-shipping", label: "Container shipping details" },
    ],
  },
  {
    name: "RoRo",
    items: [
      { q: "What does a vehicle need for RoRo shipping?", a: "The vehicle needs to be functional enough to drive onto the vessel under its own power, with a low fuel level and a working battery.", to: "/roro-shipping", label: "RoRo shipping details" },
    ],
  },
  {
    name: "Airfreight",
    items: [
      { q: "When does airfreight make sense?", a: "For urgent timelines or exceptionally high-value vehicles, where the cost premium is justified by speed or reduced handling.", to: "/airfreight", label: "Airfreight service details" },
    ],
  },
  {
    name: "Inspection",
    items: [
      { q: "Can every vehicle be inspected before purchase?", a: "No — inspection availability depends on the seller, the auction, and access to the vehicle. We confirm what's possible for your specific listing before you commit.", to: "/inspection-service", label: "What our inspections cover" },
    ],
  },
  {
    name: "Payments",
    items: [
      { q: "How does payment work?", a: "We provide a transparent, itemized cost breakdown before any payment is made, and funds are only released for a purchase once you've approved the vehicle and price.", to: "/contact", label: "Talk to our team" },
    ],
  },
  {
    name: "Import Documents",
    items: [
      { q: "What documents does an import typically need?", a: "Commonly a purchase invoice, ownership or registration document, export documentation from the origin country, a bill of lading, and destination-specific customs paperwork. Exact requirements vary by vehicle and destination.", to: "/contact", label: "Ask about your specific case" },
    ],
  },
  {
    name: "Vehicle Condition",
    items: [
      { q: "Are auction photos the same as an inspection?", a: "No. Auction photographs and condition reports are not equivalent to an independent inspection — we're always clear about which one applies to a given vehicle.", to: "/inspection-service", label: "Independent inspection details" },
    ],
  },
  {
    name: "Auction Buying",
    items: [
      { q: "Do you own or partner officially with the auction platforms?", a: "No. We assist customers with purchases through these platforms and are not an official partner of any of them, unless separately and explicitly stated.", to: "/auction-access", label: "Auction access explained" },
    ],
  },
  {
    name: "Shipping Times",
    items: [
      { q: "What determines how long shipping will take?", a: "Transit time depends on the origin port, shipping method, and vessel schedule — we give a general range as a guide and confirm an exact estimate once your route is booked, never a guaranteed date.", to: "/calculator", label: "Estimate your shipping cost" },
    ],
  },
  {
    name: "Customs",
    items: [
      { q: "Do you clear customs on my behalf?", a: "We coordinate customs paperwork with licensed local agents at the destination port. Customs values, taxes, and clearance decisions are set by the relevant customs authority, not by Alpha Worldwide.", to: "/contact", label: "Contact our team" },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  head: () => {
    const base = buildHead({
      title: "FAQ Knowledge Center | Alpha Worldwide",
      description: "Answers on vehicle sourcing from the USA, South Korea, and Dubai, shipping by container, RoRo, or airfreight, inspections, payments, documents, and customs — organized by topic.",
      path: "/faq",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: CATEGORIES.flatMap((c) => c.items).map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: FaqHub,
});

function FaqHub() {
  const [active, setActive] = useState<string>(CATEGORIES[0].name);

  return (
    <>
      <Breadcrumbs items={[{ label: "FAQ" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Alpha Worldwide customer support" width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[35vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Knowledge center</div>
          <h1 className="font-display mt-4 text-4xl font-bold md:text-6xl">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-2xl text-white/75">Organized by topic — every short answer links to the full detail page.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.name}
                onClick={() => setActive(c.name)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  active === c.name ? "border-teal bg-teal/10 text-teal" : "border-border bg-card text-navy hover:border-teal/50"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {CATEGORIES.filter((c) => c.name === active).map((c) => (
            <div key={c.name} className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
              {c.items.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                    {f.q}
                    <span className="text-teal transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                  <Link
                    to={f.to}
                    onClick={() => trackEvent("quote_started", { source: `faq-hub-${c.name}` })}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal hover:underline"
                  >
                    {f.label} →
                  </Link>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
