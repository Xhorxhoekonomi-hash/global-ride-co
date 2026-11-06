import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, MessageCircle, Calculator } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

const PATH = "/al/udhezues/si-te-blini-nga-ankandet-amerikane";
const EN = "/guides/how-to-buy-a-car-from-usa-auctions";

const FAQS = [
  { q: "A duhet të jem tregtar i licencuar për të ofertuar në ankandet amerikane?", a: "Disa lote ankandi janë vetëm për tregtarë, ndërsa të tjerët janë të hapur për publikun ose të aksesueshëm përmes një ndërmjetësi. Aksesi ndryshon sipas platformës dhe shpalljes — e konfirmojmë çfarë është e disponueshme për një automjet konkret para se të angazhoheni." },
  { q: "A do të thotë etiketa 'run and drive' që makina nuk ka probleme mekanike?", a: "Jo. Zakonisht do të thotë që automjeti u ndez dhe lëvizi me forcën e vet kur u testua, jo që nuk ka probleme të fshehura. Është pikënisje për vlerësim, jo garanci." },
  { q: "A mund ta shoh automjetin personalisht para se të ofertoj?", a: "Shikimi personal ndonjëherë është i mundur, në varësi të politikës së sheshit të ankandit, por shumë blerës mbështeten te fotot, raportet e gjendjes dhe një inspektim i koordinuar — mundësia varet nga shitësi dhe aksesi në shesh." },
  { q: "Çfarë ndodh nëse fitoj ankandin, por automjeti ka dëmtime të padeklaruara?", a: "Kushtet e ankandeve ndryshojnë sipas platformës dhe zakonisht e kufizojnë mundësinë e ankimit pas shitjes. Pikërisht për këtë arsye ka rëndësi të shqyrtoni informacionin e gjendjes dhe të koordinoni inspektim kur është e mundur para se të ofertoni, jo pas." },
  { q: "A është vërtet më lirë blerja nga një ankand amerikan sesa blerja lokale?", a: "Mund të jetë, sidomos për automjete të dëmtuara ose të riparueshme, por kostoja totale bëhet e qartë vetëm kur çmimit të fitimit i shtoni tarifat e blerësit, transportin tokësor, transportin detar dhe detyrimet në destinacion — jo vetëm shumën e ofertës fituese." },
  { q: "Sa kohë përpara duhet ta planifikoj një blerje në ankand?", a: "Lini kohë për të njohur platformën, për të shqyrtuar shpalljet dhe për të konfirmuar mundësinë e inspektimit para se të mbyllet ankandi — të nxitosh me ofertë për një automjet që nuk e ke shqyrtuar si duhet është një nga gabimet më të shmangshme." },
];

export const Route = createFileRoute("/al/udhezues/si-te-blini-nga-ankandet-amerikane")({
  head: () => {
    const base = buildHead({
      title: "Si të blini makinë nga ankandet amerikane | Udhëzues hap pas hapi",
      description: "Udhëzues praktik për blerjen e automjetit nga Copart, IAAI, Manheim ose ADESA — aksesi në platformë, informacioni i gjendjes, ofertat, tarifat, transporti dhe gabimet që duhen shmangur.",
      path: PATH,
      lang: "sq",
      hreflang: [{ lang: "en", path: EN }, { lang: "sq", path: PATH }],
      xDefault: EN,
    });
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "Si të blini makinë nga ankandet amerikane", description: "Udhëzues praktik për blerjen e automjetit nga Copart, IAAI, Manheim ose ADESA: aksesi, informacioni i gjendjes, ofertat, tarifat dhe transporti.", inLanguage: "sq", author: { "@type": "Organization", name: "Alpha Worldwide" }, publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL }, mainEntityOfPage: `${SITE_URL}${PATH}`, url: `${SITE_URL}${PATH}` }) },
        { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "sq", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }) },
      ],
    };
  },
  component: GuideAnkande,
});

const TOC = [
  { id: "choosing-platform", label: "Zgjedhja e platformës" },
  { id: "access", label: "Akses publik apo vetëm për tregtarë" },
  { id: "title-types", label: "Llojet e titullit dhe të dëmtimit" },
  { id: "condition-info", label: "Leximi i informacionit të gjendjes" },
  { id: "inspection", label: "Inspektimi para blerjes" },
  { id: "bidding", label: "Ofertat dhe tarifat" },
  { id: "logistics", label: "Transporti, ngarkimi dhe eksporti" },
  { id: "destination", label: "Koordinimi doganor dhe regjistrimi" },
  { id: "mistakes", label: "Gabimet e zakonshme" },
  { id: "checklist", label: "Lista përfundimtare" },
];

const a = "text-teal hover:underline";
const chip = "rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal";

function GuideAnkande() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, po lexoja për blerjen nga ankandet amerikane dhe dua këshillë për një automjet konkret.")}`;
  return (
    <>
      <Breadcrumbs items={[{ label: "Udhëzues", to: "/al/udhezues" }, { label: "Ankandet amerikane" }]} />
      <TextHero>
        <div>
          <GuideMeta category="auctions" readingTime="5 min" locale="sq" />
          <h1 className="mt-4 max-w-3xl">Si të blini makinë nga ankandet amerikane</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Nga zgjedhja mes Copart, IAAI, Manheim dhe ADESA te dokumentet që vijnë pas një oferte fituese — i gjithë procesi, përfshirë pjesët që shumica e udhëzuesve i anashkalojnë.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Përgjigje e shkurtër:</strong> blerja nga një ankand amerikan do të thotë të zgjidhni platformën, të shqyrtoni informacionin e disponueshëm për gjendjen, të ofertoni brenda një buxheti të qartë që përfshin tarifat dhe më pas të koordinoni transportin tokësor, dokumentet e eksportit dhe transportin detar. Përshkrimet e ankandit janë pikënisje, jo garanci mekanike — kjo është gjëja më e rëndësishme që duhet të kuptoni para se të ofertoni.</p>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-body">Ankandet amerikane qarkullojnë një numër shumë të madh automjetesh çdo javë, dhe çmimet që duken jashtëzakonisht të ulëta krahasuar me një tregtar lokal janë shpesh gjëja e parë që tërheq blerësit ndërkombëtarë. Kursimet mund të jenë reale, por vijnë me përgjegjësi të ndryshme nga blerja te një tregtar afër shtëpisë — e vlerësoni automjetin nga fotot dhe raportet në vend që të qëndroni pranë tij, dhe rruga nga oferta fituese te automjeti në dorë kalon në disa faza të veçanta, secila me vendimet e veta. Ky udhëzues e shpjegon procesin sipas radhës në të cilën do ta hasni realisht.</p>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-navy">Në këtë udhëzues</h2>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">{TOC.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-sm text-teal hover:underline">{t.label}</a></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-12">
            <div id="choosing-platform">
              <h2 className="text-navy">Zgjedhja e platformës</h2>
              <p className="mt-3 text-slate-body">Copart dhe IAAI kanë gamën më të gjerë të automjeteve të dëmtuara, të shpallura humbje totale nga siguruesit dhe "run and drive", shpesh me çmime më të ulëta se platformat e orientuara drejt tregtarëve. Manheim dhe ADESA anojnë më shumë nga inventari i tregtarëve dhe automjetet që kthehen nga lizingu, me tituj zakonisht më të pastër dhe gjendje më të qëndrueshme. Asnjëra kategori nuk është "më e mirë" në çdo rast — varet nëse prioritet keni çmimin, sigurinë për gjendjen apo larminë e automjeteve.</p>
              <p className="mt-3 text-slate-body">Një mënyrë e dobishme për ta menduar vendimin është sipas asaj që doni realisht të blini. Nëse kërkoni një model të caktuar me çmimin më të ulët të mundshëm dhe nuk ju shqetëson gjetja e pjesëve apo riparimet, platformat me shumë automjete të dëmtuara kanë zakonisht inventar më të thellë në këtë kategori. Nëse preferoni të paguani pak më shumë për një automjet me historik më të parashikueshëm dhe më pak surpriza, platformat e tregtarëve janë zakonisht pikënisja më e mirë. Shumë blerës me përvojë kontrollojnë më shumë se një platformë për të njëjtën markë dhe model para se të vendosin. Shihni faqen tonë për <Link to="/al/ankande-amerikane" className={a}>aksesin në ankandet amerikane</Link> për detaje sipas platformës.</p>
            </div>

            <div id="access">
              <h2 className="text-navy">Akses publik apo vetëm për tregtarë</h2>
              <p className="mt-3 text-slate-body">Një pjesë e inventarit të ankandeve është e hapur për ofertues publikë, ndërsa lote të tjera janë të rezervuara për tregtarë të licencuar. Puna përmes një ndërmjetësi është mënyra e zakonshme për të arritur inventarin vetëm për tregtarë pa pasur vetë licencë tregtari. Konfirmoni kërkesat e aksesit për një shpallje konkrete para se të supozoni se mund të ofertoni drejtpërdrejt.</p>
              <p className="mt-3 text-slate-body">Kufizimet e aksesit kanë arsyen e tyre — shumë platforma duan që disa kategori inventari, sidomos automjetet e viteve të fundit ose me vlerë më të lartë, të mbeten brenda kanalit tregtar dhe jo të hapura për publikun e gjerë. Kjo nuk është pengesë e krijuar për të vështirësuar; thjesht kështu janë strukturuar këto tregje. Llogaria e një ndërmjetësi, e përdorur në emrin tuaj, është mënyra standarde që blerësit ndërkombëtarë të arrijnë lotet vetëm për tregtarë pa pasur nevojë të hapin licencë tregtari në SHBA, gjë që realisht nuk është zgjidhje praktike për dikë që blen nga jashtë.</p>
            </div>

            <div id="title-types">
              <h2 className="text-navy">Llojet e titullit dhe të dëmtimit</h2>
              <p className="mt-3 text-slate-body">Çdo shpallje ka një status titulli, dhe të kuptuarit e asaj që do të thotë realisht secili ka më shumë rëndësi se vetë etiketa. Një <strong className="text-navy">titull i pastër (clean)</strong> do të thotë që nuk ka asnjë shënim të regjistruar për dëmtim total, përmbytje ose dëmtim të madh. Një <strong className="text-navy">titull salvage</strong> do të thotë që një sigurues e ka shpallur automjetin humbje totale, zakonisht sepse kostoja e riparimit kaloi një prag të caktuar në raport me vlerën e tij — kjo nuk do të thotë domosdoshmërisht që dëmtimi është i rëndë, sepse siguruesit i shpallin automjetet humbje totale po aq shpesh për arsye kostoje sa edhe për arsye sigurie. Një titull <strong className="text-navy">rebuilt</strong> ose <strong className="text-navy">reconstructed</strong> do të thotë që një automjet salvage është riparuar më pas dhe është riinspektuar sipas një standardi që i lejon të rikthehet në rrugë.</p>
              <p className="mt-3 text-slate-body">Përshkrimet e dëmtimit në vetë shpalljen (pjesa e përparme, e pasme, breshër, përmbytje etj.) ju tregojnë shkakun e raportuar, por jo domosdoshmërisht shtrirjen e plotë — pikërisht këtë boshllëk synon ta mbyllë shqyrtimi i kujdesshëm i fotove dhe, kur është e mundur, koordinimi i një inspektimi.</p>
            </div>

            <div id="condition-info">
              <h2 className="text-navy">Leximi i informacionit të gjendjes</h2>
              <p className="mt-3 text-slate-body">Shpalljet e ankandeve zakonisht përfshijnë foto, një përshkrim të dëmtimit, etiketën e statusit të titullit dhe ndonjëherë një tregues "run and drive". Këto janë pikënisje të dobishme, por përgatiten nga vetë ankandi, jo nga një inspektor i pavarur — trajtojini si filtër të parë, jo si përgjigje përfundimtare për gjendjen mekanike.</p>
              <p className="mt-3 text-slate-body">Kur shqyrtoni fotot, shikoni përtej zonës së dukshme të dëmtimit — kontrolloni panelet përreth për hapësira ose mospërputhje të bojës, shikoni konsumin e gomave për shenja problemesh me drejtimin dhe kushtojini vëmendje fotove të brendshme për njolla uji ose myk, që mund të tregojnë ekspozim ndaj përmbytjes edhe kur shpallja nuk e përmend shprehimisht. Cilësia dhe këndet e fotove ndryshojnë shumë mes shpalljeve; pak foto të paqarta janë vetë një sinjal që duhet marrë parasysh, sepse kufizojnë sa mund të verifikoni para se të ofertoni.</p>
            </div>

            <div id="inspection">
              <h2 className="text-navy">Inspektimi para blerjes</h2>
              <p className="mt-3 text-slate-body">Kur është e mundur operacionalisht, një inspektim i pavarur — kontroll i motorit, kutisë së shpejtësisë, kodeve OBD, integritetit strukturor dhe një provë në rrugë nëse sheshi e lejon — e ngushton hendekun mes shpalljes dhe realitetit. Mundësia varet nga shitësi dhe politika e aksesit në sheshin e ankandit, dhe nuk garantohet kurrë për çdo lot.</p>
              <p className="mt-3 text-slate-body">Ia vlen të jeni realistë për atë që mund dhe nuk mund të mbulojë një inspektim në sheshin e ankandit. Sheshet janë ambiente pune, jo salla ekspozimi, dhe aksesi është shpesh më i kufizuar se kur inspektoni një makinë në oborrin e dikujt — sidomos prova në rrugë nuk është gjithmonë e mundur, në varësi të gjendjes së automjetit dhe politikës së sheshit. Edhe një inspektim i pjesshëm (foto, video dhe skanim OBD, për shembull, pa provë të plotë në rrugë) shton gjithsesi dukshëm më shumë informacion se vetëm shpallja. Shihni <Link to="/al/inspektim-makinash" className={a}>shërbimin tonë të inspektimit</Link> dhe udhëzuesin më të gjerë se <Link to="/al/udhezues/si-te-kontrolloni-makinen-e-perdorur" className={a}>si të kontrolloni një makinë të përdorur para blerjes</Link>.</p>
            </div>

            <div id="bidding">
              <h2 className="text-navy">Ofertat dhe tarifat</h2>
              <p className="mt-3 text-slate-body">Vendosni një ofertë maksimale që përfshin tashmë tarifat e blerësit, të cilat ankandet i shtojnë mbi çmimin e fitimit. Struktura e tarifave ndryshon sipas platformës, nivelit të anëtarësimit dhe vlerës së automjetit — konfirmoni tabelën reale të tarifave për llojin e llogarisë suaj në vend që të supozoni një përqindje fikse. Buxhetimi vetëm për çmimin e ofertës është një nga gabimet më të zakonshme të blerësve të parë.</p>
              <p className="mt-3 text-slate-body">Ndihmon ta vendosni kufirin tuaj absolut para se të nisë ankandi, jo gjatë tij — dinamika e ankandit mund të krijojë presion për të vazhduar edhe pak, dhe një shifër e vendosur paraprakisht ju mbron nga kjo. Nëse një automjet konkret ka më shumë rëndësi se çmimi, edhe kjo është strategji e arsyeshme, por duhet të jetë zgjedhje e qëllimshme dhe jo diçka që ndodh në moment. Disa shpallje kanë edhe çmim rezervë; nëse ofertat nuk e arrijnë, automjeti mund të mos shitet fare, gjë që ia vlen ta dini para se të planifikoni rreth një loti të caktuar.</p>
            </div>

            <div id="logistics">
              <h2 className="text-navy">Transporti, ngarkimi dhe eksporti</h2>
              <p className="mt-3 text-slate-body">Pas një oferte fituese, automjetit zakonisht i duhet transport tokësor nga sheshi i ankandit deri në një port ose pikë konsolidimi, pastaj ngarkimi — me kontenier ose, kur është i disponueshëm operacionalisht, me RoRo — dhe dokumentet e eksportit sipas origjinës. Shihni krahasimin tonë <Link to="/al/udhezues/kontenier-apo-roro" className={a}>kontenier apo RoRo</Link> për të kuptuar cila mënyrë transporti i përshtatet automjetit dhe rrugës suaj.</p>
              <p className="mt-3 text-slate-body">Në këtë fazë mund të fillojnë të grumbullohen edhe tarifat e magazinimit nëse marrja nuk organizohet shpejt — shumica e shesheve të ankandeve ofrojnë një periudhë të kufizuar magazinimi falas pas mbylljes së shitjes, pas së cilës aplikohen tarifa ditore. Planifikimi i transportit tokësor që para se të mbyllet ankandi, jo pas, është një nga mënyrat më të thjeshta për ta shmangur këtë kosto të paplanifikuar.</p>
            </div>

            <div id="destination">
              <h2 className="text-navy">Koordinimi doganor dhe regjistrimi</h2>
              <p className="mt-3 text-slate-body">Në mbërritje, kërkesat për zhdoganim dhe regjistrim varen tërësisht nga vendi i destinacionit dhe nga vetë automjeti. Ato nuk janë kurrë rezultate të garantuara — kërkesat ndryshojnë dhe duhen konfirmuar gjithmonë me autoritetin vendas përkatës para se të angazhoheni për një blerje. Ne ofrojmë koordinim doganor me agjentë të licencuar, ndërsa detyrimet dhe taksat në destinacion përcaktohen në mënyrë të pavarur nga autoriteti juaj vendas dhe janë të ndara nga kostot logjistike që përllogarisim ne. Shihni edhe <Link to="/al/kushtet-e-perllogaritjes" className={a}>kushtet e përllogaritjes</Link>.</p>
            </div>

            <div id="mistakes">
              <h2 className="text-navy">Gabimet e zakonshme</h2>
              <p className="mt-3 text-slate-body">Shumica e gabimeve që bëjnë blerësit në këtë fazë nuk kanë të bëjnë me zgjedhjen e automjetit të gabuar — kanë të bëjnë me anashkalimin e një hapi në vetë procesin. Këto ndodhin aq shpesh sa ia vlen t'i përmendim drejtpërdrejt:</p>
              <div className="mt-4 space-y-3">
                {[
                  "Buxhetimi vetëm për çmimin e fitimit, pa tarifat e blerësit, transportin tokësor dhe transportin detar",
                  "Trajtimi i etiketës 'run and drive' si garanci mekanike",
                  "Anashkalimi i opsioneve të disponueshme të inspektimit për të kursyer kohë",
                  "Moskonfirmimi i kërkesave të regjistrimit në destinacion para se të ofertoni",
                  "Ofertimi për disa lote pa një kufi të qartë të kostos totale",
                  "Supozimi se magazinimi është falas pa afat dhe vonesa e marrjes pas fitimit",
                  "Moskontrollimi nëse një shpallje është vetëm për tregtarë para se të planifikoni rreth saj",
                ].map((m) => <div key={m} className="flex gap-2.5 text-sm text-slate-body"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{m}</div>)}
              </div>
            </div>

            <div id="checklist">
              <h2 className="text-navy">Lista përfundimtare</h2>
              <div className="mt-4 space-y-3">
                {[
                  "Platforma dhe aksesi të konfirmuara për shpalljen konkrete",
                  "Fotot e gjendjes dhe statusi i titullit të shqyrtuara",
                  "Mundësia e inspektimit e kontrolluar dhe e koordinuar kur është e mundur",
                  "Oferta maksimale e vendosur duke përfshirë tarifat e blerësit",
                  "Mënyra e transportit e zgjedhur sipas gjendjes së automjetit dhe rrugës",
                  "Kërkesat e regjistrimit në destinacion të kontrolluara me autoritetin vendas",
                ].map((m) => <div key={m} className="flex gap-2.5 text-sm text-slate-body"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{m}</div>)}
              </div>
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
            <Link to="/al/makina-nga-amerika" className={chip}>Makina nga Amerika</Link>
            <Link to="/al/inspektim-makinash" className={chip}>Shërbimi i inspektimit</Link>
            <Link to="/al/copart-shqiperi" className={chip}>Copart Shqipëri</Link>
            <Link to="/al/iaai-shqiperi" className={chip}>IAAI Shqipëri</Link>
            <Link to="/al/udhezues" className={chip}>Të gjithë udhëzuesit</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Keni një shpallje në mendje?</div>
          <h2 className="mx-auto mt-3 max-w-xl text-white">Na e dërgoni para se të ofertoni</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-usa-auctions" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Na shkruani në WhatsApp</a>
            <Link to="/al/kalkulator-transporti" onClick={() => trackEvent("calculator_started", { source: "guide-usa-auctions" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Llogarit koston</Link>
          </div>
        </div>
      </section>
    </>
  );
}
