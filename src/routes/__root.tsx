import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconAsset from "@/assets/favicon.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Please try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline-dark">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "International Vehicle Shipping & Import Services | Alpha Worldwide" },
      { name: "description", content: "Alpha Worldwide sources, inspects, purchases, and ships vehicles worldwide — from the USA, South Korea, UAE, and Canada to Albania and across Europe." },
      { name: "author", content: "Alpha Worldwide" },
      { property: "og:site_name", content: "Alpha Worldwide" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#1A3A5C" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: faviconAsset.url, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
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
          department: [
            {
              "@type": "LocalBusiness",
              name: "Alpha Worldwide Albania",
              description: "European and Albanian operations",
              telephone: OFFICES[1].phones[0],
              address: {
                "@type": "PostalAddress",
                addressLocality: OFFICES[1].city,
                addressCountry: OFFICES[1].countryCode,
              },
            },
          ],
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
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Alpha Worldwide",
          url: SITE_URL,
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  // Read the matched route's pathname during render — this runs as part of
  // server-side rendering (shellComponent produces the initial HTML), so
  // the correct lang attribute is present in the first response, not
  // patched in afterward on the client.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = pathname.startsWith("/al") ? "sq" : "en";

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </QueryClientProvider>
  );
}
