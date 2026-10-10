import type { ReactNode } from "react";
import type { AlphaPhoto } from "@/lib/alpha-photos";

/** Light editorial heading; photographs show context, never undocumented routes. */
export function EditorialHero({ children, photo, locale = "en" }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq" }) {
  return <section className="alpha-inner-hero border-b border-border bg-hero-surface text-secondary">
    <div className={`container-page grid items-center gap-8 py-12 md:gap-16 md:py-20 ${photo ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : ""}`}>
      <div className="min-w-0 [&_h1]:text-3xl [&_h1]:leading-tight md:[&_h1]:text-4xl lg:[&_h1]:text-5xl">{children}</div>
      {photo && <figure className="alpha-inner-stage"><span aria-hidden="true" className="alpha-stage-rule" /><div className="inner-hero-media"><img src={photo.src} alt={photo[locale]} width={960} height={1280} fetchPriority="high" className="inner-hero-image" /></div></figure>}
    </div>
  </section>;
}