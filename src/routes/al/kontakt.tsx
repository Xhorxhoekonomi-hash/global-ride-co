import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail } from "lucide-react";
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
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Terminal portual për transportin ndërkombëtar të automjeteve" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[55vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Na kontaktoni</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Transportoni makinën tuaj me siguri dhe transparencë
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Na kontaktoni për një ofertë të qartë dhe të detajuar për blerjen, inspektimin dhe transportin e automjetit.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Kontakti</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Na shkruani</h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <div className="font-semibold text-navy">{durres.role.replace("European & Albanian Operations", "Operacionet në Evropë dhe Shqipëri")}</div>
                  <div className="text-sm text-slate-body">{durres.city}, Shqipëri</div>
                  <div className="mt-1 text-sm text-slate-body">
                    {durres.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "al-kontakt-durres" })} className="hover:text-teal">{p}</a>
                        {i < durres.phones.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal/50" />
                <div>
                  <div className="font-semibold text-navy/70">Selia qendrore — {dubai.city}</div>
                  <div className="mt-1 text-sm text-slate-body">
                    <a href={`tel:${dubai.phone.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: "al-kontakt-dubai" })} className="hover:text-teal">{dubai.phone}</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                <div>
                  <div className="font-semibold text-navy">Email</div>
                  <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "al-kontakt" })} className="text-sm text-slate-body hover:text-teal">{CONTACT.email}</a>
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
