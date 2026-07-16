import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Anchor, MessageCircle, Calculator, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT, COUNTRIES, SERVICES } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/en/albania")({
  head: () => {
    const base = buildHead({
      title: "Car Shipping to Albania | Vehicle Import & Logistics",
      description: "Vehicle sourcing, inspection, and shipping to Albania from the USA, South Korea, UAE, Canada, and Europe — coordinated through the Port of Durrës.",
      path: "/en/albania",
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
            name: "Vehicle Shipping and Import Services to Albania",
            description: "Vehicle sourcing, auction access, pre-purchase inspection, shipping, port handling, and documentation support for vehicles imported into Albania.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/en/albania`,
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
  component: AlbaniaHub,
});

const ALBANIA_SERVICES = SERVICES.filter((s) =>
  ["sourcing", "auction-access", "inspection", "container-shipping", "roro-shipping", "customs", "port-handling", "final-mile", "airfreight"].includes(s.slug),
);

const FAQS = [
  { q: "How does Alpha Worldwide ship a vehicle to Albania?", a: "We source or verify the vehicle, arrange pre-purchase inspection where applicable, handle inland transport to the export port, and ship by container or RoRo to the Port of Durrës, where we coordinate unloading, customs paperwork, and delivery." },
  { q: "Which countries can I import a vehicle from?", a: "We source from the USA, South Korea, UAE, Canada, and across Europe. Each market has its own sourcing process — see the origin market pages below for details." },
  { q: "Does Alpha Worldwide handle customs clearance?", a: "Alpha Worldwide coordinates vehicle sourcing, shipping, port handling, unloading and documentation support through the Port of Durrës and assists customers throughout the import process. Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide." },
  { q: "Can I ship a vehicle to Albania by air?", a: "Airfreight is available for urgent, high-value, or specialised vehicles. For most standard vehicle imports, ocean shipping (container or RoRo) is the standard and more economical route." },
  { q: "How long does shipping to Albania take?", a: "Transit time depends on the origin port, shipping method, carrier schedule, and vessel availability. We confirm an estimated schedule before booking." },
];

function AlbaniaHub() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to import a vehicle to Albania.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Albania" }]} />

      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="A vehicle imported and delivered by Alpha Worldwide in Albania" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Albania</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Shipping and Import Services to Albania
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Sourcing, inspection, and shipping from the USA, South Korea, UAE, Canada, and Europe — coordinated through the Port of Durrës.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "albania-hub-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "albania-hub-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Anchor className="mx-auto h-8 w-8 text-teal" />
            <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">The Port of Durrës</h2>
            <p className="mt-4 text-slate-body">
              Alpha Worldwide coordinates vehicle sourcing, shipping, port handling, unloading and documentation support through the Port of Durrës and assists customers throughout the import process.
            </p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where you can source from</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Origin Markets</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTRIES.map((c) => (
              <Link key={c.slug} to={c.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <h3 className="font-display text-xl font-bold text-navy">{c.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{c.hook}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What's covered</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Services for Albania Imports</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ALBANIA_SERVICES.map((s) => (
              <Link key={s.slug} to={s.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">
                  {s.slug === "airfreight"
                    ? "Available for urgent, high-value, or specialised vehicles — not a standard option for ordinary imports."
                    : s.body}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  {s.hasDedicatedPage ? "Learn more" : "Enquire"} <ArrowRight className="h-3.5 w-3.5" />
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
              Ready to Import to Albania?
            </h2>
            <p className="mt-5 text-white/70">
              Send us the vehicle link or lot number — we'll confirm feasibility and return an itemised quote to Durrës.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
