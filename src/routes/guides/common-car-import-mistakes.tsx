import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/common-car-import-mistakes")({
  head: () => {
    const base = buildHead({
      title: "Common Car Import Mistakes | What to Avoid",
      description: "The most common mistakes buyers make when importing a vehicle — missing documents, buying unseen, fake sellers, customs misconceptions, storage charges, and more.",
      path: "/guides/common-car-import-mistakes",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Common Car Import Mistakes", description: "An overview of the most common mistakes buyers make when importing a vehicle internationally, and how to avoid them.", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}/guides/common-car-import-mistakes`, url: `${SITE_URL}/guides/common-car-import-mistakes` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideCommonMistakes,
});

const MISTAKES = [
  { title: "Missing or incomplete documents", body: "Incomplete paperwork is one of the most common causes of delay at customs. Confirm the document set for your specific route before the vehicle ships, not after it arrives." },
  { title: "Buying a vehicle you've never seen inspected", body: "Relying solely on seller-provided photos, without any independent verification, is a common source of post-purchase disappointment. Where operationally possible, coordinate an inspection first." },
  { title: "Dealing with unverified or fake sellers", body: "Verify the seller and the platform before sending payment — legitimate auctions and dealers have traceable listings and payment processes; be cautious of deals that pressure fast, untraceable payment." },
  { title: "Incorrect customs assumptions", body: "Assuming your destination's customs duties, VAT, or registration process will mirror another country's is a common and costly mistake. Requirements vary — confirm with your destination's authority directly." },
  { title: "Not budgeting for storage charges", body: "Free storage windows at ports and auction yards are time-limited. Delayed collection or customs clearance can trigger daily storage fees that add up quickly." },
  { title: "VIN mismatch between documents and vehicle", body: "Before finalizing a purchase, confirm the VIN on the title, invoice, and physical vehicle all match — a mismatch can cause serious registration problems at the destination." },
  { title: "Late payments holding up the process", body: "Payment delays at any stage — purchase, freight, or customs duties — can stall the entire shipment and, in some cases, trigger additional storage or demurrage charges." },
];

const FAQS = [
  { q: "What's the single most costly mistake buyers make?", a: "Buying a vehicle without any inspection or condition verification is often the most costly, since mechanical issues discovered after purchase can far exceed the price of coordinating an inspection beforehand." },
  { q: "How can I tell if a seller is legitimate?", a: "Look for a traceable listing history, a real business address or verified auction account, and a standard, traceable payment process. Pressure for fast, untraceable payment is a red flag." },
  { q: "Can incorrect customs assumptions really delay my shipment significantly?", a: "Yes — if your documentation or expectations don't match your destination's actual requirements, customs clearance can be delayed substantially while the discrepancy is resolved." },
  { q: "How do I avoid unexpected storage charges?", a: "Plan collection and customs clearance promptly once your vehicle arrives, and confirm the free-time windows for both the port and any auction yard involved before your vehicle even ships." },
];

function GuideCommonMistakes() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like guidance to avoid common mistakes on my vehicle import.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Common Import Mistakes" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle import paperwork and planning" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="buying" readingTime="6 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Common Car Import Mistakes</h1>
          <p className="mt-4 max-w-2xl text-white/75">The mistakes that cost buyers the most time and money — and how to avoid each one.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> most costly import mistakes trace back to skipping verification steps — of the vehicle, the seller, the documentation, or the destination's actual requirements — to save time upfront. Each one is avoidable with a bit of planning before you commit to a purchase.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">The seven mistakes</h2></div>
            <div className="mt-6 space-y-5">
              {MISTAKES.map((m) => (
                <div key={m.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="text-sm font-semibold text-navy">{m.title}</div>
                  <p className="mt-1.5 text-sm text-slate-body">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">How to avoid most of these</h2>
            <p className="mt-3 text-slate-body">Verify the seller, review available condition information, coordinate inspection where possible (see our <Link to="/guides/how-to-check-a-used-car-before-buying" className="text-teal hover:underline">used-car checking guide</Link>), confirm document requirements before shipping (see our <Link to="/guides/vehicle-import-documents" className="text-teal hover:underline">import documents guide</Link>), and budget realistically using our <Link to="/guides/car-shipping-costs-explained" className="text-teal hover:underline">shipping costs guide</Link>. Most of these mistakes share the same root cause — moving fast without confirming the details first.</p>
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
            <Link to="/guides/how-to-check-a-used-car-before-buying" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Checking a used car</Link>
            <Link to="/guides/vehicle-import-documents" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Import documents</Link>
            <Link to="/guides/car-shipping-costs-explained" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Shipping costs explained</Link>
            <Link to="/inspection-service" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Inspection service</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Want a second opinion?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Send us the listing before you commit</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-common-mistakes" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-common-mistakes" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
