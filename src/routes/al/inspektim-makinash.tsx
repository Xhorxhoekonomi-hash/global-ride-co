import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Gauge, Wrench, Battery, Zap, FileCheck, MessageCircle, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/inspektim-makinash")({
  head: () => {
    const base = buildHead({
      title: "Inspektim Makinash | SHBA dhe Koreja e Jugut | Alpha Worldwide",
      description: "Shërbimi i inspektimit para blerjes i Alpha Worldwide për automjete nga SHBA-ja dhe Koreja e Jugut — kontroll teknik, foto, video dhe raport i detajuar.",
      path: "/al/inspektim-makinash",
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
            name: "Shërbimi i Inspektimit të Automjeteve",
            description: "Inspektim para blerjes për automjete nga ankande dhe shitës të përzgjedhur në SHBA dhe Korenë e Jugut — kontroll teknik, foto, video dhe rekomandime blerjeje.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/inspektim-makinash`,
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
  component: InspektimMakinash,
});

const CHECKS_AL = [
  { icon: Wrench, title: "Motori dhe transmisioni", body: "Vëzhgim vizual dhe teknik i motorit, kutisë së shpejtësisë dhe rrjedhjeve të mundshme." },
  { icon: Gauge, title: "Skanimi OBD", body: "Kontroll diagnostik OBD kur automjeti është i aksesueshëm, për të identifikuar kode gabimi." },
  { icon: Camera, title: "Matësi i bojës", body: "Kontroll i paneleve për ripikturime ose riparime të mëparshme trupore." },
  { icon: ShieldCheck, title: "Dëmtime strukturore", body: "Vlerësim i shasisë dhe zonave kryesore strukturore për shenja dëmtimi të konsiderueshëm." },
  { icon: FileCheck, title: "Interiori dhe elektronika", body: "Kontroll i ndenjëseve, panelit të instrumenteve dhe funksioneve kryesore elektronike." },
  { icon: Wrench, title: "Sistemi i pezullimit", body: "Vëzhgim i komponentëve të pezullimit për konsum ose dëmtim të dukshëm." },
  { icon: Gauge, title: "Test drive", body: "Provë drejtimi kur është e mundur, për të vlerësuar performancën e përgjithshme." },
  { icon: Battery, title: "Bateria", body: "Kontroll i gjendjes së baterisë standarde të automjetit." },
  { icon: Zap, title: "Ngarkimi (EV)", body: "Për automjetet elektrike, kontroll i sistemit të ngarkimit kur është i aksesueshëm." },
];

const DELIVERABLES_AL = [
  "Raport i shkruar me vërejtjet kryesore",
  "Foto të detajuara të gjendjes së automjetit",
  "Video e përgjithshme e automjetit",
  "Rekomandim nëse blerja rekomandohet apo jo",
];

const FAQS_AL = [
  { q: "A ofroni inspektim për automjete nga SHBA-ja dhe Koreja e Jugut?", a: "Po. Ofrojmë koordinim inspektimi si për automjete nga ankande amerikane (Copart, IAAI, Manheim, ADESA), ashtu edhe për automjete nga platforma koreane (Encar, Autowini, KB Chachacha) dhe shitës të përzgjedhur." },
  { q: "A mund të inspektohet çdo automjet?", a: "Jo. Mundësia e inspektimit varet nga shitësi, ankandi, dhe aksesi te automjeti. Disa automjete — veçanërisht ato në oborre ankandi me akses të kufizuar — mund të mos jenë të disponueshme për inspektim të plotë." },
  { q: "Çfarë përfshin raporti i inspektimit?", a: "Raporti përfshin gjendjen e motorit dhe transmisionit, skanim OBD kur është i mundur, kontroll të bojës dhe strukturës, gjendjen e interiorit dhe elektronikës, si dhe një provë drejtimi kur lejohet. Merrni foto, video dhe një rekomandim të qartë." },
  { q: "A garantoni mungesën e defekteve të fshehura?", a: "Jo. Inspektimi pasqyron gjendjen e dukshme dhe të aksesueshme në momentin e kontrollit dhe nuk garanton mungesën e defekteve të fshehura ose të ardhshme." },
  { q: "A inspektohen automjetet elektrike ndryshe?", a: "Për automjetet elektrike ose hibride, shtojmë kontroll të gjendjes së baterisë dhe sistemit të ngarkimit, kur automjeti është i aksesueshëm për këtë lloj kontrolli." },
  { q: "Sa kohë duhet për të marrë rezultatet e inspektimit?", a: "Koha varet nga vendndodhja e automjetit dhe disponueshmëria e inspektorit lokal. Ju japim një afat të përafërt sapo të konfirmojmë disponueshmërinë për shpalljen tuaj specifike." },
];

function InspektimMakinash() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të kërkoj inspektim për një automjet.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Inspektim teknik automjeti" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Shërbimi i inspektimit</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Dini gjendjen e vërtetë të automjetit para se të blini
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Kontroll teknik, foto dhe video për automjete nga ankande dhe shitës të përzgjedhur në SHBA dhe Korenë e Jugut.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-inspection-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kërko inspektim
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Çfarë kontrollohet</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Kontrolli teknik hap pas hapi</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKS_AL.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Çfarë merrni</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Rezultatet e inspektimit</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {DELIVERABLES_AL.map((d) => (
                <li key={d} className="flex gap-2"><FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{d}</li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-body">
              Inspektimi pasqyron gjendjen e dukshme dhe të aksesueshme në momentin e kontrollit dhe nuk garanton mungesën e defekteve të fshehura ose të ardhshme. Mundësia e inspektimit varet nga shitësi, ankandi, dhe aksesi te automjeti — jo çdo automjet mund të inspektohet.
            </p>
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

      <section className="section-mist">
        <div className="container-page py-16 text-center md:py-20">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/ankande-amerikane" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Ankandet amerikane
            </Link>
            <Link to="/al/encar-shqiperi" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Encar Shqipëri
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-inspection-crosslink" })}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              Kalkulatori i transportit
            </a>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Kërkoni inspektim për automjetin tuaj
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na dërgoni linkun ose numrin e lotit — do ju konfirmojmë mundësinë e inspektimit dhe hapat e mëtejshëm.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-inspection" />
        </div>
      </section>
    </>
  );
}
