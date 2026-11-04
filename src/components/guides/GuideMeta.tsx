/**
 * Shared category badge + reading-time pill for guide pages and the hub.
 * Reading time is a static, pre-computed estimate (≈200 words/minute)
 * passed in per page — not computed at runtime from live word counts,
 * since that would fluctuate with future edits in ways that aren't
 * meaningful to a reader.
 */
export const GUIDE_CATEGORIES = {
  buying: "Buying",
  shipping: "Shipping",
  documentation: "Documentation",
  inspection: "Inspection",
  customs: "Customs",
  auctions: "Auctions",
} as const;

export type GuideCategory = keyof typeof GUIDE_CATEGORIES;

export const GUIDE_CATEGORIES_SQ: Record<GuideCategory, string> = {
  buying: "Blerja",
  shipping: "Transporti",
  documentation: "Dokumentet",
  inspection: "Inspektimi",
  customs: "Koordinimi doganor",
  auctions: "Ankandet",
};

export function GuideMeta({ category, readingTime, locale = "en" }: { category: GuideCategory; readingTime: string; locale?: "en" | "sq" }) {
  const sq = locale === "sq";
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="rounded-full bg-accent px-3 py-1 font-semibold text-primary">{sq ? GUIDE_CATEGORIES_SQ[category] : GUIDE_CATEGORIES[category]}</span>
      <span className="text-muted-foreground">{readingTime} {sq ? "lexim" : "read"}</span>
    </div>
  );
}
