import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type Variant = "compact" | "full";

export function QuoteForm({ variant = "compact", onDark = false }: { variant?: Variant; onDark?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = onDark
    ? "w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
    : "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25";

  const labelClass = `mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] ${
    onDark ? "text-white/70" : "text-navy/70"
  }`;

  if (submitted) {
    return (
      <div
        className={`rounded-2xl p-8 text-center ${
          onDark ? "border border-white/10 bg-white/[0.03]" : "border border-border bg-card shadow-card"
        }`}
      >
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className={`font-display mt-4 text-2xl font-bold ${onDark ? "text-white" : "text-navy"}`}>
          Thanks for your submission
        </h3>
        <p className={`mt-2 text-sm ${onDark ? "text-white/70" : "text-slate-body"}`}>
          Our team will contact you shortly with a full quote and next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl p-6 md:p-8 ${
        onDark ? "border border-white/10 bg-white/[0.03]" : "border border-border bg-card shadow-card"
      }`}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input required maxLength={100} type="text" name="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className={labelClass}>Phone / WhatsApp</label>
          <input required maxLength={30} type="tel" name="phone" className={inputClass} placeholder="+355 …" />
        </div>

        {variant === "full" && (
          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input required maxLength={200} type="email" name="email" className={inputClass} placeholder="you@example.com" />
          </div>
        )}

        <div className={variant === "full" ? "" : "md:col-span-2"}>
          <label className={labelClass}>Import From</label>
          <select name="origin" className={inputClass}>
            <option>USA</option>
            <option>South Korea</option>
            <option>UAE</option>
            <option>Canada</option>
            <option>Europe</option>
            <option>Other</option>
          </select>
        </div>

        {variant === "full" && (
          <div>
            <label className={labelClass}>Destination</label>
            <select name="destination" className={inputClass}>
              <option>Albania</option>
              <option>Germany</option>
              <option>Italy</option>
              <option>Belgium</option>
              <option>Netherlands</option>
              <option>France</option>
              <option>Other</option>
            </select>
          </div>
        )}

        <div className="md:col-span-2">
          <label className={labelClass}>Vehicle Link or Lot Number</label>
          <input maxLength={500} type="text" name="link" className={inputClass} placeholder="Copart lot, Encar URL, dealer listing…" />
        </div>

        {variant === "full" && (
          <>
            <div>
              <label className={labelClass}>Vehicle Make & Model</label>
              <input maxLength={100} type="text" name="model" className={inputClass} placeholder="e.g. BMW X5" />
            </div>
            <div>
              <label className={labelClass}>Service Needed</label>
              <select name="service" className={inputClass}>
                <option>Full Process (recommended)</option>
                <option>Inspection Only</option>
                <option>Auction Purchase</option>
                <option>Shipping Only</option>
                <option>Customs</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Message</label>
              <textarea maxLength={2000} name="message" rows={4} className={inputClass} placeholder="Tell us about the vehicle, timing, and any preferences…" />
            </div>
          </>
        )}
      </div>

      <button type="submit" className="btn-primary mt-6 w-full md:w-auto">
        {variant === "full" ? "Request Quote" : "Get a Free Quote"}
      </button>
    </form>
  );
}
