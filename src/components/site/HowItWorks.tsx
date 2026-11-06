import { IMPORT_STEPS } from "@/lib/site-data";

const STEPS_SQ = [
  { n: 1, title: "Gjeni automjetin", body: "Shfletoni çdo ankand, tregtar ose platformë në botë — Copart, IAAI, Encar, Dubizzle apo kudo tjetër." },
  { n: 2, title: "Na dërgoni linkun", body: "Ndani shpalljen, numrin e lotit ose VIN-in. Shqyrtojmë automjetin dhe konfirmojmë fizibilitetin para se të angazhoheni." },
  { n: 3, title: "Inspektim profesional", body: "Foto, video, skanim OBD, matje e bojës dhe raport i plotë i gjendjes mekanike para blerjes." },
  { n: 4, title: "Blerja", body: "Blejmë ose bëjmë ofertë në emrin tuaj, në mënyrë të sigurt dhe transparente, pa shtesa të fshehura." },
  { n: 5, title: "Transporti", body: "Kontenier, RoRo ose transport ajror — zgjedhim rrugën më të sigurt dhe më të shpejtë për atë automjet." },
  { n: 6, title: "Merrni automjetin", body: "Dorëzim në Shqipëri, Kosovë ose kudo në Evropë, me koordinim doganor." },
];

export function HowItWorks({ variant = "light", locale = "en" }: { variant?: "light" | "dark"; locale?: "en" | "sq" }) {
  const dark = variant === "dark";
  const sq = locale === "sq";
  const steps = sq ? STEPS_SQ : IMPORT_STEPS;
  return (
    <section className={dark ? "section-dark" : "bg-background"}>
      <div className="container-page py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">{sq ? "Si funksionon" : "How It Works"}</div>
          <h2 className={`mt-3 ${dark ? "text-white" : "text-navy"}`}>
            {sq ? "Nga shpallja deri te shtëpia juaj" : "From listing to your driveway"}
          </h2>
          <p className={`mt-4 text-base ${dark ? "text-white/70" : "text-slate-body"}`}>
            {sq ? "Një pikë e vetme kontakti për çdo hap të importit ndërkombëtar." : "A single point of contact for every step of the international import journey."}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
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
              <h3 className={`mt-3 ${dark ? "text-white" : "text-navy"}`}>
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
