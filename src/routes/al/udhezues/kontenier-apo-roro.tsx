import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Ship, Truck, MessageCircle, Calculator, CheckCircle2 } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const PATH = "/al/udhezues/kontenier-apo-roro";
const EN = "/guides/container-vs-roro-car-shipping";

const FACTORS = [
  { label: "Gjendja e automjetit", body: "RoRo zakonisht kërkon që automjeti të lëvizë, të drejtohet dhe të frenojë me forcën e vet. Transporti me kontenier mund të pranojë automjete që nuk ndizen ose që janë shumë të modifikuara." },
  { label: "Mbrojtja", body: "Transporti me kontenier e mbron automjetin nga moti dhe trajtimi gjatë gjithë udhëtimit. Automjetet RoRo qëndrojnë në kuverta të hapura." },
  { label: "Rruga dhe portet", body: "Jo çdo rrugë ka shërbim RoRo — disponueshmëria varet nga linja detare dhe çifti konkret origjinë–destinacion." },
  { label: "Kostoja", body: "RoRo është shpesh më ekonomik për automjete standarde që lëvizin, megjithëse diferenca reale varet nga rruga dhe tarifat aktuale të transportit, jo nga një rregull fiks." },
  { label: "Orari", body: "Anijet RoRo shpesh kanë orare më të shpeshta dhe fikse në rrugët që mbulojnë; nisjet me kontenier varen nga rotacioni i linjës detare." },
  { label: "Vlera dhe modifikimet", body: "Automjetet me vlerë të lartë ose shumë të modifikuara transportohen shpesh me kontenier për mbrojtjen shtesë dhe trajtimin më të kufizuar." },
];

const FAQS = [
  { q: "A mund të transportohet me RoRo një automjet që nuk ndizet?", a: "Në përgjithësi jo — RoRo zakonisht kërkon që automjeti të hyjë dhe të dalë nga anija me forcën e vet. Një automjet që nuk ndizet zakonisht i përshtatet më mirë transportit me kontenier." },
  { q: "A është transporti me kontenier gjithmonë më i shtrenjtë se RoRo?", a: "Jo gjithmonë — diferenca reale e kostos varet nga rruga, tarifat aktuale dhe nëse përdorni kontenier të përbashkët apo të dedikuar. I krahasojmë të dyja opsionet për rrugën tuaj konkrete në vend që të supozojmë se njëri është më i lirë." },
  { q: "A mund të transportoj sende personale brenda automjetit?", a: "Kjo varet nga linja detare, autoriteti doganor në destinacion dhe mënyra e transportit — kufizimet ndryshojnë dhe e konfirmojmë çfarë lejohet për dërgesën tuaj para ngarkimit." },
  { q: "A ka kufizime për automjetet elektrike në disa mënyra transporti?", a: "Disa linja detare aplikojnë kërkesa ose kufizime shtesë për automjetet elektrike për shkak të klasifikimit të ngarkesave me bateri. Kontrollojmë kufizimet aktuale për automjetin dhe rrugën tuaj para rezervimit." },
  { q: "Si sigurohet automjeti brenda kontenierit?", a: "Automjeti futet me lëvizje ose me çikrik, pastaj fiksohet me rripa lidhës dhe pengesa rrotash të ankoruara në dyshemenë e kontenierit, sipas praktikave standarde të ngarkimit për të parandaluar lëvizjen gjatë udhëtimit detar." },
  { q: "Çfarë ndodh nëse rruga ime nuk ka shërbim RoRo?", a: "Nëse RoRo nuk është i disponueshëm për çiftin tuaj origjinë–destinacion, transporti me kontenier bëhet zgjidhja praktike dhe jo çështje preference — e konfirmojmë disponueshmërinë reale të rrugës para se të rekomandojmë cilindo opsion." },
];

export const Route = createFileRoute("/al/udhezues/kontenier-apo-roro")({
  head: () => {
    const base = buildHead({
      title: "Kontenier apo RoRo për transportin e makinës | Alpha Worldwide",
      description: "Kur ka kuptim transporti me kontenier të përbashkët ose të dedikuar, kur RoRo është zgjidhja më praktike dhe cilët faktorë e vendosin realisht zgjedhjen.",
      path: PATH,
      lang: "sq",
      hreflang: [{ lang: "en", path: EN }, { lang: "sq", path: PATH }],
      xDefault: EN,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Kontenier apo RoRo për transportin e makinës", description: "Krahasim praktik mes transportit me kontenier dhe RoRo: gjendja e automjetit, mbrojtja, rruga, kostoja dhe orari.", inLanguage: "sq", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}${PATH}`, url: `${SITE_URL}${PATH}` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "sq", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideKontenierRoro,
});

const chip = "rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal";

function GuideKontenierRoro() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, dua ndihmë për të zgjedhur mes transportit me kontenier dhe RoRo për automjetin tim.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Udhëzues", to: "/al/udhezues" }, { label: "Kontenier apo RoRo" }]} />
      <TextHero>
        <div>
          <GuideMeta category="shipping" readingTime="3 min" locale="sq" />
          <h1 className="mt-4 max-w-3xl">Kontenier apo RoRo për transportin e makinës</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Asnjëra mënyrë nuk është më e mira në çdo rast — zgjedhja e duhur varet nga gjendja, vlera, rruga dhe prioritetet e automjetit tuaj.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Përgjigje e shkurtër:</strong> RoRo (Roll-on/Roll-off) është shpesh opsioni më i thjeshtë dhe më ekonomik për një automjet standard e funksional, në një rrugë ku ky shërbim ekziston. Transporti me kontenier — i përbashkët ose i dedikuar — u përshtatet më mirë automjeteve që nuk ndizen, makinave me vlerë të lartë, modifikimeve të mëdha ose rrugëve pa shërbim RoRo.</p>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-body">Ky është një nga vendimet e para praktike që do të merrni pasi të blihet automjeti, dhe ndikon te kostoja, mbrojtja dhe sa shpejt mund të lëvizë automjeti pasi të arrijë në port. Nuk ka një përgjigje të vetme të saktë — zgjedhja e duhur varet nga vetë automjeti, rruga dhe çfarë i jepni përparësi mes kostos dhe qetësisë.</p>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-7 shadow-card">
              <Ship className="h-6 w-6 text-teal" />
              <h2 className="mt-3 text-navy">Transport me kontenier</h2>
              <p className="mt-3 text-sm text-slate-body">Një kontenier i përbashkët e ndan hapësirën (dhe koston) me dërgesa të tjera; një kontenier i plotë është vetëm për automjetin tuaj, me më shumë kontroll mbi ngarkimin dhe orarin. Automjeti është plotësisht i mbyllur gjatë udhëtimit detar, gjë që kufizon ekspozimin ndaj motit dhe trajtimit. Sendet personale zakonisht kufizohen nga dogana dhe politika e linjës detare — e konfirmojmë çfarë lejohet para ngarkimit.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-7 shadow-card">
              <Truck className="h-6 w-6 text-teal" />
              <h2 className="mt-3 text-navy">Transport RoRo</h2>
              <p className="mt-3 text-sm text-slate-body">Automjeti futet në anije përmes një rampe dhe sigurohet në një kuvertë të hapur ose të mbuluar — duhet të lëvizë, të drejtohet dhe të frenojë me forcën e vet. RoRo është shpesh më i shpejtë për ngarkim dhe shkarkim dhe mund të jetë më ekonomik, por automjeti është i ekspozuar ndaj kushteve gjatë transportit dhe shërbimi RoRo nuk ekziston në çdo rrugë.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-navy">Faktorët që e vendosin realisht</h2>
            <div className="mt-6 space-y-5">
              {FACTORS.map((f) => (
                <div key={f.label} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <div><div className="text-sm font-semibold text-navy">{f.label}</div><p className="mt-0.5 text-sm text-slate-body">{f.body}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="text-navy">Ngarkimi dhe trajtimi në terminal</h2>
              <p className="mt-3 text-slate-body">Për dërgesat me kontenier, automjeti futet me lëvizje ose me çikrik në kontenier në terminalin e nisjes, pastaj sigurohet me rripa lidhës dhe pengesa rrotash para se të mbyllen dyert për udhëtimin. Për RoRo, automjeti futet në anije përmes sistemit të rampave në terminal dhe parkohet në një kuvertë të caktuar, ku sigurohet në mënyrë të ngjashme për transportin. Të dy proceset ndjekin praktika standarde të industrisë për të parandaluar lëvizjen gjatë udhëtimit, dhe të dyja kërkojnë që automjeti të arrijë fizikisht në terminal në gjendje të përshtatshme për atë mënyrë ngarkimi.</p>
            </div>
            <div>
              <h2 className="text-navy">Kur hyn në diskutim transporti ajror</h2>
              <p className="mt-3 text-slate-body">Për afate vërtet urgjente ose automjete me vlerë jashtëzakonisht të lartë, <Link to="/al/transport-ajror-makinash" className="text-teal hover:underline">transporti ajror</Link> është opsioni i tretë që ia vlen të shqyrtohet — me kosto dukshëm më të lartë se të dyja mënyrat detare. Për shumicën e importeve është përjashtim dhe jo zgjedhja e zakonshme, por ia vlen ta dini nëse situata juaj është aq urgjente sa ta justifikojë.</p>
            </div>
            <div>
              <h2 className="text-navy">Si të vendosni për automjetin tuaj</h2>
              <p className="mt-3 text-slate-body">Një mënyrë praktike: filloni duke kontrolluar nëse RoRo ekziston fare në rrugën tuaj, sepse kjo e ngushton menjëherë vendimin. Nëse ekziston dhe automjeti juaj është standard, funksional dhe jo shumë i modifikuar, RoRo meriton vëmendje serioze për kursimin. Nëse automjeti nuk ndizet, ka vlerë të veçantë, është shumë i modifikuar ose rruga juaj thjesht nuk ka shërbim RoRo, transporti me kontenier është zgjedhja më e drejtpërdrejtë, pavarësisht krahasimit të kostos.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-navy">Pyetje të shpeshta</h2>
            <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
              {FAQS.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background"><div className="container-page py-12 md:py-14"><AuthorBox locale="sq" /></div></section>
      <section className="bg-background">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/transport-me-kontenier" className={chip}>Transport me kontenier</Link>
            <Link to="/al/transport-roro" className={chip}>Transport RoRo</Link>
            <Link to="/al/transport-ajror-makinash" className={chip}>Transport ajror</Link>
            <Link to="/al/udhezues" className={chip}>Të gjithë udhëzuesit</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Nuk jeni të sigurt cila i përshtatet automjetit tuaj?</div>
          <h2 className="mx-auto mt-3 max-w-xl text-white">Na tregoni automjetin dhe rrugën</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-container-vs-roro" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Pyesni në WhatsApp</a>
            <Link to="/al/kalkulator-transporti" onClick={() => trackEvent("calculator_started", { source: "guide-container-vs-roro" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Llogarit koston</Link>
          </div>
        </div>
      </section>
    </>
  );
}
