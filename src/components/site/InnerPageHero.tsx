import type { ReactNode } from "react";

/** Unframed, light interior-page heading with optional unobscured supporting media. */
export function InnerPageHero({ eyebrow, title, description, image, imageAlt = "", children }: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return <section className="border-b border-border bg-hero-surface">
    <div className={`container-page grid items-center gap-8 py-10 md:gap-12 md:py-14 ${image ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : ""}`}>
      <div className="min-w-0 home-reveal">
        <p className="text-xs font-semibold text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-secondary md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
      {image && <figure className="mx-auto w-full max-w-md"><img src={image} alt={imageAlt} width={960} height={1280} fetchPriority="high" className="aspect-[4/5] w-full rounded-lg bg-mist object-contain" /><figcaption className="mt-3 text-xs text-muted-foreground">{imageAlt}</figcaption></figure>}
    </div>
  </section>;
}