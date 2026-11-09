import { ExternalLink } from "lucide-react";
import { PLATFORMS } from "@/lib/site-data";
import { PLATFORM_BADGES_LABELS_AL } from "@/lib/i18n-al";

const LABELS_EN = {
  eyebrow: "Licensed Access · Trusted Auction & Dealer Networks",
  footer: "Browse official marketplaces. Alpha Worldwide can assist with inspection, purchase, and shipping.",
};

/** Platform chips as a slow auto-scrolling marquee (pauses on hover/focus/touch); the loop copy is aria-hidden. */
export function PlatformBadges({ dark = false, locale = "en" }: { dark?: boolean; locale?: "en" | "sq" }) {
  const L = locale === "sq" ? PLATFORM_BADGES_LABELS_AL : LABELS_EN;
  const chips = (copy: boolean) => PLATFORMS.map((p) => {
    const name = locale === "sq" && p.name === "Authorized Dealerships" ? "Tregtarë të autorizuar" : p.name;
    return <li key={`${copy ? "b" : "a"}-${p.name}`} aria-hidden={copy || undefined}>
      {p.url ? (
        <a href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={copy ? -1 : undefined} className="platform-chip"
          aria-label={copy ? undefined : locale === "sq" ? `Vizito ${p.name} — hapet në një skedë të re` : `Visit ${p.name} (opens in a new tab)`}>
          {name}<ExternalLink aria-hidden="true" />
        </a>
      ) : <span className="platform-chip platform-chip--plain">{name}</span>}
    </li>;
  });

  return (
    <div className={`platform-strip${dark ? " platform-strip--dark" : ""}`}>
      <div className="container-page"><p className="platform-strip-label">{L.eyebrow}</p></div>
      <div className="marquee marquee--fast" tabIndex={-1}>
        <ul className="marquee-track">{chips(false)}{chips(true)}</ul>
      </div>
      <div className="container-page"><p className="platform-strip-note">{L.footer}</p></div>
    </div>
  );
}
