import { Mail } from "lucide-react";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

/** Shared, accessible owner mailbox link; never an enquiry submission endpoint. */
export function EmailContact({ location, className = "" }: { location: string; className?: string }) {
  return <a href={`mailto:${CONTACT.email}`} className={`inline-flex min-h-11 min-w-0 items-center gap-2 text-sm text-secondary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${className}`} onClick={() => trackEvent("email_clicked", { location })}>
    <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
    <span className="break-all">{CONTACT.email}</span>
  </a>;
}