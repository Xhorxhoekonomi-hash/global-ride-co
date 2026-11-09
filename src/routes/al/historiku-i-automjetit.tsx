import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, Gavel, ShieldCheck, Eye, MessageCircle } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const SECTIONS = [
  { icon: FileSearch, title: "Çfarë ju tregon realisht VIN-i", body: "Numri i identifikimit të automjetit (VIN) konfirmon prodhuesin, modelin, vitin dhe detajet e prodhimit të një automjeti konkret. Vetëm ai nuk ju tregon për aksidente, statusin e titullit apo gjendjen — ky informacion vjen nga raporte të veçanta historiku që nxirren me anë të VIN-it." },
  { icon: FileSearch, title: "Carfax dhe AutoCheck", body: "Këto raporte përmbledhin të dhëna të raportuara nga siguruesit, ankandet, DMV-të dhe qendrat e servisit në SHBA dhe Kanada — ndryshime titulli, aksidente të raportuara, lexime kilometrazhi dhe historik servisi kur ekziston. Mbulimi varet tërësisht nga ajo që është raportuar; dëmtimet e paraportuara ose riparimet jozyrtare nuk shfaqen." },
  { icon: Gavel, title: "Historiku i ankandit dhe raportet e gjendjes", body: "Platformat amerikane të ankandeve si Copart dhe IAAI publikojnë vlerësimin e tyre të gjendjes dhe përshkrimet e dëmtimeve për çdo lot. Janë të dobishme, por përgatiten nga vetë ankandi — jo nga një palë e tretë e pavarur — dhe nuk zëvendësojnë inspektimin fizik." },
  { icon: FileSearch, title: "Historiku i automjeteve koreane", body: "Kontrollet teknike periodike të detyrueshme në Kore të Jugut krijojnë një historik servisi dhe gjendjeje më të standardizuar se në shumë tregje të tjera, gjë që shpjegon pjesërisht reputacionin e mirë të mirëmbajtjes së automjeteve koreane. Platforma si Encar publikojnë vlerësime dhe përmbledhje gjendjeje bazuar në këtë." },
  { icon: ShieldCheck, title: "Pse inspektimi mbetet i rëndësishëm", body: "Raportet e historikut dhe vlerësimet e ankandit ju tregojnë çfarë është regjistruar. Ato nuk zëvendësojnë një kontroll fizik për gjendjen mekanike, dëmtime të fshehura ose probleme që nuk kanë hyrë kurrë në ndonjë raport. Prandaj inspektimin e trajtojmë si hap të veçantë dhe plotësues — jo si alternativë të një raporti të mirë historiku." },
  { icon: Eye, title: "Çfarë nuk mund t'ju tregojnë raportet", body: "Asnjë raport nuk mund të konfirmojë gjendjen aktuale mekanike, një problem të ri që ka ndodhur pas përditësimit të fundit të të dhënave, ose një dëmtim që është riparuar pa u raportuar. Ky është një kufizim real i çdo sistemi raportesh historiku, jo vetëm i atyre që përmendëm këtu." },
];

const FAQS = [
  { q: "A është një raport Carfax i pastër garanci që automjeti nuk ka probleme?", a: "Jo. Një raport i pastër do të thotë që nuk u gjetën incidente të raportueshme në bazat e të dhënave që kontrollon — nuk do të thotë që automjeti nuk ka probleme mekanike ose që çdo incident është raportuar ndonjëherë." },
  { q: "A u duhen automjeteve koreane të njëjtat kontrolle historiku si atyre amerikane?", a: "Automjetet koreane përdorin një sistem tjetër raportimi, kryesisht të bazuar te kontrollet periodike të detyrueshme në Kore të Jugut dhe jo te Carfax/AutoCheck. Platforma si Encar e përmbledhin drejtpërdrejt këtë historik dhe vlerësim." },
  { q: "A mund të nxjerrë Alpha Worldwide një raport historiku për mua?", a: "Shqyrtojmë informacionin e disponueshëm për historikun dhe gjendjen e një automjeti konkret para se t'ju rekomandojmë një vendim blerjeje, dhe mund të koordinojmë një inspektim fizik kur kjo është e mundur operacionalisht." },
  { q: "A është inspektimi gjithmonë i mundur para blerjes?", a: "Jo — mundësia e inspektimit varet nga shitësi, ankandi dhe aksesi te automjeti. Konfirmojmë çfarë është realiste për shpalljen tuaj para se të angazhoheni për blerjen." },
];

export const Route = createFileRoute("/al/historiku-i-automjetit")({
  head: () => {
    const base = buildHead({
      title: "Historiku i automjetit: VIN, Carfax | Alpha Worldwide",
      description: "Çfarë mund dhe çfarë nuk mund t'ju tregojnë raportet VIN, Carfax dhe AutoCheck, si ndryshon historiku i automjeteve koreane dhe pse inspektimi fizik shpesh mbetet i nevojshëm.",
      path: "/al/historiku-i-automjetit",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/vehicle-history-check" }, { lang: "sq", path: "/al/historiku-i-automjetit" }],
      xDefault: "/vehicle-history-check",
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Kontrolli i historikut të automjetit i shpjeguar", description: "Çfarë mund dhe nuk mund të tregojnë raportet VIN, Carfax, AutoCheck dhe historiku koreak, dhe kur inspektimi fizik mbetet i nevojshëm.", inLanguage: "sq", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, url: `${SITE_URL}/al/historiku-i-automjetit` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "sq", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: Historiku,
});

const chip = "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal";

function Historiku() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, dua të kuptoj historikun dhe gjendjen e një automjeti që po shqyrtoj.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Historiku i automjetit" }]} />
      <TextHero>
        <div className="max-w-3xl">
          <div className="eyebrow text-primary">Informim për blerësit</div>
          <h1 className="mt-4">Çfarë mund (dhe çfarë nuk mund) t'ju tregojë një raport historiku</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Kontrolli i VIN-it, Carfax, AutoCheck dhe historiku i automjeteve koreane — si funksionojnë, kufizimet e tyre reale dhe pse inspektimi fizik shpesh mbetet i nevojshëm.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="mx-auto max-w-3xl space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title} className="flex gap-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-teal/10 text-teal"><s.icon className="h-5 w-5" /></div>
                <div>
                  <h2 className="text-navy">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <div className="eyebrow">Lexim i lidhur</div>
            <h2 className="mt-3 text-navy">Mësoni më shumë</h2>
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/inspektim-makinash" className={chip}>Shërbimi ynë i inspektimit</Link>
            <Link to="/al/makina-nga-amerika" className={chip}>Blerja nga ankandet amerikane</Link>
            <Link to="/al/makina-nga-korea" className={chip}>Blerja nga Koreja e Jugut</Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <div className="eyebrow">Pyetje</div>
            <h2 className="mt-3 text-navy">Pyetje të shpeshta</h2>
          </div>
          <div className="mt-10 max-w-2xl divide-y divide-border rounded-xl border border-border bg-card">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "vehicle-history-final-cta" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Pyesni për një automjet konkret</a>
        </div>
      </section>
    </>
  );
}
