import { JourneySteps } from "@/components/site/JourneySteps";
import { PageHero } from "@/components/site/PageHero";
import { LAMBORGHINI_IN_CONTAINER } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/import-canada")({
  head: () => buildHead({ title: "Import a Car from Canada to Albania & Europe", description: "Sourcing, vehicle inspection before purchase, and shipping from Canadian auctions and dealers to Durrës, Albania and Europe.", path: "/import-canada", }),
  component: ImportCanada,
});

const STEPS = [
  { n: 1, title: "Find a Vehicle", body: "Choose a car from a Canadian auction, dealer, or private listing, or ask us to source one." },
  { n: 2, title: "Send Us the Link", body: "Share the listing or lot number. We confirm feasibility and give you an all-in estimate." },
  { n: 3, title: "Inspection", body: "Photos, video, OBD scan, and a full condition report before you commit to buying." },
  { n: 4, title: "Purchase", body: "We handle the purchase or bidding process securely on your behalf." },
  { n: 5, title: "Export & Ocean Shipping", body: "Inland transport to the nearest export port, then container or RoRo shipping across the Atlantic." },
  { n: 6, title: "Customs & Delivery", body: "Full customs clearance at Durrës and final delivery anywhere in Albania or Europe." },
];

function ImportCanada() {
  return (
    <>
      <PageHero scene={LAMBORGHINI_IN_CONTAINER.en} breadcrumbs={[{ label: "Services", to: "/services" }, { label: "Import From Canada" }]} eyebrow="Import from · Canada" title={<>Vehicle Sourcing & Shipping from Canada to Albania & Europe</>} description={<>We source, inspect, purchase, and ship vehicles from auctions and dealers across Canada — fully managed to your door in Albania or Europe.</>}>
        <Button asChild><Link to="/contact">Get a Quote</Link></Button>
        <Button asChild variant="outline"><Link to="/calculator">Calculate Shipping</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">6-step process</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">From Canada to your driveway</h2>
          </div>
          <JourneySteps steps={STEPS} />
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Start today</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Send Us a Vehicle Link from Canada
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share a listing URL or lot number — we'll handle inspection, purchase, export, and shipping to your destination.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
