import { useEffect, useState } from "react";

/** Elements revealed one after another inside a section (60ms stagger). */
const ITEM_SELECTOR = [
  ".bento-tile", ".alpha-origin", ".alpha-card", ".home-step", ".home-timeline-step", ".alpha-film-frame",
  ".alpha-guide-link", ".guide-lead-story", ".presence-tile", ".related-guide-card", ".stat-grid > div", ".chip-group",
].join(",");
const HEAD_SELECTOR = ".alpha-section-heading, section > .container-page > .max-w-2xl, section > .container-page > .max-w-3xl, .stat-panel h2";

/**
 * Site-wide motion, armed only after hydration and never under reduced motion:
 * - adds `motion-ok` to <html> (all CSS motion is scoped to it, so content is visible without JS)
 * - staggered scroll reveals (heading first, then tiles), once per element
 * - `[data-draw]` elements (timeline lines/numerals) get `is-drawn` when reached
 * - desktop parallax for full-bleed photos (`[data-parallax]`), max 6% of the element height
 * - reading progress (`--read`) for guide articles
 */
export function SiteMotion({ pathname, guide }: { pathname: string; guide: boolean }) {
  const [read, setRead] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { document.documentElement.classList.remove("motion-ok"); return; }
    document.documentElement.classList.add("motion-ok");
    const vh = window.innerHeight;

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); reveal.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section:not(.hero-panel, .hero-scene, .text-hero)"));
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < vh || section.classList.contains("reveal-armed")) return;
      section.querySelectorAll<HTMLElement>(HEAD_SELECTOR).forEach((el) => el.classList.add("reveal-head"));
      section.querySelectorAll<HTMLElement>(ITEM_SELECTOR).forEach((el, i) => { el.classList.add("reveal-item"); el.style.setProperty("--reveal-delay", `${80 + Math.min(i, 8) * 60}ms`); });
      section.classList.add("reveal-armed");
      reveal.observe(section);
    });

    const draw = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-drawn"); draw.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -25% 0px" });
    document.querySelectorAll("[data-draw]").forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.75) el.classList.add("is-drawn"); else draw.observe(el);
    });

    const parallax = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches ? Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")) : [];
    let frame = 0;
    const update = () => {
      frame = 0;
      parallax.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight; // -1..1
        el.style.setProperty("--py", `${(-progress * 0.06 * r.height).toFixed(1)}px`);
      });
      if (guide) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setRead(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { reveal.disconnect(); draw.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [pathname, guide]);

  if (!guide) return null;
  return <div className="read-progress" aria-hidden="true" style={{ transform: `scaleX(${read})` }} />;
}
