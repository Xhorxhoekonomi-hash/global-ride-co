import { PLATFORMS } from "@/lib/site-data";

export function PlatformBadges({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`border-y ${
        dark ? "border-white/10 bg-graphite" : "border-border bg-mist"
      }`}
    >
      <div className="container-page py-8">
        <p
          className={`text-center text-[11px] font-semibold uppercase tracking-[0.24em] ${
            dark ? "text-teal" : "text-teal-dark"
          }`}
        >
          Licensed Access · Trusted Auction & Dealer Networks
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {PLATFORMS.map((p) => (
            <span
              key={p}
              className={`font-display text-lg font-bold tracking-tight ${
                dark ? "text-white/70" : "text-navy/60"
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
