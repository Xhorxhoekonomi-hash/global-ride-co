import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Ship, ArrowRight, MessageCircle, Calculator, ShieldCheck, Package, Plane, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const ORIGIN_MARKETS = [
  { name: "South Korea", body: "Sourcing from Encar, Autowini, KB Chachacha and approved dealers, shipped via Rotterdam.", to: "/en/shipping/south-korea-to-rotterdam", cta: "View route" },
  { name: "USA", body: "Auction and dealer sourcing from Copart, IAAI, Manheim and more — a dedicated Rotterdam route is planned.", to: "/import-usa", cta: "See USA sourcing" },
  { name: "UAE", body: "Sourcing from Dubizzle, Emirates Auction and dealerships — a dedicated Rotterdam route is planned.", to: "/import-uae", cta: "See UAE sourcing" },
];

const SERVICES_LINKS = [
  { name: "Vehicle Inspection", body: "Pre-purchase inspection before you commit to buying.", to: "/inspection-service", icon: ShieldCheck },
  { name: "Container Shipping", body: "Fully enclosed shipping for high-value or modified vehicles.", to: "/container-shipping", icon: Package },
  { name: "RoRo Shipping", body: "The economical route for standard vehicles.", to: "/roro-shipping", icon: Ship },
  { name: "Vehicle Airfreight", body: "For urgent or exceptionally high-value shipments.", to: "/airfreight", icon: Plane },
];

const FAQS = [
  { q: "Do you import vehicles directly into the Netherlands, or just pass through Rotterdam?", a: "Both. We handle vehicles destined for the Netherlands itself, and we also use the Port of Rotterdam as an entry gateway for onward delivery to Germany, Belgium, and France." },
  { q: "Which origin markets ship via Rotterdam?", a: "South Korea has a dedicated Rotterdam route today. USA and UAE sourcing is available now through our general import pages, with dedicated Rotterdam-specific routes planned." },
  { q: "Do you handle customs clearance at Rotterdam?", a: "We coordinate customs paperwork and clearance with licensed local agents at the port of entry. Customs, transit and destination procedures depend on the vehicle, importer, destination country and applicable regulations." },
  { q: "Can you deliver to Germany or Belgium from Rotterdam?", a: "Yes — onward transport from Rotterdam to Germany, Belgium, and France is arranged as part of the same shipment, quoted based on your final destination." },
];

export const Route = createFileRoute("/en/netherlands")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Import to the Netherlands | Alpha Worldwide",
      description: "Import a vehicle into the Netherlands, or use the Port of Rotterdam as your gateway to Germany, Belgium, or France.",
      path: "/en/netherlands",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Vehicle Import to the Netherlands",
            description: "Netherlands vehicle import hub — sourcing, inspection, shipping, and Rotterdam gateway services.",
            about: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            url: `${SITE_URL}/en/netherlands`,
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
  component: NetherlandsHub,
});

function NetherlandsHub() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'm looking to import a vehicle to the Netherlands (or via Rotterdam).",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Netherlands" }]} />

      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Rotterdam port and Netherlands skyline" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Netherlands</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Import to the Netherlands
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Import a vehicle into the Netherlands directly, or use the Port of Rotterdam as your gateway to Germany, Belgium, and France.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <MapPin className="h-6 w-6 text-teal" />
              <h2 className="font-display mt-4 text-2xl font-bold text-navy">Importing Into the Netherlands</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                Sourcing, inspection, shipping, and delivery for a vehicle that will be registered and used in the Netherlands.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <Ship className="h-6 w-6 text-teal" />
              <h2 className="font-display mt-4 text-2xl font-bold text-navy">Rotterdam as a Gateway</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                Using the Port of Rotterdam as the ocean-freight entry point, with onward road transport to Germany, Belgium, or France as the final destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we source from</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Origin Markets</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ORIGIN_MARKETS.map((m) => (
              <Link key={m.name} to={m.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <h3 className="font-display text-xl font-bold text-navy">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{m.body}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  {m.cta} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Related services</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Everything Handled</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES_LINKS.map((s) => (
              <Link key={s.name} to={s.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-base font-bold text-navy">{s.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Real numbers, not guesses</div>
          <h2 className="font-display max-w-2xl text-3xl font-bold text-white md:text-5xl">
            Calculate Shipping to the Netherlands
          </h2>
          <p className="max-w-xl text-white/70">
            Our calculator supports Netherlands as a destination for both USA and South Korea routes, with an itemised cost breakdown.
          </p>
          <a
            href="/calculator"
            onClick={() => trackEvent("calculator_started", { source: "netherlands-hub" })}
            className="btn-primary"
          >
            <Calculator className="h-4 w-4" /> Open Shipping Calculator
          </a>
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
              Already found a vehicle?
            </h2>
            <p className="mt-5 text-slate-body">
              Send us the link — we'll confirm feasibility and return an itemised quote to your Dutch, German, Belgian, or French destination.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "netherlands-hub-final-cta" })}
              className="btn-primary mt-6 inline-flex"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
          <QuoteForm variant="full" />
        </div>
      </section>
    </>
  );
}
