import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export type HeroSlide = {
  id: string;
  title: string;
  body: string;
  alt: string;
  desktop: string;
  desktopLarge: string;
  mobile: string;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

/** Tesla-style full-bleed photo slider: swipe on touch, arrows/dots on desktop, never autoplays. */
export function HeroPanel({ slides, label, source }: { slides: HeroSlide[]; label: string; source: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = (index + slides.length) % slides.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setActive(next);
  };

  return (
    <section className="hero-panel" aria-roledescription="carousel" aria-label={label}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(active + 1); if (e.key === "ArrowLeft") go(active - 1); }}>
      <div ref={track} className="hero-panel-track">
        {slides.map((s, i) => (
          <div key={s.id} className="hero-panel-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== active}>
            <picture>
              <source media="(max-width: 767px)" srcSet={s.mobile} width={1080} height={1935} />
              <source media="(min-width: 768px)" srcSet={`${s.desktop} 1440w, ${s.desktopLarge} 2560w`} sizes="100vw" width={2560} height={1434} />
              <img src={s.desktop} alt={s.alt} width={2560} height={1434} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
            </picture>
            <div className="hero-panel-copy">
              {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
              <p>{s.body}</p>
              <div className="hero-panel-actions">
                <Link to={s.primary.to} className="btn-pair btn-pair--primary" tabIndex={i === active ? 0 : -1} onClick={() => trackEvent("quote_started", { source })}>{s.primary.label}</Link>
                <Link to={s.secondary.to} className="btn-pair btn-pair--light" tabIndex={i === active ? 0 : -1}>{s.secondary.label}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="hero-panel-arrow hero-panel-arrow--prev" onClick={() => go(active - 1)} aria-label="Previous slide"><ChevronLeft /></button>
      <button type="button" className="hero-panel-arrow hero-panel-arrow--next" onClick={() => go(active + 1)} aria-label="Next slide"><ChevronRight /></button>
      <div className="hero-panel-dots">
        {slides.map((s, i) => (
          <button key={s.id} type="button" className="hero-panel-dot" aria-label={`${i + 1} / ${slides.length}`} aria-current={i === active} onClick={() => go(i)}><span /></button>
        ))}
      </div>
    </section>
  );
}
