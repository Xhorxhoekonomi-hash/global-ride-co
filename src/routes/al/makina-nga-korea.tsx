import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, ShieldCheck, FileText, Ship, Container, Landmark, MessageCircle, Calculator, ClipboardCheck, Truck } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
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
      image: heroImg,
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
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Port në Korenë e Jugut" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[65vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import automjetesh nga Koreja e Jugut</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Blej dhe transporto një makinë nga Koreja e Jugut
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Ju ndihmojmë të gjeni automjete me kilometrazh të ulët dhe dokumentacion të plotë nga Encar, Autowini, KB Chachacha dhe shitës të përzgjedhur, me transport deri në Portin e Durrësit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-korea-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "al-korea-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Llogarit koston
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist border-y border-border">
        <div className="container-page grid gap-6 py-10 md:grid-cols-4">
          {BENEFITS_AL.map((b) => (
            <div key={b.text} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/15 text-teal">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold text-navy">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Nga ku sigurojmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Platformat dhe burimet</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PLATFORMS_AL.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Procesi</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Nga Koreja deri te dera juaj</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS_AL.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-5xl font-bold text-teal">{String(s.n).padStart(2, "0")}</div>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Inspektimi</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Çfarë kontrollohet, kur është i mundur</h2>
            <p className="mt-4 text-slate-body">
              Inspektimi para blerjes ofrohet për automjete të përzgjedhura nga Alpha Worldwide dhe varet nga vendndodhja, aksesi i shitësit dhe disponueshmëria.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {INSPECTION_AL.map((c) => (
                <li key={c} className="flex gap-2"><ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{c}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-body">
              Inspektimi pasqyron gjendjen e dukshme dhe të aksesueshme në momentin e kontrollit dhe nuk garanton mungesën e defekteve të fshehura ose të ardhshme.
            </p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Metoda e transportit</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Kontenier ose RoRo</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <Container className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Transport me kontenier</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                Zgjidhja e zakonshme drejt Durrësit. Ofron mbrojtje të plotë dhe është e përshtatshme për automjete me vlerë të lartë ose të modifikuara.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <Ship className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Transport me RoRo</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-body">
                RoRo mund të jetë një opsion më ekonomik për automjete standarde, por disponueshmëria varet nga rruga dhe orari i anijes. Ju konfirmojmë opsionet reale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-24">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">Çfarë përfshihet</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {INCLUDED_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">Çfarë nuk përfshihet</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {EXCLUDED_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-navy/40">•</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Përllogaritje transparente</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">Llogaritni koston para se të filloni</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Kalkulatori ynë përdor tarifat aktuale për transportin nga Koreja e Jugut drejt Shqipërisë, Holandës dhe Gjermanisë.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/calculator"
              onClick={() => trackEvent("calculator_started", { source: "al-korea-cta" })}
              className="btn-primary"
            >
              <Calculator className="h-4 w-4" /> Hap kalkulatorin
            </Link>
            <Link to="/al/kontakt" className="btn-outline-light">
              <Truck className="h-4 w-4" /> Na kontaktoni
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pyetje</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Pyetje të shpeshta</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS_AL.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                  {f.q}
                  <span className="text-teal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Na dërgoni një link nga Encar ose Autowini
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Ndani me ne linkun e shpalljes — ne verifikojmë automjetin, konfirmojmë mundësinë e inspektimit dhe ju paraqesim një ofertë të përgjithshme deri në Durrës.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Landmark className="h-4 w-4 text-teal" />
              Koordinojmë doganën me agjentë të licencuar në Portin e Durrësit.
            </div>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-korea" />
        </div>
      </section>
    </>
  );
}
