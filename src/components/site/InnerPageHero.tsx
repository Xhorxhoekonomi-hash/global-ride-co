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
  return <section className="alpha-inner-hero border-b border-border bg-hero-surface">
    <div className={`container-page grid items-center gap-8 py-12 md:gap-16 md:py-20 ${image ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]" : ""}`}>
      <div className="min-w-0 home-reveal">
        <p className="alpha-overline">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-3xl font-medium leading-tight text-secondary md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>
        {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
      {image && <div className="alpha-inner-stage"><span aria-hidden="true" className="alpha-stage-rule" /><div className="inner-hero-media"><img src={image} alt={imageAlt} width={960} height={1280} fetchPriority="high" className="inner-hero-image" /></div><span className="alpha-inner-signature">Alpha Worldwide / {eyebrow}</span></div>}
    </div>
  </section>;
}