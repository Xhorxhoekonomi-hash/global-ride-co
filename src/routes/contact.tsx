import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram } from "lucide-react";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/contact")({
  head: () => buildHead({ title: "Contact Alpha Worldwide Albania | Get a Free Quote", description: "Reach our Durrës team via WhatsApp, phone, or email to start your car shipping to Albania or vehicle import quote today.", path: "/contact", image: heroImg }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Durrës port at sunset" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Contact us</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Ship your car with ease and peace of mind.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Contact us today for reliable and affordable vehicle sourcing, inspection and shipping services.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-10 py-20 md:py-24 lg:grid-cols-5 lg:gap-12">
          {/* Contact card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <div className="eyebrow">Reach us</div>
              <h2 className="font-display mt-3 text-2xl font-bold text-navy">Alpha Worldwide Albania</h2>

              <div className="mt-6 space-y-5">
                <Info icon={MapPin} label="Location">{CONTACT.location}</Info>
                <Info icon={Mail} label="Email">
                  <a href={`mailto:${CONTACT.email}`} className="text-navy hover:text-teal">{CONTACT.email}</a>
                </Info>
                <Info icon={Phone} label="Albania">
                  <div className="space-y-1">
                    {CONTACT.phones.map((p) => (
                      <div key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="text-navy hover:text-teal">{p}</a></div>
                    ))}
                  </div>
                </Info>
                <Info icon={Phone} label="UAE">
                  <a href={`tel:${CONTACT.uae.replace(/\s/g, "")}`} className="text-navy hover:text-teal">{CONTACT.uae}</a>
                </Info>
                <Info icon={Clock} label="Hours">{CONTACT.hours}</Info>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-border text-navy hover:border-teal hover:text-teal">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border text-navy hover:border-teal hover:text-teal">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-border shadow-card">
              <iframe
                title="Durrës, Albania map"
                src="https://www.google.com/maps?q=Durres,Albania&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="eyebrow">Request a quote</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Tell us about your vehicle</h2>
            <p className="mt-3 text-slate-body">
              Complete the form and our team will contact you shortly with a full delivered-price quote.
            </p>
            <div className="mt-6">
              <QuoteForm variant="full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Info({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal/10 text-teal">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-navy/60">{label}</div>
        <div className="mt-1 text-sm text-slate-body">{children}</div>
      </div>
    </div>
  );
}
