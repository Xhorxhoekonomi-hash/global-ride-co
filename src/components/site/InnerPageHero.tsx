import type { ReactNode } from "react";
import { EditorialMedia } from "@/components/site/EditorialMedia";
import { ownerPhoto } from "@/lib/photo-presentation";

/** Unframed, light interior-page heading with optional unobscured supporting media. */
export function InnerPageHero({ eyebrow, title, description, image, imageAlt = "", children }: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  const photo = image ? ownerPhoto(image) : undefined;
  return <section className={`alpha-inner-hero border-b border-border bg-hero-surface ${photo ? "alpha-inner-hero--illustrated" : ""}`}>
    <div className="container-page interior-composition">
      <div className="interior-copy min-w-0 home-reveal">
        <p className="alpha-overline">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-3xl font-medium leading-tight text-secondary md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="interior-actions">{children}</div>}
      </div>
      {photo && <EditorialMedia photo={photo} role="feature" eager alt={imageAlt || undefined} className="interior-photo" />}
    </div>
  </section>;
}