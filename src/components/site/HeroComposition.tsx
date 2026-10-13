import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { EditorialMedia } from "@/components/site/EditorialMedia";
import { PHOTO_SELECTIONS, type AlphaPhoto } from "@/lib/alpha-photos";
import { mediaLayout, type HeroVariant } from "@/lib/media-layouts";
import { ArrowUpRight, Globe2, ScanLine, FileCheck2, ShieldCheck } from "lucide-react";

export function HeroComposition({ children, photo, locale, variant, alt }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq"; variant?: HeroVariant; alt?: string }) {
  const path = useRouterState({ select: state => state.location.pathname });
  const language = locale ?? (path.startsWith("/al") ? "sq" : "en");
  const layout = variant ?? mediaLayout(path);
  // Origin pages deliberately use explanatory art, not undocumented geographic photos.
  const primary = layout === "market" ? undefined : path === "/services" ? PHOTO_SELECTIONS.container : path === "/about" ? PHOTO_SELECTIONS.transporter : photo;
  const containerStory = /container|kontenier/.test(path);
  const secondary = layout === "logistics" || (layout === "service" && primary) ? (containerStory ? PHOTO_SELECTIONS.darkFerrariContainer : primary?.src === PHOTO_SELECTIONS.loading.src ? PHOTO_SELECTIONS.container : PHOTO_SELECTIONS.loading) : undefined;
  const region = /korea|encar/.test(path) ? "KR" : /uae|dubai/.test(path) ? "AE" : /canada/.test(path) ? "CA" : /usa|amerika|auction|ankande|copart|iaai/.test(path) ? "US" : "EU";
  return <section className={`alpha-inner-hero hero-composition hero-composition--${layout} ${primary ? "hero-composition--photo" : ""}`}>
    <div className="container-page">
      <div className="hero-composition-copy interior-copy">{children}</div>
      {layout === "market" ? <div className={`market-route-art market-route-art--${region.toLowerCase()}`} aria-hidden="true"><span className="market-region">{region}</span><Globe2 className="market-globe" /><div className="market-route-track" /><div className="market-route-label"><span>{language === "sq" ? "Blerje" : "Source"}</span><ArrowUpRight /><span>{language === "sq" ? "Inspektim" : "Inspect"}</span><ArrowUpRight /><span>{language === "sq" ? "Transport" : "Ship"}</span></div></div> : primary ? <div className="hero-documentary-stage">
        <figure className="hero-documentary-primary"><EditorialMedia photo={primary} locale={language} role="feature" className="hero-documentary-ambient" eager alt="" /><EditorialMedia photo={primary} locale={language} role="feature" eager alt={primary.src === photo?.src ? alt : undefined} /><figcaption><span>{primary[language]}</span><span>Alpha Worldwide</span></figcaption></figure>
        {secondary && <figure className="hero-documentary-detail"><EditorialMedia photo={secondary} locale={language} role="feature" eager /><figcaption>{secondary[language]}</figcaption></figure>}
      </div> : layout === "service" && <div className="service-evidence-art" aria-hidden="true">{[ScanLine, FileCheck2, ShieldCheck].map((Icon, i) => <div key={i}><span>0{i + 1}</span><Icon /><span>{(language === "sq" ? ["Kontroll", "Dokumentacion", "Vendim i informuar"] : ["Review", "Documentation", "Informed decision"])[i]}</span></div>)}</div>}
    </div>
  </section>;
}