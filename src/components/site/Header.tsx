import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import logoIconAsset from "@/assets/logo-icon-white.png.asset.json";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "SQ">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link to="/" className="flex min-w-0 items-center gap-3 text-white">
          <img
            src={logoIconAsset.url}
            alt="Alpha Worldwide Albania"
            className="h-11 w-11 shrink-0 object-contain"
          />
          <div className="min-w-0 leading-tight">
            <div className="truncate font-display text-base font-bold tracking-tight">
              Alpha Worldwide
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-teal-glow">
              Albania
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
              activeProps={{ className: "text-teal-glow" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full border border-white/20 p-0.5 text-xs md:flex">
            {(["EN", "SQ"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 font-semibold transition-colors ${
                  lang === code ? "bg-teal text-white" : "text-white/70"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp"
            className="hidden h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:grid"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <Link to="/contact" className="btn-primary hidden lg:inline-flex">
            Get a Free Quote
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-white/85 transition-colors hover:text-teal-glow"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
