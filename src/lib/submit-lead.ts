import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

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
  locale?: "en" | "sq";
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

function captureAttribution(locale: "en" | "sq"): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      source_page: "",
      referrer: "",
      language: locale,
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
    language: locale,
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_term: params.get("utm_term"),
    utm_content: params.get("utm_content"),
    created_at: new Date().toISOString(),
  };
}

const MESSAGE_LABELS = {
  en: {
    heading: "New Quote Request — Alpha Worldwide",
    name: "Name",
    phone: "Phone",
    email: "Email",
    origin: "Import From",
    destination: "Destination",
    vehicleLink: "Vehicle Link / Lot Number",
    model: "Make & Model",
    service: "Service Needed",
    message: "Message",
    closing: "Please send me a quote and next steps.",
  },
  sq: {
    heading: "Kërkesë e Re për Ofertë — Alpha Worldwide",
    name: "Emri",
    phone: "Telefoni",
    email: "Email",
    origin: "Importo nga",
    destination: "Destinacioni",
    vehicleLink: "Linku i Automjetit / Numri i Lotit",
    model: "Marka & Modeli",
    service: "Shërbimi i Kërkuar",
    message: "Mesazhi",
    closing: "Ju lutem më dërgoni një ofertë dhe hapat e mëtejshëm.",
  },
};

function buildWhatsAppMessage(lead: LeadPayload): string {
  const L = MESSAGE_LABELS[lead.locale ?? "en"];
  const lines = [L.heading, `${L.name}: ${lead.name}`, `${L.phone}: ${lead.phone}`];
  if (lead.email) lines.push(`${L.email}: ${lead.email}`);
  lines.push(`${L.origin}: ${lead.origin}`);
  if (lead.destination) lines.push(`${L.destination}: ${lead.destination}`);
  if (lead.vehicleLink) lines.push(`${L.vehicleLink}: ${lead.vehicleLink}`);
  if (lead.model) lines.push(`${L.model}: ${lead.model}`);
  if (lead.service) lines.push(`${L.service}: ${lead.service}`);
  if (lead.message) lines.push(`${L.message}: ${lead.message}`);
  lines.push("");
  lines.push(L.closing);
  return lines.join("\n");
}

async function persistLead(lead: LeadPayload, attribution: LeadAttribution): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      origin: lead.origin,
      destination: lead.destination ?? null,
      vehicle_link: lead.vehicleLink ?? null,
      model: lead.model ?? null,
      service: lead.service ?? null,
      message: lead.message ?? null,
      source: lead.source,
      locale: lead.locale ?? null,
      source_page: attribution.source_page || null,
      referrer: attribution.referrer || null,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

const PERSIST_TIMEOUT_MS = 3500;

export async function submitLead(
  lead: LeadPayload,
): Promise<{ ok: boolean; saved: boolean; whatsappUrl: string }> {
  const locale = lead.locale ?? "en";
  const attribution = captureAttribution(locale);

  // Awaited, but raced against a timeout so a slow/failed save can never block the WhatsApp redirect.
  const timeout = new Promise<{ ok: false; error: string }>((resolve) =>
    setTimeout(() => resolve({ ok: false, error: "timeout" }), PERSIST_TIMEOUT_MS),
  );
  const result = await Promise.race([persistLead(lead, attribution), timeout]);
  if (!result.ok) {
    console.warn("[lead] persist failed ->", result.error);
  }
  const saved = result.ok;

  trackEvent("quote_submitted", { source: lead.source, origin: lead.origin, locale });
  if (lead.vehicleLink) {
    trackEvent("vehicle_link_submitted", { source: lead.source, origin: lead.origin });
  }

  const message = buildWhatsAppMessage(lead);
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

  return { ok: true, saved, whatsappUrl };
}
