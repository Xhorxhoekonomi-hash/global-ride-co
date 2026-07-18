import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ShieldCheck, Lock, Ship, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/transport-me-kontenier")({
  head: () => {
    const base = buildHead({
      title: "Transport me Kontenier | Automjete drejt Shqipërisë",
      description: "Si funksionon transporti me kontenier për automjete — 20ft, 40ft HC, kontenier i përbashkët apo i dedikuar — nga SHBA-ja, Koreja e Jugut, Dubai, Kanadaja dhe Evropa drejt Shqipërisë.",
      path: "/al/transport-me-kontenier",
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
            name: "Transport Automjetesh me Kontenier",
            description: "Transport detar me kontenier të përbashkët ose të dedikuar për automjete nga SHBA-ja, Koreja e Jugut, Dubai, Kanadaja dhe Evropa drejt Shqipërisë.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/transport-me-kontenier`,
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
  component: TransportMeKontenier,
});

const CONTAINER_TYPES_AL = [
  { title: "Kontenier 20ft", body: "I përshtatshëm zakonisht për një automjet standard, me hapësirë të kufizuar për ngarkesa shtesë." },
  { title: "Kontenier 40ft HC", body: "Lartësi më e madhe (High Cube), i përshtatshëm për automjete më të larta ose për ngarkim të dy mjeteve në disa raste." },
  { title: "Kontenier i përbashkët", body: "Automjeti ndahet me automjete të tjerë të klientëve të tjerë, në varësi të orarit dhe hapësirës së disponueshme." },
  { title: "Kontenier i dedikuar", body: "Kontenier vetëm për automjetin (ose automjetet) tuaj, me kontroll më të madh mbi ngarkimin dhe orarin." },
];

const ADVANTAGES_AL = [
  "Mbrojtje e plotë nga elementet gjatë transportit detar",
  "Rrezik më i ulët dëmtimi krahasuar me transportin e hapur",
  "I përshtatshëm për automjete me vlerë të lartë ose të modifikuara",
  "Mundësi konsolidimi për të ulur koston për automjet",
];

const FAQS_AL = [
  { q: "Cila është dallimi mes 20ft dhe 40ft HC?", a: "Kontenieri 20ft është zakonisht i mjaftueshëm për një automjet standard, ndërsa 40ft HC (High Cube) ka lartësi më të madhe dhe hapësirë shtesë, e përshtatshme për automjete më të larta ose në disa raste për më shumë se një automjet." },
  { q: "Çfarë do të thotë kontenier i përbashkët?", a: "Automjeti juaj transportohet në të njëjtin kontenier me automjete të klientëve të tjerë, çka zakonisht ul koston, por varet nga orari dhe disponueshmëria e hapësirës." },
  { q: "Si sigurohet automjeti brenda kontenierit?", a: "Automjeti fiksohet me rripa dhe pajisje sigurimi për të parandaluar lëvizjen gjatë transportit detar, sipas standardeve të ngarkimit që përdorim për çdo dërgesë." },
  { q: "Nga cilat vende mund të transportohet automjeti me kontenier?", a: "Ofrojmë transport me kontenier nga SHBA-ja, Koreja e Jugut, Dubai, Kanadaja dhe Evropa drejt Shqipërisë." },
  { q: "Kur rekomandohet kontenieri i dedikuar në vend të atij të përbashkët?", a: "Kontenieri i dedikuar rekomandohet për automjete me vlerë të lartë, automjete të modifikuara, ose kur keni nevojë për kontroll më të madh mbi orarin e ngarkimit dhe nisjes." },
  { q: "Sa kohë zgjat tranziti me kontenier?", a: "Koha varet nga porti i origjinës, rruga detare dhe orari i anijes. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
];

function TransportMeKontenier() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua informacion për transportin me kontenier të automjetit tim.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Kontenier transporti në terminal portual" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Transport me kontenier</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Mbrojtje e plotë për automjetin tuaj gjatë transportit detar
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Kontenier 20ft, 40ft HC, i përbashkët ose i dedikuar — zgjedhim opsionin e duhur për automjetin tuaj nga SHBA-ja, Koreja e Jugut, Dubai, Kanadaja ose Evropa.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-container-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Llojet e kontenierëve</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Cili kontenier për automjetin tuaj</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {CONTAINER_TYPES_AL.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <Package className="h-5 w-5" />
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Ngarkimi dhe sigurimi</h2>
              <p className="mt-4 text-slate-body">
                Automjeti ngarkohet dhe fiksohet me rripa e pajisje sigurimi brenda kontenierit, për të parandaluar lëvizjen gjatë tranzitit detar. Procesi respekton standardet e ngarkimit që aplikojmë për çdo dërgesë.
              </p>
            </div>
            <div>
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                <Ship className="h-5 w-5" />
              </div>
              <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Tranziti</h2>
              <p className="mt-4 text-slate-body">
                Pas ngarkimit, kontenieri transportohet me anije drejt portit të destinacionit. Koha e tranzitit varet nga rruga, terminali dhe orari i anijes — ju japim një afat të përafërt përpara rezervimit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Avantazhet</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Pse zgjedhin klientët kontenierin</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-card p-7 shadow-card">
            <ul className="grid gap-2.5 text-sm text-slate-body sm:grid-cols-2">
              {ADVANTAGES_AL.map((a) => (
                <li key={a} className="flex gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{a}</li>
              ))}
            </ul>
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
            <Link to="/al/transport-roro" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti RoRo
            </Link>
            <Link to="/al/transport-ajror-makinash" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti ajror
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-container-crosslink" })}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              <Calculator className="mr-1.5 inline h-3.5 w-3.5" /> Kalkulatori i transportit
            </a>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Kërkoni ofertë për kontenier
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na tregoni origjinën dhe automjetin — ju rekomandojmë llojin e duhur të kontenierit.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-container" />
        </div>
      </section>
    </>
  );
}
