import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/al/politika-e-privatesise")({
  head: () => buildHead({
    title: "Politika e privatësisë | Alpha Worldwide",
    description: "Si i mbledh, përdor dhe mbron Alpha Worldwide të dhënat personale që ndani me ne përmes faqes dhe formularëve të ofertës.",
    path: "/al/politika-e-privatesise",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/privacy-policy" }, { lang: "sq", path: "/al/politika-e-privatesise" }],
    xDefault: "/privacy-policy",
  }),
  component: () => (
    <LegalPage
      crumb="Politika e privatësisë"
      title="Politika e privatësisë"
      updated="Përditësuar së fundi: gusht 2026"
      intro="Kjo politikë shpjegon çfarë informacioni mbledh Alpha Worldwide kur përdorni këtë faqe, pse e mbledhim dhe si trajtohet. Ajo vlen për www.alphaworldwidealbania.com dhe nënfaqet e saj, përfshirë seksionin në gjuhën shqipe."
      sections={[
        { h: "Informacioni që mbledhim", body: <><p>Kur dërgoni një kërkesë oferte, formular kontakti ose pyetje në WhatsApp përmes kësaj faqeje, mund të mbledhim:</p><ul className="mt-3 list-disc space-y-1.5 pl-5"><li>Emrin dhe të dhënat tuaja të kontaktit (numër telefoni, adresë email-i)</li><li>Informacion për automjetin ose rrugën për të cilën pyetni (origjina, destinacioni, modeli, një link shpalljeje)</li><li>Çdo mesazh ose shënim që shtoni në kërkesë</li><li>Të dhëna bazë teknike dhe burimi (faqja nga e dërguat, faqja referuese dhe burimi i fushatës nëse erdhët përmes një linku të gjurmuar)</li></ul></> },
        { h: "Si e përdorim këtë informacion", body: <p>Informacionin që jepni e përdorim vetëm për t'iu përgjigjur kërkesës suaj, për të përgatitur një ofertë dhe për të koordinuar procesin e gjetjes, inspektimit, transportit dhe koordinimit doganor për të cilin na keni kontaktuar. Nuk ua shesim të dhënat tuaja personale palëve të treta.</p> },
        { h: "Ku ruhet informacioni juaj", body: <p>Kërkesat për ofertë dhe kontakt ruhen në një bazë të dhënash të sigurt. Këto të dhëna nuk janë publike — mund të lexohen vetëm nga Alpha Worldwide përmes sistemeve tona të brendshme, jo nga vizitorë të tjerë të faqes.</p> },
        { h: "WhatsApp", body: <p>Shumë nga opsionet tona të kontaktit lidhen drejtpërdrejt me WhatsApp. Mesazhet që na dërgoni në WhatsApp i nënshtrohen edhe politikës së privatësisë së WhatsApp, përveç kësaj politike, sepse biseda zhvillohet në platformën e WhatsApp, jo në tonën.</p> },
        { h: "Cookies dhe analitika", body: <p>Përdorim mjete të kufizuara analitike për të kuptuar si e përdorin vizitorët këtë faqe, vetëm kur dhe ku keni dhënë pëlqimin. Shihni <Link to="/al/politika-e-cookies" className="text-teal hover:underline">Politikën e cookies</Link> për detaje mbi çfarë përdoret dhe si t'i menaxhoni preferencat.</p> },
        { h: "Ruajtja e të dhënave", body: <p>Kërkesat për ofertë dhe kontakt i ruajmë për aq kohë sa është e arsyeshme për t'iu përgjigjur kërkesës suaj dhe, kur një transaksion vazhdon, për të mbështetur procesin e gjetjes dhe transportit. Nëse dëshironi që informacioni juaj të fshihet, na kontaktoni me të dhënat më poshtë.</p> },
        { h: "Të drejtat tuaja", body: <p>Mund të na pyesni çfarë informacioni mbajmë për ju, të kërkoni korrigjim ose fshirje, me kusht që të mos ketë një arsye legjitime biznesi ose ligjore për të ruajtur disa të dhëna. Na kontaktoni me të dhënat më poshtë për të bërë një kërkesë.</p> },
        { h: "Ndryshimet në këtë politikë", body: <p>Mund ta përditësojmë herë pas here këtë politikë për të pasqyruar ndryshime në mënyrën si funksionon faqja. Data "përditësuar së fundi" në krye të faqes tregon rishikimin më të fundit.</p> },
        { h: "Na kontaktoni", body: <p>Për çdo pyetje rreth kësaj politike ose të dhënave tuaja personale, na shkruani në <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p> },
      ]}
      note="Kjo politikë jepet si informacion i përgjithshëm për praktikat tona me të dhënat dhe nuk zëvendëson këshillën ligjore. Nëse ju duhet një vlerësim ligjor i të drejtave tuaja specifike, konsultohuni me një profesionist të kualifikuar në juridiksionin tuaj."
    />
  ),
});
