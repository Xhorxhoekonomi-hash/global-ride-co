import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin, Mail } from "lucide-react";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead } from "@/lib/seo";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/al/kontakt")({
  head: () =>
    buildHead({
      title: "Na kontaktoni | Alpha Worldwide",
      description: "Kontaktoni ekipin tonë në Durrës për një ofertë falas për blerjen, inspektimin dhe transportin e automjetit tuaj.",
      path: "/al/kontakt",
      lang: "sq",
      hreflang: [
        { lang: "en", path: "/contact" },
        { lang: "sq", path: "/al/kontakt" },
      ],
      xDefault: "/contact",
      image: heroImg,
    }),
  component: KontaktAL,
});

function KontaktAL() {
  const durres = OFFICES[1];
  const dubai = OFFICES[0];

  return (
    <>
      <InnerPageHero eyebrow="Na kontaktoni" title="Transportoni makinën tuaj me siguri dhe transparencë" description="Na kontaktoni për një ofertë të qartë dhe të detajuar për blerjen, inspektimin dhe transportin e automjetit." imageAlt="Terminal portual për transportin ndërkombëtar të automjeteve">
        <Button asChild className="h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
      </InnerPageHero>

      <section className="bg-background">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Kontakti</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">Na shkruani</h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-secondary">{durres.role.replace("European & Albanian Operations", "Operacionet në Evropë dhe Shqipëri")}</div>
                  <div className="text-sm text-muted-foreground">{durres.city}, Shqipëri</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {durres.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "al-kontakt-durres" })} className="inline-flex min-h-11 items-center hover:text-primary">{p}</a>
                        {i < durres.phones.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-muted-foreground">Selia qendrore — {dubai.city}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <a href={`tel:${dubai.phone.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "al-kontakt-dubai" })} className="inline-flex min-h-11 items-center hover:text-primary">{dubai.phone}</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-semibold text-secondary">Email</div>
                  <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "al-kontakt" })} className="inline-flex min-h-11 items-center break-all text-sm text-muted-foreground hover:text-primary">{CONTACT.email}</a>
                </div>
              </div>
            </div>
          </div>

          <QuoteForm variant="full" locale="sq" source="al-contact" />
        </div>
      </section>
    </>
  );
}
