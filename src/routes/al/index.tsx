import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { HomeExperience } from "@/components/site/HomeExperience";

export const Route = createFileRoute("/al/")({
  head: () => {
    const base = buildHead({
      title: "Transport makinash për Shqipëri | Alpha Worldwide",
      description: "Bli, inspekto dhe transporto makinën tënde nga SHBA-ja, Koreja e Jugut dhe Dubai drejt Shqipërisë, me një proces të qartë dhe transparent.",
      path: "/al/",
      lang: "sq",
      hreflang: [
        { lang: "en", path: "/" },
        { lang: "sq", path: "/al/" },
      ],
      xDefault: "/",
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

const FAQS_AL = [
  { q: "Si funksionon procesi i blerjes nga Amerika?", a: "Na dërgoni linkun e automjetit ose numrin e lotit nga Copart, IAAI, Manheim ose ADESA. Ne verifikojmë automjetin, kryejmë blerjen dhe organizojmë transportin deri në Portin e Durrësit." },
  { q: "A ofroni inspektim para blerjes?", a: "Po, mundësia e inspektimit varet nga vendndodhja e automjetit, aksesi i shitësit ose ankandit dhe gjendja e makinës. Ju konfirmojmë disponueshmërinë për automjetin specifik që keni zgjedhur." },
  { q: "Sa kohë zgjat transporti deri në Shqipëri?", a: "Koha e transportit varet nga porti i origjinës, metoda e transportit dhe orari i anijes. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
  { q: "A merreni ju me dogana?", a: "Ne koordinojmë dokumentacionin doganor me agjentë të licencuar në Portin e Durrësit. Vlerat doganore dhe taksat përcaktohen nga autoriteti doganor, jo nga Alpha Worldwide." },
];

function AlbaniaHome() {
  return <HomeExperience locale="sq" faqs={FAQS_AL} />;
}
