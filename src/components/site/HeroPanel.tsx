import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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

const INTERVAL = 6000;
const RESUME_AFTER = 12000;

/**
 * Tesla-style full-bleed photo slider. Slides crossfade (900ms) and auto-advance every 6s after hydration;
 * autoplay pauses on hover, focus within, hidden tab and user interaction (resumes after 12s), and never
 * runs under reduced motion. Swipe on touch, arrows on fine pointers, dots + pause toggle always.
 */
export function HeroPanel({ slides, label, source, locale = "en" }: { slides: HeroSlide[]; label: string; source: string; locale?: "en" | "sq" }) {
  const [active, setActive] = useState(0);
  const [changed, setChanged] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [holdUntil, setHoldUntil] = useState(0);
  const [motion, setMotion] = useState(false);
  const touch = useRef<number | null>(null);
  const sq = locale === "sq";

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const go = useCallback((index: number, byUser = false) => {
    setActive((index + slides.length) % slides.length);
    setChanged(true);
    if (byUser) setHoldUntil(Date.now() + RESUME_AFTER);
  }, [slides.length]);

  const held = holdUntil > 0;
  const playing = motion && !userPaused && !hover && !focus && !hidden && !held;

  useEffect(() => {
    if (!held) return;
    const t = window.setTimeout(() => setHoldUntil(0), Math.max(holdUntil - Date.now(), 0));
    return () => window.clearTimeout(t);
  }, [held, holdUntil]);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => go(active + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [playing, active, go]);

  return (
    <section className="hero-panel" aria-roledescription="carousel" aria-label={label} data-playing={playing || undefined} data-changed={changed || undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocus(false); }}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const start = touch.current; touch.current = null; if (start === null) return; const dx = e.changedTouches[0].clientX - start; if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1), true); }}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(active + 1, true); if (e.key === "ArrowLeft") go(active - 1, true); }}>
      <div className="hero-panel-track" aria-live={playing ? "off" : "polite"}>
        {slides.map((s, i) => (
          <div key={s.id} className={`hero-panel-slide hero-slide--${s.id}${i === active ? " is-active" : ""}`} role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`} aria-hidden={i !== active}>
            <picture data-parallax>
              <source media="(max-width: 767px)" srcSet={s.mobile} width={1080} height={1935} />
              <source media="(min-width: 768px)" srcSet={`${s.desktop} 1440w, ${s.desktopLarge} 2560w`} sizes="100vw" width={2560} height={1434} />
              <img src={s.desktop} alt={s.alt} width={2560} height={1434} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} decoding="async" />
            </picture>
            <div className="hero-panel-copy on-photo">
              <div className="hero-panel-text">
                {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
                <p>{s.body}</p>
              </div>
              <div className="hero-panel-actions">
                <Link to={s.primary.to} className="btn-pair btn-pair--primary" tabIndex={i === active ? 0 : -1} onClick={() => trackEvent("quote_started", { source })}>{s.primary.label}</Link>
                <Link to={s.secondary.to} className="btn-pair btn-pair--light" tabIndex={i === active ? 0 : -1}>{s.secondary.label}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="hero-panel-arrow hero-panel-arrow--prev" onClick={() => go(active - 1, true)} aria-label={sq ? "Pamja e mëparshme" : "Previous slide"}><ChevronLeft /></button>
      <button type="button" className="hero-panel-arrow hero-panel-arrow--next" onClick={() => go(active + 1, true)} aria-label={sq ? "Pamja tjetër" : "Next slide"}><ChevronRight /></button>
      <div className="hero-panel-dots">
        {slides.map((s, i) => (
          <button key={s.id} type="button" className="hero-panel-dot" aria-label={`${i + 1} / ${slides.length}`} aria-current={i === active} onClick={() => go(i, true)}><span /></button>
        ))}
        {motion && <button type="button" className="hero-panel-toggle" onClick={() => { setUserPaused((p) => !p); setHoldUntil(0); }}
          aria-label={userPaused ? (sq ? "Luaj pamjet" : "Play slideshow") : (sq ? "Ndalo pamjet" : "Pause slideshow")}>
          {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>}
      </div>
    </section>
  );
}
