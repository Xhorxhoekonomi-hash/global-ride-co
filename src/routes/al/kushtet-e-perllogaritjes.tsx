import { headingLength } from "@/lib/heading-length";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/al/kushtet-e-perllogaritjes")({
  head: () => buildHead({
    title: "Kushtet e përllogaritjes së transportit | Alpha Worldwide",
    description: "Çfarë përfshijnë dhe çfarë nuk përfshijnë përllogaritjet e kalkulatorit tonë, dhe pse shifrat janë përllogaritje e jo çmime përfundimtare të garantuara.",
    path: "/al/kushtet-e-perllogaritjes",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/shipping-estimate-disclaimer" }, { lang: "sq", path: "/al/kushtet-e-perllogaritjes" }],
    xDefault: "/shipping-estimate-disclaimer",
  }),
  component: KushtetPerllogaritjes,
});

function KushtetPerllogaritjes() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Kushtet e përllogaritjes" }]} />
      <section className="bg-background">
        <div className="container-page section-y">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Ligjore</div>
            <h1 className="mt-3 text-navy" data-len={headingLength("Kushtet e përllogaritjes së transportit")}>Kushtet e përllogaritjes së transportit</h1>
            <p className="mt-3 text-sm text-slate-body">Përditësuar së fundi: gusht 2026</p>
            <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-xl border border-border bg-card p-6">
                <p><Link to="/al/kalkulator-transporti" className="text-teal hover:underline">Kalkulatori ynë i transportit</Link> ju jep një përllogaritje të detajuar të kostove logjistike bazuar në automjetin, rrugën dhe mënyrën e transportit që zgjidhni. Kjo faqe shpjegon saktësisht çfarë përfshin kjo përllogaritje, çfarë nuk përfshin dhe pse nuk është çmim fiks përfundimtar.</p>
              </div>
              <section>
                <h2 className="text-navy">Çfarë përllogarit kalkulatori</h2>
                <p className="mt-3">Kalkulatori përllogarit kostot logjistike që mund t'i ofrojmë në mënyrë të arsyeshme bazuar në të dhënat tuaja — transportin tokësor, ngarkimin, transportin detar ose ajror dhe trajtimin përkatës. Këto shifra dalin nga të dhëna aktuale dhe të përgjithshme çmimesh dhe saktësohen pasi të konfirmojmë me ju automjetin konkret dhe detajet e rezervimit.</p>
              </section>
              <section>
                <h2 className="text-navy">Çfarë nuk përfshin</h2>
                <p className="mt-3">Kalkulatori nuk përfshin detyrimet doganore në destinacion, TVSH-në ose taksa të ngjashme, tarifat e regjistrimit apo kostot e homologimit — këto përcaktohen në mënyrë të pavarur nga autoriteti doganor dhe tatimor në destinacion, jo nga Alpha Worldwide, dhe ndryshojnë sipas vendit dhe automjetit. Gjithashtu nuk përfshin kosto të ndryshueshme si qëndrimi në port (demurrage), mbajtja e kontenierit (detention) ose riparimet e identifikuara pas blerjes. Për më shumë, <Link to="/al/udhezues" className="text-teal hover:underline">shihni udhëzuesit tanë</Link>.</p>
              </section>
              <section>
                <h2 className="text-navy">Pse shifrat mund të ndryshojnë</h2>
                <p className="mt-3">Tarifat e transportit, oraret e anijeve dhe kurset e këmbimit mund të ndryshojnë nga momenti kur merrni përllogaritjen deri kur rezervohet realisht dërgesa. Ne i konfirmojmë shifrat aktuale në momentin e rezervimit, në vend që një përllogaritje të hershme ta trajtojmë si të pandryshueshme.</p>
              </section>
              <section>
                <h2 className="text-navy">Përllogaritjet e kohës së transportit</h2>
                <p className="mt-3">Çdo kohë transporti e treguar bashkë me një përllogaritje kostoje është një interval i përgjithshëm, jo datë dorëzimi e garantuar. <Link to="/al/udhezues/kontenier-apo-roro" className="text-teal hover:underline">Udhëzuesi kontenier apo RoRo</Link> shpjegon faktorët që ndikojnë.</p>
              </section>
              <section>
                <h2 className="text-navy">Si të merrni një ofertë të konfirmuar</h2>
                <p className="mt-3">Për një ofertë të konfirmuar dhe të detajuar për një automjet dhe rrugë konkrete, na kontaktoni drejtpërdrejt me të dhënat e automjetit — do të verifikojmë tarifat aktuale dhe do t'ju japim një ndarje me shkrim para se të angazhoheni për çdo gjë.</p>
              </section>
              <section>
                <h2 className="text-navy">Na kontaktoni</h2>
                <p className="mt-3">Pyetjet për një përllogaritje që keni marrë mund t'i dërgoni në <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
