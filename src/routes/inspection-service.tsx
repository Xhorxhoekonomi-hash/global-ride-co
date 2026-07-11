import { createFileRoute } from "@tanstack/react-router";
import { Camera, Video, Gauge, PenTool, Wrench, FileSearch } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/inspection-service")({
  head: () => {
    const base = buildHead({ title: "Vehicle Inspection Before Purchase | 155-Point", description: "Vehicle inspection before purchase — 155-point pre-purchase inspection with photos, video, OBD scan and paint-meter reading, worldwide.", path: "/inspection-service", image: heroImg });
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
              "@type": "LocalBusiness",
              name: "Alpha Worldwide Albania",
              url: "https://www.alphaworldwidealbania.com",
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: "https://www.alphaworldwidealbania.com/inspection-service",
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
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle inspection" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Inspection service</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Know Exactly What You're Buying
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              155-point vehicle inspection before purchase — photos, video, OBD scan and paint-meter readings on the ground in the USA, South Korea, UAE or Canada, before a single dollar moves.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">What's included</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Every inspection covers</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Book an inspection</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Request Inspection Before You Buy
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Send us the listing or lot number. We'll arrange inspection and send you the full report before you commit.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
