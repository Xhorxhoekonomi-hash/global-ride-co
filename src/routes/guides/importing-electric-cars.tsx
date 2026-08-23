import { createFileRoute, Link } from "@tanstack/react-router";
import { Battery, ShieldAlert, Ship, MessageCircle, Calculator, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/importing-electric-cars")({
  head: () => {
    const base = buildHead({
      title: "Importing Electric Cars | Battery Rules, Shipping & Inspection",
      description: "What's different about importing an electric vehicle — battery-related shipping regulations, RoRo restrictions, container recommendations, and common myths addressed.",
      path: "/guides/importing-electric-cars",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Importing Electric Cars", description: "A guide to importing electric vehicles internationally, covering battery shipping regulations, RoRo restrictions, and container recommendations.", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}/guides/importing-electric-cars`, url: `${SITE_URL}/guides/importing-electric-cars` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideElectricCars,
});

const FAQS = [
  { q: "Are EVs banned from RoRo shipping?", a: "Not universally — but some shipping lines apply additional battery-related restrictions or documentation requirements to EVs on certain routes. We confirm current restrictions for your specific vehicle before booking." },
  { q: "Does the vehicle charge while it's on the ship?", a: "No — this is a common myth. Vehicles are not connected to power during ocean transit, whether by container or RoRo. The battery's state of charge at loading is what it arrives with." },
  { q: "Should the battery be at a specific charge level for shipping?", a: "Many carriers prefer a partial state of charge (well below full and well above empty) for lithium-ion battery safety during transit. Exact requirements vary by shipping line — we confirm this before your vehicle is loaded." },
  { q: "Can an EV be inspected the same way as a combustion vehicle?", a: "Largely yes for bodywork, interior, and general condition, but battery health and range are separate considerations that a standard visual inspection can't fully verify — availability of battery-specific diagnostics depends on the seller and location." },
];

function GuideElectricCars() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'm importing an electric vehicle and have questions about shipping.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Importing Electric Cars" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Electric vehicle prepared for international shipping" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="shipping" readingTime="6 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Importing Electric Cars</h1>
          <p className="mt-4 max-w-2xl text-white/75">What actually changes when the vehicle you're importing runs on a battery instead of an engine.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> most of the import process is the same as for any vehicle — sourcing, inspection where possible, documentation, shipping. The differences are battery-specific: some shipping lines apply additional documentation or restrictions for lithium-ion cargo, and RoRo availability can be more route-dependent than for combustion vehicles.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <div className="flex items-center gap-2"><Battery className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Battery-related shipping regulations</h2></div>
              <p className="mt-3 text-slate-body">Lithium-ion batteries are classified as a cargo type that some shipping lines and ports handle under specific documentation and handling rules. This doesn't mean EVs can't ship — it means the paperwork and, in some cases, the carrier selection needs to account for it. We confirm the current requirements for your specific vehicle and route before booking, rather than assuming last year's rules still apply.</p>
            </div>
            <div>
              <div className="flex items-center gap-2"><Ship className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">RoRo restrictions</h2></div>
              <p className="mt-3 text-slate-body">Not every RoRo service accepts EVs on every route — some carriers restrict battery-electric cargo on certain vessels or lanes. Where RoRo isn't available or suitable, <Link to="/container-shipping" className="text-teal hover:underline">container shipping</Link> remains a reliable option. See our broader <Link to="/guides/container-vs-roro-car-shipping" className="text-teal hover:underline">container vs RoRo comparison</Link> for the general tradeoffs.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Container recommendations</h2>
              <p className="mt-3 text-slate-body">Container shipping is often the more flexible route for EVs precisely because it sidesteps some RoRo-specific battery restrictions, while also giving the vehicle full protection from the elements during transit.</p>
            </div>
            <div>
              <div className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Common myths</h2></div>
              <div className="mt-3 space-y-2">
                {[
                  "\"The car charges itself during the voyage.\" It doesn't — there's no power connection during ocean transit.",
                  "\"EVs can't be shipped at all.\" They can, though some routes and carriers apply additional requirements.",
                  "\"Battery health can always be fully verified before purchase.\" Availability of battery-specific diagnostics depends on the seller and location, same as any other inspection limitation.",
                ].map((m) => <div key={m} className="flex gap-2.5 text-sm text-slate-body"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{m}</div>)}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Inspection considerations</h2>
              <p className="mt-3 text-slate-body">General condition, bodywork, and interior can be assessed the same way as any vehicle. Battery state of health and remaining range are separate, more specialized checks — where operationally possible, we factor this into inspection coordination, but availability depends on the seller and access to the vehicle.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Frequently asked</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {FAQS.map((f) => (<details key={f.q} className="group p-5"><summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p></details>))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-12 md:py-14"><AuthorBox /></div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/container-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container shipping</Link>
            <Link to="/roro-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">RoRo shipping</Link>
            <Link to="/guides/container-vs-roro-car-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container vs RoRo</Link>
            <Link to="/guides/how-to-check-a-used-car-before-buying" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Checking a used car</Link>
            <Link to="/guides/car-shipping-costs-explained" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Shipping costs explained</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Importing an EV?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Tell us the make and model</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-electric-cars" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-electric-cars" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
