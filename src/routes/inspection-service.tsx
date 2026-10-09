import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ArrowRight, Camera, Video, Gauge, PenTool, Wrench, FileSearch } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/inspection-service")({
  head: () => {
    const base = buildHead({ title: "Vehicle Inspection Before Purchase | 155-Point", description: "Vehicle inspection before purchase — 155-point pre-purchase inspection with photos, video, OBD scan and paint-meter reading, worldwide.", path: "/inspection-service", });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Vehicle Inspection Before Purchase",
            description: "155-point pre-purchase vehicle inspection with photos, video, OBD scan and paint-meter reading, worldwide.",
            provider: {
              "@type": "Organization",
              name: "Alpha Worldwide",
              url: SITE_URL,
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: `${SITE_URL}/inspection-service`,
          }),
        },
      ],
    };
  },
  component: InspectionService,
});

const CHECKS = [
  { icon: Camera, title: "Full Photo Set", body: "High-resolution photos of every angle, panel, and area of concern." },
  { icon: Video, title: "Video Walk-Around", body: "A real-time video walk-around and cold start, so you hear and see the car running." },
  { icon: Gauge, title: "OBD Diagnostic Scan", body: "Full OBD scan for stored fault codes across engine, transmission, and safety systems." },
  { icon: PenTool, title: "Paint Meter Reading", body: "Panel-by-panel paint depth readings to reveal prior bodywork or resprays." },
  { icon: Wrench, title: "Mechanical Condition", body: "Engine, transmission, suspension, brakes, and undercarriage assessed on site." },
  { icon: FileSearch, title: "Title & History Report", body: "Ownership history, accident records, and title status verified before purchase." },
];

function InspectionService() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Vehicle Inspection" }]} />
      <InnerPageHero eyebrow="Inspection service" title="Know Exactly What You're Buying" description="155-point vehicle inspection before purchase — photos, video, OBD scan and paint-meter readings on the ground in the USA, South Korea, UAE or Canada, before a single dollar moves." imageAlt="Vehicle inspection">
        <Button asChild><Link to="/contact">Request an Inspection <ArrowRight /></Link></Button>
      </InnerPageHero>

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What's included</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Every inspection covers</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.title} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-secondary">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent border-y border-border">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-primary">Book an inspection</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">
              Request Inspection Before You Buy
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Send us the listing or lot number. We'll arrange inspection and send you the full report before you commit.
            </p>
          </div>
          <QuoteForm variant="full" />
        </div>
      </section>
    </>
  );
}
