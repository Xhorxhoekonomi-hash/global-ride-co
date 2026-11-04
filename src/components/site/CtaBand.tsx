import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

/** Final call-to-action band shared by every interior page. */
export function CtaBand({ locale }: { locale: "en" | "sq" }) {
  const sq = locale === "sq";
  return <section className="cta-band" aria-labelledby="cta-band-title">
    <div className="container-page">
      <h2 id="cta-band-title">{sq ? "Gati të transportoni makinën tuaj?" : "Ready to move your car?"}</h2>
      <div className="cta-band-actions">
        <Link to={sq ? "/al/kontakt" : "/contact"} className="btn-pair btn-pair--primary" onClick={() => trackEvent("quote_started", { source: "cta_band" })}>{sq ? "Merr një ofertë" : "Get a Quote"}</Link>
        <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" className="btn-pair btn-pair--whatsapp" onClick={() => trackEvent("whatsapp_clicked", { source: "cta_band" })}><MessageCircle aria-hidden="true" />WhatsApp</a>
      </div>
    </div>
  </section>;
}
