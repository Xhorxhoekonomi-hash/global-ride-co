import type { ReactNode } from "react";
import type { AlphaPhoto } from "@/lib/alpha-photos";

/** Light editorial heading; photographs show context, never undocumented routes. */
export function EditorialHero({ children, photo, locale = "en" }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq" }) {
  return <section className="border-b border-border bg-hero-surface text-secondary">
    <div className={`container-page grid items-center gap-8 py-10 md:py-14 ${photo ? "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]" : ""}`}>
      <div className="min-w-0 [&_h1]:text-3xl [&_h1]:leading-tight md:[&_h1]:text-4xl lg:[&_h1]:text-5xl">{children}</div>
      {photo && <figure className="mx-auto w-full max-w-md"><img src={photo.src} alt={photo[locale]} width={960} height={1280} fetchPriority="high" className="aspect-[4/5] w-full rounded-lg bg-mist object-contain" /><figcaption className="mt-3 text-xs text-muted-foreground">{photo[locale]}</figcaption></figure>}
    </div>
  </section>;
}