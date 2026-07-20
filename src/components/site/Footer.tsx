import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { CONTACT, OFFICES, SERVICES } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { NAV_AL, AL_FOOTER_EXTRAS } from "@/lib/i18n-al";
import logoFooterAsset from "@/assets/logo-footer.png.asset.json";

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/why-alpha-worldwide", label: "Why Alpha Worldwide" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
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
    <footer className="section-graphite border-t border-white/5">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <img
            src={logoFooterAsset.url}
            alt="Alpha Worldwide"
            className="h-auto w-44 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            {isAlbanian
              ? "Kompani ndërkombëtare për blerjen, inspektimin dhe transportin e automjeteve — nga origjina deri në derën tuaj."
              : "International vehicle sourcing, auction brokerage, inspection, import & export — fully managed from origin to your door."}
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-teal hover:text-teal">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:border-teal hover:text-teal">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {isAlbanian ? (
          <>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Faqet</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {NAV_AL.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 transition-colors hover:text-teal-glow">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Platformat</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {AL_FOOTER_EXTRAS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 transition-colors hover:text-teal-glow">
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
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Company</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {COMPANY_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 transition-colors hover:text-teal-glow">
                      {l.label}
                    </Link>
                  </li>
                ))}
                {OFFICES.map((office) => (
                  <li key={office.id}>
                    <span className="text-white/70">{office.role.replace("Global Headquarters", "Dubai Headquarters")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Services</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link to={s.to} className="text-white/70 transition-colors hover:text-teal-glow">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Popular Routes</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {POPULAR_ROUTES.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="text-white/70 transition-colors hover:text-teal-glow">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Destinations</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {DESTINATIONS.map((d) => (
                  <li key={d.to}>
                    <Link to={d.to} className="text-white/70 transition-colors hover:text-teal-glow">
                      {d.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-white/5">
        <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2" />
          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{isAlbanian ? "Kontakt" : "Contact"}</h4>
            <ul className="mt-4 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
              {OFFICES.map((office) => (
                <li key={office.id} className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                  <div>
                    <div className="font-semibold text-white/85">{isAlbanian ? ROLE_LABELS_AL[office.role] ?? office.role : office.role}</div>
                    <div>{office.city}, {isAlbanian ? COUNTRY_LABELS_AL[office.country] ?? office.country : office.country}</div>
                    <div className="mt-0.5">
                      {"phone" in office ? (
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: office.city })} className="hover:text-teal-glow">{office.phone}</a>
                      ) : (
                        office.phones.map((p, i) => (
                          <span key={p}>
                            <a href={`tel:${p.replace(/\s/g, "")}`} onClick={() => trackEvent("phone_clicked", { location: office.city })} className="hover:text-teal-glow">{p}</a>
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
                  <div className="font-semibold text-white/85">Email</div>
                  <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: "footer" })} className="hover:text-teal-glow">{CONTACT.email}</a>
                </div>
              </li>
              {!isAlbanian && <li className="text-xs text-white/50 sm:col-span-2">{CONTACT.hours}</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Alpha Worldwide. {isAlbanian ? "Të gjitha të drejtat e rezervuara." : "All rights reserved."}</div>
        </div>
      </div>
    </footer>
  );
}
