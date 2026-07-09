import { Star } from "lucide-react";
import { CONTACT, TESTIMONIALS } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section className="section-mist">
      <div className="container-page py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Client feedback</div>
          <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">
            What our clients say
          </h2>
        </div>

        {TESTIMONIALS.length > 0 ? (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex gap-0.5 text-teal">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-body">“{t.quote}”</p>
                <div className="mt-5 text-sm font-bold text-navy">{t.name}</div>
                <div className="text-xs text-slate-body">{t.location}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card p-10 text-center shadow-card">
            <div className="mx-auto flex w-fit gap-0.5 text-teal/30">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-body">
              We're collecting verified client reviews. Worked with Alpha Worldwide Albania?
              We'd love your feedback.
            </p>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
                "Hi Alpha Worldwide, I'd like to share a review of my experience.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-teal hover:underline"
            >
              Leave us a review on WhatsApp →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
