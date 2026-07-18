import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/lib/seo";

const PATHS = [
  "/",
  "/services",
  "/calculator",
  "/import-usa",
  "/import-korea",
  "/import-uae",
  "/import-canada",
  "/import-europe",
  "/delivered-vehicles",
  "/about",
  "/contact",
  "/faq",
  "/auction-access",
  "/inspection-service",
  "/container-shipping",
  "/roro-shipping",
  "/airfreight",
  "/en/netherlands",
  "/en/shipping/south-korea-to-rotterdam",
  "/en/albania",
  "/al/",
  "/al/makina-nga-amerika",
  "/al/makina-nga-korea",
  "/al/copart-shqiperi",
  "/al/iaai-shqiperi",
  "/al/kalkulator-transporti",
  "/al/ankande-amerikane",
  "/al/encar-shqiperi",
  "/al/inspektim-makinash",
  "/al/kontakt",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map((p) =>
          [
            `  <url>`,
            `    <loc>${SITE_URL}${p}</loc>`,
            `    <changefreq>weekly</changefreq>`,
            `    <priority>${p === "/" ? "1.0" : "0.8"}</priority>`,
            `  </url>`,
          ].join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
