import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/al/kushtet-e-sherbimit")({
  head: () => buildHead({
    title: "Kushtet e shërbimit | Alpha Worldwide",
    description: "Kushtet që rregullojnë përdorimin e faqes dhe shërbimet e Alpha Worldwide për gjetje, koordinim inspektimi dhe transport automjetesh.",
    path: "/al/kushtet-e-sherbimit",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/terms" }, { lang: "sq", path: "/al/kushtet-e-sherbimit" }],
    xDefault: "/terms",
  }),
  component: () => (
    <LegalPage
      crumb="Kushtet e shërbimit"
      title="Kushtet e shërbimit"
      updated="Përditësuar së fundi: gusht 2026"
      intro="Këto kushte rregullojnë përdorimin e alphaworldwidealbania.com dhe angazhimin e shërbimeve të Alpha Worldwide për gjetje automjetesh, koordinim inspektimi dhe transport. Duke përdorur këtë faqe ose duke angazhuar shërbimet tona, pranoni kushtet më poshtë."
      sections={[
        { h: "Roli ynë", body: <p>Alpha Worldwide vepron si ndërmjetës dhe koordinator logjistik — gjen automjete, koordinon inspektimin kur është e mundur operacionalisht, organizon transportin dhe koordinon dokumentet e eksportit dhe ato doganore. I asistojmë klientët që blejnë përmes platformave të ankandeve si Copart, IAAI, Manheim, ADESA, Encar, Autowini dhe KB Chachacha, si dhe përmes tregtarëve të përzgjedhur, pa qenë partner zyrtar i asnjërës prej këtyre platformave, përveç rasteve kur deklarohet veçmas dhe shprehimisht.</p> },
        { h: "Përllogaritje, jo garanci", body: <p>Kostot e transportit, kohët e tranzitit dhe përllogaritjet e dorëzimit të dhëna përmes <Link to="/al/kalkulator-transporti" className="text-teal hover:underline">kalkulatorit</Link> tonë ose në korrespondencë janë përllogaritje të bazuara në informacionin e disponueshëm në atë moment. Ato nuk janë çmim përfundimtar ose datë dorëzimi e garantuar. Kostot dhe kohët reale mund të ndikohen nga ndryshimet e tarifave të transportit, oraret e anijeve, procedurat doganore dhe faktorë të tjerë jashtë kontrollit tonë. Shihni <Link to="/al/kushtet-e-perllogaritjes" className="text-teal hover:underline">kushtet e përllogaritjes</Link> për më shumë detaje.</p> },
        { h: "Kufizimet e inspektimit", body: <p>Kur është e mundur operacionalisht, koordinojmë inspektimin e automjetit para blerjes. Mundësia e inspektimit varet nga shitësi, ankandi dhe aksesi te automjeti dhe nuk garantohet kurrë për çdo shpallje. Një inspektim e zvogëlon rrezikun, por nuk mund ta eliminojë, dhe pasqyron vetëm gjendjen e dukshme dhe të testueshme të automjetit në momentin e inspektimit.</p> },
        { h: "Regjistrimi, dogana dhe homologimi", body: <p>Koordinojmë dokumentet e eksportit dhe të transportit dhe, kur është e nevojshme, i orientojmë klientët drejt dokumenteve që zakonisht kërkohen në destinacion. Nuk jemi studio ligjore, këshilltar tatimor apo autoritet doganor. Vendimet përfundimtare për miratimin e regjistrimit, vlerësimin doganor, detyrimet, taksat dhe homologimin merren nga autoriteti përkatës në destinacion, jo nga Alpha Worldwide. Kërkesat ndryshojnë sipas vendit dhe automjetit dhe duhen konfirmuar gjithmonë me autoritetin vendas para se të angazhoheni për një blerje.</p> },
        { h: "Pagesat", body: <p>Ju japim një ndarje të detajuar të kostove para se të kërkohet pagesa për një blerje. Kushtet dhe afatet e pagesës konfirmohen drejtpërdrejt me ju si pjesë e koordinimit të porosisë suaj konkrete.</p> },
        { h: "Kufizimi i përgjegjësisë", body: <p>Në masën e lejuar nga ligji, Alpha Worldwide nuk mban përgjegjësi për vonesa, humbje ose kosto që lindin nga rrethana jashtë kontrollit tonë të arsyeshëm, përfshirë, por pa u kufizuar në, ndryshimet e orareve të linjave detare, mbingarkesën në porte, vonesat në procedurat doganore ose vendimet e platformave të ankandeve apo autoriteteve të palëve të treta.</p> },
        { h: "Përmbajtja e faqes", body: <p>Përmbajtja e kësaj faqeje, përfshirë <Link to="/al/udhezues" className="text-teal hover:underline">udhëzuesit</Link> tanë, jepet për qëllime informuese të përgjithshme dhe nuk përbën këshillë ligjore, tatimore apo profesionale. Shihni faqet përkatëse për kualifikime specifike.</p> },
        { h: "Ndryshimet në këto kushte", body: <p>Mund t'i përditësojmë herë pas here këto kushte. Data "përditësuar së fundi" në krye të faqes tregon rishikimin më të fundit.</p> },
        { h: "Na kontaktoni", body: <p>Pyetjet për këto kushte mund t'i dërgoni në <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p> },
      ]}
      note="Këto kushte jepen si informacion i përgjithshëm dhe nuk zëvendësojnë këshillën ligjore. Nëse ju duhet një vlerësim ligjor i situatës suaj specifike, konsultohuni me një profesionist të kualifikuar në juridiksionin tuaj."
    />
  ),
});
