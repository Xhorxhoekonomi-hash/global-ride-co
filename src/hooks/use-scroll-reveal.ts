import { useEffect } from "react";

/**
 * Gentle one-time reveal for homepage sections below the hero. Content is visible by default
 * (SSR / no JS); only sections still below the fold get armed after hydration.
 */
export function useScrollReveal(selector = ".editorial-home > section:not(.hero-panel)") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    if (!targets.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => { el.classList.add("reveal-armed"); io.observe(el); });
    return () => io.disconnect();
  }, [selector]);
}
