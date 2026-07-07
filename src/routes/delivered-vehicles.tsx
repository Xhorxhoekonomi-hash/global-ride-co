import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { VEHICLES, type Vehicle } from "@/lib/site-data";

export const Route = createFileRoute("/delivered-vehicles")({
  head: () => ({
    meta: [
      { title: "Delivered Vehicles | Alpha Worldwide Albania" },
      { name: "description", content: "Browse real vehicles sourced, inspected, and shipped by Alpha Worldwide — from Rolls Royce to Ferrari to Porsche." },
      { property: "og:title", content: "Delivered Vehicles" },
      { property: "og:description", content: "Real cars sourced, shipped and delivered by Alpha Worldwide Albania." },
      { property: "og:url", content: "/delivered-vehicles" },
    ],
    links: [{ rel: "canonical", href: "/delivered-vehicles" }],
  }),
  component: DeliveredVehicles,
});

const ORIGINS = ["All", "USA", "Korea", "UAE", "Canada", "Europe"] as const;
const CATEGORIES = ["All", "Luxury", "SUV", "Sports Car", "EV", "Dealer Stock"] as const;

function DeliveredVehicles() {
  const [origin, setOrigin] = useState<(typeof ORIGINS)[number]>("All");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo<Vehicle[]>(
    () =>
      VEHICLES.filter((v) => {
        const okO = origin === "All" || v.origin === origin;
        const okC = category === "All" || v.category === category;
        return okO && okC;
      }),
    [origin, category],
  );

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Delivered luxury vehicles" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Real deliveries</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Delivered Vehicles
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Real vehicles sourced, inspected, and shipped by Alpha Worldwide Albania — from luxury SUVs to supercars.
            </p>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-b border-border bg-mist">
        <div className="container-page flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <FilterGroup label="Origin" options={ORIGINS} value={origin} onChange={setOrigin} />
          <FilterGroup label="Category" options={CATEGORIES} value={category} onChange={setCategory} />
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-12 text-center text-slate-body">
              No deliveries match those filters yet — try widening your selection.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((v) => (
                <article key={v.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1">
                  <div className="aspect-[4/3] overflow-hidden bg-mist">
                    <img src={v.image} alt={`${v.year} ${v.name}`} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                      {v.origin} → {v.destination}
                    </div>
                    <h3 className="font-display mt-2 text-lg font-bold text-navy">{v.year} {v.name}</h3>
                    <p className="mt-2 text-sm text-slate-body">{v.caption}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {v.services.map((s) => (
                        <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">{s}</span>
                      ))}
                    </div>
                    <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-teal">
                      Request Similar Shipment <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="section-dark">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="font-display max-w-3xl text-3xl font-bold text-white md:text-5xl">
            One Broker. Zero Stress. Moving Cars Worldwide.
          </h2>
          <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === o
              ? "bg-navy text-white"
              : "border border-border bg-background text-navy hover:border-teal hover:text-teal"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
