import { Link } from "@tanstack/react-router";
import { ALPHA_ALBUMS } from "@/lib/alpha-photos";

const IDS = ["urus", "silver-ferrari", "porsche", "green-ferrari", "yellow-huracan", "sls", "mclaren", "cybertruck", "dark-ferrari", "blue-ferrari"];

/** Slow auto-scrolling strip of the owner's real vehicle photos; pauses on hover/focus/touch; duplicate loop copy is aria-hidden. */
export function HandledMarquee({ locale }: { locale: "en" | "sq" }) {
  const al = locale === "sq";
  const to = al ? "/al/automjete-te-dorezuara" : "/delivered-vehicles";
  const albums = IDS.map((id) => ALPHA_ALBUMS.find((a) => a.id === id)).filter((a): a is NonNullable<typeof a> => Boolean(a?.photos[0]));
  const items = (copy: boolean) => albums.map((a) => (
    <li key={`${copy ? "b" : "a"}-${a.id}`} aria-hidden={copy || undefined}>
      <Link to={to} className="marquee-photo" tabIndex={copy ? -1 : undefined}>
        <img src={a.photos[0].src} alt={copy ? "" : a[locale]} width={480} height={360} loading="eager" decoding="async" />
        <span>{a[locale]}</span>
      </Link>
    </li>
  ));
  return <section className="home-section marquee-section" aria-labelledby="handled-title">
    <div className="container-page"><p className="home-kicker" id="handled-title">{al ? "Të trajtuara së fundi" : "Recently handled"}</p></div>
    <div className="marquee" tabIndex={-1}>
      <ul className="marquee-track">{items(false)}{items(true)}</ul>
    </div>
  </section>;
}
