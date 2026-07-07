import { CONTACT } from "@/lib/site-data";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide Albania, I'd like a quote for a vehicle import.",
  )}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-elegant transition-transform hover:scale-110"
      style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
    </a>
  );
}
