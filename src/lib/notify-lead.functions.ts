import { createServerFn } from "@tanstack/react-start";

/**
 * Sends the owner notification email for a stored lead.
 * Public trigger (forms are unauthenticated), so the handler verifies the
 * lead row actually exists before sending — arbitrary callers cannot forge
 * email content. The template has a fixed recipient (the owner mailbox).
 */
export const notifyOwnerOfLead = createServerFn({ method: "POST" })
  .inputValidator((input: { leadId: string }) => {
    if (!input || typeof input.leadId !== "string" || input.leadId.length < 10) {
      throw new Error("Invalid lead id");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: lead, error } = await supabaseAdmin
      .from("leads")
      .select(
        "id, name, phone, email, origin, destination, vehicle_link, model, service, message, source, locale, source_page, created_at",
      )
      .eq("id", data.leadId)
      .maybeSingle();
    if (error || !lead) {
      return { sent: false as const, reason: "lead_not_found" as const };
    }

    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const result = await sendTemplateEmail("lead-notification", "", {
      templateData: {
        name: lead.name,
        phone: lead.phone,
        email: lead.email ?? undefined,
        origin: lead.origin,
        destination: lead.destination ?? undefined,
        vehicleLink: lead.vehicle_link ?? undefined,
        model: lead.model ?? undefined,
        service: lead.service ?? undefined,
        message: lead.message ?? undefined,
        source: lead.source,
        locale: lead.locale ?? undefined,
        sourcePage: lead.source_page ?? undefined,
        submittedAt: new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Tirane",
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(lead.created_at)),
      },
      idempotencyKey: `lead-notify-${lead.id}`,
      ...(lead.email ? { replyTo: lead.email } : {}),
    });
    return result;
  });
