import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { buildHead } from "@/lib/seo";

type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  origin: string;
  destination: string | null;
  vehicle_link: string | null;
  model: string | null;
  service: string | null;
  message: string | null;
  source: string;
  locale: string | null;
};

export const Route = createFileRoute("/admin/leads")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });

    const { data: staff, error: staffError } = await supabase
      .from("staff_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (staffError || !staff) {
      await supabase.auth.signOut();
      throw redirect({ to: "/admin/login" });
    }
  },
  head: () =>
    buildHead({
      title: "Lead submissions",
      description: "Internal lead submissions dashboard.",
      path: "/admin/leads",
      robots: "noindex, nofollow",
    }),
  component: AdminLeads,
});

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminLeads() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<LeadRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error: dbError } = await supabase
        .from("leads")
        .select(
          "id, created_at, name, phone, email, origin, destination, vehicle_link, model, service, message, source, locale",
        )
        .order("created_at", { ascending: false });
      if (!active) return;
      if (dbError) {
        setError(dbError.message);
        setRows([]);
        return;
      }
      setRows((data ?? []) as LeadRow[]);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">Lead submissions</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {rows === null ? "Loading…" : `${rows.length} submission${rows.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            onClick={signOut}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-navy transition hover:bg-background"
          >
            Sign out
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="bg-background text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                {["Date", "Name", "Phone", "Email", "Origin", "Destination", "Vehicle link", "Model", "Service", "Message", "Source", "Locale"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows !== null && rows.length === 0 && !error && (
                <tr>
                  <td colSpan={12} className="px-4 py-10 text-center text-muted-foreground">No submissions yet.</td>
                </tr>
              )}
              {(rows ?? []).map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a href={`tel:${r.phone}`} className="text-navy hover:text-teal">{r.phone}</a>
                  </td>
                  <td className="px-4 py-3">
                    {r.email ? <a href={`mailto:${r.email}`} className="text-navy hover:text-teal">{r.email}</a> : "—"}
                  </td>
                  <td className="px-4 py-3">{r.origin || "—"}</td>
                  <td className="px-4 py-3">{r.destination || "—"}</td>
                  <td className="max-w-[220px] break-all px-4 py-3">
                    {r.vehicle_link ? (
                      <a href={r.vehicle_link} target="_blank" rel="noopener noreferrer" className="text-teal underline">
                        {r.vehicle_link}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">{r.model || "—"}</td>
                  <td className="px-4 py-3">{r.service || "—"}</td>
                  <td className="max-w-[320px] whitespace-pre-wrap px-4 py-3 text-muted-foreground">{r.message || "—"}</td>
                  <td className="px-4 py-3">{r.source}</td>
                  <td className="px-4 py-3">{r.locale || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
