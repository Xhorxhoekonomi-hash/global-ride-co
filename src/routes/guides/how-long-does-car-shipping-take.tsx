import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Ship, Landmark, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/how-long-does-car-shipping-take")({
  head: () => {
    const base = buildHead({
      title: "How Long Does Car Shipping Take? | Stage-by-Stage Timeline",
      description: "A stage-by-stage look at what affects vehicle shipping timelines — from origin pickup through consolidation, sailing, and destination customs. Ranges, not promises.",
      path: "/guides/how-long-does-car-shipping-take",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "How Long Does Car Shipping Take?", description: "A stage-by-stage explanation of what affects international vehicle shipping timelines, from origin pickup through destination customs clearance.", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}/guides/how-long-does-car-shipping-take`, url: `${SITE_URL}/guides/how-long-does-car-shipping-take` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideShippingTime,
});

const STAGES = [
  { title: "Origin pickup and inland transport", body: "Getting the vehicle from the seller, auction yard, or dealer to a port or consolidation point — typically a matter of days, depending on distance and local logistics." },
  { title: "Consolidation and container loading", body: "For shared containers, this stage depends on when enough shipments are ready to fill a container — dedicated containers move faster since they don't wait on other cargo." },
  { title: "Port departure and sailing", body: "Ocean transit time depends entirely on the origin and destination ports and the shipping line's route — this is usually the single longest stage, and it varies significantly by trade lane." },
  { title: "Destination port arrival and unloading", body: "Once the vessel arrives, unloading and terminal handling typically take a few days before the vehicle is ready for customs processing." },
  { title: "Customs clearance", body: "This depends on the completeness of your documentation and the destination authority's processing time — well-prepared paperwork moves faster than incomplete submissions." },
  { title: "Final delivery or collection", body: "Once cleared, the vehicle is ready for collection or onward delivery — typically the shortest stage in the overall timeline." },
];

const FAQS = [
  { q: "Can you give me an exact delivery date when I book?", a: "No — we give a realistic estimated range based on the route and current schedules, but exact dates aren't guaranteed. Vessel schedules, port congestion, and customs processing can all shift the actual timeline." },
  { q: "Which stage usually takes the longest?", a: "Ocean sailing time is typically the single longest stage, though it varies significantly by trade lane — some routes are direct, others involve transshipment through an intermediate port." },
  { q: "Does a shared container take longer than a dedicated one?", a: "It can — a shared container sometimes waits for enough cargo to fill it before departing, while a dedicated container moves as soon as it's loaded and booked on a sailing." },
  { q: "What's the most common cause of unexpected delay?", a: "Incomplete or late documentation is one of the most common causes of delay at the customs-clearance stage — see our guide on common import mistakes for others." },
];

function GuideShippingTime() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like a realistic timeline estimate for shipping a vehicle.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Shipping Timelines" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle at port awaiting shipment" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="shipping" readingTime="5 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">How Long Does Car Shipping Take?</h1>
          <p className="mt-4 max-w-2xl text-white/75">A stage-by-stage look at what actually determines your timeline — in ranges, never as a fixed promise.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> total time depends on six stages — inland transport, consolidation, sailing, arrival, customs, and final delivery — each with its own variables. We give you a realistic estimated range once your route and shipping method are confirmed, not a guaranteed date.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">The six stages</h2></div>
            <div className="mt-6 space-y-5">
              {STAGES.map((s, i) => (
                <div key={s.title} className="flex gap-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-teal text-xs font-bold text-teal">{i + 1}</div>
                  <div>
                    <div className="text-sm font-semibold text-navy">{s.title}</div>
                    <p className="mt-1 text-sm text-slate-body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <div className="flex items-center gap-2"><Ship className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">Why we use ranges, not promises</h2></div>
              <p className="mt-3 text-slate-body">Vessel schedules can shift, port congestion happens, and customs processing time varies with documentation completeness and current authority workload. A single fixed number would be more reassuring to hear, but it wouldn't be honest — see our <Link to="/guides/container-vs-roro-car-shipping" className="text-teal hover:underline">container vs RoRo guide</Link> for how the shipping method itself affects the timeline.</p>
            </div>
            <div>
              <div className="flex items-center gap-2"><Landmark className="h-5 w-5 text-teal" /><h2 className="font-display text-2xl font-bold text-navy">What you can control</h2></div>
              <p className="mt-3 text-slate-body">The stages most within your control are having complete documentation ready in advance and choosing a dedicated container if timeline certainty matters more to you than the shared-container cost saving. See our <Link to="/guides/vehicle-import-documents" className="text-teal hover:underline">import documents guide</Link> to prepare ahead.</p>
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
            <Link to="/container-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container shipping</Link>
            <Link to="/roro-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">RoRo shipping</Link>
            <Link to="/guides/container-vs-roro-car-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container vs RoRo</Link>
            <Link to="/guides/vehicle-import-documents" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Import documents</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Want a realistic estimate?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Tell us your route</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-shipping-timeline" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-shipping-timeline" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
