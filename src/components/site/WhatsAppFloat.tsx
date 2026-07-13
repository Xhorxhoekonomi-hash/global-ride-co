import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloat() {
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide, I'd like a quote for a vehicle import.",
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Contact us on WhatsApp"
      onClick={() => trackEvent("whatsapp_clicked", { source: "floating_bubble" })}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-transform hover:scale-110"
      style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
    </a>
  );
}
