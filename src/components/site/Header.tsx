import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, Languages, Calculator } from "lucide-react";
import { CONTACT, NAV_STRUCTURE, LANGUAGE_ROUTE_MAP, type NavItem } from "@/lib/site-data";
import { NAV_AL } from "@/lib/i18n-al";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const REVERSE_LANGUAGE_MAP = Object.fromEntries(Object.entries(LANGUAGE_ROUTE_MAP).map(([en, al]) => [al, en]));
function NavDropdown({ label, items }: { label: string; items: { to: string; label: string }[] }) {
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="h-11 px-2 text-navy">{label}<ChevronDown /></Button></DropdownMenuTrigger><DropdownMenuContent align="start" className="w-56 p-2">{items.map(item => <DropdownMenuItem key={item.to} asChild><Link to={item.to} className="min-h-11">{item.label}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>;
}
function DesktopNavItem({ item }: { item: NavItem }) {
  if (item.type === "dropdown") return <NavDropdown label={item.label} items={item.items} />;
  return <Button variant="ghost" asChild className="h-11 px-2 text-navy"><Link to={item.to} activeProps={{ className: "text-primary bg-accent" }} activeOptions={{ exact: true }}>{item.label}</Link></Button>;
}
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const languageTarget = isAlbanian ? REVERSE_LANGUAGE_MAP[normalized] ?? "/" : LANGUAGE_ROUTE_MAP[normalized] ?? "/al";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  const quoteHref = isAlbanian ? "/al/kontakt" : "/contact";
  const calculatorHref = isAlbanian ? "/al/kalkulator-transporti" : "/calculator";
  // Every existing navigation destination remains accessible; secondary pages are grouped, not removed.
  const primary = NAV_STRUCTURE.filter(i => i.type === "dropdown" || (i.type === "link" && ["/services"].includes(i.to)));
  const secondary = NAV_STRUCTURE.flatMap(i => i.type === "link" && !["/services", "/calculator", "/contact"].includes(i.to) ? [{ to: i.to, label: i.label }] : []);
  return <header className={`sticky inset-x-0 top-0 z-40 border-b border-border bg-background transition-shadow ${scrolled ? "shadow-header" : ""}`}>
    <div className="container-page grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 xl:flex xl:justify-between">
      <Link to={isAlbanian ? "/al" : "/"} aria-label={isAlbanian ? "Alpha Worldwide — kryefaqja" : "Alpha Worldwide — home"} className="min-w-0 shrink-0"><BrandLogo className="w-36 sm:w-44" /></Link>
      <nav aria-label={isAlbanian ? "Navigimi kryesor" : "Main navigation"} className="hidden items-center gap-3 xl:flex">
        {isAlbanian ? NAV_AL.filter(i => !["/al", "/al/kalkulator-transporti", "/al/kontakt"].includes(i.to)).map(i => <Button variant="ghost" asChild key={i.to} className="h-11 px-2 text-navy"><Link to={i.to}>{i.label}</Link></Button>) : <>{primary.map(i => <DesktopNavItem key={i.label} item={i} />)}<NavDropdown label="Explore" items={secondary} /></>}
      </nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Button variant="ghost" asChild className="h-11 px-2 text-navy"><Link to={languageTarget} aria-label={isAlbanian ? "Switch to English" : "Kalo në shqip"} onClick={() => trackEvent("language_changed", { from: isAlbanian ? "sq" : "en", to: isAlbanian ? "en" : "sq" })}><Languages className="hidden sm:block" />{isAlbanian ? "EN" : "SQ"}</Link></Button>
        <Button variant="ghost" size="icon" asChild className="hidden h-11 w-11 text-navy md:inline-flex"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp" title="WhatsApp"><MessageCircle /></a></Button>
        <Button variant="outline" asChild className="hidden h-11 text-navy lg:inline-flex"><Link to={calculatorHref}><Calculator />{isAlbanian ? "Llogarit transportin" : "Calculate Shipping"}</Link></Button>
        <Button asChild className="hidden h-11 sm:inline-flex"><Link to={quoteHref}>{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link></Button>
        <Button variant="ghost" size="icon" className="h-11 w-11 text-navy xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-border bg-background xl:hidden"><div className="container-page py-4">
      {(isAlbanian ? NAV_AL.map(i => ({ ...i, type: "link" as const })) : NAV_STRUCTURE).map(item => item.type === "link" ? <Button key={item.to} variant="ghost" asChild className="flex min-h-11 w-full justify-start text-navy"><Link to={item.to}>{item.label}</Link></Button> : <div key={item.label} className="my-2 border-y border-border py-3"><p className="px-4 text-xs font-semibold text-muted-foreground">{item.label}</p><div className="mt-2 grid grid-cols-2">{item.items.map(i => <Button key={i.to} variant="ghost" asChild className="min-h-11 justify-start text-navy"><Link to={i.to}>{i.label}</Link></Button>)}</div></div>)}
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><Button variant="outline" asChild className="h-12"><Link to={calculatorHref}><Calculator />{isAlbanian ? "Llogarit transportin" : "Calculate Shipping"}</Link></Button><Button asChild className="h-12"><Link to={quoteHref}>{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link></Button><Button variant="ghost" asChild className="h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener"><MessageCircle />WhatsApp</a></Button></div>
    </div></nav>}
  </header>;
}
