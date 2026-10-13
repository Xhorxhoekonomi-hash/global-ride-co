import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { EditorialMedia } from "@/components/site/EditorialMedia";
import { PHOTO_SELECTIONS, type AlphaPhoto } from "@/lib/alpha-photos";
import { mediaLayout, type HeroVariant } from "@/lib/media-layouts";
import { ArrowUpRight, Globe2, ScanLine, FileCheck2, ShieldCheck } from "lucide-react";
import grandTour from "@/assets/alpha-editorial-grand-tour.jpg";

export function HeroComposition({ children, photo, locale, variant, alt }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq"; variant?: HeroVariant; alt?: string }) {
  const path = useRouterState({ select: state => state.location.pathname });
  const language = locale ?? (path.startsWith("/al") ? "sq" : "en");
  const layout = variant ?? mediaLayout(path);
  const editorialScene = layout === "market" || /^(\/services|\/about|\/why-alpha-worldwide)$/.test(path);
  // Origin pages deliberately use explanatory art, not undocumented geographic photos.
  const primary = layout === "market" || layout === "editorial" || layout === "gallery" || layout === "contact" || /services|roro|airfreight|ajror|how-it-works/.test(path) ? undefined : path === "/about" ? PHOTO_SELECTIONS.transporter : photo;
  const region = /korea|encar/.test(path) ? "KR" : /uae|dubai/.test(path) ? "AE" : /canada/.test(path) ? "CA" : /usa|amerika|auction|ankande|copart|iaai/.test(path) ? "US" : "EU";
  return <section className={`alpha-inner-hero hero-composition hero-composition--${layout} ${primary ? "hero-composition--photo" : ""} ${editorialScene ? "hero-composition--editorial-scene" : ""}`}>
    {editorialScene && <figure className="interior-brand-scene"><img src={grandTour} width={1920} height={1088} fetchPriority="high" alt={language === "sq" ? "Imazh editorial automjeti, jo një dorëzim i dokumentuar" : "Editorial automotive artwork, not a documented shipment"} /><figcaption>{language === "sq" ? "Imazh editorial" : "Editorial artwork"}</figcaption></figure>}
    <div className="container-page">
      <div className="hero-composition-copy interior-copy">{children}</div>
      {layout === "market" ? <div className={`market-route-art market-route-art--${region.toLowerCase()}`} aria-hidden="true"><span className="market-region">{region}</span><div className="market-route-label"><span>{language === "sq" ? "Blerje" : "Source"}</span><ArrowUpRight /><span>{language === "sq" ? "Inspektim" : "Inspect"}</span><ArrowUpRight /><span>{language === "sq" ? "Transport" : "Ship"}</span></div></div> : primary && !editorialScene ? <div className="hero-documentary-stage">
        <figure className="hero-documentary-primary"><EditorialMedia photo={primary} locale={language} role="feature" eager alt={primary.src === photo?.src ? alt : undefined} /><figcaption><span>{primary[language]}</span><span>Alpha Worldwide</span></figcaption></figure>
      </div> : layout === "service" && !editorialScene && <div className="service-evidence-art" aria-hidden="true">{[ScanLine, FileCheck2, ShieldCheck].map((Icon, i) => <div key={i}><span>0{i + 1}</span><Icon /><span>{(language === "sq" ? ["Kontroll", "Dokumentacion", "Vendim i informuar"] : ["Review", "Documentation", "Informed decision"])[i]}</span></div>)}</div>}
    </div>
  </section>;
}