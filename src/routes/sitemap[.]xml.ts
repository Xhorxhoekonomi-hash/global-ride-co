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
  "/import-netherlands",
  "/import-germany",
  "/import-belgium",
  "/import-france",
  "/import-italy",
  "/import-switzerland",
  "/import-austria",
  "/import-spain",
  "/import-poland",
  "/import-czech-republic",
  "/import-romania",
  "/delivered-vehicles",
  "/about",
  "/why-alpha-worldwide",
  "/how-it-works",
  "/reviews",
  "/vehicle-history-check",
  "/guides",
  "/guides/how-to-buy-a-car-from-usa-auctions",
  "/guides/copart-vs-iaai",
  "/guides/container-vs-roro-car-shipping",
  "/guides/how-to-check-a-used-car-before-buying",
  "/guides/vehicle-import-documents",
  "/guides/car-shipping-costs-explained",
  "/guides/importing-electric-cars",
  "/guides/importing-luxury-cars",
  "/guides/how-long-does-car-shipping-take",
  "/guides/common-car-import-mistakes",
  "/guides/car-import-glossary",
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
  "/al/makina-nga-dubai",
  "/al/transport-me-kontenier",
  "/al/transport-roro",
  "/al/transport-ajror-makinash",
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
