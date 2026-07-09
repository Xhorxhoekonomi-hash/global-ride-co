import { Link } from "@tanstack/react-router";
import { MessageCircle, FileText } from "lucide-react";
import { CONTACT } from "@/lib/site-data";

export function WhatsAppFloat() {
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Hello Alpha Worldwide Albania, I'd like a quote for a vehicle import.",
  )}`;

  return (
    <>
      {/* Desktop: floating WhatsApp bubble, bottom-right */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-5 right-5 z-50 hidden h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-transform hover:scale-110 md:grid"
        style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
      >
        <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
      </a>

      {/* Mobile: sticky two-button bar, always accessible */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-white/10 bg-navy/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-elegant backdrop-blur md:hidden">
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <Link
          to="/contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal py-3 text-sm font-semibold text-white"
        >
          <FileText className="h-4 w-4" /> Shipping Quote
        </Link>
      </div>
    </>
  );
}
