import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Eye, FileCheck, ShoppingBag, CreditCard, FileText, Ship, Anchor, Landmark, PackageCheck, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  { n: 1, icon: Search, title: "Choose a Vehicle", body: "Send us a listing, auction lot, or your search criteria — from Copart, IAAI, Manheim, ADESA, Encar, Autowini, KB Chachacha, or a dealer in the USA, South Korea, UAE, Canada, or Europe.", trust: "You're never limited to one platform — we work across every market we cover." },
  { n: 2, icon: Eye, title: "Vehicle Inspection", body: "Where operationally possible, we coordinate a pre-purchase inspection with photos, video, and a technical check.", trust: "Inspection availability depends on the seller, the auction, and access to the vehicle — we confirm this before you commit, never after." },
  { n: 3, icon: FileCheck, title: "History Verification", body: "We review available title, condition, and history information for the specific vehicle before recommending a purchase decision.", trust: "Auction photos and condition reports are not the same as an independent inspection — we're clear about which one you're getting." },
  { n: 4, icon: ShoppingBag, title: "Purchase", body: "We bid or purchase on your behalf, within your budget and instructions." },
  { n: 5, icon: CreditCard, title: "Payment", body: "Payment and documentation are coordinated at every step, with a clear breakdown before funds are committed." },
  { n: 6, icon: FileText, title: "Export Documentation", body: "We prepare export paperwork specific to the origin country before the vehicle moves toward the port or airport." },
  { n: 7, icon: Ship, title: "Shipping", body: "The vehicle ships by container, RoRo where operationally available, or airfreight for urgent or high-value shipments.", trust: "We give you a real, itemized shipping estimate — never a vague promise — and confirm the schedule before booking." },
  { n: 8, icon: Anchor, title: "Arrival", body: "On arrival at the destination port or airport, we coordinate handling and prepare the vehicle for release." },
  { n: 9, icon: Landmark, title: "Customs", body: "We coordinate customs paperwork with licensed local agents.", trust: "Customs values, taxes, and clearance decisions are set by the relevant customs authority — not by Alpha Worldwide." },
  { n: 10, icon: PackageCheck, title: "Collection", body: "Once cleared, the vehicle is ready for collection or onward delivery to your address." },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => {
    const base = buildHead({
      title: "How It Works | Vehicle Import Process | Alpha Worldwide",
      description: "The complete Alpha Worldwide process, step by step — from choosing a vehicle to collection, with inspection, purchase, export, shipping, and customs coordination explained.",
      path: "/how-it-works",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Alpha Worldwide's Vehicle Import Process Works",
            description: "Step-by-step process for sourcing, inspecting, purchasing, and shipping a vehicle internationally with Alpha Worldwide.",
            step: STEPS.map((s) => ({
              "@type": "HowToStep",
              position: s.n,
              name: s.title,
              text: s.body,
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vehicle Import Process",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            url: `${SITE_URL}/how-it-works`,
          }),
        },
      ],
    };
  },
  component: HowItWorks,
});

function HowItWorks() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to understand your process before getting started.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "How It Works" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle logistics coordination from sourcing to delivery" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[50vh] flex-col justify-end py-28">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">How it works</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              From Choosing a Vehicle to Collection — Ten Steps, One Team
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Every step explained honestly, including where availability and timing genuinely depend on factors outside our control.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            {STEPS.map((s, i) => (
              <div key={s.n}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-teal bg-card text-teal">
                      <s.icon className="h-5 w-5" />
                    </div>
                    {i < STEPS.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-10">
                    <div className="text-xs font-bold uppercase tracking-wider text-teal">Step {s.n}</div>
                    <h2 className="font-display mt-1 text-xl font-bold text-navy">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
                    {s.trust && (
                      <p className="mt-2 rounded-lg bg-mist px-3 py-2 text-xs text-navy/70">{s.trust}</p>
                    )}
                  </div>
                </div>
                {(s.n === 2 || s.n === 4 || s.n === 6 || s.n === 8) && (
                  <div className="mb-10 ml-[68px] flex flex-wrap gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => trackEvent("whatsapp_clicked", { source: `how-it-works-step-${s.n}` })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> Ask us about this step
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Ready to start?</div>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold text-white md:text-5xl">
            Send us your first vehicle
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "how-it-works-final-cta" })}
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <Link
              to="/calculator"
              onClick={() => trackEvent("calculator_started", { source: "how-it-works-final-cta" })}
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
