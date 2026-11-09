import { PhotoGallery } from "@/components/site/PhotoGallery";
import { ALPHA_PHOTOS } from "@/lib/alpha-photos";
import { TextHero } from "@/components/site/PageHero";
import { createFileRoute } from "@tanstack/react-router";
import { Star, MessageCircle, ExternalLink, ShieldCheck } from "lucide-react";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/pervoja-e-klienteve")({
  head: () => buildHead({
    title: "Përvoja e klientëve dhe automjete të dorëzuara | Alpha Worldwide",
    description: "Automjete reale të dorëzuara dhe përvoja klientësh me procesin e Alpha Worldwide për gjetje, inspektim dhe transport nga SHBA, Koreja e Jugut, EBA, Kanadaja dhe Evropa.",
    path: "/al/pervoja-e-klienteve",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/reviews" }, { lang: "sq", path: "/al/pervoja-e-klienteve" }],
    xDefault: "/reviews",
  }),
  component: Pervoja,
});

const GOOGLE = "https://www.google.com/search?q=Alpha+Worldwide+Albania+reviews";

function Pervoja() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, dua të dëgjoj për një dorëzim të fundit të ngjashëm me atë që po planifikoj.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Përvoja e klientëve" }]} />
      <TextHero>
        <div className="max-w-3xl">
          <div className="eyebrow text-primary">Vlerësime dhe automjete të dorëzuara</div>
          <h1 className="mt-4">Vlerësime dhe operacione reale</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Shihni fotot tona origjinale nga operacionet dhe lexoni përvojat e klientëve në Google.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page section-y-tight">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-card">
            <div className="flex items-center gap-1 text-amber-500">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
            <h2 className="text-navy">Shihni çfarë thonë klientët në Google</h2>
            <p className="max-w-md text-sm text-slate-body">Vlerësimet tona të verifikuara në Google janë dëshmia më e freskët dhe e pafiltruar e përvojës së klientëve — ne vendosim lidhjen direkte në vend që të zgjedhim citate këtu.</p>
            <a href={GOOGLE} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "reviews-google-cta" })} className="btn-primary"><ExternalLink className="h-4 w-4" /> Lexoni vlerësimet në Google</a>
          </div>
        </div>
      </section>

      <section className="bg-mist"><div className="container-page py-14 md:py-20"><h2 className="text-secondary">Automjete që kemi trajtuar</h2><p className="mt-4 max-w-2xl text-sm text-muted-foreground">Fotografi origjinale të trajtimit të automjeteve në magazina, porte, kamionë transportues dhe kontenierë.</p><div className="mt-8"><PhotoGallery photos={ALPHA_PHOTOS} limit={6} locale="sq" /></div></div></section>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <div className="eyebrow">Dëshmi klientësh</div>
            <h2 className="mt-3 text-navy">Histori të shkruara klientësh</h2>
          </div>
          <div className="mt-8 max-w-xl rounded-xl border border-dashed border-border bg-mist p-8 text-center">
            <ShieldCheck className="mx-auto h-8 w-8 text-teal" />
            <p className="mt-3 text-sm text-slate-body">Publikojmë vetëm dëshmi që mund t'i verifikojmë si klientë realë të Alpha Worldwide. Historitë e shkruara do të shfaqen këtu sapo të mblidhen — ndërkohë, vlerësimet tona në Google më sipër janë burimi më i freskët.</p>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Lini një vlerësim</div>
          <h2 className="mx-auto mt-3 max-w-2xl text-white">Keni punuar tashmë me ne?</h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">Një vlerësim në Google u ndihmon blerësve të tjerë që po mendojnë të njëjtën rrugë që zgjodhët ju — dhe na tregon si ia dolëm.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={GOOGLE} target="_blank" rel="noreferrer noopener" className="btn-primary"><ExternalLink className="h-4 w-4" /> Lini një vlerësim në Google</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "reviews-final-cta" })} className="btn-outline-light"><MessageCircle className="h-4 w-4" /> Na pyesni çfarëdo</a>
          </div>
        </div>
      </section>
    </>
  );
}
