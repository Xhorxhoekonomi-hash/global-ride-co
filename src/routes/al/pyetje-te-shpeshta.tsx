import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

type FaqItem = { q: string; a: string; to: string; label: string };
type Category = { name: string; items: FaqItem[] };

const CATEGORIES: Category[] = [
  { name: "SHBA", items: [
    { q: "Nga cilat platforma amerikane mund të blej?", a: "Alpha Worldwide i asiston klientët në blerjen e automjeteve përmes Copart, IAAI, Manheim, ADESA dhe tregtarëve të përzgjedhur.", to: "/al/makina-nga-amerika", label: "Udhëzuesi i plotë për SHBA-në" },
    { q: "A më duhet llogari në një ankand amerikan?", a: "Jo — si ndërmjetës, ne bëjmë ofertën dhe blerjen në emrin tuaj, kështu që nuk ju duhet llogari ankandi, adresë apo llogari bankare në SHBA.", to: "/al/ankande-amerikane", label: "Si funksionon aksesi në ankande" },
  ] },
  { name: "Koreja e Jugut", items: [
    { q: "Nga cilat platforma koreane mund të blej?", a: "I asistojmë klientët me automjete të listuara në Encar, Autowini, KB Chachacha dhe te tregtarë koreanë të miratuar.", to: "/al/makina-nga-korea", label: "Udhëzuesi i plotë për Korenë e Jugut" },
    { q: "Pse automjetet koreane kanë reputacion të mirë mirëmbajtjeje?", a: "Koreja e Jugut kërkon kontrolle teknike periodike të detyrueshme, gjë që kontribuon në më shumë historik servisi të dokumentuar dhe zakonisht kilometrazh më të ulët.", to: "/al/makina-nga-korea", label: "Detaje për Korenë e Jugut" },
  ] },
  { name: "Dubai", items: [
    { q: "A është çdo automjet nga Dubai automjet luksoz?", a: "Jo — megjithëse Dubai njihet për makina luksoze dhe supermakina, ka edhe automjete standarde pasagjerësh, SUV dhe inventar tregtarësh.", to: "/al/makina-nga-dubai", label: "Udhëzuesi i plotë për EBA/Dubain" },
  ] },
  { name: "Transport me kontenier", items: [
    { q: "Kontenier i përbashkët apo i plotë — cili është ndryshimi?", a: "Kontenieri i përbashkët e bashkon automjetin tuaj me të tjerë dhe zakonisht është më ekonomik. Kontenieri i plotë është vetëm për dërgesën tuaj, me më shumë kontroll mbi ngarkimin.", to: "/al/transport-me-kontenier", label: "Detaje për transportin me kontenier" },
  ] },
  { name: "RoRo", items: [
    { q: "Çfarë i duhet automjetit për transport RoRo?", a: "Automjeti duhet të jetë mjaftueshëm funksional për të hyrë në anije me forcën e vet, me pak karburant dhe bateri që punon.", to: "/al/transport-roro", label: "Detaje për transportin RoRo" },
  ] },
  { name: "Transport ajror", items: [
    { q: "Kur ka kuptim transporti ajror?", a: "Për afate urgjente ose automjete me vlerë jashtëzakonisht të lartë, kur kostoja shtesë justifikohet nga shpejtësia ose trajtimi më i kufizuar.", to: "/al/transport-ajror-makinash", label: "Detaje për transportin ajror" },
  ] },
  { name: "Inspektimi", items: [
    { q: "A mund të inspektohet çdo automjet para blerjes?", a: "Jo — mundësia e inspektimit varet nga shitësi, ankandi dhe aksesi te automjeti. Konfirmojmë çfarë është e mundur për shpalljen tuaj para se të angazhoheni.", to: "/al/inspektim-makinash", label: "Çfarë përfshijnë inspektimet tona" },
  ] },
  { name: "Pagesat", items: [
    { q: "Si funksionon pagesa?", a: "Ju japim një ndarje transparente dhe të detajuar të kostove para çdo pagese, dhe fondet lirohen për blerjen vetëm pasi të keni miratuar automjetin dhe çmimin.", to: "/al/kontakt", label: "Flisni me ekipin tonë" },
  ] },
  { name: "Dokumentet e importit", items: [
    { q: "Çfarë dokumentesh nevojiten zakonisht për një import?", a: "Zakonisht faturë blerjeje, dokument pronësie ose regjistrimi, dokumente eksporti nga vendi i origjinës, konosament (bill of lading) dhe dokumente doganore sipas destinacionit. Kërkesat e sakta ndryshojnë sipas automjetit dhe destinacionit.", to: "/al/kontakt", label: "Pyesni për rastin tuaj" },
  ] },
  { name: "Gjendja e automjetit", items: [
    { q: "A janë fotot e ankandit njësoj si një inspektim?", a: "Jo. Fotot dhe raportet e gjendjes në ankand nuk janë të barasvlershme me një inspektim të pavarur — jemi gjithmonë të qartë se cili prej tyre vlen për një automjet të caktuar.", to: "/al/inspektim-makinash", label: "Detaje për inspektimin e pavarur" },
  ] },
  { name: "Blerja në ankand", items: [
    { q: "A jeni pronarë apo partnerë zyrtarë të platformave të ankandeve?", a: "Jo. I asistojmë klientët në blerjet përmes këtyre platformave dhe nuk jemi partner zyrtar i asnjërës prej tyre, përveç rasteve kur deklarohet veçmas dhe shprehimisht.", to: "/al/ankande-amerikane", label: "Aksesi në ankande i shpjeguar" },
  ] },
  { name: "Kohët e transportit", items: [
    { q: "Çfarë e përcakton kohëzgjatjen e transportit?", a: "Koha e tranzitit varet nga porti i nisjes, mënyra e transportit dhe orari i anijes — japim një interval të përgjithshëm si orientim dhe konfirmojmë një përllogaritje të saktë pasi të rezervohet rruga juaj, kurrë një datë të garantuar.", to: "/al/kalkulator-transporti", label: "Përllogaritni koston e transportit" },
  ] },
  { name: "Koordinimi doganor", items: [
    { q: "A e kryeni ju zhdoganimin në emrin tim?", a: "Koordinojmë dokumentet doganore me agjentë vendas të licencuar në portin e destinacionit. Vlerat doganore, taksat dhe vendimet për zhdoganimin përcaktohen nga autoriteti doganor përkatës, jo nga Alpha Worldwide.", to: "/al/kontakt", label: "Kontaktoni ekipin tonë" },
  ] },
];

export const Route = createFileRoute("/al/pyetje-te-shpeshta")({
  head: () => {
    const base = buildHead({
      title: "Pyetje të shpeshta | Alpha Worldwide",
      description: "Përgjigje për gjetjen e automjeteve nga SHBA, Koreja e Jugut dhe Dubai, transportin me kontenier, RoRo ose ajror, inspektimet, pagesat, dokumentet dhe koordinimin doganor — të organizuara sipas temës.",
      path: "/al/pyetje-te-shpeshta",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/faq" }, { lang: "sq", path: "/al/pyetje-te-shpeshta" }],
      xDefault: "/faq",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "sq",
            mainEntity: CATEGORIES.flatMap((c) => c.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: PyetjeHub,
});

function PyetjeHub() {
  const [active, setActive] = useState<string>(CATEGORIES[0].name);
  return (
    <>
      <Breadcrumbs items={[{ label: "Pyetje të shpeshta" }]} />
      <TextHero>
        <div>
          <div className="eyebrow text-primary">Qendra e informacionit</div>
          <h1 className="mt-4">Pyetje të shpeshta</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Të organizuara sipas temës — çdo përgjigje e shkurtër të çon te faqja me detajet e plota.</p>
        </div>
      </TextHero>
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c.name} onClick={() => setActive(c.name)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${active === c.name ? "border-teal bg-teal/10 text-teal" : "border-border bg-card text-navy hover:border-teal/50"}`}>
                {c.name}
              </button>
            ))}
          </div>
          {CATEGORIES.filter((c) => c.name === active).map((c) => (
            <div key={c.name} className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
              {c.items.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                    {f.q}
                    <span className="text-teal transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                  <Link to={f.to} onClick={() => trackEvent("quote_started", { source: `faq-hub-${c.name}` })} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-teal hover:underline">
                    {f.label} →
                  </Link>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
