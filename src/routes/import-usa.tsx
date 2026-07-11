import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";

export const Route = createFileRoute("/import-usa")({
  head: () => buildHead({ title: "Import Car from USA to Albania | Copart & IAAI", description: "Import a car from USA to Albania — licensed Copart Albania broker and IAAI Albania broker handling bidding, shipping, customs and delivery.", path: "/import-usa", image: heroImg }),
  component: ImportUSA,
});

const STEPS = [
  { n: 1, title: "Vehicle Search", body: "You choose the car, or we help select the best fit based on preferences and budget." },
  { n: 2, title: "Vehicle Verification", body: "Title status, accident history, mechanical condition and service records — verified before purchase." },
  { n: 3, title: "Bidding and Purchase", body: "Licensed US agents handle bidding and payments securely on your behalf." },
  { n: 4, title: "Domestic Transport", body: "Vehicle moved to the nearest US port (New York, Houston, Los Angeles or Savannah)." },
  { n: 5, title: "International Shipping", body: "Container or RoRo to Durrës, or ports in Germany, Belgium, and Italy." },
  { n: 6, title: "Import Processing", body: "Customs clearance, port handling and delivery anywhere in Albania or Europe." },
];

function ImportUSA() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="US port with vehicles" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · USA</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Import Vehicles from USA Auctions to Albania & Europe
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              We provide full access to major US auto auctions and dealer networks, including Copart, IAAI, Manheim and authorized dealerships.
            </p>
          </div>
        </div>
      </section>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From US listing to your driveway</h2>
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
              Send Us Your Lot Number or Vehicle Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a Copart or IAAI lot, a Manheim listing, or a dealer URL. We'll return a full delivered-price quote within one business day.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
