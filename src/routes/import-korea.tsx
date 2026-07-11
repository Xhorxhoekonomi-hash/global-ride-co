import { createFileRoute } from "@tanstack/react-router";
import { Gauge, ShieldCheck, FileText, DollarSign } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/import-korea")({
  head: () => buildHead({ title: "Import Car from South Korea to Albania | Encar", description: "Encar Korea car import specialists — source low-mileage vehicles from Encar and Autowini, shipped from Busan/Incheon to Durrës and Europe.", path: "/import-korea", image: heroImg }),
  component: ImportKorea,
});

const BENEFITS = [
  { icon: Gauge, text: "Low mileage" },
  { icon: ShieldCheck, text: "Clean accident history" },
  { icon: FileText, text: "Strong service records" },
  { icon: DollarSign, text: "Competitive pricing" },
];

const STEPS = [
  { n: 1, title: "Vehicle Selection", body: "You send a listing, or we present curated options from Encar, Autowini and KB Chachacha." },
  { n: 2, title: "Pre-Purchase Inspection", body: "Local partners verify condition, mileage and documents on the ground." },
  { n: 3, title: "Secure Purchase", body: "Full purchasing process handled — accurate paperwork and secure payment routes." },
  { n: 4, title: "Export & Shipping", body: "Shipped from Busan or Incheon to Durrës or European ports (RoRo or container)." },
  { n: 5, title: "Clearance & Delivery", body: "Import taxes, customs clearance and home delivery anywhere in the region." },
];

function ImportKorea() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Korean port and skyline" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import from · South Korea</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Import Quality Vehicles from South Korea
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Encar Korea car import specialists — source low-mileage, well-documented vehicles from Encar, Autowini and official dealer networks, with vehicle shipping to Durrës from Busan and Incheon.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-mist border-y border-border">
        <div className="container-page grid gap-6 py-10 md:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.text} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/15 text-teal">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-navy">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">5-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Seoul to Durrës</h2>
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
              Send Us an Encar or Autowini Link
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL — we'll verify the vehicle, negotiate the price, and return a delivered-price quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
