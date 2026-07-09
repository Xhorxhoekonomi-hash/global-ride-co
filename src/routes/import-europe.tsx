import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-services.jpg";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/import-europe")({
  head: () => ({
    meta: [
      { title: "Import a Car from Europe to Albania — Cross-Border Vehicle Transport" },
      { name: "description", content: "Vehicle sourcing and cross-border transport from AutoScout24 listings and European dealers to Albania." },
      { property: "og:title", content: "Import from Europe" },
      { property: "og:description", content: "AutoScout24 sourcing and cross-border delivery to Albania." },
      { property: "og:url", content: "/import-europe" },
    ],
    links: [{ rel: "canonical", href: "/import-europe" }],
  }),
  component: ImportEurope,
});

const STEPS = [
  { n: 1, title: "Find a Vehicle", body: "Browse AutoScout24, a European dealer, or a private listing anywhere on the continent." },
  { n: 2, title: "Send Us the Link", body: "Share the listing. We confirm the vehicle and give you an all-in transport estimate." },
  { n: 3, title: "Inspection", body: "Optional independent inspection before purchase, wherever the vehicle is located." },
  { n: 4, title: "Purchase Handling", body: "We coordinate the purchase and paperwork directly with the seller or dealer." },
  { n: 5, title: "Cross-Border Transport", body: "Road transport or RoRo shipping, depending on origin country and distance." },
  { n: 6, title: "Delivery", body: "Final delivery to your door in Albania, Kosovo, or elsewhere in Europe." },
];

function ImportEurope() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle transport across Europe" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · Europe</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Cross-Border Vehicle Sourcing & Transport Across Europe
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Found a car on AutoScout24 or with a European dealer? We handle purchase coordination, transport, and delivery to Albania or Kosovo.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From anywhere in Europe to your driveway</h2>
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

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Send Us a European Listing
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share the link — we'll coordinate purchase, transport, and delivery to Albania or Kosovo.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
