import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/car-import-glossary")({
  head: () => {
    const base = buildHead({
      title: "Car Import Glossary | Shipping & Auction Terms Explained",
      description: "Plain-language definitions of common vehicle import terms — Bill of Lading, COC, RoRo, FCL, LCL, demurrage, customs broker, Incoterms, salvage title, and more.",
      path: "/guides/car-import-glossary",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Car Import Glossary", description: "A glossary of common terms used in international vehicle sourcing, shipping, and customs.", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}/guides/car-import-glossary`, url: `${SITE_URL}/guides/car-import-glossary` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideGlossary,
});

const TERMS = [
  { term: "Auction Fee", def: "A fee charged by the auction platform on top of the winning bid, typically covering the platform's services." },
  { term: "Bill of Lading", def: "The shipping line's contract and receipt for cargo, used to release the vehicle at the destination port." },
  { term: "Buyer Fee", def: "A fee charged to the winning bidder, separate from the hammer price — see also Auction Fee." },
  { term: "Clean Title", def: "A title status indicating the vehicle has no recorded salvage, flood, or major-damage history." },
  { term: "COC (Certificate of Conformity)", def: "A manufacturer document confirming a vehicle meets certain technical standards, commonly requested for EU-area registration." },
  { term: "Customs Broker", def: "A licensed professional or firm that handles customs clearance paperwork on behalf of an importer." },
  { term: "Demurrage", def: "A charge applied when a container is held at the port terminal longer than its included free time." },
  { term: "Detention", def: "A charge applied when shipping equipment (like a container) is held outside the terminal longer than its free period." },
  { term: "FCL (Full Container Load)", def: "A container dedicated entirely to one shipper's cargo, as opposed to a shared container." },
  { term: "Flood (title/damage)", def: "A title or damage designation indicating the vehicle has sustained water damage, which can affect electronics and long-term reliability." },
  { term: "Freight Forwarder", def: "A company that arranges the logistics of shipping cargo, coordinating between carriers, ports, and customs." },
  { term: "Incoterms", def: "A standardized set of international trade terms defining which party is responsible for shipping costs and risk at each stage." },
  { term: "ISF (Importer Security Filing)", def: "A US customs requirement for certain ocean shipments, filed in advance of cargo arrival." },
  { term: "LCL (Less than Container Load)", def: "A shared container arrangement where a shipper's cargo occupies only part of a container, alongside other shipments." },
  { term: "MSO (Manufacturer's Statement of Origin)", def: "A document issued by the manufacturer for a new vehicle, used before the first title is issued." },
  { term: "Port Release", def: "Confirmation that cargo has been cleared and authorized for pickup or onward transport from the port." },
  { term: "Reserve Price", def: "The minimum price a seller will accept at auction — if bidding doesn't reach it, the vehicle may not sell." },
  { term: "RoRo (Roll-on/Roll-off)", def: "A shipping method where vehicles are driven onto and off the vessel under their own power, rather than loaded in a container." },
  { term: "Run & Drive", def: "An auction condition label indicating the vehicle started and moved under its own power during testing — not a mechanical guarantee." },
  { term: "Salvage (title)", def: "A title status indicating the vehicle was declared a total loss by an insurer, typically due to significant damage." },
  { term: "Title", def: "The legal document establishing ownership of a vehicle." },
  { term: "VIN", def: "Vehicle Identification Number — a unique code identifying a specific vehicle's manufacturer, model, and production details." },
];

const FAQS = [
  { q: "Are these terms used the same way across every auction platform and shipping line?", a: "Broadly yes for the core meaning, but exact usage and thresholds (like what qualifies as 'salvage') can vary by platform, insurer, or jurisdiction. We clarify specifics for your situation when they matter." },
  { q: "What's the difference between FCL and LCL?", a: "FCL (Full Container Load) means a container is dedicated to your cargo alone. LCL (Less than Container Load) means your cargo shares a container with other shipments — see our container vs RoRo guide for more on shipping method choices." },
  { q: "Does a clean title guarantee a vehicle has no problems?", a: "No — a clean title means no recorded salvage, flood, or major-damage designation, but it doesn't verify current mechanical condition. See our used-car checking guide for that." },
];

function GuideGlossary() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I came across a term I'd like explained for my import.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Import Glossary" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Reference glossary of vehicle import terms" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[40vh] flex-col justify-end py-24">
          <GuideMeta category="documentation" readingTime="7 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Car Import Glossary</h1>
          <p className="mt-4 max-w-2xl text-white/75">Plain-language definitions for the terms that come up most often across auctions, shipping, and customs.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">A–Z</h2></div>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {TERMS.map((t) => (
                <div key={t.term} className="p-5">
                  <div className="text-sm font-bold text-navy">{t.term}</div>
                  <p className="mt-1 text-sm text-slate-body">{t.def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Frequently asked</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {FAQS.map((f) => (<details key={f.q} className="group p-5"><summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p></details>))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14"><AuthorBox /></div>
      </section>

      <section className="section-mist">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/guides/vehicle-import-documents" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Import documents</Link>
            <Link to="/guides/container-vs-roro-car-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container vs RoRo</Link>
            <Link to="/guides/copart-vs-iaai" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Copart vs IAAI</Link>
            <Link to="/guides/car-shipping-costs-explained" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Shipping costs explained</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Still have a question?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Ask us directly</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-glossary" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-glossary" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
