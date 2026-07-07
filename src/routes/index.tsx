import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Search, Gavel, Warehouse, Ship, Home, Award, Globe2, MapPin, Users } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import heroUsa from "@/assets/hero-usa.jpg";
import heroKorea from "@/assets/hero-korea.jpg";
import heroUae from "@/assets/hero-uae.jpg";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { TrustStats } from "@/components/site/TrustStats";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { VEHICLES } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Worldwide Albania | Car Import & Shipping from USA, Korea, UAE to Albania" },
      { name: "description", content: "Buy, inspect, and ship vehicles from the USA, South Korea, UAE, Canada, and Europe — fully managed by Alpha Worldwide Albania, Durrës." },
      { property: "og:title", content: "Alpha Worldwide Albania | Moving Cars Worldwide" },
      { property: "og:description", content: "International vehicle sourcing, auction brokerage, inspection, import/export, and car shipping — end to end." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home_,
});

const SERVICES = [
  { icon: Search, title: "Sourcing", body: "We locate the right car for you — auction, dealer stock, or private listing worldwide." },
  { icon: ShieldCheck, title: "Inspection", body: "Independent pre-purchase inspection covering title, history and mechanical condition." },
  { icon: Gavel, title: "Negotiation", body: "Licensed brokers negotiate and secure vehicles on your behalf, at fair market value." },
  { icon: Warehouse, title: "Storage & Insurance", body: "Secure short and long-term storage plus full-value cargo insurance during transit." },
  { icon: Ship, title: "Car Shipping", body: "Container, RoRo, or airfreight — the fastest, safest route for every vehicle profile." },
  { icon: Home, title: "Door Delivery", body: "Customs, homologation, registration and final delivery to your door in Albania or Europe." },
];

const WHY_US = [
  { icon: Award, text: "Over 10 years of international auction and export experience." },
  { icon: Globe2, text: "Trusted network of auctions, dealers and inspectors across USA, UAE, Korea, Canada." },
  { icon: Ship, text: "Full service — sourcing, inspection, shipping, customs, home delivery." },
  { icon: ShieldCheck, text: "Licensed for export, registered in Albania and the European Union." },
  { icon: Users, text: "Trusted by hundreds of clients across Albania, Italy, Germany, France, Belgium, Netherlands." },
];

function Home_() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden text-white">
        <img
          src={heroImg}
          alt="Luxury vehicle at international shipping port"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />

        <div className="container-page flex min-h-[92vh] flex-col justify-center py-32">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Moving Cars Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Buy, Inspect, and Ship Vehicles from the{" "}
              <span className="text-teal-glow">USA, South Korea, UAE</span>, Canada, and Europe — fully managed.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              From auction access and pre-purchase inspections to export documentation, container shipping, airfreight, unloading, customs support and final delivery — we handle the complete vehicle import process.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get a Free Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-outline-light">
                Explore Services
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-teal-glow underline-offset-4 hover:underline">
                Send Us a Vehicle Link →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PlatformBadges />
      <TrustStats />

      {/* ABOUT PREVIEW */}
      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">About the company</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              A Premier Partner for International Vehicle Import
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-body">
              Alpha Worldwide Albania is a premier provider of comprehensive car import and shipping services, specializing in sourcing vehicles from the USA, Canada, UAE, and South Korea to Albania and the broader European market.
            </p>
            <h3 className="mt-8 font-display text-2xl font-bold text-navy">Licensed Auction Access</h3>
            <p className="mt-3 text-slate-body">
              As a licensed broker, we grant our clients exclusive access to leading automotive auction platforms.
            </p>
            <Link to="/about" className="btn-outline-dark mt-8">
              Learn More About Us
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              { name: "Copart", body: "Leading US salvage & clean-title auction" },
              { name: "Encar", body: "Korea's largest used vehicle marketplace" },
              { name: "Autowini", body: "Global Korean vehicle export platform" },
              { name: "Dubizzle", body: "Top UAE marketplace for used cars" },
              { name: "IAA / IAAI", body: "Insurance auto auction network — USA" },
              { name: "AutoScout24", body: "Europe's premier dealer marketplace" },
              { name: "Emirates Auction", body: "Official government auctions in UAE" },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="font-display text-base font-bold text-navy">{p.name}</div>
                <div className="mt-1.5 text-xs leading-relaxed text-slate-body">{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What we do</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Full-service vehicle import, managed end to end
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                to="/services"
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORT MARKETS */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Import markets</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
                Where we source
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-body">
              Verified networks, licensed access, and local partners on the ground in every origin country we serve.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { to: "/import-usa", label: "USA", img: heroUsa, hook: "Copart · IAAI · Manheim · Dealer Networks" },
              { to: "/import-korea", label: "South Korea", img: heroKorea, hook: "Encar · Autowini · KB Chachacha" },
              { to: "/import-uae", label: "UAE", img: heroUae, hook: "Dubizzle · Emirates Auction · Official Dealers" },
            ].map((m) => (
              <Link
                key={m.label}
                to={m.to}
                className="group relative isolate overflow-hidden rounded-2xl"
              >
                <img
                  src={m.img}
                  alt={m.label}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="eyebrow text-teal-glow">Import from</div>
                  <div className="font-display mt-1 text-3xl font-bold">{m.label}</div>
                  <p className="mt-2 text-sm text-white/75">{m.hook}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-glow">
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks variant="light" />

      {/* DELIVERED PREVIEW */}
      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Delivered vehicles</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
                Real cars. Real routes. Real deliveries.
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
                  <p className="mt-2 text-sm text-slate-body">{v.caption}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {v.services.map((s) => (
                      <span key={s} className="rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-semibold text-teal">
                        {s}
                      </span>
                    ))}
                  </div>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-teal">
                    Request Similar Shipment <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="eyebrow text-teal-glow">Why Alpha Worldwide</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
                One broker. Zero stress.
              </h2>
              <p className="mt-5 max-w-lg text-white/70">
                We handle every step of the import chain in-house — no handoffs, no dropped balls, no surprise fees.
              </p>
              <Link to="/about" className="btn-outline-light mt-8">Read Our Story</Link>
            </div>
            <ul className="space-y-4">
              {WHY_US.map((w) => (
                <li key={w.text} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal/15 text-teal">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 pt-1 text-sm leading-relaxed text-white/85">
                    {w.text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* QUOTE CTA */}
      <section className="bg-background">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Ready to Import Your Next Vehicle?
            </h2>
            <p className="mt-5 max-w-lg text-slate-body">
              Send us the vehicle link, auction lot number, or dealer listing. We'll review the car, estimate the full logistics cost, and guide you through the next step.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-navy">
              <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-teal" /> Durrës, Albania — HQ & port operations</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-teal" /> Licensed for EU export & import</li>
              <li className="flex gap-3"><Globe2 className="h-5 w-5 shrink-0 text-teal" /> 130+ countries served</li>
            </ul>
          </div>
          <QuoteForm variant="compact" />
        </div>
      </section>
    </>
  );
}
