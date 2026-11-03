import type { ReactNode } from "react";

export type HeroSceneImage = { desktop: string; desktopLarge: string; mobile: string; alt: string };

/** Single full-bleed photo panel for interior pages: 16:9 desktop art, 9:16 mobile art, copy over the open sky. */
export function HeroScene({ scene, eyebrow, title, description, children }: {
  scene: HeroSceneImage;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="hero-panel hero-scene">
      <div className="hero-panel-slide">
        <picture>
          <source media="(max-width: 767px)" srcSet={scene.mobile} width={1080} height={1935} />
          <source media="(min-width: 768px)" srcSet={`${scene.desktop} 1440w, ${scene.desktopLarge} 2560w`} sizes="100vw" width={2560} height={1434} />
          <img src={scene.desktop} alt={scene.alt} width={2560} height={1434} loading="eager" fetchPriority="high" decoding="async" />
        </picture>
        <div className="hero-panel-copy">
          <p className="hero-scene-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          {children && <div className="hero-panel-actions hero-scene-actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
