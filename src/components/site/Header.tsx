import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Mail, MessageCircle, ChevronDown, Languages, Calculator } from "lucide-react";
import { CONTACT, LANGUAGE_ROUTE_MAP, type NavItem } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/site/BrandLogo";
import { EmailContact } from "@/components/site/EmailContact";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const REVERSE_LANGUAGE_MAP = Object.fromEntries(Object.entries(LANGUAGE_ROUTE_MAP).map(([en, al]) => [al, en]));
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const pathname = useRouterState({ select: s => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const languageTarget = isAlbanian ? REVERSE_LANGUAGE_MAP[normalized] ?? "/" : LANGUAGE_ROUTE_MAP[normalized] ?? "/al";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); setMega(null); }, [pathname]);
  useEffect(() => {
    const root = document.documentElement;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) root.setAttribute("data-menu-open", ""); else root.removeAttribute("data-menu-open");
    return () => { document.body.style.overflow = ""; root.removeAttribute("data-menu-open"); };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    sheet?.querySelector<HTMLElement>("a[href], button")?.focus({ preventScroll: true });
    const onTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !sheet) return;
      const items = [menuButtonRef.current, ...Array.from(sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))].filter(Boolean) as HTMLElement[];
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onTrap);
    return () => { document.removeEventListener("keydown", onTrap); };
  }, [open]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(o => { if (o) menuButtonRef.current?.focus(); return false; }); setMega(null); } };
    const onDown = (event: PointerEvent) => { if (!headerRef.current?.contains(event.target as Node)) setMega(null); };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey); return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onDown); };
  }, []);
  const quoteHref = isAlbanian ? "/al/kontakt" : "/contact";
  const calculatorHref = isAlbanian ? "/al/kalkulator-transporti" : "/calculator";
  const navigation: NavItem[] = [
    { type: "dropdown", label: isAlbanian ? "Bli / Importo" : "Buy / Import", items: [
      { to: isAlbanian ? "/al/makina-nga-amerika" : "/import-usa", label: isAlbanian ? "Amerikë" : "USA" },
      { to: isAlbanian ? "/al/makina-nga-korea" : "/import-korea", label: isAlbanian ? "Koreja e Jugut" : "South Korea" },
      { to: isAlbanian ? "/al/makina-nga-dubai" : "/import-uae", label: "Dubai / UAE" },
      { to: isAlbanian ? "/al/makina-nga-evropa" : "/import-europe", label: isAlbanian ? "Evropë" : "Europe" },
      { to: isAlbanian ? "/al/makina-nga-kanadaja" : "/import-canada", label: isAlbanian ? "Kanada" : "Canada" },
      { to: isAlbanian ? "/al/ankande-amerikane" : "/auction-access", label: isAlbanian ? "Ankande amerikane" : "Auction assistance" },
      ...(isAlbanian ? [{ to: "/al/copart-shqiperi", label: "Copart Shqipëri" }, { to: "/al/iaai-shqiperi", label: "IAAI Shqipëri" }, { to: "/al/encar-shqiperi", label: "Encar Shqipëri" }] : []),
    ] },
    { type: "dropdown", label: isAlbanian ? "Transport / Shërbime" : "Shipping & Services", items: [
      { to: isAlbanian ? "/al/sherbimet" : "/services", label: isAlbanian ? "Të gjitha shërbimet" : "All services" },
      { to: isAlbanian ? "/al/transport-me-kontenier" : "/container-shipping", label: isAlbanian ? "Transport me kontenier" : "Container shipping" },
      { to: isAlbanian ? "/al/transport-roro" : "/roro-shipping", label: "RoRo" },
      { to: isAlbanian ? "/al/transport-ajror-makinash" : "/airfreight", label: isAlbanian ? "Transport ajror" : "Air freight" },
      { to: isAlbanian ? "/al/inspektim-makinash" : "/inspection-service", label: isAlbanian ? "Inspektim" : "Pre-purchase inspection" },
      { to: isAlbanian ? "/al/historiku-i-automjetit" : "/vehicle-history-check", label: isAlbanian ? "Historiku i automjetit" : "Vehicle history" },
      { to: isAlbanian ? "/al/si-funksionon" : "/how-it-works", label: isAlbanian ? "Si funksionon" : "How it works" },
    ] },
    { type: "link", to: calculatorHref, label: isAlbanian ? "Kalkulator" : "Calculator" },
    { type: "dropdown", label: isAlbanian ? "Udhëzues" : "Guides", items: [
      { to: isAlbanian ? "/al/udhezues" : "/guides", label: isAlbanian ? "Të gjithë udhëzuesit" : "All guides" },
      { to: isAlbanian ? "/al/pyetje-te-shpeshta" : "/faq", label: isAlbanian ? "Pyetje të shpeshta" : "FAQ" },
      { to: isAlbanian ? "/al/automjete-te-dorezuara" : "/delivered-vehicles", label: isAlbanian ? "Arkivi i automjeteve" : "Vehicle archive" },
      { to: isAlbanian ? "/al/pervoja-e-klienteve" : "/reviews", label: isAlbanian ? "Përvoja e klientëve" : "Customer experience" },
      { to: isAlbanian ? "/al/rreth-nesh" : "/about", label: isAlbanian ? "Rreth Alpha" : "About Alpha" },
      { to: isAlbanian ? "/al/pse-alpha-worldwide" : "/why-alpha-worldwide", label: isAlbanian ? "Pse Alpha" : "Why Alpha" },
    ] },
    { type: "link", to: quoteHref, label: isAlbanian ? "Kontakt" : "Contact" },
  ];
  const megaItem = navigation.find(item => item.type === "dropdown" && item.label === mega);
  return <header ref={headerRef} className="alpha-header" data-scrolled={scrolled || undefined} data-open={open || mega ? "" : undefined} onMouseLeave={() => setMega(null)}>
    <div className="container-page alpha-navigation-row">
      <Link to={isAlbanian ? "/al" : "/"} aria-label={isAlbanian ? "Alpha Worldwide — kryefaqja" : "Alpha Worldwide — home"} className="alpha-header-logo"><BrandLogo className="logo-default" /><BrandLogo tone="light" className="logo-light" /></Link>
      <nav aria-label={isAlbanian ? "Navigimi kryesor" : "Main navigation"} className="alpha-desktop-navigation">
        {navigation.map(item => item.type === "dropdown"
          ? <button key={item.label} type="button" className="alpha-nav-link" aria-expanded={mega === item.label} aria-controls="alpha-mega" onClick={() => setMega(m => m === item.label ? null : item.label)} onMouseEnter={() => setMega(item.label)}>{item.label}<ChevronDown aria-hidden="true" /></button>
          : <Link key={item.label} to={item.to} className="alpha-nav-link" activeProps={{ "aria-current": "page" }} activeOptions={{ exact: true }} onMouseEnter={() => setMega(null)}>{item.label}</Link>)}
      </nav>
      <div className="alpha-header-actions">
        <Link to={languageTarget} className="alpha-header-icon alpha-header-lang" aria-label={isAlbanian ? "Switch to English" : "Kalo në shqip"} onClick={() => trackEvent("language_changed", { from: isAlbanian ? "sq" : "en", to: isAlbanian ? "en" : "sq" })}><Languages aria-hidden="true" />{isAlbanian ? "EN" : "SQ"}</Link>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp +355692233416" title="WhatsApp +355692233416" className="alpha-header-icon alpha-header-desktop"><MessageCircle aria-hidden="true" /></a>
        <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "header" })} aria-label={`Email ${CONTACT.email}`} title={CONTACT.email} className="alpha-header-icon alpha-header-desktop"><Mail aria-hidden="true" /></a>
        <Link to={quoteHref} className="alpha-header-quote">{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link>
        <button ref={menuButtonRef} type="button" className="header-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(v => !v)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
    </div>
    {megaItem && megaItem.type === "dropdown" && <div id="alpha-mega" className="alpha-mega"><div className="container-page alpha-mega-inner">
      <p className="alpha-mega-title">{megaItem.label}</p>
      <ul className="alpha-mega-links">{megaItem.items.map(i => <li key={i.to}><Link to={i.to} onClick={() => setMega(null)}>{i.label}</Link></li>)}</ul>
    </div></div>}
    {open && mounted && createPortal(<nav ref={sheetRef} id="mobile-navigation" aria-label={isAlbanian ? "Navigimi në celular" : "Mobile navigation"} className="mobile-sheet" onClick={event => { if ((event.target as HTMLElement).closest("a[href]")) setOpen(false); }}><div className="container-page mobile-sheet-inner">
      <Accordion type="single" collapsible>{navigation.map(item => item.type === "link" ? <Link key={item.to} to={item.to} className="mobile-sheet-link">{item.label}</Link> : <AccordionItem key={item.label} value={item.label}><AccordionTrigger className="mobile-sheet-link">{item.label}</AccordionTrigger><AccordionContent><div className="grid gap-1">{item.items.map(i => <Link key={i.to} to={i.to} className="mobile-sheet-sublink">{i.label}</Link>)}</div></AccordionContent></AccordionItem>)}</Accordion>
      <div className="mobile-sheet-contact"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-2 text-sm text-secondary"><MessageCircle className="h-5 w-5" aria-hidden="true" />WhatsApp</a><EmailContact location="mobile_menu" /></div>
      <div className="mobile-sheet-actions"><Link to={calculatorHref} className="btn-pair btn-pair--outline"><Calculator aria-hidden="true" />{isAlbanian ? "Llogarit transportin" : "Calculate Shipping"}</Link><Link to={quoteHref} className="btn-pair btn-pair--primary">{isAlbanian ? "Merr ofertë" : "Get a Quote"}</Link></div>
    </div></nav>, document.body)}
  </header>;
}
