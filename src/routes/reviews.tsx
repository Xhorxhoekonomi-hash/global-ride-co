import { PhotoGallery } from "@/components/site/PhotoGallery";
import { ALPHA_PHOTOS } from "@/lib/alpha-photos";
import { EditorialHero } from "@/components/site/EditorialHero";
import { createFileRoute } from "@tanstack/react-router";
import { Star, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT, TESTIMONIALS } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/reviews")({
  head: () => {
    const base = buildHead({
      title: "Reviews & Delivered Vehicles | Alpha Worldwide",
      description: "Real delivered vehicles and customer experiences with Alpha Worldwide's sourcing, inspection, and shipping process from the USA, South Korea, UAE, Canada, and Europe.",
      path: "/reviews",
    });
    const scripts: Record<string, unknown>[] = [];
    // AggregateRating is only emitted once real, verifiable reviews exist —
    // publishing a placeholder rating/count here would be fabricated
    // structured data. See TESTIMONIALS in site-data.ts for the source.
    if (TESTIMONIALS.length > 0) {
      const avg = TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length;
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Alpha Worldwide",
          url: SITE_URL,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avg.toFixed(1),
            reviewCount: TESTIMONIALS.length,
          },
        }),
      });
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          itemReviewed: { "@type": "Organization", name: "Alpha Worldwide" },
          review: TESTIMONIALS.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            reviewRating: { "@type": "Rating", ratingValue: t.rating },
            reviewBody: t.quote,
          })),
        }),
      });
    }
    return { ...base, scripts };
  },
  component: Reviews,
});


function Reviews() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to hear about a recent delivery similar to what I'm planning.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Reviews" }]} />
      <EditorialHero>
        <div>
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-primary">Reviews & delivered vehicles</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Reviews & actual operations
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Explore our original operational photos and read customer experiences on Google.
            </p>
          </div>
        </div>
      </EditorialHero>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <h2 className="font-display text-2xl font-bold text-navy">See What Customers Say on Google</h2>
            <p className="max-w-md text-sm text-slate-body">
              Our verified Google reviews are the most current and unfiltered record of customer experience — we link directly rather than curating quotes here.
            </p>
            <a
              href="https://www.google.com/search?q=Alpha+Worldwide+Albania+reviews"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "reviews-google-cta" })}
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" /> Read Reviews on Google
            </a>
          </div>
        </div>
      </section>

      <section className="bg-mist"><div className="container-page py-14 md:py-20"><h2 className="text-3xl font-semibold text-secondary">Vehicles we’ve handled</h2><p className="mt-4 max-w-2xl text-sm text-muted-foreground">Original photographs of vehicle handling at warehouses, ports, transporters and containers.</p><div className="mt-8"><PhotoGallery photos={ALPHA_PHOTOS} limit={6} /></div></div></section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Customer testimonials</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Written Customer Stories</h2>
          </div>
          {TESTIMONIALS.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-3 text-sm text-slate-body">"{t.quote}"</p>
                  <p className="mt-3 text-xs font-semibold text-navy">{t.name} — {t.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-dashed border-border bg-mist p-8 text-center">
              <ShieldCheck className="mx-auto h-8 w-8 text-teal" />
              <p className="mt-3 text-sm text-slate-body">
                We only publish testimonials we can verify as real Alpha Worldwide customers. Written stories will appear here as they're collected — in the meantime, our Google reviews above are the most current source.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Leave a review</div>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl font-bold text-white md:text-5xl">
            Already worked with us?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            A Google review helps other buyers considering the same route you took — and lets us know how we did.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.google.com/search?q=Alpha+Worldwide+Albania+reviews"
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" /> Leave a Google Review
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackEvent("whatsapp_clicked", { source: "reviews-final-cta" })}
              className="btn-outline-light"
            >
              <MessageCircle className="h-4 w-4" /> Ask Us Anything
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
