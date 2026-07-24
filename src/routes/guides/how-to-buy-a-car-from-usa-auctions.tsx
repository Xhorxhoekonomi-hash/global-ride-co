import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/how-to-buy-a-car-from-usa-auctions")({
  head: () => {
    const base = buildHead({
      title: "How to Buy a Car From USA Auctions | Step-by-Step Guide",
      description: "A practical guide to buying a vehicle from Copart, IAAI, Manheim, or ADESA — platform access, condition information, bidding, fees, shipping, and the mistakes to avoid.",
      path: "/guides/how-to-buy-a-car-from-usa-auctions",
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
            headline: "How to Buy a Car From USA Auctions",
            description: "A practical guide to buying a vehicle from Copart, IAAI, Manheim, or ADESA, covering platform access, condition information, bidding, fees, and shipping.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/how-to-buy-a-car-from-usa-auctions`,
            url: `${SITE_URL}/guides/how-to-buy-a-car-from-usa-auctions`,
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
  component: GuideUsaAuctions,
});

const TOC = [
  { id: "choosing-platform", label: "Choosing a platform" },
  { id: "access", label: "Public vs dealer-only access" },
  { id: "condition-info", label: "Reading condition information" },
  { id: "inspection", label: "Pre-purchase inspection" },
  { id: "bidding", label: "Bidding and fees" },
  { id: "logistics", label: "Transport, loading, and export" },
  { id: "destination", label: "Destination clearance and registration" },
  { id: "mistakes", label: "Common mistakes" },
  { id: "checklist", label: "Final checklist" },
];

const FAQS = [
  { q: "Do I need to be a licensed dealer to bid on US auctions?", a: "Some auction lots are dealer-only, while others are open to the public or accessible through a broker. Access varies by platform and by listing — we confirm what's available for a specific vehicle before you commit." },
  { q: "Does a 'run and drive' label mean the car has no mechanical issues?", a: "No. It generally means the vehicle started and moved under its own power when tested, not that it's free of underlying problems. It's a starting point for evaluation, not a guarantee." },
  { q: "Can I see a vehicle in person before bidding?", a: "In-person viewing is sometimes possible depending on the auction yard's policy, but many buyers rely on photos, condition reports, and a coordinated inspection instead — availability depends on the seller and yard access." },
  { q: "What happens if I win a bid but the vehicle has undisclosed damage?", a: "Auction terms vary by platform and typically limit post-sale recourse. This is exactly why reviewing available condition information and coordinating inspection where possible matters before you bid, not after." },
];

function GuideUsaAuctions() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I've been reading about buying from US auctions and would like guidance on a specific vehicle.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "USA Auctions" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicles at a US auction yard" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Guide · Auctions</div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">How to Buy a Car From USA Auctions</h1>
          <p className="mt-4 max-w-2xl text-white/75">From choosing between Copart, IAAI, Manheim, and ADESA to the paperwork that follows a winning bid — the full process, including the parts most guides skip.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> buying from a US auction means choosing a platform, reviewing whatever condition information is available, bidding within a clear budget that includes fees, then coordinating inland transport, export documentation, and shipping. Auction descriptions are a starting point, not a mechanical warranty — that's the single most important thing to internalize before you bid.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-lg font-bold text-navy">In this guide</h2>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {TOC.map((t) => (
                <li key={t.id}><a href={`#${t.id}`} className="text-sm text-teal hover:underline">{t.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            <div id="choosing-platform">
              <h2 className="font-display text-2xl font-bold text-navy">Choosing a platform</h2>
              <p className="mt-3 text-slate-body">Copart and IAAI carry the widest range of salvage, insurance-total-loss, and run-and-drive vehicles, often at lower prices than dealer-focused platforms. Manheim and ADESA lean toward dealer and off-lease inventory with generally cleaner titles and more consistent condition. Neither category is universally "better" — it depends on whether you're prioritizing price, condition certainty, or vehicle variety. See our <Link to="/auction-access" className="text-teal hover:underline">comparison of auction access options</Link> for platform-level detail.</p>
            </div>

            <div id="access">
              <h2 className="font-display text-2xl font-bold text-navy">Public vs dealer-only access</h2>
              <p className="mt-3 text-slate-body">Some auction inventory is open to public bidders, while other lots are restricted to licensed dealers. Working through a broker is a common way to access dealer-only inventory without holding a dealer license yourself. Confirm access requirements for a specific listing before assuming you can bid on it directly.</p>
            </div>

            <div id="condition-info">
              <h2 className="font-display text-2xl font-bold text-navy">Reading condition information</h2>
              <p className="mt-3 text-slate-body">Auction listings typically include photos, a damage description, a title-status label (clean, salvage, rebuilt, etc.), and sometimes a "run and drive" indicator. These are useful starting points, but they're generated by the auction itself, not an independent inspector — treat them as a first filter, not a final answer on mechanical condition.</p>
            </div>

            <div id="inspection">
              <h2 className="font-display text-2xl font-bold text-navy">Pre-purchase inspection</h2>
              <p className="mt-3 text-slate-body">Where operationally possible, an independent inspection — checking the engine, transmission, OBD codes, structural integrity, and a test drive if the yard allows it — narrows the gap between the listing and reality. Availability depends on the seller and the auction yard's access policy, and it's never guaranteed for every lot. See our <Link to="/inspection-service" className="text-teal hover:underline">inspection service</Link> and our broader guide on <Link to="/guides/how-to-check-a-used-car-before-buying" className="text-teal hover:underline">checking a used car before buying</Link>.</p>
            </div>

            <div id="bidding">
              <h2 className="font-display text-2xl font-bold text-navy">Bidding and fees</h2>
              <p className="mt-3 text-slate-body">Set a maximum bid that already accounts for buyer fees, which auctions add on top of the hammer price. Fee structures vary by platform, membership tier, and vehicle value — confirm the actual fee schedule for your account type rather than assuming a flat percentage. Budgeting only for the bid price is one of the most common first-time mistakes.</p>
            </div>

            <div id="logistics">
              <h2 className="font-display text-2xl font-bold text-navy">Transport, loading, and export</h2>
              <p className="mt-3 text-slate-body">After a winning bid, the vehicle typically needs inland transport from the auction yard to a port or consolidation point, then loading — by container or, where operationally available, RoRo — and export documentation specific to the origin. See our <Link to="/guides/container-vs-roro-car-shipping" className="text-teal hover:underline">container vs RoRo comparison</Link> to understand which shipping method fits your vehicle and route.</p>
            </div>

            <div id="destination">
              <h2 className="font-display text-2xl font-bold text-navy">Destination clearance and registration</h2>
              <p className="mt-3 text-slate-body">On arrival, customs clearance and registration requirements depend entirely on the destination country and the vehicle itself. These are never guaranteed outcomes — requirements vary and should always be confirmed with the relevant local authority before you commit to a purchase. Our <Link to="/guides/vehicle-import-documents" className="text-teal hover:underline">import documents guide</Link> below covers the paperwork side in more depth.</p>
            </div>

            <div id="mistakes">
              <h2 className="font-display text-2xl font-bold text-navy">Common mistakes</h2>
              <div className="mt-4 space-y-3">
                {[
                  "Budgeting only for the hammer price, not buyer fees, inland transport, and shipping",
                  "Treating a 'run and drive' label as a mechanical guarantee",
                  "Skipping available inspection options to save time",
                  "Not confirming registration requirements at the destination before bidding",
                  "Bidding on multiple lots without a clear total-cost ceiling",
                ].map((m) => (
                  <div key={m} className="flex gap-2.5 text-sm text-slate-body"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{m}</div>
                ))}
              </div>
            </div>

            <div id="checklist">
              <h2 className="font-display text-2xl font-bold text-navy">Final checklist</h2>
              <div className="mt-4 space-y-3">
                {[
                  "Platform and access confirmed for the specific listing",
                  "Condition photos and title status reviewed",
                  "Inspection availability checked, and coordinated if possible",
                  "Maximum bid set to include buyer fees",
                  "Shipping method chosen based on vehicle condition and route",
                  "Destination registration requirements checked with the local authority",
                ].map((m) => (
                  <div key={m} className="flex gap-2.5 text-sm text-slate-body"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{m}</div>
                ))}
              </div>
            </div>
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
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/import-usa" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">USA sourcing</Link>
            <Link to="/inspection-service" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Inspection service</Link>
            <Link to="/guides/copart-vs-iaai" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Copart vs IAAI</Link>
            <Link to="/guides/vehicle-import-documents" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Import documents</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Have a listing in mind?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Send it to us before you bid</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-usa-auctions" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-usa-auctions" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
