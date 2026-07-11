import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Search, Gavel, FileCheck, Ship, Plane, Package, Home, Award, Globe2, MapPin, Users, MessageCircle, FileText, CalendarCheck, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import { buildHead } from "@/lib/seo";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { TrustStats } from "@/components/site/TrustStats";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Faq } from "@/components/site/Faq";
import { Testimonials } from "@/components/site/Testimonials";
import { VEHICLES, COUNTRIES, WHY_US, CONTACT, FAQS } from "@/lib/site-data";

const HOME_TITLE = "Car Shipping Albania | Alpha Worldwide";
const HOME_DESC = "Car shipping to Albania and vehicle import from USA, South Korea, UAE, Canada and Europe — sourced, inspected, and delivered door to door.";

export const Route = createFileRoute("/")({
  head: () => {
    const base = buildHead({ title: HOME_TITLE, description: HOME_DESC, path: "/", image: heroImg });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: Home_,
});

const SERVICES = [
  { icon: Gavel, title: "Auction Access", body: "Bid and buy from Copart, IAAI, Manheim, Encar, and trusted dealers worldwide.", to: "/auction-access" },
  { icon: Search, title: "Vehicle Purchase", body: "We purchase or bid securely on your behalf, with transparent pricing at every step.", to: "/services" },
  { icon: ShieldCheck, title: "Vehicle Inspection", body: "155-point inspection with photos, video, OBD scan, and paint-meter reading.", to: "/inspection-service" },
  { icon: Package, title: "Container Shipping", body: "Fully enclosed shipping for high-value or modified vehicles, solo or consolidated.", to: "/container-shipping" },
  { icon: Ship, title: "RoRo Shipping", body: "Roll-on/roll-off shipping — the fast, economical route for standard vehicles.", to: "/roro-shipping" },
  { icon: Plane, title: "Air Freight", body: "Premium airfreight delivery for urgent or exceptionally high-value vehicles.", to: "/airfreight" },
  { icon: FileCheck, title: "Export & Transit Documents", body: "Export papers, transit documentation, and customs filings handled correctly.", to: "/services" },
  { icon: Home, title: "Door Delivery & Customs", body: "Customs clearance, port handling, and final delivery to your address.", to: "/services" },
  { icon: Award, title: "Insurance & Storage", body: "Full-value cargo insurance plus secure enclosed storage while in transit.", to: "/services" },
];

function Home_() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide Albania, I found a vehicle I'd like help with.",
  )}`;

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden text-white">
        <img
          src={heroImg}
          alt="Luxury vehicle at international shipping terminal"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />

        <div className="container-page flex min-h-[92vh] flex-col justify-center py-32">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Moving Cars Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Buy Cars Worldwide. <span className="text-teal-glow">We Handle Everything.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Car shipping to Albania and full vehicle import from USA, South Korea, UAE and Canada — sourced, inspected, purchased and delivered door to door across Albania and Europe.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get Shipping Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="btn-outline-light">
                Send Vehicle Link
              </a>
              <Link to="/inspection-service" className="text-sm font-semibold text-teal-glow underline-offset-4 hover:underline">
                Book Inspection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUSTED PLATFORMS */}
      <PlatformBadges />
      <div className="border-b border-border bg-mist py-6 text-center">
        <p className="font-display text-lg font-bold text-navy">Found a vehicle?</p>
        <p className="mt-1 text-sm text-slate-body">
          Send us the link.{" "}
          <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-teal hover:underline">
            We'll handle the rest.
          </a>
        </p>
      </div>

      {/* SECTION 6 — STATS (placed high for early trust) */}
      <TrustStats />

      {/* SECTION 3 — HOW IT WORKS */}
      <HowItWorks variant="light" />

      {/* SECTION 4 — COUNTRIES WE OPERATE */}
      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Global reach</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Countries We Operate
            </h2>
            <p className="mt-4 text-base text-slate-body">
              Verified networks and licensed access in every market we source from.
            </p>
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

      {/* SECTION 5 — SERVICES */}
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What we do</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
              Our Services
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                to={s.to}
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

      {/* SECTION 7 — WHY ALPHA WORLDWIDE */}
      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-teal-glow">Why Alpha Worldwide</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              One broker. Zero stress.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {WHY_US.map((w) => (
              <div key={w.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/15 text-teal">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — LATEST DELIVERIES (no prices) */}
      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">Latest deliveries</div>
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
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-teal">
                    Request Similar Shipment <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 10 — FAQ */}
      <Faq />

      {/* SECTION 11 — CTA */}
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
              <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="btn-primary">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link to="/contact" className="btn-outline-light">
                <FileText className="h-4 w-4" /> Shipping Quote
              </Link>
              <Link to="/inspection-service" className="btn-outline-light">
                <CalendarCheck className="h-4 w-4" /> Book Inspection
              </Link>
              <Link to="/calculator" className="btn-outline-light">
                <Calculator className="h-4 w-4" /> Calculate Shipping
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-2xl">
            <QuoteForm variant="compact" onDark />
          </div>

          <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-teal" /> Durrës, Albania — HQ & port operations</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal" /> Licensed for EU export & import</li>
            <li className="flex items-center gap-2"><Users className="h-4 w-4 text-teal" /> 130+ countries served</li>
          </ul>
        </div>
      </section>
    </>
  );
}
