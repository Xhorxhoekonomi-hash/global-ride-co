import { ExternalLink } from "lucide-react";
import { PLATFORMS } from "@/lib/site-data";
import { PLATFORM_BADGES_LABELS_AL } from "@/lib/i18n-al";

const LABELS_EN = {
  eyebrow: "Licensed Access · Trusted Auction & Dealer Networks",
  footer: "Browse official marketplaces. Alpha Worldwide can assist with inspection, purchase, and shipping.",
};

export function PlatformBadges({ dark = false, locale = "en" }: { dark?: boolean; locale?: "en" | "sq" }) {
  const L = locale === "sq" ? PLATFORM_BADGES_LABELS_AL : LABELS_EN;

  return (
    <div className={`border-y ${dark ? "border-white/10 bg-graphite" : "border-border bg-mist"}`}>
      <div className="container-page py-8">
        <p
          className={`text-center text-[11px] font-semibold uppercase tracking-[0.24em] ${
            dark ? "text-teal" : "text-teal-dark"
          }`}
        >
          {L.eyebrow}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {PLATFORMS.map((p) =>
            p.url ? (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={locale === "sq" ? `Vizito ${p.name} — hapet në një skedë të re` : `Visit ${p.name} (opens in a new tab)`}
                className={`group relative flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all hover:-translate-y-0.5 ${
                  dark
                    ? "border-white/10 bg-white/[0.03] hover:border-teal/50"
                    : "border-border bg-background hover:border-teal/50 hover:shadow-card"
                }`}
              >
                <span
                  className={`font-display text-base font-bold tracking-tight ${
                    dark ? "text-white/80 group-hover:text-white" : "text-navy/70 group-hover:text-navy"
                  }`}
                >
                  {p.name}
                </span>
                <ExternalLink
                  className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                    dark ? "text-white/30 group-hover:text-teal-glow" : "text-navy/30 group-hover:text-teal"
                  }`}
                />
              </a>
            ) : (
              <span
                key={p.name}
                className={`rounded-xl border border-transparent px-4 py-2.5 font-display text-base font-bold tracking-tight ${
                  dark ? "text-white/50" : "text-navy/40"
                }`}
              >
                {p.name}
              </span>
            ),
          )}
        </div>

        <p className={`mt-5 text-center text-xs ${dark ? "text-white/40" : "text-slate-body"}`}>
          {L.footer}
        </p>
      </div>
    </div>
  );
}
