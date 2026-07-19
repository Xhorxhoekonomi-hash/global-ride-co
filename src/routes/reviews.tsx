import { createFileRoute } from "@tanstack/react-router";
import { Star, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT, VEHICLES, TESTIMONIALS } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/reviews")({
  head: () => {
    const base = buildHead({
      title: "Reviews & Delivered Vehicles | Alpha Worldwide",
      description: "Real delivered vehicles and customer experiences with Alpha Worldwide's sourcing, inspection, and shipping process from the USA, South Korea, UAE, Canada, and Europe.",
      path: "/reviews",
      image: heroImg,
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

const ORIGIN_LABELS: Record<string, string> = {
  USA: "United States",
  Korea: "South Korea",
  UAE: "Dubai, UAE",
  Canada: "Canada",
  Europe: "Europe",
};

const ORIGIN_GROUPS = ["USA", "Korea", "UAE", "Europe"] as const;

function Reviews() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like to hear about a recent delivery similar to what I'm planning.",
  )}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Reviews" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle delivered by Alpha Worldwide" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[50vh] flex-col justify-end py-28">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Reviews & delivered vehicles</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Real Vehicles, Real Deliveries
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              15,000+ vehicles bought and transported over 10+ years — browse recent deliveries and read what customers say on Google.
            </p>
          </div>
        </div>
      </section>

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

      {ORIGIN_GROUPS.map((origin, gi) => {
        const vehicles = VEHICLES.filter((v) => v.origin === origin);
        if (vehicles.length === 0) return null;
        return (
          <section key={origin} className={gi % 2 === 0 ? "section-mist" : "bg-background"}>
            <div className="container-page py-16 md:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <div className="eyebrow">Delivered from {ORIGIN_LABELS[origin]}</div>
                <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Recent {ORIGIN_LABELS[origin]} Deliveries</h2>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {vehicles.map((v) => (
                  <article key={v.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                    <div className="aspect-[4/3] overflow-hidden bg-mist">
                      <img
                        src={v.image}
                        alt={`${v.year} ${v.name} delivered from ${ORIGIN_LABELS[v.origin]} to ${v.destination}`}
                        loading="lazy"
                        width={1200}
                        height={800}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg font-bold text-navy">{v.year} {v.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-teal">{ORIGIN_LABELS[v.origin]} → {v.destination}</p>
                      <p className="mt-2 text-sm text-slate-body">{v.caption}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {v.services.map((s) => (
                          <span key={s} className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-semibold text-navy">{s}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
