import type { ReactNode } from "react";
import { HeroComposition } from "@/components/site/HeroComposition";
import { HeroScene, type HeroSceneImage } from "@/components/site/HeroScene";
import type { HeroVariant } from "@/lib/media-layouts";
import { ownerPhoto } from "@/lib/photo-presentation";

/** Interior-page heading: a full-bleed photo scene when one is supplied, otherwise the light route-purpose composition. */
export function InnerPageHero({ eyebrow, title, description, image, imageAlt = "", children, variant, scene }: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  variant?: HeroVariant;
  scene?: HeroSceneImage;
}) {
  if (scene) return <HeroScene scene={scene} eyebrow={eyebrow} title={title} description={description}>{children}</HeroScene>;
  const photo = image ? ownerPhoto(image) : undefined;
  return <HeroComposition photo={photo} variant={variant} alt={imageAlt || undefined}>
      <div className="interior-copy min-w-0 home-reveal">
        <p className="alpha-overline">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-3xl font-medium leading-tight text-secondary md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="interior-actions">{children}</div>}
      </div>
  </HeroComposition>;
}
