import { useEffect, useRef, useState } from "react";

const STATS = { en: { a: "Our", b: "Experience", items: ["Cars Shipped Globally", "Years of Service"] }, sq: { a: "Eksperienca", b: "jonë", items: ["Makina të transportuara", "Vite shërbim"] } };
const VALUES = [15000, 10];

/** Final values are server-rendered; the count-up runs once when the panel enters view. */
export function StatCounter({ locale }: { locale: "en" | "sq" }) {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState(VALUES);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: keep final values
    setValues([0, 0]);
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1600, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValues(VALUES.map((v) => Math.round(v * eased)));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  const c = STATS[locale];
  const heading = locale === "sq" ? <><span className="stat-accent">{c.a}</span> {c.b}</> : <>{c.a} <span className="stat-accent">{c.b}</span></>;
  return (
    <section ref={ref} className="stat-panel">
      <div className="container-page">
        <h2>{heading}</h2>
        <dl className="stat-grid">
          {c.items.map((label, i) => (
            <div key={label}>
              <dd>{values[i].toLocaleString("en-US")}+</dd>
              <dt>{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
