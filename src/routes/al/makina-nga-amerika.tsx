import { PHOTO_SELECTIONS } from "@/lib/alpha-photos";
import { JourneySteps } from "@/components/site/JourneySteps";
import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Gavel, ShieldCheck, FileText, Truck, Ship, Landmark, MessageCircle, Calculator, Package } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/makina-nga-amerika")({
  head: () => {
    const base = buildHead({
      title: "Makina nga Amerika për Shqipëri | Alpha Worldwide",
      description: "Blerje makinash nga Amerika — Copart, IAAI, Manheim dhe ADESA — me inspektim, dokumentacion dhe transport deri në Portin e Durrësit.",
      path: "/al/makina-nga-amerika",
      lang: "sq",
      hreflang: [
        { lang: "en", path: "/import-usa" },
        { lang: "sq", path: "/al/makina-nga-amerika" },
      ],
      xDefault: "/import-usa",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Blerja dhe transporti i automjeteve nga SHBA-ja",
            description: "Asistencë për blerjen e automjeteve në ankande dhe nga shitës të përzgjedhur në SHBA, me transport tokësor, dokumentacion eksporti dhe transport detar drejt Shqipërisë.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/makina-nga-amerika`,
            inLanguage: "sq",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS_AL.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: MakinaNgaAmerika,
});

const STEPS_AL = [
  { n: 1, icon: Search, title: "Zgjedhja e lotit", body: "Na dërgoni numrin e lotit ose linkun e shpalljes." },
  { n: 2, icon: Gavel, title: "Verifikimi i shpalljes", body: "Shqyrtojmë shpalljen, raportin e gjendjes dhe historikun." },
  { n: 3, icon: ShieldCheck, title: "Inspektimi, kur është i mundur", body: "Mundësia e inspektimit varet nga vendndodhja, aksesi i shitësit dhe gjendja e makinës." },
  { n: 4, icon: Gavel, title: "Asistencë për blerjen ose ankandin", body: "Vendosim ofertën ose kryejmë blerjen sipas autorizimit dhe buxhetit tuaj." },
  { n: 5, icon: FileText, title: "Pagesa dhe dokumentacioni", body: "Koordinim i pagesës dhe dokumentacionit në çdo hap." },
  { n: 6, icon: Truck, title: "Tërheqja e automjetit nga ankandi", body: "Automjeti merret nga oborri i ankandit ose i shitësit." },
  { n: 7, icon: Truck, title: "Transporti tokësor", body: "Transportohet drejt terminalit të eksportit më të përshtatshëm." },
  { n: 8, icon: FileText, title: "Dokumentacioni i eksportit", body: "Përgatitja e dokumentacionit të eksportit para ngarkimit." },
  { n: 9, icon: Package, title: "Ngarkimi në kontenier", body: "Ngarkim në kontenier të përbashkët ose të dedikuar." },
  { n: 10, icon: Ship, title: "Transporti detar", body: "Transport detar me kontenier ose, kur është i disponueshëm, me RoRo drejt Shqipërisë." },
  { n: 11, icon: Landmark, title: "Dorëzimi përfundimtar", body: "Koordinojmë dokumentacionin doganor, procedurat e portit dhe dorëzimin përfundimtar sipas shërbimit të kërkuar." },
];

const INCLUDED_AL = [
  "Asistencë për gjetjen dhe blerjen e automjetit",
  "Ndihmë në ankand ose blerje",
  "Transport tokësor deri në terminal",
  "Transport detar deri në Durrës",
];

const EXCLUDED_AL = [
  "Taksat doganore dhe importi",
  "Regjistrimi dhe homologimi i automjetit",
  "Dorëzimi përtej portit, nëse nuk kërkohet veçmas",
];

const FAQS_AL = [
  { q: "Nga cilat platforma amerikane mund të blej një automjet?", a: "Alpha Worldwide ju ndihmon të blini automjete në Copart, IAAI, Manheim, ADESA dhe nga shitës të përzgjedhur." },
  { q: "A do të inspektohet automjeti para blerjes?", a: "Mundësia e inspektimit varet nga vendndodhja e automjetit, aksesi i shitësit ose ankandit dhe gjendja e makinës. Nuk garantohet për çdo automjet — ju konfirmojmë disponueshmërinë për lotin specifik." },
  { q: "Sa kohë zgjat transporti nga Amerika në Shqipëri?", a: "Koha e transportit varet nga porti i origjinës, metoda e transportit dhe orari i anijes. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
  { q: "A merreni ju me doganën në Durrës?", a: "Koordinojmë dokumentacionin doganor me agjentë të licencuar në Portin e Durrësit. Vlerat doganore dhe taksat përcaktohen nga autoriteti doganor, jo nga Alpha Worldwide." },
];

function MakinaNgaAmerika() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të blej dhe transportoj një makinë nga Amerika.",
  )}`;

  return (
    <>
      <InnerPageHero eyebrow="Import automjetesh nga SHBA-ja" title="Blej dhe transporto një makinë nga Amerika" description="Alpha Worldwide ju ndihmon të blini automjete nga Copart, IAAI, Manheim, ADESA dhe shitës të përzgjedhur, duke organizuar transportin deri në Shqipëri." image={PHOTO_SELECTIONS.porsche.src} imageAlt={PHOTO_SELECTIONS.porsche.sq}>

              <Button asChild className="h-auto min-h-11 whitespace-normal py-3"><a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-usa-hero" })}
                >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a></Button>
              <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><Link
                to="/al/kalkulator-transporti"
                onClick={() => trackEvent("calculator_started", { source: "al-usa-hero" })}
                >
                <Calculator className="h-4 w-4" /> Llogarit koston
              </Link></Button>
            
      </InnerPageHero>

      <PlatformBadges locale="sq" />

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Procesi në 11 hapa</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Nga ankandi deri te dera juaj</h2>
          </div>
          <JourneySteps steps={STEPS_AL} stepLabel="Hapi" />
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-24">
          <div className="rounded-lg border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-secondary">Çfarë përfshihet</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {INCLUDED_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-secondary">Çfarë nuk përfshihet</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {EXCLUDED_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-muted-foreground">•</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pyetje</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Pyetje të shpeshta</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-lg border border-border bg-card">
            {FAQS_AL.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="min-h-11 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-secondary">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Faqe të lidhura</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">Vazhdoni të lexoni</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
            <Link to="/al/copart-shqiperi" className="group rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary">
              <div className="font-display text-base font-bold text-secondary">Copart Shqipëri</div>
              <p className="mt-1.5 text-xs text-muted-foreground">Ofertim dhe blerje në Copart me asistencë të plotë.</p>
            </Link>
            <Link to="/al/iaai-shqiperi" className="group rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary">
              <div className="font-display text-base font-bold text-secondary">IAAI Shqipëri</div>
              <p className="mt-1.5 text-xs text-muted-foreground">Blerje në IAAI, nga leximi i lotit deri në Durrës.</p>
            </Link>
            <Link to="/al/kalkulator-transporti" className="group rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary">
              <div className="font-display text-base font-bold text-secondary">Kalkulatori</div>
              <p className="mt-1.5 text-xs text-muted-foreground">Llogaritni koston deri në Durrës me tarifat aktuale.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-accent border-y border-border">

        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-primary">Filloni sot</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">
              Na dërgoni lotin ose linkun e automjetit
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Na dërgoni numrin e lotit nga Copart ose IAAI, shpalljen nga Manheim ose ADESA, ose linkun e automjetit.
            </p>
          </div>
          <QuoteForm variant="full" locale="sq" source="al-usa" />
        </div>
      </section>
    </>
  );
}
