/** Permanent redirects for URLs from the previous (Wix) site that are still indexed. Trailing-slash tolerant. */
const EXACT: Record<string, string> = {
  "/home": "/",
  "/car-shipping-services": "/services",
  "/about-us": "/about",
  "/sq": "/al",
  "/sq/about-us": "/al/rreth-nesh",
  "/sq/contact": "/al/kontakt",
  "/sq/reviews": "/al/pervoja-e-klienteve",
  "/sq/car-shipping-services": "/al/sherbimet",
  "/blog": "/guides",
};
const FOREIGN_LOCALE: Record<string, string> = {
  "": "/",
  "/contact": "/contact",
  "/about-us": "/about",
  "/reviews": "/reviews",
  "/car-shipping-services": "/services",
};

export function legacyRedirect(pathname: string): string | null {
  // Canonical Albanian home is /al (no trailing slash).
  if (pathname === "/al/") return "/al";
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "").toLowerCase() : pathname;
  if (EXACT[path]) return EXACT[path];
  if (path.startsWith("/sq/")) return "/al";
  const locale = path.match(/^\/(de|it)(\/.*)?$/);
  if (locale) return FOREIGN_LOCALE[locale[2] ?? ""] ?? "/";
  if (path.startsWith("/post/") || path.startsWith("/blog/")) return "/guides";
  return null;
}
