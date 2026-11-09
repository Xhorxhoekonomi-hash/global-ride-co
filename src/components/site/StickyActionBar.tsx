import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

/** Mobile-only bottom action bar shown on every page. */
export function StickyActionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const al = pathname.startsWith("/al");
  const [shown, setShown] = useState(true);
  // Visible by default (no JS); after hydration it slides up past 400px and hides when the footer is on screen.
  useEffect(() => {
    let footerVisible = false;
    const footer = document.querySelector("footer");
    const update = () => setShown(window.scrollY > 400 && !footerVisible);
    const io = footer ? new IntersectionObserver(([e]) => { footerVisible = e.isIntersecting; update(); }) : null;
    if (footer && io) io.observe(footer);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { io?.disconnect(); window.removeEventListener("scroll", update); };
  }, [pathname]);
  if (pathname.startsWith("/admin")) return null;
  return (
    <div className="sticky-action-bar" data-hidden={shown ? undefined : ""}>
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener" className="sticky-action-whatsapp"
        aria-label={al ? "Na shkruani në WhatsApp" : "Message us on WhatsApp"} onClick={() => trackEvent("whatsapp_clicked", { source: "sticky_bar" })}>
        <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
      </a>
      <Link to={al ? "/al/kontakt" : "/contact"} className="btn-pair btn-pair--primary sticky-action-quote" onClick={() => trackEvent("quote_started", { source: "sticky_bar" })}>
        {al ? "Merr një ofertë" : "Get a Quote"}
      </Link>
    </div>
  );
}
