import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, ShieldCheck, Gauge, FileText, Ship, MessageCircle, Camera } from "lucide-react";
import heroImg from "@/assets/hero-korea.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/encar-shqiperi")({
  head: () => {
    const base = buildHead({
      title: "Encar Shqipëri | Blerje Automjetesh nga Koreja e Jugut",
      description: "Si funksionon Encar, pse automjetet koreane mbahen mirë, dhe si ju ndihmon Alpha Worldwide të blini nga Encar, Autowini dhe KB Chachacha drejt Shqipërisë.",
      path: "/al/encar-shqiperi",
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
            name: "Asistencë për Blerje nga Encar dhe Platforma Koreane",
            description: "Ndihmë për blerjen e automjeteve të listuara në Encar, Autowini dhe KB Chachacha, me shpjegim të gradimit, kilometrazhit dhe procesit të inspektimit.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/encar-shqiperi`,
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
  component: EncarShqiperi,
});

const PLATFORM_DIFFS_AL = [
  { name: "Encar", body: "Platforma më e madhe e shitjes së automjeteve të përdorura në Korenë e Jugut, me raporte të hollësishme gjendjeje dhe historik shërbimi." },
  { name: "Autowini", body: "Fokusuar te blerësit ndërkombëtarë, me shpallje të përkthyera dhe proces eksporti të orientuar për jashtë vendit." },
  { name: "KB Chachacha", body: "Platformë e madhe koreane me gamë të gjerë inventari, përfshirë automjete nga dealerë individualë." },
];

const GRADING_AL = [
  { title: "Gradimi i automjetit", body: "Shitësit koreanë përdorin një sistem gradimi (p.sh. 1–5) që pasqyron gjendjen e jashtme dhe të brendshme të automjetit." },
  { title: "Kilometrazhi", body: "Automjetet koreane priren të kenë kilometrazh më të ulët për shkak të rregullave strikte të inspektimit periodik dhe kulturës së mirëmbajtjes." },
  { title: "Historiku i mirëmbajtjes", body: "Shumica e automjeteve shoqërohen me histori shërbimi të dokumentuar, pasi inspektimet teknike periodike janë të detyrueshme në Korenë e Jugut." },
];

const FAQS_AL = [
  { q: "Çfarë është Encar dhe si ndryshon nga platformat e tjera koreane?", a: "Encar është platforma më e madhe e shitjes së automjeteve të përdorura në Korenë e Jugut, me raporte të hollësishme gjendjeje. Autowini fokusohet te blerësit ndërkombëtarë, ndërsa KB Chachacha ofron një gamë të gjerë inventari nga dealerë individualë." },
  { q: "Pse automjetet nga Koreja e Jugut kanë reputacion të mirë mirëmbajtjeje?", a: "Koreja e Jugut kërkon inspektime teknike periodike të detyrueshme, gjë që kontribuon në histori shërbimi më të dokumentuar dhe kilometrazh mesatarisht më të ulët krahasuar me disa tregje të tjera." },
  { q: "Si funksionon gradimi i automjeteve në platformat koreane?", a: "Shitësit përdorin një sistem gradimi që pasqyron gjendjen e jashtme dhe të brendshme të automjetit, zakonisht i shoqëruar me foto dhe një përshkrim të detajuar të çdo defekti të dukshëm." },
  { q: "A mund të inspektohet çdo automjet nga Encar para blerjes?", a: "Jo automatikisht. Mundësia e inspektimit varet nga vendndodhja e automjetit, aksesi te shitësi dhe shërbimi i kërkuar — konfirmojmë disponueshmërinë për shpalljen specifike përpara se të vendosni." },
  { q: "Çfarë dokumentesh nevojiten për eksport nga Koreja e Jugut?", a: "Zakonisht kërkohen dokumentacioni i pronësisë, certifikata e eksportit dhe dokumente shtesë sipas kërkesave doganore të destinacionit — ju udhëzojmë hap pas hapi." },
];

function EncarShqiperi() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, kam gjetur një automjet në Encar dhe dua ta dërgoj për shqyrtim.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Automjete të përdorura në Korenë e Jugut" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Encar & platformat koreane</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Njihuni me Encar, Autowini dhe KB Chachacha
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Automjetet koreane njihen për mirëmbajtje të mirë dhe histori të dokumentuar. Ju ndihmojmë të kuptoni platformat dhe të gjeni automjetin e duhur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-encar-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Dërgo linkun e Encar
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Platformat koreane</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Cila platformë për cilin automjet</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {PLATFORM_DIFFS_AL.map((p) => (
              <div key={p.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pse zgjedhin shumë blerës Korenë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Gradimi, kilometrazhi dhe mirëmbajtja</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {GRADING_AL.map((g) => (
              <div key={g.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <Gauge className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <Camera className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Inspektimi para blerjes</h2>
              <p className="mt-4 text-slate-body">
                Kur është i mundur, organizojmë inspektim me foto, video dhe kontroll teknik për shpalljen specifike që keni zgjedhur nga Encar, Autowini apo KB Chachacha. Disponueshmëria varet nga vendndodhja e automjetit dhe aksesi te shitësi.
              </p>
            </div>
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Dokumentacioni i eksportit</h2>
              <p className="mt-4 text-slate-body">
                Koordinojmë dokumentacionin e pronësisë, certifikatën e eksportit dhe kërkesat doganore për transportin drejt Shqipërisë, me transport detar RoRo nga Busan ose Incheon.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
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

      <section className="bg-background">
        <div className="container-page py-16 text-center md:py-20">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/inspektim-makinash" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5" /> Shërbimi i inspektimit
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-encar-crosslink" })}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              <Ship className="mr-1.5 inline h-3.5 w-3.5" /> Kalkulatori i transportit
            </a>
            <Link to="/al/kontakt" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Na kontaktoni
            </Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Dërgoni linkun e Encar
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Do ta shqyrtojmë, do ju konfirmojmë mundësinë e inspektimit dhe do ju përgatisim një ofertë të plotë.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-encar" />
        </div>
      </section>
    </>
  );
}
