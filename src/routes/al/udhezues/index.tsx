import { TextHero } from "@/components/site/PageHero";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { GUIDES_SQ } from "@/lib/guides";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GUIDE_CATEGORIES_SQ } from "@/components/guides/GuideMeta";
import { GuideFeature } from "@/components/site/GuideFeature";

export const Route = createFileRoute("/al/udhezues/")({
  head: () => {
    const base = buildHead({
      title: "Udhëzues për importin e automjeteve | Alpha Worldwide",
      description: "Udhëzues praktikë në gjuhë të thjeshtë për blerjen nga ankandet amerikane, zgjedhjen mes kontenierit dhe RoRo dhe kontrollin e makinës së përdorur para blerjes.",
      path: "/al/udhezues",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/guides" }, { lang: "sq", path: "/al/udhezues" }],
      xDefault: "/guides",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Udhëzues për importin e automjeteve",
            inLanguage: "sq",
            url: `${SITE_URL}/al/udhezues`,
            hasPart: GUIDES_SQ.map((g) => ({ "@type": "Article", headline: g.title, url: `${SITE_URL}${g.to}` })),
          }),
        },
      ],
    };
  },
  component: Udhezues,
});

function Udhezues() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Udhëzues" }]} />
      <TextHero>
        <div>
          <div className="eyebrow text-primary">Udhëzues</div>
          <h1 className="font-display mt-4 text-4xl font-bold md:text-6xl">Udhëzues për importin e automjeteve</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Përgjigje praktike për pyetjet që lindin para, gjatë dhe pas blerjes së një automjeti jashtë vendit — të shkruara për t'ju ndihmuar të vendosni, jo për t'ju shitur.</p>
        </div>
      </TextHero>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="eyebrow">Udhëzuesit kryesorë</div>
          <h2 className="font-display mt-2 text-2xl font-bold text-navy">Filloni këtu</h2>
          <div className="mt-8"><GuideFeature locale="sq" title="Si të blini makinë nga ankandet amerikane" category="Blerje jashtë vendit · 5 min lexim" read="Lexo udhëzuesin" /></div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIDES_SQ.map((g) => (
              <Link key={g.to} to={g.to} className="group flex flex-col border-t border-border py-8 pr-5 transition-colors hover:border-primary">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><g.icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-navy/10 px-2.5 py-1 text-[11px] font-semibold text-navy">{GUIDE_CATEGORIES_SQ[g.category]}</span>
                </div>
                <h2 className="font-display mt-4 text-lg font-bold text-navy">{g.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-body">{g.summary}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-body">{g.readingTime} lexim</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal">Lexo <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-body">Keni një pyetje që nuk mbulohet këtu? Shihni <Link to="/al/pyetje-te-shpeshta" className="font-semibold text-teal hover:underline">pyetjet e shpeshta</Link> ose <Link to="/al/kontakt" className="font-semibold text-teal hover:underline">na kontaktoni</Link>.</p>
        </div>
      </section>
    </>
  );
}
