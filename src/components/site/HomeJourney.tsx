/** Four steps in one clean row with large thin numerals (stacked on mobile). */
export function HomeJourney({ locale, titles, bodies }: { locale: "en" | "sq"; titles: string[]; bodies: string[] }) {
  return <ol className="home-steps" aria-label={locale === "sq" ? "Hapat e importit" : "Import steps"}>
    {titles.map((title, i) => <li key={title} className="home-step">
      <span className="home-step-num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
      <h3>{title}</h3><p>{bodies[i]}</p>
    </li>)}
  </ol>;
}
