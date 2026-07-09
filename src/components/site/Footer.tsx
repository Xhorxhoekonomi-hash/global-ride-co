import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/site-data";
import logoFooterAsset from "@/assets/logo-footer.png.asset.json";

export function Footer() {
  return (
    <footer className="section-graphite border-t border-white/5">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logoFooterAsset.url}
            alt="Alpha Worldwide Albania"
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
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{CONTACT.location}</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-teal-glow">{CONTACT.email}</a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p} className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-teal-glow">{p}</a>
              </li>
            ))}
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span>UAE: <a href={`tel:${CONTACT.uae.replace(/\s/g, "")}`} className="hover:text-teal-glow">{CONTACT.uae}</a></span>
            </li>
            <li className="pt-1 text-xs text-white/50">{CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 pb-24 text-xs text-white/50 md:flex-row md:pb-6">
          <div>© {new Date().getFullYear()} Alpha Worldwide Albania. All rights reserved.</div>
          <div className="flex gap-4">
            <button className="hover:text-teal-glow">EN</button>
            <button className="hover:text-teal-glow">SQ</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
