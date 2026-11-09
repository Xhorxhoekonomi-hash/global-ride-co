import { JourneySteps } from "@/components/site/JourneySteps";
import { PageHero } from "@/components/site/PageHero";
import { FERRARI_CAR_CARRIER } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/import-europe")({
  head: () => buildHead({ title: "Import a Car from Europe to Albania", description: "Cross-border vehicle transport from AutoScout24 and European dealers to Albania — sourcing, purchase handling and delivery.", path: "/import-europe", hreflang: [{ lang: "en", path: "/import-europe" }, { lang: "sq", path: "/al/makina-nga-evropa" }], xDefault: "/import-europe", }),
  component: ImportEurope,
});

const STEPS = [
  { n: 1, title: "Find a Vehicle", body: "Browse AutoScout24, a European dealer, or a private listing anywhere on the continent." },
  { n: 2, title: "Send Us the Link", body: "Share the listing. We confirm the vehicle and give you an all-in transport estimate." },
  { n: 3, title: "Inspection", body: "Optional independent inspection before purchase, wherever the vehicle is located." },
  { n: 4, title: "Purchase Handling", body: "We coordinate the purchase and paperwork directly with the seller or dealer." },
  { n: 5, title: "Cross-Border Transport", body: "Road transport or RoRo shipping, depending on origin country and distance." },
  { n: 6, title: "Delivery", body: "Final delivery to your door in Albania, Kosovo, or elsewhere in Europe." },
];

function ImportEurope() {
  return (
    <>
      <PageHero scene={FERRARI_CAR_CARRIER.en} breadcrumbs={[{ label: "Services", to: "/services" }, { label: "Import From Europe" }]} eyebrow="Import from · Europe" title={<>Cross-Border Vehicle Sourcing & Transport Across Europe</>} description={<>Found a car on AutoScout24 or with a European dealer? We handle purchase coordination, transport, and delivery to Albania or Kosovo.</>}>
        <Button asChild><Link to="/contact">Get a Quote</Link></Button>
        <Button asChild variant="outline"><Link to="/calculator">Calculate Shipping</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <div className="eyebrow">6-step process</div>
            <h2 className="mt-3 text-navy">From anywhere in Europe to your driveway</h2>
          </div>
          <JourneySteps steps={STEPS} />
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 section-y lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Start today</div>
            <h2 className="mt-3 text-white">
              Send Us a European Listing
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Share the link — we'll coordinate purchase, transport, and delivery to Albania or Kosovo.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
