import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site-data";

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for a smooth, premium deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

function StatCard({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const value = useCountUp(target, active);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center shadow-elegant backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:border-teal/40">
      <div className="font-display text-4xl font-bold text-teal-glow tabular-nums md:text-5xl">
        {value.toLocaleString("en-US")}
        {suffix}
      </div>
      <div className="mt-3 text-sm font-medium leading-snug text-white/70">{label}</div>
    </div>
  );
}

export function TrustStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-graphite">
      <div ref={sectionRef} className="container-page grid grid-cols-2 gap-4 py-14 md:gap-5 lg:grid-cols-5">
        {STATS.map((s) => (
          <StatCard key={s.label} target={s.target} suffix={s.suffix} label={s.label} active={visible} />
        ))}
      </div>
    </section>
  );
}
