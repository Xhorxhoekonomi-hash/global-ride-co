import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { CONTACT, NAV_LINKS, OFFICES } from "@/lib/site-data";
import logoFooterAsset from "@/assets/logo-footer.png.asset.json";

export function Footer() {
  return (
    <footer className="section-graphite border-t border-white/5">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logoFooterAsset.url}
            alt="Alpha Worldwide"
            className="h-auto w-44 object-contain"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            International vehicle sourcing, auction brokerage, inspection, import & export — fully managed from origin to your door.
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

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/70 transition-colors hover:text-teal-glow">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Services</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>Vehicle Sourcing</li>
            <li>Pre-Purchase Inspection</li>
            <li>Auction Brokerage</li>
            <li>Container & RoRo Shipping</li>
            <li>Airfreight Vehicle Delivery</li>
            <li>Customs & Door Delivery</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Locations</h4>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            {OFFICES.map((office) => (
              <li key={office.id} className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <div>
                  <div className="font-semibold text-white/85">{office.role}</div>
                  <div>{office.city}, {office.country}</div>
                  <div className="mt-0.5">
                    {"phone" in office ? (
                      <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-teal-glow">{office.phone}</a>
                    ) : (
                      office.phones.map((p, i) => (
                        <span key={p}>
                          <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-teal-glow">{p}</a>
                          {i < office.phones.length - 1 && ", "}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </li>
            ))}
            <li className="flex gap-2.5 pt-1"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-teal-glow">{CONTACT.email}</a>
            </li>
            <li className="text-xs text-white/50">{CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} Alpha Worldwide. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
