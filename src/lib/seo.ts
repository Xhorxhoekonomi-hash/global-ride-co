// Central SEO helpers. Update SITE_URL here if the production domain changes.
export const SITE_URL = "https://www.alphaworldwidealbania.com";

type MetaEntry = Record<string, string>;

export type HeadOpts = {
  title: string;
  description: string;
  path: string; // starts with "/"
  image?: string; // vite asset import URL, e.g. "/assets/hero-home-xxx.jpg"
  ogType?: string;
  robots?: string; // e.g. "noindex, follow" — omit for default indexable behavior
  lang?: string; // BCP-47 tag, e.g. "en", "sq" — defaults to "en"
  // Reciprocal hreflang alternates — only include real, live counterpart
  // pages here. Never generate one for a page that doesn't exist yet.
  hreflang?: { lang: string; path: string }[];
  xDefault?: string; // path for hreflang="x-default" — usually "/"
};

export function absUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildHead(opts: HeadOpts): {
  meta: MetaEntry[];
  links: MetaEntry[];
} {
  const url = absUrl(opts.path);
  const image = opts.image ? absUrl(opts.image) : undefined;
  const lang = opts.lang ?? "en";
  const meta: MetaEntry[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:site_name", content: "Alpha Worldwide" },
    { property: "og:locale", content: lang === "sq" ? "sq_AL" : "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  if (opts.robots) {
    meta.push({ name: "robots", content: opts.robots });
  }

  const links: MetaEntry[] = [{ rel: "canonical", href: url }];
  if (opts.hreflang) {
    for (const alt of opts.hreflang) {
      links.push({ rel: "alternate", hreflang: alt.lang, href: absUrl(alt.path) });
    }
  }
  if (opts.xDefault) {
    links.push({ rel: "alternate", hreflang: "x-default", href: absUrl(opts.xDefault) });
  }

  return { meta, links };
}
