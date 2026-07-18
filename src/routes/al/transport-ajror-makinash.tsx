import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Clock, ShieldCheck, FileText, Package, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/transport-ajror-makinash")({
  head: () => {
    const base = buildHead({
      title: "Transport Ajror Makinash | Alpha Worldwide",
      description: "Transport ajror për automjete luksoze, klasike, ose me urgjencë kohore — përmes aeroporteve kryesore evropiane të mallrave, me koordinim doganor dhe sigurim.",
      path: "/al/transport-ajror-makinash",
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
            name: "Transport Ajror Automjetesh",
            description: "Koordinim i transportit ajror për automjete me vlerë të lartë ose urgjencë kohore, përmes aeroporteve kryesore evropiane të mallrave.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/transport-ajror-makinash`,
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
  component: TransportAjrorMakinash,
});

const USE_CASES_AL = [
  { title: "Automjete luksoze", body: "Për automjete me vlerë të lartë ku minimizimi i kohës në tranzit dhe rreziku i trajtimit është prioritet." },
  { title: "Automjete klasike", body: "Automjete koleksioni ose historike, ku kujdesi dhe shpejtësia e transportit janë veçanërisht të rëndësishme." },
  { title: "Dërgesa urgjente", body: "Kur afati kohor nuk lejon transport detar, transporti ajror ofron një alternativë të shpejtë." },
];

const AIRPORTS_AL = [
  { name: "Amsterdam Schiphol", verified: true },
  { name: "Milano Malpensa", verified: true },
  { name: "Leipzig", verified: true },
];

const CONSIDERATIONS_AL = [
  { icon: FileText, title: "Dogana", body: "Koordinojmë dokumentacionin doganor me agjentë të licencuar në aeroportin e mbërritjes." },
  { icon: Package, title: "Përgatitja e ngarkesës ajrore", body: "Automjeti përgatitet sipas kërkesave të kompanisë ajrore dhe terminalit të mallrave përpara ngarkimit." },
  { icon: ShieldCheck, title: "Mallra të rrezikshme", body: "Disa komponentë të automjetit (si bateritë e mëdha) mund t'i nënshtrohen rregullave specifike për mallra të rrezikshëm — i verifikojmë këto përpara rezervimit." },
  { icon: Clock, title: "Tranziti", body: "Koordinojmë kalimin nga aeroporti i origjinës në atë të destinacionit dhe më tej transportin tokësor drejt Shqipërisë." },
];

const FAQS_AL = [
  { q: "Kur rekomandohet transporti ajror për automjete?", a: "Transporti ajror rekomandohet për automjete luksoze ose klasike me vlerë të lartë, si dhe për dërgesa urgjente kur afati kohor nuk lejon transport detar." },
  { q: "Nëpër cilat aeroporte evropiane keni përvojë trajtimi?", a: "Kemi përvojë koordinimi përmes Amsterdam Schiphol, Milano Malpensa dhe Leipzig. Trajtimi në aeroporte të tjera evropiane mund të koordinohet me kërkesë." },
  { q: "A garantoni një kohë të saktë tranziti?", a: "Jo. Koha e tranzitit varet nga disponueshmëria e fluturimit, kërkesat doganore dhe kapaciteti i terminalit të mallrave — ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
  { q: "A ka kufizime për llojin e automjetit që mund të transportohet ajrit?", a: "Disa komponentë, si bateritë e mëdha të automjeteve elektrike, mund t'i nënshtrohen rregullave për mallra të rrezikshëm. I verifikojmë këto kërkesa për automjetin tuaj specifik përpara se të konfirmojmë rezervimin." },
  { q: "A përfshihet sigurimi në transportin ajror?", a: "Sigurimi koordinohet si pjesë e procesit të transportit — ju informojmë për opsionet e disponueshme kur konfirmojmë detajet e dërgesës." },
  { q: "A merreni me doganën në destinacion?", a: "Koordinojmë dokumentacionin doganor me agjentë të licencuar në aeroportin e mbërritjes. Vlerat doganore dhe taksat përcaktohen nga autoriteti doganor, jo nga Alpha Worldwide." },
];

function TransportAjrorMakinash() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua informacion për transportin ajror të automjetit tim.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Aeroplan mallrash në aeroport evropian" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Transport ajror</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Kur shpejtësia ka rëndësi më shumë se kostoja
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Për automjete luksoze, klasike, ose dërgesa urgjente — koordinojmë transportin ajror përmes aeroporteve kryesore evropiane të mallrave.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-airfreight-hero" })}
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
            <div className="eyebrow">Kur përdoret</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Raste tipike përdorimi</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {USE_CASES_AL.map((u) => (
              <div key={u.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <Plane className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Ku trajtojmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Rrjeti ynë i aeroporteve</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {AIRPORTS_AL.map((a) => (
              <div key={a.name} className="rounded-2xl border border-teal/40 bg-card p-6 text-center shadow-card">
                <Plane className="mx-auto h-6 w-6 text-teal" />
                <h3 className="font-display mt-3 text-base font-bold text-navy">{a.name}</h3>
                <p className="mt-1 text-xs text-slate-body">Trajtim i verifikuar</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-body">
            Trajtimi mund të koordinohet edhe në aeroporte të tjera evropiane të mallrave, sipas konfirmimit.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Çfarë duhet ditur</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Dogana, përgatitja dhe tranziti</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONSIDERATIONS_AL.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{c.body}</p>
              </div>
            ))}
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
            <Link to="/al/transport-me-kontenier" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti me kontenier
            </Link>
            <Link to="/al/transport-roro" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti RoRo
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-airfreight-crosslink" })}
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
              Kërkoni ofertë për transport ajror
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na tregoni automjetin dhe afatin kohor — do ju konfirmojmë mundësinë dhe hapat e mëtejshëm.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-airfreight" />
        </div>
      </section>
    </>
  );
}
