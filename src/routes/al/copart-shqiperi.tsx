import { createFileRoute, Link } from "@tanstack/react-router";
import { Hash, Camera, ShieldAlert, Gavel, DollarSign, Truck, Container, FileText, Landmark, MessageCircle, Calculator, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/copart-shqiperi")({
  head: () => {
    const base = buildHead({
      title: "Copart Shqipëri — Blerje makinash nga Copart | Alpha Worldwide",
      description: "Blini automjete nga Copart për Shqipëri me asistencë në ofertim, tërheqje nga oborri, transport tokësor e detar dhe koordinim dokumentesh deri në Portin e Durrësit.",
      path: "/al/copart-shqiperi",
      lang: "sq",
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
            name: "Blerje automjetesh në Copart për Shqipëri",
            description: "Asistencë për ofertim dhe blerje në Copart, tërheqje nga oborri i ankandit, transport tokësor deri në terminalin e eksportit, transport detar me kontenier dhe koordinim dokumentesh deri në Portin e Durrësit.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/copart-shqiperi`,
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
  component: CopartShqiperi,
});

const HOW_IT_WORKS_AL = [
  { icon: Hash, title: "Dërgoni numrin e lotit", body: "Na tregoni numrin e lotit Copart ose ndani linkun e shpalljes që ju intereson." },
  { icon: Camera, title: "Shqyrtojmë shpalljen bashkë", body: "Kalojmë me ju fotot, raportin e gjendjes dhe informacionin e titullit — pa u mbështetur vetëm në përshkrimin e ankandit." },
  { icon: DollarSign, title: "Konfirmojmë buxhetin dhe limitin", body: "Ju vendosni limitin maksimal të ofertës dhe autorizoni ofertimin me shkrim." },
  { icon: Gavel, title: "Vendosim ofertën në ankand", body: "Alpha Worldwide ofertohet përmes akseseve të tij në Copart, brenda limitit që keni caktuar." },
  { icon: Truck, title: "Tërheqja nga oborri", body: "Pas fitimit, koordinojmë pagesën dhe tërheqjen nga oborri i Copart brenda afateve të ankandit." },
  { icon: Container, title: "Transport tokësor dhe detar", body: "Automjeti transportohet drejt terminalit të eksportit dhe niset me kontenier drejt Durrësit." },
  { icon: FileText, title: "Dokumentacioni doganor", body: "Koordinojmë dokumentacionin e eksportit dhe dokumentet doganore me agjentë të licencuar në Durrës." },
];

const PHOTO_VS_INSPECTION_AL = [
  "Fotot dhe raporti i gjendjes në Copart janë pikë-nisje, jo një inspektim i pavarur.",
  "Ato pasqyrojnë çfarë ka fotografuar oborri i ankandit dhe jo çdo defekt është i dukshëm në foto.",
  "Për disa lote, mund të organizohet një inspektim i pavarur ose foto shtesë — mundësia varet nga vendndodhja e lotit dhe aksesi i lejuar në oborr.",
  "Për lote me dëme strukturore ose me tituj të ndryshëm nga 'clean', rekomandojmë të diskutojmë rreziqet përpara ofertimit.",
];

const FEES_NOTE_AL = [
  "Çmimi i fituar në ankand nuk është kostoja totale.",
  "Copart aplikon tarifa blerësi (buyer fee), tarifa porti dhe të tjera — të cilat varen nga çmimi i fitimit dhe nga lloji i llogarisë.",
  "Krahas tarifave të Copart, kostoja totale përfshin transportin tokësor deri në terminalin e eksportit, transportin detar dhe koordinimin doganor në Durrës.",
  "Kalkulatori ynë llogarit të gjitha zërat kryesorë me tarifat aktuale para se të vendosni ofertën.",
];

const WE_GUARANTEE_AL = [
  "Ofertim brenda limitit që keni caktuar me shkrim.",
  "Ndjekje të plotë të tarifave, afateve të pagesës dhe të tërheqjes.",
  "Koordinim të transportit dhe të dokumentacionit doganor.",
];

const WE_DO_NOT_GUARANTEE_AL = [
  "Gjendjen mekanike të automjetit — nuk garantojmë mungesën e defekteve të fshehura.",
  "Fitimin e një loti specifik — ankandi është konkurrues.",
  "Vlerat doganore dhe taksat — përcaktohen nga autoriteti doganor në Durrës, jo nga Alpha Worldwide.",
];

const FAQS_AL = [
  { q: "A jeni partner zyrtar i Copart?", a: "Alpha Worldwide ofron asistencë për blerjen përmes Copart nëpërmjet akseseve profesionale dhe brokerëve të licencuar. Nuk pretendojmë partneritet zyrtar me Copart si markë." },
  { q: "A mund të ofertoj vetë në Copart pa një ndërmjetës?", a: "Copart lejon blerje kryesisht përmes anëtarëve me llogari profesionale. Për blerësit privatë ndërkombëtarë, aksesimi bëhet përmes një brokeri të licencuar — të cilin Alpha Worldwide e siguron." },
  { q: "Sa është limiti maksimal i ofertës që mund të caktoj?", a: "Ju caktoni limitin maksimal që ndiheni rehat të paguani. Ne ofertohemi brenda atij limiti dhe nuk e kalojmë asnjëherë pa autorizim me shkrim." },
  { q: "Fotot e Copart tregojnë çdo defekt të automjetit?", a: "Jo. Fotot dhe raporti i gjendjes janë të dobishme, por nuk zëvendësojnë një inspektim të pavarur. Për disa lote mund të organizohet inspektim shtesë — na pyesni për lotin që ju intereson." },
  { q: "Sa kohë kam për të paguar dhe për të tërhequr automjetin?", a: "Copart aplikon afate të rrepta për pagesën dhe tërheqjen pas fitimit. Ne ju paralajmërojmë për këto afate përpara ofertimit dhe koordinojmë pagesën dhe tërheqjen brenda kohës së kërkuar." },
  { q: "Çfarë ndodh nëse loti ka titull 'salvage' ose 'flood'?", a: "Këta tituj sinjalizojnë dëme të mëparshme dhe ndikojnë në vlerën, si dhe në doganën në destinacion. Ne i diskutojmë me ju rreziqet përpara ofertimit dhe nuk rekomandojmë të ofertoni pa i kuptuar plotësisht." },
];

function CopartShqiperi() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të blej një makinë në Copart për Shqipëri. Ky është numri i lotit ose linku:",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Oborr ankandi automjetesh në SHBA" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Copart për Shqipëri</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Blej në Copart, dorëzo në Durrës
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Asistencë e plotë për ofertim në Copart nga Shqipëria — nga verifikimi i lotit deri te dorëzimi në portin e Durrësit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-copart-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Dërgo numrin e lotit
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "al-copart-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Llogarit koston totale
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Si funksionon</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Blerja në Copart me Alpha Worldwide</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HOW_IT_WORKS_AL.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="eyebrow">Foto ankandi vs. inspektim</div>
              <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">
                Fotot e Copart nuk janë inspektim
              </h2>
            </div>
            <div className="mt-10 rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-teal" />
                <span className="font-semibold text-navy">Çfarë të keni parasysh</span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-body">
                {PHOTO_VS_INSPECTION_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="eyebrow">Kostoja totale</div>
              <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Tarifat e Copart dhe transporti</h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <h3 className="font-display text-lg font-bold text-navy">Çfarë hyn në çmim</h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-body">
                  {FEES_NOTE_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <h3 className="font-display text-lg font-bold text-navy">Përllogaritja e detajuar</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-body">
                  Kalkulatori ynë ndan çdo zë: ofertën fituese, tarifat e Copart, transportin tokësor deri në terminalin e eksportit, transportin detar deri në Durrës dhe shkarkimin në port.
                </p>
                <Link
                  to="/calculator"
                  onClick={() => trackEvent("calculator_started", { source: "al-copart-fees" })}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
                >
                  Hap kalkulatorin <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page grid gap-6 py-20 md:grid-cols-2 md:py-24">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">Çfarë garantojmë</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {WE_GUARANTEE_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">Çfarë nuk garantojmë</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
              {WE_DO_NOT_GUARANTEE_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-navy/40">•</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pyetje</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Pyetje të shpeshta për Copart</h2>
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

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Faqe të lidhura</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Vazhdoni të lexoni</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
            <Link to="/al/makina-nga-amerika" className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <div className="font-display text-base font-bold text-navy">Makina nga Amerika</div>
              <p className="mt-1.5 text-xs text-slate-body">Hubi i përgjithshëm i importit nga SHBA-ja.</p>
            </Link>
            <Link to="/al/iaai-shqiperi" className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <div className="font-display text-base font-bold text-navy">IAAI Shqipëri</div>
              <p className="mt-1.5 text-xs text-slate-body">Platforma tjetër kryesore e ankandeve.</p>
            </Link>
            <Link to="/al/kontakt" className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <div className="font-display text-base font-bold text-navy">Kontakt</div>
              <p className="mt-1.5 text-xs text-slate-body">Na dërgoni lotin dhe kërkoni një ofertë.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Dërgoni numrin e lotit të Copart
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na dërgoni numrin e lotit ose linkun e shpalljes në Copart. Ne shqyrtojmë lotin dhe ju përgjigjemi me një përllogaritje totale deri në Durrës.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
              <Landmark className="h-4 w-4 text-teal" />
              Dokumentacioni doganor koordinohet në Portin e Durrësit.
            </div>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-copart" />
        </div>
      </section>
    </>
  );
}
