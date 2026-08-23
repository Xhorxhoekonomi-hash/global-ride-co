import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Calculator, AlertTriangle } from "lucide-react";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/vehicle-import-documents")({
  head: () => {
    const base = buildHead({
      title: "Vehicle Import Documents Explained | Bill of Lading, COC & More",
      description: "What common vehicle import documents actually do — purchase invoice, bill of lading, export certificate, COC, and more — and why requirements vary by destination.",
      path: "/guides/vehicle-import-documents",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Vehicle Import Documents Explained",
            description: "An explanation of common documents used in international vehicle transport, including purchase, export, shipping, and registration paperwork.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/vehicle-import-documents`,
            url: `${SITE_URL}/guides/vehicle-import-documents`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: GuideImportDocuments,
});

const DOC_GROUPS = [
  {
    title: "Purchase documents",
    items: [
      { name: "Purchase invoice / bill of sale", body: "Confirms the price paid and the parties involved in the transaction." },
      { name: "Auction invoice", body: "Issued by the auction platform, itemizing the hammer price and buyer fees." },
      { name: "Vehicle title", body: "Proof of ownership from the seller, showing title status (clean, salvage, rebuilt, etc.)." },
    ],
  },
  {
    title: "Export documents",
    items: [
      { name: "Registration certificate", body: "The origin-country registration document, often required to process export deregistration." },
      { name: "Export certificate", body: "Confirms the vehicle has been cleared to leave the origin country." },
      { name: "Certificate of Conformity (COC)", body: "A manufacturer document confirming the vehicle meets certain technical standards — commonly requested for EU-area registration." },
      { name: "Manufacturer data sheet", body: "An alternative to a COC in some cases, providing similar technical specification data." },
    ],
  },
  {
    title: "Shipping documents",
    items: [
      { name: "Bill of lading / sea waybill", body: "The shipping line's contract and receipt for the cargo, used to release the vehicle at destination." },
      { name: "Telex release", body: "An electronic release instruction that can speed up cargo collection instead of waiting for an original paper bill of lading." },
      { name: "Packing list", body: "Details what's being shipped, relevant mainly when a vehicle ships alongside other cargo in a container." },
    ],
  },
  {
    title: "Customs & destination documents",
    items: [
      { name: "Customs declaration", body: "Filed with the destination customs authority to formally declare the import." },
      { name: "Transit document", body: "Used when a shipment moves through an intermediate country before reaching final destination." },
      { name: "Carnet de Passage", body: "An international customs document sometimes used for temporary vehicle importation, relevant in specific circumstances." },
      { name: "Insurance documents", body: "Coverage documentation for the vehicle during transit or after arrival, depending on the policy." },
      { name: "Power of attorney", body: "Sometimes required to authorize an agent to handle customs or registration steps on your behalf." },
      { name: "Certified translations", body: "Some destination authorities require official document translations — requirements vary by country." },
    ],
  },
];

const FAQS = [
  { q: "Is this list the complete set of documents I'll need?", a: "No — this is an overview of commonly encountered documents. Actual requirements depend on the origin country, destination country, the specific vehicle, the shipping method, and the local customs and registration procedure. We confirm the exact document set for your specific import." },
  { q: "Do I need a COC for every destination?", a: "No — COC requirements are most relevant for EU-area registration and vary by country and vehicle type. Some destinations use different conformity documentation entirely." },
  { q: "What is a telex release, and do I always get one?", a: "A telex release is an electronic instruction that lets you collect cargo without waiting for the original paper bill of lading to arrive by mail. Whether it's used depends on the shipping line and the specific shipment arrangement." },
  { q: "Can Alpha Worldwide prepare all of this documentation for me?", a: "We coordinate the documentation relevant to sourcing, export, and shipping directly. For destination-specific registration steps, we point you to what's typically needed, but final confirmation always sits with the local registration or customs authority." },
];

function GuideImportDocuments() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like to understand which documents I'll need for my import.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Import Documents" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle import paperwork and documentation" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="documentation" readingTime="3 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Vehicle Import Documents Explained</h1>
          <p className="mt-4 max-w-2xl text-white/75">What each document actually does — from purchase invoice to customs declaration — in plain language.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> an international vehicle import typically involves purchase documents, export paperwork from the origin country, shipping documents from the carrier, and customs or registration documents at the destination. The exact combination depends on your origin, destination, vehicle, and shipping method — there's no single universal list.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {DOC_GROUPS.map((g) => (
              <div key={g.title}>
                <h2 className="font-display text-xl font-bold text-navy">{g.title}</h2>
                <div className="mt-4 space-y-4">
                  {g.items.map((item) => (
                    <div key={item.name} className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-semibold text-navy">{item.name}</div>
                      <p className="mt-1 text-sm text-slate-body">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display flex items-center gap-2 text-2xl font-bold text-navy"><AlertTriangle className="h-5 w-5 text-teal" /> Requirements genuinely vary</h2>
            <p className="mt-3 text-slate-body">This list is not universal or legally exhaustive. What you actually need depends on the origin country, the destination country, the specific vehicle, the shipping method, and the local customs and registration procedure that applies. We're not a law firm or tax advisor — for anything with legal or tax implications, confirm directly with the relevant authority. See our <Link to="/how-it-works" className="text-teal hover:underline">full process overview</Link> for how documentation fits into the bigger picture.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Frequently asked</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {FAQS.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14"><AuthorBox /></div>
      </section>
      <section className="bg-background">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/how-it-works" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">How it works</Link>
            <Link to="/faq" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">FAQ hub</Link>
            <Link to="/import-netherlands" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Netherlands import guide</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Not sure what you'll need?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Tell us your route and vehicle</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-import-documents" })} className="btn-primary"><FileText className="h-4 w-4" /> Ask About Documents</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-import-documents" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
