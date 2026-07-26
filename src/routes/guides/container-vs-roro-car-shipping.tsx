import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Truck, MessageCircle, Calculator, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/container-vs-roro-car-shipping")({
  head: () => {
    const base = buildHead({
      title: "Container vs RoRo Car Shipping: Which Fits Your Vehicle",
      description: "How shared and full container shipping compare to RoRo — cost, vehicle condition requirements, schedule differences, and how to decide between them.",
      path: "/guides/container-vs-roro-car-shipping",
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
            headline: "Container vs RoRo Car Shipping",
            description: "A comparison of container and RoRo car shipping methods, covering cost, vehicle condition, schedule, and route factors.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/container-vs-roro-car-shipping`,
            url: `${SITE_URL}/guides/container-vs-roro-car-shipping`,
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
  component: GuideContainerVsRoro,
});

const FACTORS = [
  { label: "Vehicle condition", body: "RoRo generally requires the vehicle to roll, steer, and brake under its own power. Container shipping can accommodate non-running or heavily modified vehicles." },
  { label: "Protection", body: "Container shipping shields the vehicle from weather and handling exposure throughout transit. RoRo vehicles are exposed on open decks." },
  { label: "Route and port availability", body: "Not every route has a RoRo service — availability depends on the shipping line and the specific origin-destination pair." },
  { label: "Cost", body: "RoRo is often more economical for standard, running vehicles, though the actual difference depends on the route and current freight rates, not a fixed rule." },
  { label: "Schedule", body: "RoRo vessels often run on more frequent, fixed schedules on covered routes; container sailings depend on the shipping line's rotation." },
  { label: "Value and modifications", body: "High-value or heavily modified vehicles are frequently shipped by container for the added protection and reduced handling." },
];

const FAQS = [
  { q: "Can a non-running vehicle be shipped RoRo?", a: "Generally no — RoRo typically requires the vehicle to be driven onto and off the vessel under its own power. A non-running vehicle is usually better suited to container shipping." },
  { q: "Is container shipping always more expensive than RoRo?", a: "Not always — the actual cost gap depends on the route, current freight rates, and whether you're using a shared or dedicated container. We compare both options for your specific route rather than assuming one is cheaper." },
  { q: "Can I ship personal belongings inside the vehicle?", a: "This depends on the shipping line, the destination customs authority, and the shipping method — restrictions vary and we confirm what's allowed for your specific shipment before loading." },
  { q: "Are electric vehicles restricted on certain shipping methods?", a: "Some shipping lines apply additional requirements or restrictions to EVs due to battery-related cargo classifications. We check current restrictions for your specific vehicle and route before booking." },
];

function GuideContainerVsRoro() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like help deciding between container and RoRo shipping for my vehicle.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Container vs RoRo" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle being loaded for international shipping" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Guide · Shipping</div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Container vs RoRo Car Shipping</h1>
          <p className="mt-4 max-w-2xl text-white/75">Neither method is universally better — the right choice depends on your vehicle's condition, value, route, and priorities.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> RoRo (Roll-on/Roll-off) is often the simpler, more economical option for a standard, functional vehicle on a route where it's available. Container shipping — shared or dedicated — is the better fit for non-running vehicles, high-value cars, heavy modifications, or routes without RoRo service.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <Ship className="h-6 w-6 text-teal" />
              <h2 className="font-display mt-3 text-xl font-bold text-navy">Container shipping</h2>
              <p className="mt-3 text-sm text-slate-body">A shared container splits space (and cost) with other shipments; a full container is dedicated to your vehicle alone, with more control over loading and schedule. The vehicle is fully enclosed for the ocean crossing, which limits weather and handling exposure. Personal belongings are typically restricted by customs and shipping-line policy — we confirm what's allowed before loading.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <Truck className="h-6 w-6 text-teal" />
              <h2 className="font-display mt-3 text-xl font-bold text-navy">RoRo shipping</h2>
              <p className="mt-3 text-sm text-slate-body">The vehicle is driven onto the vessel via a ramp and secured on an open or covered deck — it needs to roll, steer, and brake under its own power. RoRo is often faster to load and unload, and can be more economical, but the vehicle is exposed to the elements during transit and RoRo service isn't available on every route.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Factors that actually decide it</h2>
            <div className="mt-6 space-y-5">
              {FACTORS.map((f) => (
                <div key={f.label} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <div>
                    <div className="text-sm font-semibold text-navy">{f.label}</div>
                    <p className="mt-0.5 text-sm text-slate-body">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">When airfreight enters the conversation</h2>
            <p className="mt-3 text-slate-body">For genuinely urgent timelines or exceptionally high-value vehicles, <Link to="/airfreight" className="text-teal hover:underline">airfreight</Link> is a third option worth considering — at a materially higher cost than either sea-freight method. It's the exception rather than the default for most imports.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
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

      <section className="section-mist">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/container-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Container shipping</Link>
            <Link to="/roro-shipping" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">RoRo shipping</Link>
            <Link to="/airfreight" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Airfreight</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Not sure which fits your vehicle?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Tell us the vehicle and route</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-container-vs-roro" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Ask on WhatsApp</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-container-vs-roro" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
