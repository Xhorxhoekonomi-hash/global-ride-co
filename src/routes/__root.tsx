import { WelcomeScreen } from "@/components/site/WelcomeScreen";
import { HeadingWidowGuard } from "@/components/site/HeadingWidowGuard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconAsset from "@/assets/favicon.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { StickyActionBar } from "@/components/site/StickyActionBar";
import { CtaBand } from "@/components/site/CtaBand";
import { GuideToc, RelatedGuides } from "@/components/site/GuideExtras";
import { KeywordDirectory } from "@/components/site/KeywordDirectory";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-navy">404</h1>
        <h2 className="mt-4 text-foreground">Page not found</h2>
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

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-foreground">
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
      { name: "theme-color", content: "#003C5A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: faviconAsset.url, type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isUtilityPage = pathname.startsWith("/admin");
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const isGuideArticle = /^\/(al\/udhezues|guides)\/[^/]+$/.test(normalized);
  const showCtaBand = !["/", "/al", "/contact", "/al/kontakt"].includes(normalized);

  if (isUtilityPage) {
    return (
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WelcomeScreen />
      <HeadingWidowGuard pathname={pathname} />
      <Header />
      <main className="min-h-screen" data-page={isGuideArticle ? "guide-article" : undefined}>
        <Outlet />
        {isGuideArticle && <GuideToc path={normalized} />}
        {isGuideArticle && <RelatedGuides path={normalized} />}
        {(["/services", "/al/sherbimet", "/import-europe", "/al/makina-nga-evropa", "/en/albania", "/al/transport-makinash-ne-shqiperi", "/en/netherlands", "/al/transport-makinash-ne-holande"].includes(normalized)) && <KeywordDirectory sq={pathname.startsWith("/al")} path={normalized} />}
        {showCtaBand && <CtaBand locale={pathname.startsWith("/al") ? "sq" : "en"} />}
      </main>
      <Footer />
      <WhatsAppFloat />
      <StickyActionBar />
    </QueryClientProvider>
  );
}
