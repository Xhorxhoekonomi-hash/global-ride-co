import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, Languages } from "lucide-react";
import { CONTACT, NAV_STRUCTURE, LANGUAGE_ROUTE_MAP, type NavItem } from "@/lib/site-data";
import { NAV_AL } from "@/lib/i18n-al";
import { trackEvent } from "@/lib/analytics";
import logoIconAsset from "@/assets/logo-icon-white.png.asset.json";

const REVERSE_LANGUAGE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(LANGUAGE_ROUTE_MAP).map(([en, al]) => [al, en]),
);

function normalizePath(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function LanguageSwitch({ pathname, isAlbanian }: { pathname: string; isAlbanian: boolean }) {
  const normalized = normalizePath(pathname);
  const target = isAlbanian
    ? REVERSE_LANGUAGE_MAP[normalized] ?? "/"
    : LANGUAGE_ROUTE_MAP[normalized] ?? "/al";

  return (
    <Link
      to={target}
      onClick={() => trackEvent("language_changed", { from: isAlbanian ? "sq" : "en", to: isAlbanian ? "en" : "sq" })}
      aria-label={isAlbanian ? "Switch to English" : "Kalo në shqip"}
      className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/10"
    >
      <Languages className="h-3.5 w-3.5" />
      {isAlbanian ? "EN" : "SQ"}
    </Link>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (item.type === "link") {
    const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
    return (
      <Link
        to={item.to}
        className={`text-sm font-medium transition-colors hover:text-teal-glow ${
          isActive ? "text-teal-glow" : "text-white/85"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        className="flex items-center gap-1 text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {item.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-navy p-2 shadow-elegant">
          {item.items.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-teal-glow"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quoteHref = isAlbanian ? "/al/kontakt" : "/contact";
  const quoteLabel = isAlbanian ? "Merr një ofertë falas" : "Get a Free Quote";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || open ? "bg-navy shadow-elegant" : "bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled || open ? "var(--navy)" : "transparent",
      }}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6 py-3">
        <Link to={isAlbanian ? "/al" : "/"} className="flex min-w-0 items-center gap-3 text-white">
          <img
            src={logoIconAsset.url}
            alt="Alpha Worldwide"
            className="h-11 w-11 shrink-0 object-contain"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-base font-bold tracking-tight">
              Alpha Worldwide
            </div>
            <div className="truncate text-[10px] uppercase tracking-[0.22em] text-teal-glow">
              Moving Cars Worldwide
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {isAlbanian
            ? NAV_AL.map((item) => {
                const isActive = item.to === "/al" ? pathname === "/al" || pathname === "/al/" : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`text-sm font-medium transition-colors hover:text-teal-glow ${
                      isActive ? "text-teal-glow" : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })
            : NAV_STRUCTURE.map((item) => (
                <DesktopNavItem key={item.type === "link" ? item.to : item.label} item={item} />
              ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitch pathname={pathname} isAlbanian={isAlbanian} />
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp"
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:grid"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Link to={quoteHref} className="btn-primary hidden lg:inline-flex">
            {quoteLabel}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md text-white xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy xl:hidden">
          <nav className="container-page flex flex-col py-4">
            {isAlbanian
              ? NAV_AL.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
                  >
                    {item.label}
                  </Link>
                ))
              : NAV_STRUCTURE.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="py-3 text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div key={item.label} className="py-2">
                      <div className="py-1 text-xs font-semibold uppercase tracking-wider text-white/40">
                        {item.label}
                      </div>
                      <div className="ml-3 flex flex-col">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="py-2 text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ),
                )}
            <Link
              to={quoteHref}
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              {quoteLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
