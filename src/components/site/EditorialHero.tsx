import type { ReactNode } from "react";
import type { AlphaPhoto } from "@/lib/alpha-photos";
import { HeroComposition } from "@/components/site/HeroComposition";
import type { HeroVariant } from "@/lib/media-layouts";

/** Light editorial heading; photographs show context, never undocumented routes. */
export function EditorialHero({ children, photo, locale, variant }: { children: ReactNode; photo?: AlphaPhoto; locale?: "en" | "sq"; variant?: HeroVariant }) {
  return <HeroComposition photo={photo} locale={locale} variant={variant}>{children}</HeroComposition>;
}