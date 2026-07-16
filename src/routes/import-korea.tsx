import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Gauge, ShieldCheck, FileText, DollarSign, ArrowRight, ShoppingBag, MessageSquare, Camera, ClipboardCheck, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/import-korea")({
  head: () => {
    const base = buildHead({
      title: "Import a Car from South Korea | Alpha Worldwide",
      description: "Source, inspect, and ship a vehicle from South Korea — Encar, Autowini, and KB Chachacha sourcing, with shipping to Albania and across Europe.",
      path: "/import-korea",
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
            name: "Vehicle Sourcing and Shipping from South Korea",
            description: "Vehicle sourcing from Encar, Autowini, KB Chachacha and approved Korean dealers, with pre-purchase inspection, purchase assistance, and shipping to Albania and across Europe.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Belgium", "France"],
            url: `${SITE_URL}/import-korea`,
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
  component: ImportKorea,
});

const BENEFITS = [
  { icon: Gauge, text: "Low mileage" },
  { icon: ShieldCheck, text: "Clean accident history" },
  { icon: FileText, text: "Strong service records" },
  { icon: DollarSign, text: "Competitive pricing" },
];

const STEPS = [
  { n: 1, title: "Vehicle Selection", body: "You send a listing, or we present curated options from Encar, Autowini and KB Chachacha." },
  { n: 2, title: "Pre-Purchase Inspection", body: "Where eligible, a local inspection is arranged before you commit to buying." },
  { n: 3, title: "Secure Purchase", body: "Full purchasing process handled — accurate paperwork and secure payment routes." },
  { n: 4, title: "Export & Shipping", body: "Shipped from Busan or Incheon by RoRo or container to your destination port." },
  { n: 5, title: "Port Handling & Delivery", body: "We coordinate port handling and customs paperwork, and arrange delivery to your destination." },
];

const INSPECTION_CAPABILITIES = [
  "Exterior and interior condition review",
  "Engine and transmission observations",
  "Visible leak checks",
  "Painted-panel observations",
  "OBD diagnostic scan where accessible",
  "Photos and video",
  "Seller and vehicle-document review",
  "Noted defects and purchase recommendations",
];

const WE_HANDLE = [
  "Sourcing assistance and seller communication",
  "Pre-purchase inspection coordination (where eligible)",
  "Purchase and payment coordination",
  "Korean inland transport to the export port",
  "Export-document coordination",
  "RoRo or container shipping booking",
  "Port handling and customs-paperwork coordination at destination",
];

const YOU_PROVIDE = [
  "The vehicle listing, lot number, or your sourcing criteria",
  "Confirmation of your budget and preferred destination",
  "Any destination-specific import documents your country requires",
  "Timely responses during the purchase window (auctions and popular listings move fast)",
];

const DESTINATIONS = [
  { name: "Albania", body: "Delivered through the Port of Durrës.", to: "/en/albania" },
  { name: "Netherlands (via Rotterdam)", body: "A dedicated Rotterdam route, with onward delivery across Western Europe.", to: "/en/shipping/south-korea-to-rotterdam" },
  { name: "Germany, Belgium & France", body: "Reachable via our Rotterdam gateway route.", to: "/en/shipping/south-korea-to-rotterdam" },
  { name: "Wider Europe", body: "Additional European destinations — ask us for a route.", to: "/contact" },
];

const FAQS = [
  { q: "Which Korean platforms can you source from?", a: "We assist customers with vehicles listed through Encar, Autowini, KB Chachacha and approved Korean dealers." },
  { q: "Is the pre-purchase inspection free?", a: "Free pre-purchase inspection is available for eligible vehicles selected through Alpha Worldwide, subject to vehicle location, seller access and inspection availability." },
  { q: "What does the inspection actually check?", a: "Exterior and interior condition, engine and transmission observations, visible leaks, painted-panel observations, an OBD scan where accessible, photos and video, and a review of seller and vehicle documents. The inspection reflects the vehicle's visible and accessible condition at the time of inspection and does not guarantee the absence of hidden or future defects." },
  { q: "Where can you ship to?", a: "Albania, the Netherlands (via our dedicated Rotterdam route), Germany, Belgium, France, and other European destinations on request." },
  { q: "RoRo or container — which should I choose?", a: "RoRo is generally more economical and suits standard vehicles. Container shipping offers full enclosure and is better suited to higher-value or modified vehicles." },
  { q: "Do you handle customs clearance?", a: "We coordinate customs paperwork with licensed local agents at the destination port. Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide." },
];

function ImportKorea() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to source and ship a vehicle from South Korea.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Import From South Korea" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Korean port and skyline" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · South Korea</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Find, Inspect, and Ship a Vehicle from South Korea
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Source low-mileage, well-documented vehicles from Encar, Autowini, KB Chachacha, and approved Korean dealers — shipped to Albania and across Europe.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "import-korea-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Quote
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "import-korea-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist border-y border-border">
        <div className="container-page grid gap-6 py-10 md:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.text} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/15 text-teal">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-navy">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Sourcing</h2>
              <p className="mt-4 text-slate-body">
                We assist customers with vehicles listed through Encar, Autowini, KB Chachacha and approved Korean dealers. Send us a listing, or tell us what you're looking for and we'll present curated options.
              </p>
            </div>
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Purchase & Communication</h2>
              <p className="mt-4 text-slate-body">
                We handle seller communication, negotiation, and the purchase process directly, so language and platform familiarity are never a barrier to buying the right vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="grid h-11 w-11 mx-auto place-items-center rounded-lg bg-teal/10 text-teal">
              <Camera className="h-5 w-5" />
            </div>
            <h2 className="font-display mt-4 text-4xl font-bold text-navy md:text-5xl">Inspection & Reporting</h2>
            <p className="mt-4 text-slate-body">
              Free pre-purchase inspection is available for eligible vehicles selected through Alpha Worldwide, subject to vehicle location, seller access and inspection availability.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {INSPECTION_CAPABILITIES.map((c) => (
                <li key={c} className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{c}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-body">
              The inspection reflects the vehicle's visible and accessible condition at the time of inspection and does not guarantee the absence of hidden or future defects.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">5-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Korea to Your Door</h2>
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
        <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-24">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">What Alpha Worldwide Handles</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {WE_HANDLE.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">What You Provide</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {YOU_PROVIDE.map((i) => <li key={i} className="flex gap-2"><span className="text-navy/40">•</span>{i}</li>)}
            </ul>
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
              Send Us an Encar or Autowini Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL — we'll verify the vehicle, negotiate the price, and return a delivered-price quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
