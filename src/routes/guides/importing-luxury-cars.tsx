import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FileText, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/importing-luxury-cars")({
  head: () => {
    const base = buildHead({
      title: "Importing Luxury Cars | Ferrari, Lamborghini, Bentley & More",
      description: "What to consider when importing a luxury or performance vehicle — Ferrari, Lamborghini, Bentley, Rolls-Royce, Porsche — insurance, inspection, enclosed transport, and COC.",
      path: "/guides/importing-luxury-cars",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Importing Luxury Cars", description: "A guide to importing luxury and performance vehicles internationally, covering insurance, inspection, enclosed transport, and conformity documentation.", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}/guides/importing-luxury-cars`, url: `${SITE_URL}/guides/importing-luxury-cars` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideLuxuryCars,
});

const BRANDS = ["Ferrari", "Lamborghini", "Bentley", "Rolls-Royce", "Porsche"];

const FAQS = [
  { q: "Do luxury and performance vehicles need special insurance during transit?", a: "Transit insurance is worth confirming explicitly for any high-value vehicle — coverage terms and valuation methods matter more at this price point, and we discuss options as part of coordinating your shipment." },
  { q: "Is enclosed transport necessary for every luxury vehicle?", a: "Not strictly necessary in every case, but many owners choose enclosed container shipping over open RoRo for added protection given the vehicle's value — the choice is yours to make based on your own risk tolerance." },
  { q: "Are Ferrari, Lamborghini, and similar brands harder to register abroad?", a: "Not inherently, but COC or equivalent conformity documentation and any modification disclosures matter more, since deviations from factory specification can affect registration in some jurisdictions. Requirements vary by destination and should be confirmed with the local authority." },
  { q: "Can you inspect a supercar before I buy it the same way as a standard vehicle?", a: "Where operationally possible, yes — the same principles apply (photos, video, technical check), though access can be more limited for rare or low-production vehicles depending on the seller." },
];

function GuideLuxuryCars() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'm importing a luxury vehicle and would like to discuss the process.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Importing Luxury Cars" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Luxury vehicle prepared for international transport" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="buying" readingTime="6 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Importing Luxury Cars</h1>
          <p className="mt-4 max-w-2xl text-white/75">What changes when the vehicle is a Ferrari, Lamborghini, Bentley, Rolls-Royce, or Porsche rather than a standard passenger car.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> the process is the same core steps — sourcing, inspection where possible, documentation, shipping, registration — but the stakes around transit insurance, transport method, and conformity documentation are higher given the vehicle's value and, sometimes, its factory specification.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Brands we regularly source</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {BRANDS.map((b) => <span key={b} className="rounded-full bg-card px-4 py-2 text-sm font-semibold text-navy shadow-card">{b}</span>)}
            </div>
            <p className="mt-4 text-sm text-slate-body">This isn't an exhaustive list — we work with other marques on request. Availability, sourcing route, and documentation needs are confirmed per vehicle.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Insurance during transit</h2></div>
              <p className="mt-3 text-slate-body">For a high-value vehicle, transit insurance terms and valuation methods are worth confirming explicitly rather than assuming a standard policy covers replacement value adequately. We discuss coverage options as part of coordinating your shipment.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Enclosed transport</h2>
              <p className="mt-3 text-slate-body">Many owners of high-value vehicles choose enclosed container shipping over open RoRo, purely for the added weather and handling protection — not because RoRo is unsafe, but because the margin for even minor cosmetic risk feels different at this price point.</p>
            </div>
            <div>
              <div className="flex items-center gap-2"><FileText className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">COC and conformity</h2></div>
              <p className="mt-3 text-slate-body">A Certificate of Conformity or equivalent documentation matters more here, since factory-spec deviations or aftermarket modifications can complicate registration in some destinations. See our <Link to="/guides/vehicle-import-documents" className="text-teal hover:underline">import documents guide</Link> for the general documentation landscape.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Customs and valuation</h2>
              <p className="mt-3 text-slate-body">Higher-value vehicles typically mean higher customs duties and taxes in absolute terms, calculated by the destination authority based on the vehicle's declared or assessed value — not by Alpha Worldwide.</p>
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
            <Link to="/import-uae" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Dubai sourcing</Link>
            <Link to="/container-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container shipping</Link>
            <Link to="/guides/vehicle-import-documents" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Import documents</Link>
            <Link to="/why-alpha-worldwide" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Why Alpha Worldwide</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Sourcing something special?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Tell us what you're looking for</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-luxury-cars" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-luxury-cars" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
