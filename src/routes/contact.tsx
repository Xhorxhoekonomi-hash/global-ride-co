import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin, Mail, Phone, Clock, Instagram } from "lucide-react";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      title: "Contact Alpha Worldwide Albania | Get a Free Quote",
      description: "Reach our Durrës team via WhatsApp, phone, or email to start your car shipping to Albania or vehicle import quote today.",
      path: "/contact",
      lang: "en",
      hreflang: [
        { lang: "en", path: "/contact" },
        { lang: "sq", path: "/al/kontakt" },
      ],
      xDefault: "/contact",
    }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <InnerPageHero eyebrow="Contact us" title="Ship your car with ease and peace of mind." description="Contact us today for reliable and affordable vehicle sourcing, inspection and shipping services." imageAlt="Durrës port at sunset">
        <Button asChild className="h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
      </InnerPageHero>

      <section className="bg-background">
        <div className="container-page grid gap-10 py-14 md:py-18 lg:grid-cols-5 lg:gap-12">
          {/* Contact card */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card p-8 shadow-card">
              <div className="eyebrow">Reach us</div>
              <h2 className="font-display mt-3 text-2xl font-bold text-secondary">Alpha Worldwide Albania</h2>

              <div className="mt-6 space-y-5">
                <Info icon={MapPin} label="Location">{CONTACT.location}</Info>
                <Info icon={Mail} label="Email">
                  <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "contact_page" })} className="inline-flex min-h-11 items-center break-all text-secondary hover:text-primary">{CONTACT.email}</a>
                </Info>
                <Info icon={Phone} label="Albania">
                  <div className="space-y-1">
                    {CONTACT.phones.map((p) => (
                      <div key={p}><a href={`tel:${p.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "contact_page_albania" })} className="inline-flex min-h-11 items-center text-secondary hover:text-primary">{p}</a></div>
                    ))}
                  </div>
                </Info>
                <Info icon={Phone} label="UAE">
                  <a href={`tel:${CONTACT.uae.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "contact_page_uae" })} className="inline-flex min-h-11 items-center text-secondary hover:text-primary">{CONTACT.uae}</a>
                </Info>
                <Info icon={Clock} label="Hours">{CONTACT.hours}</Info>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-lg border border-border text-secondary hover:border-primary hover:text-primary">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border border-border shadow-card">
              <iframe
                title="Durrës, Albania map"
                src="https://www.google.com/maps?q=Durres,Albania&output=embed"
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block border-0"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="eyebrow">Request a quote</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">Tell us about your vehicle</h2>
            <p className="mt-3 text-muted-foreground">
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
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
