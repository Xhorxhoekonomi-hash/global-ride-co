import type { ReactNode } from "react";
import type { AlphaPhoto } from "@/lib/alpha-photos";
import { EditorialMedia } from "@/components/site/EditorialMedia";

/** Light editorial heading; photographs show context, never undocumented routes. */
export function EditorialHero({ children, photo, locale = "en" }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq" }) {
  return <section className={`alpha-inner-hero border-b border-border bg-hero-surface text-secondary ${photo ? "alpha-inner-hero--illustrated" : ""}`}>
    <div className="container-page interior-composition">
      <div className="interior-copy min-w-0">{children}</div>
      {photo && <EditorialMedia photo={photo} locale={locale} role="feature" eager className="interior-photo" />}
    </div>
  </section>;
}