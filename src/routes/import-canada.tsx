import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-home.jpg";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/import-canada")({
  head: () => ({
    meta: [
      { title: "Import a Car from Canada to Albania & Europe" },
      { name: "description", content: "Vehicle sourcing, inspection, and shipping from Canadian auctions and dealers to Albania and Europe." },
      { property: "og:title", content: "Import from Canada" },
      { property: "og:description", content: "Sourcing, inspection, and shipping from Canada to Durrës, Albania and Europe." },
      { property: "og:url", content: "/import-canada" },
    ],
    links: [{ rel: "canonical", href: "/import-canada" }],
  }),
  component: ImportCanada,
});

const STEPS = [
  { n: 1, title: "Find a Vehicle", body: "Choose a car from a Canadian auction, dealer, or private listing, or ask us to source one." },
  { n: 2, title: "Send Us the Link", body: "Share the listing or lot number. We confirm feasibility and give you an all-in estimate." },
  { n: 3, title: "Inspection", body: "Photos, video, OBD scan, and a full condition report before you commit to buying." },
  { n: 4, title: "Purchase", body: "We handle the purchase or bidding process securely on your behalf." },
  { n: 5, title: "Export & Ocean Shipping", body: "Inland transport to the nearest export port, then container or RoRo shipping across the Atlantic." },
  { n: 6, title: "Customs & Delivery", body: "Full customs clearance at Durrës and final delivery anywhere in Albania or Europe." },
];

function ImportCanada() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle export from Canada" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · Canada</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Sourcing & Shipping from Canada to Albania & Europe
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              We source, inspect, purchase, and ship vehicles from auctions and dealers across Canada — fully managed to your door in Albania or Europe.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Canada to your driveway</h2>
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
              Send Us a Vehicle Link from Canada
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL or lot number — we'll handle inspection, purchase, export, and shipping to your destination.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
