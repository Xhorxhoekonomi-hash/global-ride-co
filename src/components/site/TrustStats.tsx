import { STATS } from "@/lib/site-data";

export function TrustStats() {
  return (
    <section className="section-graphite">
      <div className="container-page grid gap-8 py-14 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-teal pl-5">
            <div className="font-display text-4xl font-bold text-teal md:text-5xl">
              {s.value}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
