import { IMPORT_STEPS } from "@/lib/site-data";

export function HowItWorks({ variant = "light" }: { variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  return (
    <section className={dark ? "section-dark" : "bg-background"}>
      <div className="container-page py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">How It Works</div>
          <h2 className={`font-display mt-3 text-4xl font-bold md:text-5xl ${dark ? "text-white" : "text-navy"}`}>
            From listing to your driveway
          </h2>
          <p className={`mt-4 text-base ${dark ? "text-white/70" : "text-slate-body"}`}>
            A single point of contact for every step of the international import journey.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {IMPORT_STEPS.map((s) => (
            <div
              key={s.n}
              className={`group relative rounded-2xl p-6 transition-all ${
                dark
                  ? "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  : "border border-border bg-card shadow-card hover:-translate-y-1"
              }`}
            >
              <div className="font-display text-5xl font-bold text-teal">
                {String(s.n).padStart(2, "0")}
              </div>
              <h3 className={`mt-3 text-lg font-semibold ${dark ? "text-white" : "text-navy"}`}>
                {s.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/60" : "text-slate-body"}`}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
