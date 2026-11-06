import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldAlert, MessageCircle, Calculator } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const PATH = "/al/udhezues/si-te-kontrolloni-makinen-e-perdorur";
const EN = "/guides/how-to-check-a-used-car-before-buying";

const CHECK_GROUPS = [
  { title: "Dokumentacioni", body: "Para çdo kontrolli fizik, dokumentacioni i disponueshëm tregon shumë për të kaluarën e automjetit — dhe për sa mund të verifikohet realisht.", items: ["VIN-i i dekoduar dhe i krahasuar me shpalljen", "Historiku i ankandit ose i tregtarit i shqyrtuar kur ekziston", "Historiku i servisit i kontrolluar për qëndrueshmëri", "Leximet e kilometrazhit të kontrolluara për boshllëqe ose mospërputhje"] },
  { title: "Historiku i dëmtimeve", body: "Historiku i raportuar i dëmtimeve është aq i plotë sa ajo që është regjistruar — por kur ekziston, ia vlen të shqyrtohet me kujdes.", items: ["Historiku i aksidenteve i shqyrtuar kur është raportuar", "Shenjat e dëmtimit nga përmbytja të kontrolluara", "Shenjat e dëmtimit nga zjarri të kontrolluara", "Dëmtimet strukturore ose të shasisë të vlerësuara kur janë të dukshme"] },
  { title: "Pjesa mekanike", body: "Kjo është thelbi i çdo inspektimi — dallimi mes një automjeti që duket mirë në foto dhe një automjeti që funksionon vërtet mirë.", items: ["Motori i kontrolluar për rrjedhje, zhurma dhe tym në ndezje", "Sjellja e kutisë së shpejtësisë e kontrolluar në marshet e disponueshme", "Skanim OBD për kodet e ruajtura të defekteve", "Ndezja në të ftohtë e vëzhguar kur është e mundur"] },
  { title: "Karroceria dhe e brendshmja", body: "Gjendja estetike dhe e brendshme, si dhe elektronika që ka gjithnjë e më shumë rëndësi për vlerën e një automjeti modern.", items: ["Boja e kontrolluar për panele me ngjyrë të ndryshme ose spërkatje", "Airbag-ët dhe sistemet e sigurisë të kontrolluar për aktivizim të mëparshëm", "Elektronika e brendshme dhe sistemi multimedial të testuara", "Kamerat dhe sensorët të testuar kur ekzistojnë"] },
  { title: "Pjesët që konsumohen", body: "Pjesë konsumi që ndikojnë në kostot e afërta edhe te një automjet përndryshe në gjendje të mirë.", items: ["Konsumi i gomave dhe i rrotës i kontrolluar për modele të parregullta", "Frenat të kontrolluara për konsum dhe reagim", "Çelësat dhe telekomandat të konfirmuara si të pranishme dhe funksionale"] },
];

const FAQS = [
  { q: "A mund të garantojë një inspektim që automjeti nuk ka probleme të fshehura?", a: "Jo. Një inspektim e zvogëlon rrezikun duke kontrolluar kushtet e dukshme dhe të testueshme në atë moment, por nuk mund të garantojë mungesën e defekteve të fshehura, sidomos atyre që nuk zbulohen pa çmontim." },
  { q: "Po nëse shitësi nuk lejon akses të plotë te automjeti?", a: "Aksesi varet nga politika e shitësit ose e sheshit të ankandit dhe nuk është gjithmonë i plotë — disa automjete lejojnë vetëm foto dhe një shikim të kufizuar përreth, të tjera lejojnë kontroll të plotë mekanik. E konfirmojmë çfarë është realiste për një automjet konkret para se të rekomandojmë hapat e radhës." },
  { q: "A mjafton një skanim OBD për të ditur që automjeti është në rregull mekanikisht?", a: "Një skanim OBD tregon kodet e ruajtura të defekteve në momentin e skanimit, por nuk kap çdo problem mekanik — disa probleme nuk krijojnë kod dhe disa kode fshihen para skanimit. Është një e dhënë e dobishme mes disa të tjerave, jo një diagnozë e plotë." },
  { q: "Kur duhet të heq dorë nga një automjet?", a: "Sinjalet e zakonshme të rrezikut përfshijnë historik kilometrazhi të paqëndrueshëm, riparime strukturore të pashpjeguara, kode defektesh të vazhdueshme që shitësi nuk i shpjegon, ose një shitës që nuk lejon asnjë formë inspektimi apo shqyrtimi dokumentesh. Asnjëra prej tyre vetëm nuk e skualifikon automatikisht automjetin, por kërkojnë kujdes." },
  { q: "A do të thotë gjithmonë boja e ndryshme që automjeti ka pasur aksident?", a: "Jo domosdoshmërisht — mund të vijë edhe nga zëvendësimi i zakonshëm i një paneli ose nga një riparim i vogël estetik. Është sinjal që ia vlen të hetohet më tej, jo një alarm automatik në vetvete." },
  { q: "Çfarë nuk mund të kontrollohet te një automjet që ndodhet ende në sheshin e ankandit?", a: "Në varësi të politikës së sheshit, një provë e plotë në rrugë, inspektimi i pjesës së poshtme në ngritës ose kohë më e gjatë diagnostikimi mund të mos jenë të mundura — mundësia ndryshon sipas vendndodhjes dhe automjetit, dhe e konfirmojmë çfarë është realiste para se të rekomandojmë hapat e radhës." },
];

export const Route = createFileRoute("/al/udhezues/si-te-kontrolloni-makinen-e-perdorur")({
  head: () => {
    const base = buildHead({
      title: "Si të kontrolloni makinën e përdorur | Alpha Worldwide",
      description: "Listë kontrolli praktike dhe e ndershme, nga VIN-i dhe historiku i servisit te skanimi OBD dhe ndezja në të ftohtë — si dhe kufijtë realë të inspektimit.",
      path: PATH,
      lang: "sq",
      hreflang: [{ lang: "en", path: EN }, { lang: "sq", path: PATH }],
      xDefault: EN,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Si të kontrolloni një makinë të përdorur para blerjes", description: "Listë kontrolli për dokumentacionin, historikun e dëmtimeve, pjesën mekanike, karrocerinë dhe kufijtë e inspektimit.", inLanguage: "sq", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}${PATH}`, url: `${SITE_URL}${PATH}` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "sq", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideKontrolli,
});

const chip = "rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal";

function GuideKontrolli() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, dua ndihmë për të vlerësuar një automjet të përdorur para se ta blej.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Udhëzues", to: "/al/udhezues" }, { label: "Kontrolli i makinës së përdorur" }]} />
      <TextHero>
        <div>
          <GuideMeta category="inspection" readingTime="3 min" locale="sq" />
          <h1 className="mt-4 max-w-3xl">Si të kontrolloni një makinë të përdorur para blerjes</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Një listë kontrolli praktike dhe e ndershme — përfshirë kufijtë realë të inspektimit, jo vetëm çfarë duhet parë.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Përgjigje e shkurtër:</strong> një kontroll i plotë kombinon shqyrtimin e dokumentacionit (VIN, historik, kilometrazh) me një kontroll fizik mekanik dhe estetik, si dhe një skanim OBD kur automjeti është i aksesueshëm. E zvogëlon ndjeshëm rrezikun — nuk e eliminon. Aksesi te automjeti varet gjithmonë nga ajo që lejon shitësi ose ankandi.</p>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-body">Blerja e një automjeti që nuk mund ta shihni fizikisht para blerjes — siç ndodh me shumicën e blerjeve në ankand dhe ndërkufitare — do të thotë të mbështeteni më shumë te dokumentacioni dhe te çdo akses inspektimi që është i disponueshëm. Lista më poshtë mbulon fushat që ia vlen të shqyrtohen në mënyrë sistematike, të renditura si zakonisht zhvillohet një inspektim real: fillimisht dokumentet, pastaj historiku i dëmtimeve, pastaj kontrolli fizik mekanik dhe estetik.</p>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            {CHECK_GROUPS.map((g) => (
              <div key={g.title}>
                <h2 className="text-navy">{g.title}</h2>
                <p className="mt-2 text-sm text-slate-body">{g.body}</p>
                <div className="mt-4 space-y-2.5">{g.items.map((item) => <div key={item} className="flex gap-2.5 text-sm text-slate-body"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{item}</div>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="flex items-center gap-2 text-navy"><ShieldAlert className="h-5 w-5 text-teal" /> Ku janë realisht kufijtë e inspektimit</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-body">
                <p>Një inspektim e zvogëlon rrezikun — nuk e eliminon. Raportet pasqyrojnë kushtet e dukshme dhe të testueshme në momentin e inspektimit, jo një garanci të përjetshme. Defektet e fshehura që nuk zbulohen pa çmontim mund të mbeten të pazbuluara. Aksesi te automjeti varet tërësisht nga ajo që lejon shitësi ose ankandi, dhe aksesi i plotë nuk është gjithmonë i mundur.</p>
                <p>Pikërisht për këtë jemi të drejtpërdrejtë për atë që një inspektim mund dhe nuk mund t'ju tregojë, në vend që ta paraqesim si siguri. Shihni faqen tonë për <Link to="/al/historiku-i-automjetit" className="text-teal hover:underline">çfarë mund dhe nuk mund të tregojnë raportet e historikut</Link>.</p>
              </div>
            </div>
            <div>
              <h2 className="text-navy">Si ta peshoni atë që gjeni</h2>
              <p className="mt-3 text-slate-body">Jo çdo problem i gjetur gjatë kontrollit është arsye për të hequr dorë — qëllimi është një vendim i informuar, jo një automjet i përsosur. Konsumi i vogël i pjesëve shpesh mund të negociohet në çmim ose është i pranueshëm për moshën dhe përdorimin e automjetit. Kodet e vazhdueshme dhe të pashpjeguara të defekteve, historiku i paqëndrueshëm i kilometrazhit ose një shitës që nuk lejon asnjë shqyrtim dokumentesh janë ndryshe — tregojnë të panjohura që janë më të vështira për t'u përfshirë në çmim dhe kërkojnë më shumë kujdes se një taketë frenash e konsumuar ose një gërvishtje guri.</p>
            </div>
            <div>
              <h2 className="text-navy">Si përshtatet kjo në procesin e plotë të blerjes</h2>
              <p className="mt-3 text-slate-body">Inspektimi është një hap në një proces më të gjerë — shihni <Link to="/al/udhezues/si-te-blini-nga-ankandet-amerikane" className="text-teal hover:underline">udhëzuesin e plotë për blerjen në ankand</Link> për të parë si lidhet me ofertat, transportin dhe dokumentet.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-navy">Pyetje të shpeshta</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
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
            <Link to="/al/inspektim-makinash" className={chip}>Shërbimi i inspektimit</Link>
            <Link to="/al/historiku-i-automjetit" className={chip}>Historiku i automjetit</Link>
            <Link to="/al/udhezues" className={chip}>Të gjithë udhëzuesit</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Po shqyrtoni një automjet konkret?</div>
          <h2 className="mx-auto mt-3 max-w-xl text-white">Na dërgoni shpalljen para se të blini</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-used-car-check" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Na shkruani në WhatsApp</a>
            <Link to="/al/kalkulator-transporti" onClick={() => trackEvent("calculator_started", { source: "guide-used-car-check" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Llogarit koston e transportit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
