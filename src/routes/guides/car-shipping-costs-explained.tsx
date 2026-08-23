import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, MessageCircle, DollarSign, Landmark, Package } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/car-shipping-costs-explained")({
  head: () => {
    const base = buildHead({
      title: "Car Shipping Costs Explained | What Affects the Total",
      description: "Every category that can affect the total cost of an international vehicle import — from purchase price and freight to customs duties and the costs people forget to budget for.",
      path: "/guides/car-shipping-costs-explained",
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
            headline: "Car Shipping Costs Explained",
            description: "An explanation of the cost categories involved in importing a vehicle internationally, separating logistics charges from destination taxes and optional costs.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/car-shipping-costs-explained`,
            url: `${SITE_URL}/guides/car-shipping-costs-explained`,
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
  component: GuideShippingCosts,
});

const LOGISTICS_COSTS = ["Vehicle purchase price", "Auction buyer fees", "Broker or service fees", "Inland transport to port", "Storage at the auction yard or terminal", "Loading (container or RoRo)", "Ocean freight (container or RoRo)", "Airfreight, where used", "Container consolidation costs (shared container)", "Vehicle-size or oversized-vehicle surcharges", "EV or hybrid handling considerations", "Export documentation preparation"];

const DESTINATION_COSTS = ["Port charges at arrival", "Unloading and terminal handling", "Customs duties", "VAT or equivalent destination tax", "Registration fees", "Homologation or conformity testing costs, where required"];

const VARIABLE_COSTS = ["Repairs identified after purchase or inspection", "Currency conversion movement between quote and payment", "Shipping schedule changes", "Demurrage (container held at port beyond free time)", "Detention (equipment held beyond the free period)", "Extended storage if collection is delayed"];

const FAQS = [
  { q: "Does your quote include customs duties and taxes?", a: "No — we separate our logistics service estimate from destination taxes and authority charges, since those are set independently by the customs and tax authority at your destination, not by us." },
  { q: "What's the biggest cost people forget to budget for?", a: "Demurrage and detention — charges that apply if a container or piece of shipping equipment is held at the port longer than the included free time. Prompt customs clearance and collection avoid these." },
  { q: "Can the shipping cost change after I get a quote?", a: "Freight rates and schedules can shift between quote and booking, and currency movement can affect the final figure. We confirm current numbers at the point of booking rather than treating an early estimate as locked in indefinitely." },
  { q: "Why does vehicle size affect the cost?", a: "Larger or oversized vehicles can require more container space, different loading equipment, or affect eligibility for a shared container — all of which factor into the logistics cost, separate from the vehicle's purchase price." },
];

function GuideShippingCosts() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like a full cost breakdown for importing a specific vehicle.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Shipping Costs Explained" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle import cost planning" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="shipping" readingTime="3 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Car Shipping Costs Explained</h1>
          <p className="mt-4 max-w-2xl text-white/75">Every category that can show up on an international vehicle import, split clearly by what we estimate versus what your destination authority sets.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> total cost breaks into three distinct categories — logistics charges we estimate directly (purchase, fees, freight), destination charges set independently by tax and customs authorities, and variable costs that depend on timing or circumstances. Confusing these categories is the most common source of budget surprises.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><Package className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Estimated logistics charges</h2></div>
            <p className="mt-2 text-sm text-slate-body">These are the costs we can estimate and quote directly, based on the vehicle, route, and shipping method.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {LOGISTICS_COSTS.map((c) => <div key={c} className="rounded-lg bg-card px-3 py-2 text-sm text-slate-body">{c}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><Landmark className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Destination taxes and authority charges</h2></div>
            <p className="mt-2 text-sm text-slate-body">These are set independently by the customs, tax, and registration authorities at your destination — not by Alpha Worldwide.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {DESTINATION_COSTS.map((c) => <div key={c} className="rounded-lg bg-mist px-3 py-2 text-sm text-slate-body">{c}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Variable and easy-to-miss costs</h2></div>
            <p className="mt-2 text-sm text-slate-body">These depend on timing, circumstances, or decisions made during the process — they're not automatic, but worth planning for.</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {VARIABLE_COSTS.map((c) => <div key={c} className="rounded-lg bg-card px-3 py-2 text-sm text-slate-body">{c}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Getting a real number</h2>
            <p className="mt-3 text-slate-body">The most reliable way to see logistics costs for your specific vehicle and route is our <Link to="/calculator" className="text-teal hover:underline">shipping calculator</Link> — it gives an itemized estimate rather than a single vague figure. For destination taxes and registration costs, we point you toward what to expect, but final numbers come from the local authority.</p>
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
            <Link to="/import-usa" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">USA import</Link>
            <Link to="/import-korea" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Korea import</Link>
            <Link to="/import-uae" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">UAE import</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Want an exact number?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Run your vehicle through the calculator</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-shipping-costs" })} className="btn-primary"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-shipping-costs" })} className="btn-outline-light"><MessageCircle className="h-4 w-4" /> Ask a Question</a>
          </div>
        </div>
      </section>
    </>
  );
}
