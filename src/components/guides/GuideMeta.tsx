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

export function GuideMeta({ category, readingTime }: { category: GuideCategory; readingTime: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs">
      <span className="rounded-full bg-teal/15 px-3 py-1 font-semibold text-teal-glow">{GUIDE_CATEGORIES[category]}</span>
      <span className="text-white/60">{readingTime} read</span>
    </div>
  );
}
