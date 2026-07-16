import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, MessageCircle, FileText, CalendarCheck, Calculator, MapPin, Globe2 } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import { buildHead } from "@/lib/seo";
import { TrustStats } from "@/components/site/TrustStats";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { VEHICLES, COUNTRIES, OFFICES, SERVICES, CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/")({
  head: () =>
    buildHead({
      title: "International Vehicle Shipping & Import | Alpha Worldwide",
      description: "Source, inspect, and ship vehicles worldwide from the USA, South Korea, UAE, and Canada to Albania and across Europe. Dubai headquarters, Durrës operations.",
      path: "/",
      image: heroImg,
    }),
  component: Home_,
});

const DESTINATIONS = [
  { name: "Albania", to: "/en/albania" },
  { name: "Netherlands", to: "/en/netherlands" },
  { name: "Germany", to: "/contact" },
  { name: "Belgium", to: "/contact" },
  { name: "France", to: "/contact" },
  { name: "Italy", to: "/contact" },
  { name: "Kosovo", to: "/contact" },
];

const HOME_SERVICES = SERVICES.slice(0, 9);

function Home_() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I found a vehicle I'd like help with.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img
          src={heroImg}
          alt="Vehicle at international shipping terminal"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />

        <div className="container-page flex min-h-[92vh] flex-col justify-center py-32">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Moving Cars Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Source, Inspect and Ship <span className="text-teal-glow">Vehicles Worldwide</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Complete vehicle sourcing, auction access, inspections, ocean freight, airfreight and delivery from the USA, South Korea, UAE and Canada to Albania and across Europe.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                onClick={() => trackEvent("quote_started", { source: "hero" })}
                className="btn-primary"
              >
                Get a Shipping Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Calculate Shipping Cost
              </Link>
              <Link
                to="/inspection-service"
                onClick={() => trackEvent("inspection_requested", { source: "hero" })}
                className="text-sm font-semibold text-teal-glow underline-offset-4 hover:underline"
              >
                Book an Inspection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStats />

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we source from</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Import-Origin Markets
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTRIES.map((c) => (
              <Link
                key={c.slug}
                to={c.to}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal"
              >
                <Globe2 className="h-6 w-6 text-teal" />
                <h3 className="font-display mt-4 text-xl font-bold text-navy">{c.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{c.hook}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we deliver</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Main Destinations
            </h2>
            <p className="mt-4 text-sm text-slate-body">
              Handling available through Alpha Worldwide and its approved logistics network.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.name}
                to={d.to}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:border-teal hover:text-teal"
              >
                <MapPin className="h-3.5 w-3.5" /> {d.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">What we do</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
                Core Services
              </h2>
            </div>
            <Link to="/services" className="btn-outline-dark">
              View All Services
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((s) => (
              <Link
                to={s.to}
                key={s.slug}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  {s.hasDedicatedPage ? "Learn more" : "Enquire"} <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks variant="light" />

      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page grid items-center gap-12 py-20 md:py-24 lg:grid-cols-2">
          <div>
            <div className="eyebrow text-teal-glow">Real numbers, not guesses</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Calculate Your Shipping Cost
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Our calculator uses real land-transport, auction-fee, and ocean-freight data — not rough estimates. Get an itemized breakdown for USA or South Korea routes in seconds.
            </p>
            <Link
              to="/calculator"
              onClick={() => trackEvent("calculator_started", { source: "homepage_promo" })}
              className="btn-primary mt-8"
            >
              <Calculator className="h-4 w-4" /> Open Shipping Calculator
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> Real Copart/IAAI auction fee tables</li>
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> 96 real USA auction locations mapped to export terminals</li>
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> Itemized land transport, ocean freight, and unloading fees</li>
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> Fixed all-in pricing for South Korea routes</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Proof, not promises</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
                Real Deliveries
              </h2>
            </div>
            <Link to="/delivered-vehicles" className="btn-outline-dark">
              View All Delivered Vehicles
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VEHICLES.slice(0, 6).map((v) => (
              <article key={v.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-mist">
                  <img
                    src={v.image}
                    alt={`${v.year} ${v.name}`}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    {v.origin} → {v.destination}
                  </div>
                  <h3 className="font-display mt-2 text-lg font-bold text-navy">
                    {v.year} {v.name}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {v.services.map((s) => (
                      <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">
                        {s}
                      </span>
                    ))}
                    <span className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-semibold text-navy">
                      Delivered
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Where we operate</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              International Offices
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {OFFICES.map((office) => (
              <div key={office.id} className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <MapPin className="h-6 w-6 text-teal" />
                <h3 className="font-display mt-4 text-xl font-bold text-navy">{office.role}</h3>
                <p className="mt-1 text-sm text-slate-body">{office.city}, {office.country}</p>
                <div className="mt-4 text-sm text-navy/70">
                  {"phone" in office
                    ? <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-teal">{office.phone}</a>
                    : office.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-teal">{p}</a>
                        {i < office.phones.length - 1 && ", "}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-teal-glow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Already found your vehicle?
            </h2>
            <p className="mt-5 text-white/70">
              Send us the link. We'll inspect it, calculate shipping, and manage everything.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "homepage_final_cta" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => trackEvent("quote_started", { source: "homepage_final_cta" })}
                className="btn-outline-light"
              >
                <FileText className="h-4 w-4" /> Shipping Quote
              </Link>
              <Link
                to="/inspection-service"
                onClick={() => trackEvent("inspection_requested", { source: "homepage_final_cta" })}
                className="btn-outline-light"
              >
                <CalendarCheck className="h-4 w-4" /> Book Inspection
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl">
            <QuoteForm variant="compact" onDark />
          </div>
        </div>
      </section>
    </>
  );
}
