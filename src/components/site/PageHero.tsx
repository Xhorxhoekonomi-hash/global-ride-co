import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { HeroScene, type HeroSceneImage } from "@/components/site/HeroScene";
import { Breadcrumbs, type Crumb } from "@/components/site/Breadcrumbs";

/**
 * The single interior hero. With `scene` it is a full-bleed owner photo (HeroScene);
 * otherwise a clean text hero — light by default, navy when no real photo exists for the topic.
 */
export function PageHero({ scene, tone = "light", icon: Icon, breadcrumbs, eyebrow, title, description, children }: {
  scene?: HeroSceneImage;
  tone?: "light" | "navy";
  icon?: LucideIcon;
  breadcrumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  if (scene) return <HeroScene scene={scene} eyebrow={eyebrow} title={title} description={description}
    breadcrumbs={breadcrumbs && <Breadcrumbs items={breadcrumbs} tone="photo" />}>{children}</HeroScene>;
  return <>
    {breadcrumbs && <Breadcrumbs items={breadcrumbs} tone={tone === "navy" ? "navy" : "light"} />}
    <section className={`text-hero text-hero--${tone}`}>
      <div className="container-page text-hero-inner">
        {Icon && <Icon className="text-hero-icon" aria-hidden="true" />}
        {eyebrow && <p className="text-hero-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="text-hero-intro">{description}</p>
        {children && <div className="text-hero-actions">{children}</div>}
      </div>
    </section>
  </>;
}

/** Light text hero for pages whose heading markup is bespoke (guides, FAQ, legal, destinations). */
export function TextHero({ children }: { children: ReactNode }) {
  return <section className="text-hero text-hero--light">
    <div className="container-page text-hero-inner">{children}</div>
  </section>;
}
