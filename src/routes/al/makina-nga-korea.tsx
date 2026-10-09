import { JourneySteps } from "@/components/site/JourneySteps";
import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, ShieldCheck, FileText, Ship, Container, Landmark, MessageCircle, Calculator, ClipboardCheck, Truck } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/makina-nga-korea")({
  head: () => {
    const base = buildHead({
      title: "Makina nga Koreja e Jugut për Shqipëri | Alpha Worldwide",
      description: "Blerje makinash nga Koreja e Jugut — Encar, Autowini, KB Chachacha dhe shitës të përzgjedhur — me inspektim kur është i mundur dhe transport deri në Portin e Durrësit.",
      path: "/al/makina-nga-korea",
      lang: "sq",
      hreflang: [
        { lang: "en", path: "/import-korea" },
        { lang: "sq", path: "/al/makina-nga-korea" },
      ],
      xDefault: "/import-korea",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Blerja dhe transporti i automjeteve nga Koreja e Jugut",
            description: "Asistencë për blerjen e automjeteve nga Encar, Autowini, KB Chachacha dhe shitës të përzgjedhur në Korenë e Jugut, me transport tokësor lokal, dokumentacion eksporti dhe transport detar drejt Shqipërisë.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/makina-nga-korea`,
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
  component: MakinaNgaKorea,
});

const PLATFORMS_AL = [
  { name: "Encar", body: "Platforma më e njohur e shitjeve në Korenë e Jugut, me një gamë të gjerë modelesh dhe historik dokumentesh." },
  { name: "Autowini", body: "Platformë e specializuar për eksport, me shpallje të orientuara drejt blerësve ndërkombëtarë." },
  { name: "KB Chachacha", body: "Shpallje nga dilerë dhe shitës privatë me histori serviesi të dokumentuar." },
  { name: "Shitës të përzgjedhur", body: "Rrjet dilerësh të verifikuar me akses në stok jashtë platformave publike." },
];

const BENEFITS_AL = [
  { icon: Gauge, text: "Kilometrazh i ulët" },
  { icon: ShieldCheck, text: "Historik i pastër aksidentesh" },
  { icon: FileText, text: "Regjistrime serviesi të plota" },
  { icon: ClipboardCheck, text: "Dokumentacion i strukturuar" },
];

const STEPS_AL = [
  { n: 1, title: "Zgjedhja e automjetit", body: "Na dërgoni një shpallje nga Encar, Autowini ose KB Chachacha, ose na tregoni kriteret tuaja dhe ne ju paraqesim opsione të përzgjedhura." },
  { n: 2, title: "Inspektimi para blerjes", body: "Kur është i mundur, organizohet një inspektim lokal para se të konfirmoni blerjen. Disponueshmëria varet nga vendndodhja e automjetit dhe aksesi i shitësit." },
  { n: 3, title: "Verifikimi i historikut", body: "Shqyrtojmë historikun e automjetit, dokumentet e shitësit dhe të dhënat e serviesit." },
  { n: 4, title: "Blerja e sigurt", body: "Kryejmë procesin e plotë të blerjes — dokumentacion i saktë dhe rrugë të sigurta pagese." },
  { n: 5, title: "Transporti brenda Koresë", body: "Automjeti transportohet nga vendndodhja e shitësit deri në portin e eksportit — zakonisht Busan ose Incheon." },
  { n: 6, title: "Zgjedhja: kontenier ose RoRo", body: "Zgjidhet metoda e transportit detar në varësi të llojit të automjetit dhe disponueshmërisë operative — RoRo nuk është gjithmonë e disponueshme për çdo rrugë." },
  { n: 7, title: "Dokumentacioni i eksportit", body: "Përgatitja e dokumentacionit të eksportit para ngarkimit në anije." },
  { n: 8, title: "Transporti detar drejt Durrësit", body: "Transport detar deri në Portin e Durrësit." },
  { n: 9, title: "Doganë dhe dorëzimi përfundimtar", body: "Koordinojmë dokumentacionin doganor me agjentë të licencuar dhe organizojmë dorëzimin sipas kërkesës suaj." },
];

const INSPECTION_AL = [
  "Vlerësimi i gjendjes së jashtme dhe të brendshme",
  "Vëzhgime për motorin dhe kutinë e shpejtësisë",
  "Kontroll për rrjedhje të dukshme",
  "Vëzhgime për panelet e ripikturuara",
  "Skanim OBD kur është i aksesueshëm",
  "Foto dhe video",
  "Shqyrtim i dokumenteve të shitësit dhe automjetit",
  "Shënime për defektet dhe rekomandime blerjeje",
];

const INCLUDED_AL = [
  "Asistencë për gjetjen dhe blerjen e automjetit",
  "Koordinimi i inspektimit, kur është i mundur",
  "Transport tokësor brenda Koresë deri në portin e eksportit",
  "Dokumentacion eksporti",
  "Transport detar deri në Durrës",
  "Koordinim i dokumentacionit doganor në portin e mbërritjes",
];

const EXCLUDED_AL = [
  "Taksat doganore dhe importi",
  "Regjistrimi dhe homologimi i automjetit në Shqipëri",
  "Dorëzimi përtej portit, nëse nuk kërkohet veçmas",
];

const FAQS_AL = [
  { q: "Nga cilat platforma koreane mund të blej një automjet?", a: "Alpha Worldwide ju ndihmon të blini automjete nga Encar, Autowini, KB Chachacha dhe nga shitës të përzgjedhur në Korenë e Jugut." },
  { q: "Sa e plotë është inspektimi për një automjet nga Koreja?", a: "Për automjetet e përzgjedhura në Korenë e Jugut, Alpha Worldwide mund të organizojë inspektim para blerjes me fotografi, video dhe kontroll teknik. Shtrirja e inspektimit varet nga vendndodhja, aksesi te automjeti dhe shërbimi i kërkuar — jo çdo shpallje mund të inspektohet automatikisht." },
  { q: "Çfarë kontrollohet gjatë inspektimit?", a: "Inspektimi mbulon gjendjen e jashtme dhe të brendshme, vëzhgime për motorin dhe kutinë e shpejtësisë, rrjedhjet e dukshme, panelet e ripikturuara, një skanim OBD kur është i aksesueshëm, foto dhe video, si dhe një shqyrtim të dokumenteve. Inspektimi pasqyron gjendjen e dukshme dhe të aksesueshme në momentin e kontrollit dhe nuk garanton mungesën e defekteve të fshehura ose të ardhshme." },
  { q: "A duhet të zgjedh kontenier apo RoRo?", a: "Transporti me kontenier është zgjedhja e zakonshme drejt Durrësit dhe ofron mbrojtje të plotë. RoRo është një opsion i mundshëm, por disponueshmëria varet nga porti i origjinës, orari i anijes dhe rruga — nuk është gjithmonë e disponueshme. Ne ju konfirmojmë opsionet reale për automjetin tuaj." },
  { q: "Sa kohë zgjat transporti nga Koreja e Jugut në Shqipëri?", a: "Koha e transportit varet nga porti i eksportit (zakonisht Busan ose Incheon), metoda e transportit dhe orari i anijes. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
  { q: "Kush e koordinon zhdoganimin kur mbërrin automjeti nga Koreja?", a: "Koordinojmë dokumentacionin doganor me agjentë të licencuar në Portin e Durrësit — pavarësisht nëse automjeti vjen nga Koreja e Jugut apo nga një origjinë tjetër. Vlerat doganore dhe taksat përcaktohen nga autoriteti doganor, jo nga Alpha Worldwide." },
];

function MakinaNgaKorea() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të blej dhe transportoj një makinë nga Koreja e Jugut.",
  )}`;

  return (
    <>
      <InnerPageHero eyebrow="Import automjetesh nga Koreja e Jugut" title="Blej dhe transporto një makinë nga Koreja e Jugut" description="Ju ndihmojmë të gjeni automjete me kilometrazh të ulët dhe dokumentacion të plotë nga Encar, Autowini, KB Chachacha dhe shitës të përzgjedhur, me transport deri në Portin e Durrësit.">

              <Button asChild className="h-auto min-h-11 whitespace-normal py-3"><a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-korea-hero" })}
                >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a></Button>
              <Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal py-3"><Link
                to="/al/kalkulator-transporti"
                onClick={() => trackEvent("calculator_started", { source: "al-korea-hero" })}
                >
                <Calculator className="h-4 w-4" /> Llogarit koston
              </Link></Button>
            
      </InnerPageHero>

      <section className="section-mist border-y border-border">
        <div className="container-page grid gap-6 py-10 md:grid-cols-4">
          {BENEFITS_AL.map((b) => (
            <div key={b.text} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-secondary">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Nga ku sigurojmë</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Platformat dhe burimet</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS_AL.map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-secondary">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Procesi</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Nga Koreja deri te dera juaj</h2>
          </div>
          <JourneySteps steps={STEPS_AL} stepLabel="Hapi" />
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Inspektimi</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Çfarë kontrollohet, kur është i mundur</h2>
            <p className="mt-4 text-muted-foreground">
              Inspektimi para blerjes ofrohet për automjete të përzgjedhura nga Alpha Worldwide dhe varet nga vendndodhja, aksesi i shitësit dhe disponueshmëria.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-lg border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
              {INSPECTION_AL.map((c) => (
                <li key={c} className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{c}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">
              Inspektimi pasqyron gjendjen e dukshme dhe të aksesueshme në momentin e kontrollit dhe nuk garanton mungesën e defekteve të fshehura ose të ardhshme.
            </p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Metoda e transportit</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">Kontenier ose RoRo</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-7 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
                <Container className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-secondary">Transport me kontenier</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Zgjidhja e zakonshme drejt Durrësit. Ofron mbrojtje të plotë dhe është e përshtatshme për automjete me vlerë të lartë ose të modifikuara.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-7 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-primary">
                <Ship className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-secondary">Transport me RoRo</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                RoRo mund të jetë një opsion më ekonomik për automjete standarde, por disponueshmëria varet nga rruga dhe orari i anijes. Ju konfirmojmë opsionet reale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
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

      <section className="bg-accent border-y border-border">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-primary">Përllogaritje transparente</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">Llogaritni koston para se të filloni</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Kalkulatori ynë përdor tarifat aktuale për transportin nga Koreja e Jugut drejt Shqipërisë, Holandës dhe Gjermanisë.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild className="h-auto min-h-11 whitespace-normal py-3"><Link
              to="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-korea-cta" })}
              >
              <Calculator className="h-4 w-4" /> Hap kalkulatorin
            </Link></Button>
            <Button asChild variant="outline" className="min-h-11 h-auto whitespace-normal py-3"><Link to="/al/kontakt" >
              <Truck className="h-4 w-4" /> Na kontaktoni
            </Link></Button>
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

      <section className="bg-accent border-y border-border">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-primary">Filloni sot</div>
            <h2 className="font-display mt-3 text-3xl font-semibold text-secondary md:text-4xl">
              Na dërgoni një link nga Encar ose Autowini
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              Ndani me ne linkun e shpalljes — ne verifikojmë automjetin, konfirmojmë mundësinë e inspektimit dhe ju paraqesim një ofertë të përgjithshme deri në Durrës.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Landmark className="h-4 w-4 text-primary" />
              Koordinojmë doganën me agjentë të licencuar në Portin e Durrësit.
            </div>
          </div>
          <QuoteForm variant="full" locale="sq" source="al-korea" />
        </div>
      </section>
    </>
  );
}
