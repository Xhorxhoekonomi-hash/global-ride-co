import { CONTACT, LANGUAGE_ROUTE_MAP, OFFICES } from "@/lib/site-data";

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
  // Relative bundled/CDN pointers do not establish an absolute public image URL.
  const image = opts.image?.startsWith("https://") ? opts.image : undefined;
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
  if (!opts.hreflang && !opts.robots?.includes("noindex")) {
    // Derive reciprocal alternates from the single EN<->SQ page map; unpaired pages self-reference.
    const pair = derivedHreflang(opts.path, lang);
    opts = { ...opts, hreflang: pair.hreflang, xDefault: opts.xDefault ?? pair.xDefault };
  }
  if (opts.hreflang) {
    for (const alt of opts.hreflang) {
      links.push({ rel: "alternate", hrefLang: alt.lang, href: absUrl(alt.path) });
    }
  }
  if (opts.xDefault) {
    links.push({ rel: "alternate", hrefLang: "x-default", href: absUrl(opts.xDefault) });
  }

  return { meta, links };
}

/** hreflang alternates for a path from LANGUAGE_ROUTE_MAP (only real, live counterparts). */
export function derivedHreflang(path: string, lang: string) {
  const sqToEn = Object.entries(LANGUAGE_ROUTE_MAP).find(([, sq]) => sq === path)?.[0];
  const en = lang === "sq" ? sqToEn : path;
  const sq = lang === "sq" ? path : LANGUAGE_ROUTE_MAP[path];
  const hreflang = [...(en ? [{ lang: "en", path: en }] : []), ...(sq ? [{ lang: "sq", path: sq }] : [])];
  return { hreflang, xDefault: en ?? path };
}

/** Shared office data; contact graphs localize the WebPage, not the business identity. */
export function siteGraph(lang: "en" | "sq", contactPath?: "/contact" | "/al/kontakt") {
  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#durres-office`,
    name: "Alpha Worldwide Albania",
    description: "European and Albanian operations",
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    telephone: "+355 69 223 3416",
    email: "info@alphaworldwidealbania.com",
    url: SITE_URL,
    hasMap: "https://maps.app.goo.gl/FRhPvdgR3h79varSA",
    image: absUrl("/__l5e/assets-v1/9daed126-7325-4a04-b2f0-688d01203f14/TD_LOGO_2023.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rruga Hafiz Podgorica",
      addressLocality: "Durrës",
      postalCode: "2001",
      addressCountry: "AL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.3173012,
      longitude: 19.4492877,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  };
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": contactPath ? [
        localBusiness,
        {
          "@type": "ContactPage",
          "@id": `${absUrl(contactPath)}#webpage`,
          url: absUrl(contactPath),
          inLanguage: lang,
          mainEntity: { "@id": localBusiness["@id"] },
          about: { "@id": `${SITE_URL}/#organization` },
        },
      ] : [
        {
                    "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Alpha Worldwide",
          alternateName: "Alpha Worldwide Albania",
          description:
            "International vehicle logistics, sourcing and auction-services company headquartered in Dubai, UAE, with European operations in Durrës, Albania — serving the USA, South Korea, UAE, Canada, Albania, and wider Europe.",
          url: SITE_URL,
          email: CONTACT.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: OFFICES[0].city,
            addressCountry: OFFICES[0].countryCode,
          },
          areaServed: [
            "Albania", "United States", "South Korea", "United Arab Emirates",
            "Canada", "Italy", "Germany", "Belgium", "Netherlands", "France",
          ],
          department: [localBusiness],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: OFFICES[0].phone,
              contactType: "customer service",
              areaServed: "AE",
              availableLanguage: ["en", "ar"],
            },
            {
              "@type": "ContactPoint",
              telephone: OFFICES[1].phones[0],
              contactType: "customer service",
              areaServed: "AL",
              availableLanguage: ["en", "sq"],
            },
          ],
          sameAs: [`https://wa.me/${CONTACT.whatsapp}`],
        },
        { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Alpha Worldwide", url: lang === "sq" ? `${SITE_URL}/al` : SITE_URL, inLanguage: lang, publisher: { "@id": `${SITE_URL}/#organization` } },
      ],
    }),
  };
}
