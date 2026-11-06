import { PageHero } from "@/components/site/PageHero";
import { SILVER_FERRARI_YARD } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Eye, FileCheck, ShoppingBag, CreditCard, FileText, Ship, Anchor, Landmark, PackageCheck, MessageCircle, Calculator } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const STEPS = [
  { n: 1, icon: Search, title: "Zgjidhni automjetin", body: "Na dërgoni një shpallje, një lot ankandi ose kriteret e kërkimit — nga Copart, IAAI, Manheim, ADESA, Encar, Autowini, KB Chachacha ose nga një tregtar në SHBA, Kore të Jugut, EBA, Kanada apo Evropë.", trust: "Nuk jeni të kufizuar në një platformë të vetme — punojmë në të gjitha tregjet që mbulojmë." },
  { n: 2, icon: Eye, title: "Inspektimi i automjetit", body: "Kur është e mundur operacionalisht, koordinojmë një inspektim para blerjes me foto, video dhe kontroll teknik.", trust: "Mundësia e inspektimit varet nga shitësi, ankandi dhe aksesi te automjeti — e konfirmojmë para se të angazhoheni, jo pas." },
  { n: 3, icon: FileCheck, title: "Verifikimi i historikut", body: "Shqyrtojmë informacionin e disponueshëm për titullin, gjendjen dhe historikun e automjetit konkret para se t'ju rekomandojmë një vendim blerjeje.", trust: "Fotot e ankandit dhe raportet e gjendjes nuk janë njësoj si një inspektim i pavarur — jemi të qartë se cilin prej tyre po merrni." },
  { n: 4, icon: ShoppingBag, title: "Blerja", body: "Bëjmë ofertën ose blerjen në emrin tuaj, brenda buxhetit dhe udhëzimeve tuaja." },
  { n: 5, icon: CreditCard, title: "Pagesa", body: "Pagesa dhe dokumentet koordinohen në çdo hap, me një ndarje të qartë të kostove para se të angazhohen fondet." },
  { n: 6, icon: FileText, title: "Dokumentet e eksportit", body: "Përgatisim dokumentet e eksportit sipas vendit të origjinës para se automjeti të niset drejt portit ose aeroportit." },
  { n: 7, icon: Ship, title: "Transporti", body: "Automjeti transportohet me kontenier, me RoRo kur është i disponueshëm operacionalisht, ose me transport ajror për dërgesa urgjente apo me vlerë të lartë.", trust: "Ju japim një përllogaritje reale dhe të detajuar të transportit — kurrë një premtim të paqartë — dhe e konfirmojmë orarin para rezervimit." },
  { n: 8, icon: Anchor, title: "Mbërritja", body: "Kur automjeti mbërrin në portin ose aeroportin e destinacionit, koordinojmë trajtimin dhe e përgatisim për lirim." },
  { n: 9, icon: Landmark, title: "Koordinimi doganor", body: "Koordinojmë dokumentet doganore me agjentë vendas të licencuar.", trust: "Vlerat doganore, taksat dhe vendimet për zhdoganimin përcaktohen nga autoriteti doganor përkatës — jo nga Alpha Worldwide." },
  { n: 10, icon: PackageCheck, title: "Marrja e automjetit", body: "Pasi zhdoganohet, automjeti është gati për t'u marrë ose për t'u dorëzuar në adresën tuaj." },
];

export const Route = createFileRoute("/al/si-funksionon")({
  head: () => {
    const base = buildHead({
      title: "Si funksionon importi i automjetit | Alpha Worldwide",
      description: "Procesi i plotë i Alpha Worldwide hap pas hapi — nga zgjedhja e automjetit deri te marrja, me inspektim, blerje, eksport, transport dhe koordinim doganor të shpjeguar qartë.",
      path: "/al/si-funksionon",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/how-it-works" }, { lang: "sq", path: "/al/si-funksionon" }],
      xDefault: "/how-it-works",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Si funksionon procesi i importit të automjetit me Alpha Worldwide",
            description: "Procesi hap pas hapi për gjetjen, inspektimin, blerjen dhe transportin ndërkombëtar të një automjeti me Alpha Worldwide.",
            inLanguage: "sq",
            step: STEPS.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.title, text: s.body })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Procesi i importit të automjetit",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            url: `${SITE_URL}/al/si-funksionon`,
            inLanguage: "sq",
          }),
        },
      ],
    };
  },
  component: SiFunksionon,
});

function SiFunksionon() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të kuptoj procesin tuaj para se të filloj.",
  )}`;

  return (
    <>
      <PageHero scene={SILVER_FERRARI_YARD.sq} breadcrumbs={[{ label: "Si funksionon" }]} eyebrow="Si funksionon" title="Nga zgjedhja e automjetit te marrja — dhjetë hapa, një ekip" description="Çdo hap i shpjeguar me ndershmëri, përfshirë rastet kur disponueshmëria dhe kohët varen nga faktorë jashtë kontrollit tonë.">
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><Link to="/al/kalkulator-transporti">Llogarit koston</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            {STEPS.map((s, i) => (
              <div key={s.n}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-primary bg-card text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    {i < STEPS.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-10">
                    <div className="text-xs font-bold uppercase tracking-normal text-primary">Hapi {s.n}</div>
                    <h2 className="mt-1 text-secondary">{s.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                    {s.trust && <p className="mt-2 rounded-lg bg-mist px-3 py-2 text-xs text-muted-foreground">{s.trust}</p>}
                  </div>
                </div>
                {(s.n === 2 || s.n === 4 || s.n === 6 || s.n === 8) && (
                  <div className="mb-10 ml-[68px] flex flex-wrap gap-3">
                    <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => trackEvent("whatsapp_clicked", { source: `how-it-works-step-${s.n}` })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> Na pyesni për këtë hap
                    </a></Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent border-y border-border">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-primary">Gati për të filluar?</div>
          <h2 className="mx-auto mt-3 max-w-2xl text-secondary">Na dërgoni automjetin tuaj të parë</h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="h-auto min-h-11 whitespace-normal py-3"><a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "how-it-works-final-cta" })}>
              <MessageCircle className="h-4 w-4" /> Na shkruani në WhatsApp
            </a></Button>
            <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><Link to="/al/kalkulator-transporti" onClick={() => trackEvent("calculator_started", { source: "how-it-works-final-cta" })}>
              <Calculator className="h-4 w-4" /> Llogarit koston
            </Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
