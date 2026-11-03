import { Link2, ScanLine, Check, Ship } from "lucide-react";

const ICONS = [Link2, ScanLine, Check, Ship];
/** Four-step timeline: horizontal on desktop, vertical on mobile. */
export function HomeJourney({ locale, titles, bodies }: { locale: "en" | "sq"; titles: string[]; bodies: string[] }) {
  return <ol className="home-timeline" aria-label={locale === "sq" ? "Hapat e importit" : "Import steps"}>
    {titles.map((title, i) => { const Icon = ICONS[i]; return <li key={title} className="home-timeline-step">
      <span className="home-timeline-dot" aria-hidden>{i + 1}</span>
      <div><Icon className="h-6 w-6 text-primary" aria-hidden /><h3>{title}</h3><p>{bodies[i]}</p></div>
    </li>; })}
  </ol>;
}
