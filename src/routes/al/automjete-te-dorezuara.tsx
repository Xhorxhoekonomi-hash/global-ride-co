import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, MessageCircle, Ship } from "lucide-react";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { PageHero } from "@/components/site/PageHero";
import { PhotoGallery } from "@/components/site/PhotoGallery";
import { ALPHA_PHOTOS } from "@/lib/alpha-photos";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/al/automjete-te-dorezuara")({
  head: () => buildHead({
    title: "Automjete të dorëzuara | Alpha Worldwide Albania",
    description: "Automjete reale të gjetura, inspektuara dhe transportuara nga Alpha Worldwide — Rolls-Royce, Ferrari, Porsche, Mercedes dhe të tjera, të dorëzuara në Shqipëri dhe Evropë.",
    path: "/al/automjete-te-dorezuara",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/delivered-vehicles" }, { lang: "sq", path: "/al/automjete-te-dorezuara" }],
    xDefault: "/delivered-vehicles",
  }),
  component: AutomjeteTeDorezuara,
});

function AutomjeteTeDorezuara() {
  return <>
    <PageHero breadcrumbs={[{ label: "Automjete të dorëzuara" }]} eyebrow="Dorëzime dhe përditësime" title="Automjete që kemi trajtuar" description="Fotografi origjinale nga operacionet tona të trajtimit dhe transportit të automjeteve.">
      <Button asChild><a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noopener noreferrer"><Instagram /> Dorëzimet tona në Instagram <ArrowRight /></a></Button>
      <Button asChild variant="outline" className="min-h-12"><Link to="/al/kontakt">Merr një ofertë</Link></Button>
    </PageHero>
    <section className="bg-background">
      <div className="container-page py-12 md:py-16">
        <p className="text-xs font-semibold text-primary">Foto origjinale të Alpha Worldwide</p>
        <h2 className="mt-3 text-secondary">Galeria e trajtimit dhe transportit të automjeteve</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Automjete të fotografuara nga ekipi ynë në magazina, porte, kamionë transportues dhe brenda kontenierëve.</p>
        <div className="mt-8"><PhotoGallery photos={ALPHA_PHOTOS} locale="sq" /></div>
      </div>
    </section>
    <section className="border-t border-border bg-background">
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-2">
        <div className="min-w-0">
          <Ship className="h-9 w-9 text-primary" aria-hidden="true" />
          <h2 className="mt-5 text-secondary">Automjeti juaj. Udhëtimi i radhës.</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">Na tregoni për automjetin që po mendoni dhe ku duhet të shkojë. Ekipi ynë mund të shqyrtojë me ju gjetjen, mundësinë e inspektimit dhe opsionet e transportit.</p>
          <Button asChild variant="link" className="mt-5 h-auto min-h-11 px-0"><Link to="/al/si-funksionon">Njihuni me procesin e importit <ArrowRight /></Link></Button>
        </div>
        <div className="min-w-0 border-l-2 border-primary pl-6">
          <p className="text-xs font-semibold text-primary">Flisni drejtpërdrejt me ekipin</p>
          <h2 className="mt-4 text-secondary">E keni gjetur tashmë automjetin?</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Dërgoni shpalljen ose lotin e ankandit për të diskutuar transportin, ose shihni një përllogaritje me kalkulatorin tonë për SHBA-në dhe Korenë e Jugut.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="min-h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></Button>
            <Button asChild variant="outline"><Link to="/al/kalkulator-transporti">Llogarit transportin <ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  </>;
}
