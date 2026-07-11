import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead } from "@/lib/seo";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/auction-access")({
  head: () => {
    const base = buildHead({ title: "Copart & IAAI Albania Broker | Auction Access", description: "Licensed Copart Albania broker and IAAI Albania broker with access to Manheim, Encar, Autowini, Dubizzle and Emirates Auction — no local account required.", path: "/auction-access", image: heroImg });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Auction Brokerage Albania",
            description: "Copart Albania broker and IAAI Albania broker access, plus Manheim, Encar, Autowini, Dubizzle and Emirates Auction.",
            provider: {
              "@type": "LocalBusiness",
              name: "Alpha Worldwide Albania",
              url: "https://www.alphaworldwidealbania.com",
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: "https://www.alphaworldwidealbania.com/auction-access",
          }),
        },
      ],
    };
  },
  component: AuctionAccess,
});

const STEPS = [
  { n: 1, title: "You Choose the Vehicle", body: "Browse Copart, IAAI, Manheim, Encar, or any platform we work with, and send us the lot." },
  { n: 2, title: "We Confirm & Bid", body: "Our licensed agents place bids or purchase on your behalf — no local account needed." },
  { n: 3, title: "You Get the Vehicle", body: "Once purchased, we move straight into inspection, export, and shipping." },
];

function AuctionAccess() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle auction access" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Auction access</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Bid on Any Major Auction — Without a Local Account
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Licensed access to Copart, IAAI, Manheim, Encar, Autowini, Dubizzle, and Emirates Auction, wherever you're based.
            </p>
          </div>
        </div>
      </section>

      <PlatformBadges />

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">How auction access works</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Three steps to a purchase</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
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
            <div className="eyebrow text-teal-glow">Start bidding</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Send Us a Lot Number
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share the auction, lot number, or listing link — we'll confirm feasibility and next steps.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
