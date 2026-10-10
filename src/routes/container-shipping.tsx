import { EditorialHero } from "@/components/site/EditorialHero";
import { PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ShieldCheck, Lock, PackageCheck } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { CONTAINER_PHOTOS } from "@/lib/alpha-photos";

export const Route = createFileRoute("/container-shipping")({
  head: () => {
    const base = buildHead({ title: "Container Car Shipping Europe | Alpha Worldwide", description: "Fully enclosed container car shipping to Europe and Albania — for high-value, exotic and modified vehicles from USA, Korea, UAE and Canada.", path: "/container-shipping", });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Container Car Shipping",
            description: "Fully enclosed container car shipping to Europe and Albania for high-value, exotic and modified vehicles.",
            provider: {
              "@type": "Organization",
              name: "Alpha Worldwide",
              url: SITE_URL,
            },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: `${SITE_URL}/container-shipping`,
          }),
        },
      ],
    };
  },
  component: ContainerShipping,
});

const POINTS = [
  { icon: Lock, title: "Fully Enclosed", body: "Your vehicle travels sealed inside a container, protected from weather, salt air, and handling damage." },
  { icon: ShieldCheck, title: "Best for High-Value Cars", body: "The preferred method for luxury, exotic, and modified vehicles where extra protection matters." },
  { icon: PackageCheck, title: "Solo or Consolidated", body: "Ship alone for maximum security, or share container space with another vehicle to reduce cost." },
];

function ContainerShipping() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services", to: "/services" }, { label: "Container Shipping" }]} />
      <EditorialHero photo={PHOTO_SELECTIONS.container}>
        <div>
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-primary">Container shipping</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Maximum Protection, Ocean to Port
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Container car shipping to Europe and vehicle shipping to Durrës, fully enclosed from origin port to Albania — the safest way to move a high-value or modified vehicle.
            </p>
            <div className="interior-actions"><Button asChild><Link to="/contact">Get a Quote</Link></Button><Button asChild variant="outline"><Link to="/calculator">Calculate Shipping</Link></Button></div>
          </div>
        </div>
      </EditorialHero>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {POINTS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="container-page py-16 md:py-20">
          <div className="eyebrow text-teal">Original Alpha Worldwide photos</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Secured inside the container</h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-body">Vehicles loaded and handled by our team for enclosed container shipping.</p>
          <div className="mt-8"><PhotoGallery photos={CONTAINER_PHOTOS} /></div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Get a rate</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Calculate Container Shipping
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us the origin, destination, and vehicle — we'll send an accurate container shipping quote.
            </p>
          </div>
          <QuoteForm variant="full" onDark />
        </div>
      </section>
    </>
  );
}
