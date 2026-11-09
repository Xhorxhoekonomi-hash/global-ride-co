import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Instagram, MessageCircle, ChevronDown, Clock } from "lucide-react";
import { EmailContact } from "@/components/site/EmailContact";
import { CONTACT, OFFICES, SERVICES, localPath } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { NAV_AL, AL_FOOTER_EXTRAS } from "@/lib/i18n-al";
import { BrandLogo } from "@/components/site/BrandLogo";

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/why-alpha-worldwide", label: "Why Alpha Worldwide" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/guides", label: "Guides" },
  { to: "/vehicle-history-check", label: "Vehicle History Check" },
  { to: "/contact", label: "Contact" },
  { to: "/delivered-vehicles", label: "Delivered Vehicles" },
];

const POPULAR_ROUTES = [
  { to: "/import-usa", label: "USA to Albania" },
  { to: "/import-korea", label: "South Korea to Albania" },
  { to: "/import-uae", label: "UAE to Albania" },
  { to: "/import-canada", label: "Canada to Albania" },
  { to: "/import-europe", label: "Europe to Albania" },
  { to: "/en/shipping/south-korea-to-rotterdam", label: "South Korea to Rotterdam" },
];

const DESTINATIONS = [
  { to: "/en/albania", label: "Albania" },
  { to: "/en/netherlands", label: "Netherlands (Rotterdam Route)" },
  { to: "/import-netherlands", label: "Import to Netherlands" },
  { to: "/import-germany", label: "Import to Germany" },
  { to: "/import-belgium", label: "Import to Belgium" },
  { to: "/import-france", label: "Import to France" },
  { to: "/import-italy", label: "Import to Italy" },
  { to: "/import-switzerland", label: "Import to Switzerland" },
  { to: "/import-austria", label: "Import to Austria" },
  { to: "/import-spain", label: "Import to Spain" },
  { to: "/import-poland", label: "Import to Poland" },
  { to: "/import-czech-republic", label: "Import to Czech Republic" },
  { to: "/import-romania", label: "Import to Romania" },
];

const FOOTER_SERVICES = SERVICES.filter((s) => s.hasDedicatedPage);

// Localized office role/country labels for the Albanian footer — keyed by
// the exact English source strings already in OFFICES, so this stays in
// sync automatically if OFFICES data changes shape (falls back to English
// if a role/country isn't in the map).
const ROLE_LABELS_AL: Record<string, string> = {
  "Global Headquarters": "Selia qendrore",
  "European & Albanian Operations": "Operacionet në Evropë dhe Shqipëri",
};
const COUNTRY_LABELS_AL: Record<string, string> = {
  "United Arab Emirates": "Emiratet e Bashkuara Arabe",
  Albania: "Shqipëri",
};

type FooterLink = { to?: string; label: string };

/** Link group: always open on desktop; a collapsible row on phones. Links stay in the DOM when collapsed. */
function FooterGroup({ id, title, links }: { id: string; title: string; links: FooterLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="footer-group" data-open={open || undefined}>
      <h4 className="footer-group-title">
        <button type="button" className="footer-group-toggle" aria-expanded={open} aria-controls={`footer-${id}`} onClick={() => setOpen((v) => !v)}>
          {title}<ChevronDown aria-hidden="true" />
        </button>
        <span className="footer-group-label">{title}</span>
      </h4>
      <ul id={`footer-${id}`} className="footer-links">
        {links.map((l) => (
          <li key={l.to ?? l.label}>
            {l.to ? <Link to={l.to}>{l.label}</Link> : <span>{l.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");
  const groups: { id: string; title: string; links: FooterLink[] }[] = isAlbanian
    ? [
        { id: "pages", title: "Faqet", links: NAV_AL },
        { id: "platforms", title: "Platformat", links: AL_FOOTER_EXTRAS },
      ]
    : [
        { id: "company", title: "Company", links: [...COMPANY_LINKS, ...OFFICES.map((o) => ({ label: o.role.replace("Global Headquarters", "Dubai Headquarters") }))] },
        { id: "services", title: "Services", links: FOOTER_SERVICES.map((s) => ({ to: s.to, label: s.title })) },
        { id: "routes", title: "Popular Routes", links: POPULAR_ROUTES },
        { id: "destinations", title: "Destinations", links: DESTINATIONS },
      ];

  return (
    <footer className="alpha-footer">
      <div className={`container-page footer-main ${isAlbanian ? "footer-main--short" : ""}`}>
        <div className="footer-brand">
          <BrandLogo className="w-48" />
          <p className="footer-slogan">Moving Cars Worldwide</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {isAlbanian
              ? "Kompani ndërkombëtare për blerjen, inspektimin dhe transportin e automjeteve — nga origjina deri në derën tuaj."
              : "International vehicle sourcing, auction brokerage, inspection, import & export — fully managed from origin to your door."}
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-md border border-border text-muted-foreground hover:border-teal hover:text-teal">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
        {groups.map((g) => <FooterGroup key={g.id} {...g} />)}
      </div>

      <div className="border-t border-border">
        <div className="container-page footer-contact">
          <h4 className="footer-heading">{isAlbanian ? "Kontakt" : "Contact"}</h4>
          <ul className="footer-contact-row">
            {OFFICES.map((office) => (
              <li key={office.id} className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <div className="font-semibold text-navy">{isAlbanian ? ROLE_LABELS_AL[office.role] ?? office.role : office.role}</div>
                  <div>{office.city}, {isAlbanian ? COUNTRY_LABELS_AL[office.country] ?? office.country : office.country}</div>
                  <div className="mt-0.5">
                    {"phone" in office ? (
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: office.city })} className="hover:text-primary">{office.phone}</a>
                    ) : (
                      office.phones.map((p, i) => (
                        <span key={p}>
                          <a href={`tel:${p.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: office.city })} className="hover:text-primary">{p}</a>
                          {i < office.phones.length - 1 && ", "}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex min-w-0 flex-col items-start gap-1">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "footer" })} className="inline-flex min-h-11 items-center gap-2 text-secondary"><MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />WhatsApp +355692233416</a>
              <EmailContact location="footer" />
            </li>
            {!isAlbanian && <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden="true" /><span>{CONTACT.hours}</span></li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Alpha Worldwide. {isAlbanian ? "Të gjitha të drejtat e rezervuara." : "All rights reserved."}</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to={localPath("/privacy-policy", isAlbanian)} className="hover:text-primary">{isAlbanian ? "Politika e Privatësisë" : "Privacy Policy"}</Link>
            <Link to={localPath("/cookie-policy", isAlbanian)} className="hover:text-primary">{isAlbanian ? "Politika e Cookies" : "Cookie Policy"}</Link>
            <Link to={localPath("/terms", isAlbanian)} className="hover:text-primary">{isAlbanian ? "Kushtet e Shërbimit" : "Terms of Service"}</Link>
            <Link to={localPath("/shipping-estimate-disclaimer", isAlbanian)} className="hover:text-primary">{isAlbanian ? "Vërejtje mbi Vlerësimet" : "Shipping Estimate Disclaimer"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
