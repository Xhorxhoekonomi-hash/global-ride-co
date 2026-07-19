import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Gavel, Package, Plane, Users, Eye, MessageCircle, Calculator, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-about.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/why-alpha-worldwide")({
  head: () => {
    const base = buildHead({
      title: "Why Alpha Worldwide | International Vehicle Sourcing & Shipping",
      description: "10+ years sourcing, inspecting, and shipping vehicles worldwide — Dubai headquarters, Durrës operations, and a transparent process built on verified experience, not exaggerated claims.",
      path: "/why-alpha-worldwide",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "International Vehicle Sourcing, Inspection and Shipping",
            description: "Vehicle sourcing, auction access, inspection coordination, container/RoRo/airfreight shipping, and customs-document coordination, operated from Dubai and Durrës.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Italy"],
            url: `${SITE_URL}/why-alpha-worldwide`,
          }),
        },
      ],
    };
  },
  component: WhyAlphaWorldwide,
});

const SECTIONS = [
  {
    icon: Users,
    title: "Who We Are",
    body: "Alpha Worldwide is an international vehicle sourcing, inspection, and logistics company. We help customers buy vehicles from auctions and selected dealers abroad, and manage the entire process through to delivery — without customers needing accounts, addresses, or bank relationships in the origin country.",
    cta: { label: "Get a Quote on WhatsApp", to: "whatsapp" },
  },
  {
    icon: Globe2,
    title: "Global Operations",
    body: "Our operations span vehicle sourcing in the USA, South Korea, the UAE, Canada, and Europe, with shipping coordinated by container, RoRo, and airfreight into Albania and across Western Europe.",
    cta: { label: "See how it works", to: "/how-it-works" },
  },
  {
    icon: MapPin,
    title: "Dubai Headquarters",
    body: "Our headquarters in Dubai enables local sourcing coordination in the UAE market, direct seller and dealer communication, and export preparation without delays from working remotely.",
    cta: { label: "Import from Dubai", to: "/import-uae" },
  },
  {
    icon: MapPin,
    title: "Durrës Operations",
    body: "Our European and Albanian operations are based in Durrës, at the country's main port — where we coordinate port handling, customs documentation, and final delivery.",
    cta: { label: "Contact our Durrës team", to: "/contact" },
  },
  {
    icon: Gavel,
    title: "Auction Expertise",
    body: "We assist customers with vehicle purchases through Copart, IAAI, Manheim, ADESA, Encar, Autowini, KB Chachacha, and selected dealers — without claiming official partnership with any of these platforms.",
    cta: { label: "Compare auction platforms", to: "/auction-access" },
  },
  {
    icon: Eye,
    title: "Inspection Process",
    body: "Where operationally possible, we coordinate pre-purchase inspection with photos, video, and technical checks. Inspection availability depends on the seller, the auction, and access to the vehicle — it is never guaranteed for every listing.",
    cta: { label: "See what inspections cover", to: "/inspection-service" },
  },
  {
    icon: Package,
    title: "Container Logistics",
    body: "We arrange shared or dedicated container shipping, with vehicles secured to standard loading practices for the full ocean transit.",
    cta: { label: "Container shipping details", to: "/container-shipping" },
  },
  {
    icon: Plane,
    title: "Airfreight Capability",
    body: "For urgent or exceptionally high-value vehicles, we coordinate airfreight through a verified network of European cargo airports, including Amsterdam Schiphol, Milan Malpensa, and Leipzig/Halle.",
    cta: { label: "Airfreight options", to: "/airfreight" },
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    body: "We give real, itemized cost estimates rather than vague promises — customs duties and destination taxes are always called out as separate from our service fee, and we never present an estimate as a guaranteed final price.",
    cta: { label: "Try the shipping calculator", to: "/calculator" },
  },
];

function WhyAlphaWorldwide() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to learn more about your process before requesting a quote.",
  )}`;
  const dubai = OFFICES[0];
  const durres = OFFICES[1];

  return (
    <>
      <Breadcrumbs items={[{ label: "Why Alpha Worldwide" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Alpha Worldwide team coordinating international vehicle logistics" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Why Alpha Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              10+ Years Sourcing and Shipping Vehicles Worldwide
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              15,000+ vehicles bought and transported — from auction lots and dealer listings to a delivered vehicle at your door, coordinated from {dubai.city} and {durres.city}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "why-alpha-worldwide-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {SECTIONS.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "bg-background" : "section-mist"}>
          <div className="container-page py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal/10 text-teal">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">{s.title}</h2>
                <p className="mt-3 max-w-2xl text-slate-body">{s.body}</p>
                {s.cta.to === "whatsapp" ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => trackEvent("whatsapp_clicked", { source: `why-section-${s.title}` })}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                  >
                    {s.cta.label} →
                  </a>
                ) : (
                  <Link
                    to={s.cta.to}
                    onClick={() => trackEvent("quote_started", { source: `why-section-${s.title}` })}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                  >
                    {s.cta.label} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Why customers choose us */}
      <section className="section-dark">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Why customers choose us</div>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold text-white md:text-5xl">
            One point of contact, from the auction to your driveway
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Instead of coordinating separately with an auction broker, an inspector, a freight forwarder, and a customs agent, you work with one team throughout — with real cost estimates, not vague promises.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "why-final-cta" })}
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" /> Start a Conversation
            </a>
            <Link
              to="/calculator"
              onClick={() => trackEvent("calculator_started", { source: "why-final-cta" })}
              className="btn-outline-light"
            >
              <Calculator className="h-4 w-4" /> Calculate Shipping Cost
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
