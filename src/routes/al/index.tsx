import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, MessageCircle, Calculator, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-home.jpg";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { VEHICLES, OFFICES, CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/")({
  head: () => {
    const base = buildHead({
      title: "Transport Makinash për Shqipëri | Alpha Worldwide",
      description: "Bli, inspekto dhe transporto makinën tënde nga Amerika, Korea dhe Dubai për në Shqipëri — proces i plotë, i besueshëm, me çmim transparent.",
      path: "/al/",
      lang: "sq",
      hreflang: [
        { lang: "en", path: "/" },
        { lang: "sq", path: "/al/" },
      ],
      xDefault: "/",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
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
  component: AlbaniaHome,
});

const ORIGIN_MARKETS_AL = [
  { name: "Amerikë", hook: "Copart · IAAI · Manheim · ADESA", to: "/al/makina-nga-amerika", live: true },
  { name: "Koreja e Jugut", hook: "Encar · Autowini · KB Chachacha", to: "/al/kontakt", live: false },
  { name: "Dubai / EBA", hook: "Dubizzle · Emirates Auction", to: "/al/kontakt", live: false },
];

const SERVICES_AL = [
  { title: "Gjetja dhe blerja e automjetit", body: "Ju ndihmojmë të gjeni dhe të blini automjetin që kërkoni në ankande dhe nga shitës të përzgjedhur." },
  { title: "Inspektimi para blerjes", body: "Kontroll i gjendjes, historikut dhe dokumenteve — para se të vendosni." },
  { title: "Transport me kontenier & RoRo", body: "Transport detar me kontenier ose, kur është i disponueshëm, me RoRo drejt Portit të Durrësit." },
  { title: "Koordinimi doganor dhe dorëzimi", body: "Koordinojmë dokumentacionin doganor dhe procedurat e portit, deri te dorëzimi final." },
];

const STEPS_AL = [
  { n: 1, title: "Zgjidhni makinën", body: "Na dërgoni linkun e automjetit ose numrin e lotit." },
  { n: 2, title: "Inspektimi dhe verifikimi", body: "Kontrollojmë gjendjen dhe dokumentet para blerjes." },
  { n: 3, title: "Blerja ose oferta në ankand", body: "Kryejmë blerjen ose vendosim ofertën në ankand sipas udhëzimeve dhe buxhetit tuaj." },
  { n: 4, title: "Transporti drejt Durrësit", body: "Organizojmë transportin me kontenier ose, kur është i disponueshëm, me RoRo drejt Shqipërisë." },
];

const FAQS_AL = [
  { q: "Si funksionon procesi i blerjes nga Amerika?", a: "Na dërgoni linkun e automjetit ose numrin e lotit nga Copart, IAAI, Manheim ose ADESA. Ne verifikojmë automjetin, kryejmë blerjen dhe organizojmë transportin deri në Portin e Durrësit." },
  { q: "A ofroni inspektim para blerjes?", a: "Po, mundësia e inspektimit varet nga vendndodhja e automjetit, aksesi i shitësit ose ankandit dhe gjendja e makinës. Ju konfirmojmë disponueshmërinë për automjetin specifik që keni zgjedhur." },
  { q: "Sa kohë zgjat transporti deri në Shqipëri?", a: "Koha e transportit varet nga porti i origjinës, metoda e transportit dhe orari i anijes. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
  { q: "A merreni ju me dogana?", a: "Ne koordinojmë dokumentacionin doganor me agjentë të licencuar në Portin e Durrësit. Vlerat doganore dhe taksat përcaktohen nga autoriteti doganor, jo nga Alpha Worldwide." },
];

const ORIGIN_LABELS_AL: Record<string, string> = {
  USA: "Amerikë",
  Korea: "Koreja e Jugut",
  UAE: "Emiratet e Bashkuara Arabe",
  Canada: "Kanada",
  Europe: "Evropë",
};

function AlbaniaHome() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të importoj një makinë në Shqipëri.",
  )}`;
  const durres = OFFICES[1];
  const dubai = OFFICES[0];

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Automjet në terminalin ndërkombëtar të transportit" width={1920} height={1080} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[85vh] flex-col justify-center py-32">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Moving Cars Worldwide</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              Bli, inspekto dhe transporto <span className="text-teal-glow">makinën tënde në Shqipëri</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Ju asistojmë në blerjen, inspektimin dhe transportin e automjeteve nga SHBA-ja, Koreja e Jugut dhe Dubai deri në Portin e Durrësit.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-home-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a>
              <a
                href="/calculator"
                onClick={() => trackEvent("calculator_started", { source: "al-home-hero" })}
                className="btn-outline-light"
              >
                <Calculator className="h-4 w-4" /> Llogarit Koston e Transportit
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Nga ku sigurojmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Tregjet e origjinës</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ORIGIN_MARKETS_AL.map((m) =>
              m.live ? (
                <Link key={m.name} to={m.to} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
                  <h3 className="font-display text-xl font-bold text-navy">{m.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-body">{m.hook}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100">
                    Mëso më shumë <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ) : (
                <Link key={m.name} to="/al/kontakt" className="rounded-2xl border border-dashed border-border bg-mist p-6">
                  <h3 className="font-display text-xl font-bold text-navy">{m.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-body">{m.hook}</p>
                  <div className="mt-4 text-xs font-semibold text-teal">Na kontaktoni për detaje →</div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Çfarë ofrojmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Shërbimet tona</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES_AL.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Si funksionon</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Procesi ynë</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS_AL.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-4xl font-bold text-teal">{String(s.n).padStart(2, "0")}</div>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page flex flex-col items-center gap-6 py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Përllogaritje të qarta, pa hamendësime</div>
          <h2 className="font-display max-w-2xl text-3xl font-bold text-white md:text-5xl">
            Llogarit koston e transportit
          </h2>
          <p className="max-w-xl text-white/70">
            Kalkulatori ynë përdor tarifat aktuale të transportit nga SHBA-ja dhe Koreja e Jugut.
          </p>
          <a
            href="/calculator"
            onClick={() => trackEvent("calculator_started", { source: "al-home-promo" })}
            className="btn-primary"
          >
            <Calculator className="h-4 w-4" /> Hap kalkulatorin
          </a>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Prova, jo premtime</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Automjete të dorëzuara</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {VEHICLES.slice(0, 3).map((v) => (
              <article key={v.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className="aspect-[4/3] overflow-hidden bg-mist">
                  <img src={v.image} alt={`${v.year} ${v.name}`} loading="lazy" width={1200} height={800} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    {ORIGIN_LABELS_AL[v.origin] ?? v.origin} → Shqipëri
                  </div>
                  <h3 className="font-display mt-2 text-lg font-bold text-navy">{v.year} {v.name}</h3>
                  <span className="mt-3 inline-block rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-semibold text-navy">
                    Dorëzuar
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Ku operojmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Prania jonë ndërkombëtare</h2>
            <p className="mt-4 text-slate-body">
              Alpha Worldwide është një kompani ndërkombëtare e specializuar në blerjen, inspektimin dhe transportin e automjeteve, me seli qendrore në Dubai dhe operacione evropiane e shqiptare në Durrës.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <MapPin className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Selia qendrore</h3>
              <p className="mt-1 text-sm text-slate-body">{dubai.city}, Emiratet e Bashkuara Arabe</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <MapPin className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-4 text-xl font-bold text-navy">Operacionet në Evropë</h3>
              <p className="mt-1 text-sm text-slate-body">{durres.city}, Shqipëri</p>
            </div>
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

      <section className="section-dark relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy-deep to-graphite" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Keni gjetur tashmë makinën?
            </h2>
            <p className="mt-5 text-white/70">
              Na dërgoni linkun e automjetit. Ne kontrollojmë informacionin, konfirmojmë mundësinë e inspektimit dhe ju përgatisim një ofertë për transportin.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-2xl">
            <QuoteForm variant="compact" onDark locale="sq" source="al-home" />
          </div>
        </div>
      </section>
    </>
  );
}
