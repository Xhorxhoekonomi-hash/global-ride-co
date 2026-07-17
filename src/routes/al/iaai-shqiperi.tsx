import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, Info, ScrollText, MessageCircle, Calculator, ArrowRight, Ship, ClipboardList, Wallet, Truck, Landmark } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/iaai-shqiperi")({
  head: () => {
    const base = buildHead({
      title: "IAAI Shqipëri — Blerje makinash nga IAAI | Alpha Worldwide",
      description: "Blerje automjetesh në IAAI për Shqipëri me asistencë në ankand, tërheqje nga oborri, transport tokësor dhe detar deri në Portin e Durrësit dhe koordinim dokumentesh.",
      path: "/al/iaai-shqiperi",
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
            name: "Blerje automjetesh në IAAI për Shqipëri",
            description: "Asistencë për seleksionim, ofertim dhe blerje në IAAI, tërheqje nga oborri, transport tokësor dhe detar drejt Portit të Durrësit dhe koordinim dokumentesh.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/iaai-shqiperi`,
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
  component: IaaiShqiperi,
});

const SELECTION_AL = [
  "Pika-nisje është seleksionimi i lotit që përputhet me kërkesat tuaja — markë, model, vit, buxhet.",
  "IAAI liston automjete nga një gamë e gjerë burimesh — sigurime, dilerë dhe qeveri — dhe titujt mund të ndryshojnë ndjeshëm nga loti në lot.",
  "Së bashku me ju, shqyrtojmë shpalljen, vlerësimin dhe informacionin e disponueshëm përpara se të konfirmoni interesin.",
];

const SALE_INFO_AL = [
  { title: "Lloji i titullit", body: "Titulli 'clean', 'salvage', 'rebuilt' ose 'parts only' ndryshon në mënyrë të konsiderueshme vlerën, mundësinë e regjistrimit dhe koston doganore. Ne ju shpjegojmë dallimet përpara ofertimit." },
  { title: "Informacioni i dëmit primar dhe sekondar", body: "IAAI shënon zonën kryesore dhe dytësore të dëmit. Këto janë tregues të parë, jo një diagnozë e plotë mekanike." },
  { title: "Kilometrazhi dhe statusi i tij", body: "Statusi 'actual', 'not actual' ose 'exempt' është informacion i rëndësishëm — ne ju theksojmë çdo shënim që ka rëndësi për Shqipërinë." },
  { title: "Chargat dhe përgjegjësia e blerësit", body: "Çmimi fitues nuk përfshin tarifat e IAAI, tarifat e portit dhe transportin — të cilat i llogarisim veçmas së bashku." },
];

const BIDDING_AL = [
  { icon: FileSearch, title: "Verifikimi i lotit", body: "Shqyrtojmë 'Sale Information', historikun dhe fotot përpara ofertimit." },
  { icon: Wallet, title: "Autorizimi i limitit", body: "Ju konfirmoni me shkrim limitin maksimal që jeni gati të paguani për automjetin." },
  { icon: ScrollText, title: "Ofertim dhe ndjekje", body: "Ofertohemi brenda limitit që keni caktuar, ndjekim ankandin dhe ju raportojmë rezultatin." },
  { icon: Truck, title: "Tërheqja dhe transporti", body: "Pas fitimit, koordinojmë pagesën, tërheqjen nga oborri i IAAI dhe transportin tokësor deri në terminalin e eksportit." },
];

const INSPECTION_AL = [
  "IAAI ofron foto zyrtare të lotit dhe informacion nga oborri, por këto nuk zëvendësojnë një inspektim të pavarur.",
  "Për disa lote — sidomos kur oborri i IAAI e lejon — mund të organizohet inspektim shtesë ose foto të orientuara ndaj kërkesave tuaja.",
  "Disponueshmëria e inspektimit varet nga vendndodhja e lotit dhe rregullat e oborrit specifik.",
  "Për lote me dëme të mëdha ose me tituj jo-clean, ne rekomandojmë të diskutojmë rreziqet përpara ofertimit.",
];

const SHIPPING_AL = [
  { icon: Truck, title: "Nga oborri në terminal", body: "Transport tokësor deri në portin më të përshtatshëm të eksportit në SHBA." },
  { icon: Ship, title: "Detar me kontenier", body: "Transport detar me kontenier deri në Portin e Durrësit — zgjidhja standarde për Shqipërinë." },
  { icon: ClipboardList, title: "Dokumentacioni i eksportit", body: "Titulli, faturat e IAAI dhe dokumentet e nevojshme përgatiten para nisjes së anijes." },
  { icon: Landmark, title: "Doganë në Durrës", body: "Dokumentacioni doganor koordinohet me agjentë të licencuar. Taksat dhe vlerat caktohen nga autoriteti doganor." },
];

const INCLUDED_AL = [
  "Verifikim i lotit dhe informacionit të ankandit",
  "Ofertim brenda limitit tuaj të autorizuar",
  "Pagesë dhe tërheqje nga oborri i IAAI",
  "Transport tokësor deri në terminal",
  "Transport detar me kontenier deri në Durrës",
  "Koordinim i dokumentacionit doganor",
];

const EXCLUDED_AL = [
  "Taksat doganore dhe importi",
  "Regjistrimi dhe homologimi në Shqipëri",
  "Riparime ose kontrolle mekanike pas dorëzimit",
];

const FAQS_AL = [
  { q: "Si dallohet IAAI nga Copart për blerësit shqiptarë?", a: "Të dyja janë ankande të mëdha me profil të ngjashëm blerësi. IAAI ka mikse pak të ndryshme lotesh dhe procedura pagese e tërheqjeje që u përshtaten disa blerësve më mirë. Ne punojmë me të dyja dhe ju rekomandojmë platformën më të mirë për lotin që kërkoni." },
  { q: "Çfarë do të thotë 'Sale Information' në IAAI?", a: "Është seti i të dhënave të lotit: titulli, dëmi primar dhe sekondar, kilometrazhi, statusi i çelësit dhe informacioni për shitësin. E kalojmë me ju përpara ofertimit që të mos ketë surpriza." },
  { q: "A mund të ofertoj vetë në IAAI si blerës privat nga Shqipëria?", a: "IAAI aksesohet kryesisht përmes blerësve me llogari profesionale ose brokerëve të licencuar. Alpha Worldwide siguron aksesin dhe ofertohet në emrin tuaj brenda limitit që keni caktuar." },
  { q: "A janë fotot e IAAI të mjaftueshme për të vendosur?", a: "Fotot dhe informacioni i shitjes janë të dobishme, por nuk zëvendësojnë një inspektim të pavarur. Për disa lote mund të organizohet inspektim shtesë, në varësi të oborrit dhe rregullave lokale." },
  { q: "Sa kohë kam nga fitimi deri te tërheqja?", a: "IAAI ka afate të përcaktuara për pagesën dhe tërheqjen, të cilat ndryshojnë sipas oborrit. Ju paralajmërojmë përpara ofertimit dhe menaxhojmë pagesën dhe tërheqjen brenda kohës së kërkuar." },
  { q: "Sa zgjat transporti nga IAAI në Durrës?", a: "Koha totale varet nga oborri i IAAI, terminali i nisjes dhe orari i anijes. Ju konfirmojmë një afat të përafërt përpara rezervimit të transportit." },
];

function IaaiShqiperi() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të blej një makinë në IAAI për Shqipëri. Ky është numri i lotit ose linku:",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Oborr ankandi automjetesh IAAI në SHBA" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">IAAI për Shqipëri</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Seleksiono lotin. Ne kujdesemi për pjesën tjetër.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Asistencë e strukturuar për IAAI — nga leximi i 'Sale Information' deri te transporti detar drejt Portit të Durrësit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-iaai-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Dërgo lotin
              </a>
              <Link
                to="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "al-iaai-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Vlerëso koston
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="eyebrow">Zgjedhja e lotit</div>
              <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Nga kërkesa juaj te loti i duhur</h2>
            </div>
            <ul className="mt-10 space-y-3 text-sm leading-relaxed text-slate-body">
              {SELECTION_AL.map((s) => (
                <li key={s} className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Sale Information</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Si të lexoni informacionin e lotit</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            {SALE_INFO_AL.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Ofertimi</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Si ofertohemi për ju</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {BIDDING_AL.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-base font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="eyebrow">Inspektimi</div>
              <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">A mund të inspektohet një lot IAAI?</h2>
            </div>
            <div className="mt-10 rounded-2xl border border-border bg-card p-7 shadow-card">
              <ul className="space-y-2.5 text-sm leading-relaxed text-slate-body">
                {INSPECTION_AL.map((i) => <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Transporti</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Nga oborri i IAAI në Durrës</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SHIPPING_AL.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-mist p-6 text-center shadow-card">
            <p className="text-sm leading-relaxed text-slate-body">
              Kostoja totale përfshin çmimin e fitimit, tarifat e IAAI, transportin tokësor, transportin detar dhe shkarkimin në Durrës. Kalkulatori ynë i llogarit të gjitha zërat kryesorë.
            </p>
            <Link
              to="/calculator"
              onClick={() => trackEvent("calculator_started", { source: "al-iaai-shipping" })}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline"
            >
              Hap kalkulatorin <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-mist">
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

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pyetje</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Pyetje të shpeshta për IAAI</h2>
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
            <Link to="/al/copart-shqiperi" className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <div className="font-display text-base font-bold text-navy">Copart Shqipëri</div>
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
              Dërgoni lotin e IAAI
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na dërgoni numrin e lotit ose linkun në IAAI. Ne shqyrtojmë 'Sale Information' dhe ju kthejmë një ofertë deri në Durrës.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-iaai" />
        </div>
      </section>
    </>
  );
}
