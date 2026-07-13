import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  origin: string;
  destination?: string;
  vehicleLink?: string;
  model?: string;
  service?: string;
  message?: string;
  source: string;
};

type LeadAttribution = {
  source_page: string;
  referrer: string;
  language: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  created_at: string;
};

function captureAttribution(): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      source_page: "",
      referrer: "",
      language: "en",
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
      created_at: new Date().toISOString(),
    };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    source_page: window.location.pathname,
    referrer: document.referrer || "",
    language: "en",
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    created_at: new Date().toISOString(),
  };
}

function buildWhatsAppMessage(lead: LeadPayload): string {
  const lines = [
    "New Quote Request — Alpha Worldwide Albania",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
  ];
  if (lead.email) lines.push(`Email: ${lead.email}`);
  lines.push(`Import From: ${lead.origin}`);
  if (lead.destination) lines.push(`Destination: ${lead.destination}`);
  if (lead.vehicleLink) lines.push(`Vehicle Link / Lot Number: ${lead.vehicleLink}`);
  if (lead.model) lines.push(`Make & Model: ${lead.model}`);
  if (lead.service) lines.push(`Service Needed: ${lead.service}`);
  if (lead.message) lines.push(`Message: ${lead.message}`);
  return lines.join("\n");
}

async function persistLead(lead: LeadPayload, attribution: LeadAttribution): Promise<{ ok: boolean; error?: string }> {
  try {
    if (import.meta.env.DEV) {
      console.info("[lead:stub] would persist lead ->", { ...lead, ...attribution });
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function submitLead(lead: LeadPayload): Promise<{ ok: boolean; whatsappUrl: string }> {
  const attribution = captureAttribution();
  await persistLead(lead, attribution);
  trackEvent("quote_submitted", { source: lead.source, origin: lead.origin });

  const message = buildWhatsAppMessage(lead);
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

  return { ok: true, whatsappUrl };
}
