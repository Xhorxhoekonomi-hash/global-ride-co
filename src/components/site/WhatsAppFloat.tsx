import { MessageCircle } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloat() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAlbanian = pathname.startsWith("/al");
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    isAlbanian
      ? "Përshëndetje Alpha Worldwide, dua një ofertë për importin e një automjeti."
      : "Hello Alpha Worldwide, I'd like a quote for a vehicle import.",
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={isAlbanian ? "Na kontaktoni në WhatsApp" : "Contact us on WhatsApp"}
      onClick={() => trackEvent("whatsapp_clicked", { source: "floating_bubble" })}
      className="fixed bottom-4 right-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-whatsapp text-on-dark shadow-card transition-transform hover:scale-110 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
    </a>
  );
}
