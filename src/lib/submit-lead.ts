import { CONTACT } from "@/lib/site-data";

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
  source: string; // which form/page the lead came from, e.g. "quote-form-full"
};

/**
 * Builds a clean, pre-filled WhatsApp message from the lead data.
 */
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

/**
 * Placeholder for future backend delivery (email API, Supabase insert, or
 * generic webhook). Currently a no-op that resolves immediately so the
 * WhatsApp handoff below is never blocked by it. To wire up a real backend:
 *
 *   1. Email:    POST lead to a serverless function that calls Resend/SendGrid.
 *   2. Supabase: import { supabase } from "@/lib/supabase" and
 *                await supabase.from("leads").insert(lead)
 *   3. Webhook:  await fetch(WEBHOOK_URL, { method: "POST", body: JSON.stringify(lead) })
 *
 * Any of these can be dropped in here without touching the calling components.
 */
async function persistLead(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    // TODO: replace with real persistence (Supabase / email API / webhook).
    // Left as a structured stub so it fails silently and never blocks the
    // WhatsApp handoff, which is the primary, always-working delivery path.
    if (import.meta.env.DEV) {
      console.info("[lead:stub] would persist lead ->", lead);
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Main entry point used by all lead forms on the site.
 * - Validates nothing itself (forms validate before calling this).
 * - Always attempts to persist the lead (currently a stub, safe to fail).
 * - Always opens WhatsApp with a pre-filled message as the guaranteed
 *   delivery channel, since that's what the business actually monitors.
 */
export async function submitLead(lead: LeadPayload): Promise<{ ok: boolean; whatsappUrl: string }> {
  await persistLead(lead);

  const message = buildWhatsAppMessage(lead);
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;

  return { ok: true, whatsappUrl };
}
