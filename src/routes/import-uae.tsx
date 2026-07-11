import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/import-uae")({
  head: () => buildHead({ title: "Import Car from Dubai/UAE to Albania & Europe", description: "Dubai car export to Albania — vehicle sourcing from Dubizzle and Emirates Auction, RTA export and UAE car shipping to Europe.", path: "/import-uae", image: heroImg }),
  component: ImportUAE,
});

const STEPS = [
  { n: 1, title: "Vehicle Search", body: "Choose your car, or send listings from Emirates Auction or Dubizzle." },
  { n: 2, title: "Vehicle Inspection", body: "Ownership, chassis number, accident history and condition — verified on the ground." },
  { n: 3, title: "Purchase Handling", body: "Our UAE team negotiates and finalizes the purchase on your behalf." },
  { n: 4, title: "Export Documentation", body: "RTA clearance, deregistration and full export paperwork handled in Dubai." },
  { n: 5, title: "Shipping to Europe", body: "Direct shipping to Albania, Italy, Germany or other EU destination ports." },
  { n: 6, title: "Import & Delivery", body: "Customs, port taxes, unloading and final delivery to your door." },
];

function ImportUAE() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Dubai skyline with luxury vehicle" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · UAE</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Vehicle Sourcing & Shipping from Dubai, Abu Dhabi & Sharjah
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Dubai car export to Albania and UAE car shipping to Europe — sourcing from Dubizzle, Emirates Auction and official dealerships in Dubai, Abu Dhabi and Sharjah, cleared and delivered end-to-end.
            </p>
            <a
              href={`tel:${CONTACT.uae.replace(/\s/g, "")}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-teal-glow" /> UAE Office: {CONTACT.uae}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Dubai to your driveway</h2>
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
              Send Us a Dubizzle or Emirates Auction Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL — our Dubai team handles inspection, negotiation, RTA export and shipping to your destination.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
