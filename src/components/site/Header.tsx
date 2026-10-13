import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ChevronDown, Languages, Calculator } from "lucide-react";
import { CONTACT, LANGUAGE_ROUTE_MAP, type NavItem } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
  const navigation: NavItem[] = [
    { type: "dropdown", label: isAlbanian ? "Bli / Importo" : "Buy / Import", items: [
      { to: isAlbanian ? "/al/makina-nga-amerika" : "/import-usa", label: isAlbanian ? "Amerikë" : "USA" },
      { to: isAlbanian ? "/al/makina-nga-korea" : "/import-korea", label: isAlbanian ? "Koreja e Jugut" : "South Korea" },
      { to: isAlbanian ? "/al/makina-nga-dubai" : "/import-uae", label: "Dubai / UAE" },
      { to: "/import-europe", label: isAlbanian ? "Evropë (EN)" : "Europe" },
      { to: "/import-canada", label: isAlbanian ? "Kanada (EN)" : "Canada" },
      { to: isAlbanian ? "/al/ankande-amerikane" : "/auction-access", label: isAlbanian ? "Ankande amerikane" : "Auction assistance" },
      ...(isAlbanian ? [{ to: "/al/copart-shqiperi", label: "Copart Shqipëri" }, { to: "/al/iaai-shqiperi", label: "IAAI Shqipëri" }, { to: "/al/encar-shqiperi", label: "Encar Shqipëri" }] : []),
    ] },
    { type: "dropdown", label: isAlbanian ? "Transport / Shërbime" : "Shipping & Services", items: [
      { to: "/services", label: isAlbanian ? "Të gjitha shërbimet (EN)" : "All services" },
      { to: isAlbanian ? "/al/transport-me-kontenier" : "/container-shipping", label: isAlbanian ? "Transport me kontenier" : "Container shipping" },
      { to: isAlbanian ? "/al/transport-roro" : "/roro-shipping", label: "RoRo" },
      { to: isAlbanian ? "/al/transport-ajror-makinash" : "/airfreight", label: isAlbanian ? "Transport ajror" : "Air freight" },
      { to: isAlbanian ? "/al/inspektim-makinash" : "/inspection-service", label: isAlbanian ? "Inspektim" : "Pre-purchase inspection" },
      { to: "/vehicle-history-check", label: isAlbanian ? "Historiku i automjetit (EN)" : "Vehicle history" },
      { to: "/how-it-works", label: isAlbanian ? "Si funksionon (EN)" : "How it works" },
    ] },
    { type: "link", to: calculatorHref, label: isAlbanian ? "Kalkulator" : "Calculator" },
    { type: "dropdown", label: isAlbanian ? "Puna jonë" : "Our Work", items: [
      { to: "/delivered-vehicles", label: isAlbanian ? "Arkivi i automjeteve (EN)" : "Vehicle archive" },
      { to: "/about", label: isAlbanian ? "Rreth Alpha (EN)" : "About Alpha" },
      { to: "/guides", label: isAlbanian ? "Udhëzues (EN)" : "Guides" },
      { to: "/faq", label: isAlbanian ? "Pyetje të shpeshta (EN)" : "FAQ" },
      { to: "/reviews", label: isAlbanian ? "Përvoja e klientëve (EN)" : "Customer experience" },
      { to: "/why-alpha-worldwide", label: isAlbanian ? "Pse Alpha (EN)" : "Why Alpha" },
    ] },
    { type: "link", to: quoteHref, label: isAlbanian ? "Kontakt" : "Contact" },
  ];
  return <header className={`alpha-header sticky inset-x-0 top-0 z-40 border-b border-border bg-background transition-shadow ${scrolled ? "shadow-header" : ""}`}>
    <div className="container-page alpha-navigation-row grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
      <Link to={isAlbanian ? "/al" : "/"} aria-label={isAlbanian ? "Alpha Worldwide — kryefaqja" : "Alpha Worldwide — home"} className="min-w-0 shrink-0"><BrandLogo className="w-36 sm:w-44" /></Link>
      <nav aria-label={isAlbanian ? "Navigimi kryesor" : "Main navigation"} className="alpha-desktop-navigation hidden items-center gap-3 lg:flex">
        {navigation.map(item => <DesktopNavItem key={item.label} item={item} />)}
      </nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Button variant="ghost" asChild className="h-11 px-2 text-navy"><Link to={languageTarget} aria-label={isAlbanian ? "Switch to English" : "Kalo në shqip"} onClick={() => trackEvent("language_changed", { from: isAlbanian ? "sq" : "en", to: isAlbanian ? "en" : "sq" })}><Languages className="hidden sm:block" />{isAlbanian ? "EN" : "SQ"}</Link></Button>
        <Button variant="ghost" size="icon" asChild className="hidden h-11 w-11 text-navy xl:inline-flex"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp" title="WhatsApp"><MessageCircle /></a></Button>
        <Button asChild className="hidden h-11 sm:inline-flex"><Link to={quoteHref}>{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link></Button>
        <Button variant="ghost" size="icon" className="h-11 w-11 text-navy lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}>{open ? <X /> : <Menu />}</Button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-border bg-background lg:hidden"><div className="container-page py-4">
      <Accordion type="single" collapsible>{navigation.map(item => item.type === "link" ? <Button key={item.to} variant="ghost" asChild className="flex min-h-12 w-full justify-start text-navy"><Link to={item.to}>{item.label}</Link></Button> : <AccordionItem key={item.label} value={item.label}><AccordionTrigger className="min-h-12 px-4 text-base text-navy">{item.label}</AccordionTrigger><AccordionContent><div className="grid gap-1">{item.items.map(i => <Button key={i.to} variant="ghost" asChild className="min-h-11 justify-start whitespace-normal text-left text-navy"><Link to={i.to}>{i.label}</Link></Button>)}</div></AccordionContent></AccordionItem>)}</Accordion>
      <div className="mt-4 grid gap-3 sm:grid-cols-2"><Button variant="outline" asChild className="h-12"><Link to={calculatorHref}><Calculator />{isAlbanian ? "Llogarit transportin" : "Calculate Shipping"}</Link></Button><Button asChild className="h-12"><Link to={quoteHref}>{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link></Button><Button variant="ghost" asChild className="h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener"><MessageCircle />WhatsApp</a></Button></div>
    </div></nav>}
  </header>;
}
