import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Instagram } from "lucide-react";
import { CONTACT, OFFICES, SERVICES } from "@/lib/site-data";
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

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");

  return (
    <footer className="alpha-footer bg-mist text-navy border-t border-border">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <BrandLogo className="w-48" />
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

        {isAlbanian ? (
          <>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Faqet</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_AL.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Platformat</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {AL_FOOTER_EXTRAS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Company</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {OFFICES.map((office) => (
                  <li key={office.id}>
                    <span className="text-muted-foreground">{office.role.replace("Global Headquarters", "Dubai Headquarters")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Services</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link to={s.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Popular Routes</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {POPULAR_ROUTES.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">Destinations</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {DESTINATIONS.map((d) => (
                  <li key={d.to}>
                    <Link to={d.to} className="text-muted-foreground transition-colors hover:text-primary">
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-border">
        <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2" />
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-normal text-teal">{isAlbanian ? "Kontakt" : "Contact"}</h4>
            <ul className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
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
              <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <div className="font-semibold text-navy">Email</div>
                  <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "footer" })} className="hover:text-primary">{CONTACT.email}</a>
                </div>
              </li>
              {!isAlbanian && <li className="text-xs text-muted-foreground sm:col-span-2">{CONTACT.hours}</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Alpha Worldwide. {isAlbanian ? "Të gjitha të drejtat e rezervuara." : "All rights reserved."}</div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link to="/privacy-policy" className="hover:text-primary">{isAlbanian ? "Politika e Privatësisë" : "Privacy Policy"}</Link>
            <Link to="/cookie-policy" className="hover:text-primary">{isAlbanian ? "Politika e Cookies" : "Cookie Policy"}</Link>
            <Link to="/terms" className="hover:text-primary">{isAlbanian ? "Kushtet e Shërbimit" : "Terms of Service"}</Link>
            <Link to="/shipping-estimate-disclaimer" className="hover:text-primary">{isAlbanian ? "Vërejtje mbi Vlerësimet" : "Shipping Estimate Disclaimer"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
