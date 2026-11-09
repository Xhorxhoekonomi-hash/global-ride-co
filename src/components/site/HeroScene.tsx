import type React from "react";
import type { ReactNode } from "react";

export type HeroSceneImage = { desktop: string; desktopLarge: string; mobile: string; alt: string; position?: string; mobilePosition?: string };

/** Single full-bleed photo panel for interior pages: 16:9 desktop art, 9:16 mobile art, breadcrumb top-left and copy bottom-left over a bottom scrim (shorter than the homepage slider). */
export function HeroScene({ scene, eyebrow, title, description, breadcrumbs, children }: {
  scene: HeroSceneImage;
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="hero-panel hero-scene">
      <div className="hero-panel-slide" style={{ ...(scene.position && { "--hero-pos": scene.position }), ...(scene.mobilePosition && { "--hero-pos-m": scene.mobilePosition }) } as React.CSSProperties}>
        <picture>
          <source media="(max-width: 767px)" srcSet={scene.mobile} width={1080} height={1935} />
          <source media="(min-width: 768px)" srcSet={`${scene.desktop} 1440w, ${scene.desktopLarge} 2560w`} sizes="100vw" width={2560} height={1434} />
          <img src={scene.desktop} alt={scene.alt} width={2560} height={1434} loading="eager" fetchPriority="high" decoding="async" />
        </picture>
        {breadcrumbs && <div className="hero-scene-crumbs">{breadcrumbs}</div>}
        <div className="hero-panel-copy on-photo">
          {eyebrow && <p className="hero-scene-eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          <p className="hero-scene-intro">{description}</p>
          {children && <div className="hero-panel-actions hero-scene-actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
