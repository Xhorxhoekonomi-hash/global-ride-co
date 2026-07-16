import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { trackEvent } from "@/lib/analytics";
import { QUOTE_FORM_LABELS_AL, ORIGIN_OPTIONS_AL, DESTINATION_OPTIONS_AL } from "@/lib/i18n-al";

type Variant = "compact" | "full";
type Locale = "en" | "sq";
type Option = { value: string; label: string };

const LABELS_EN = {
  fullName: "Full Name *",
  fullNamePlaceholder: "Your name",
  fullNameRequired: "Please enter your full name.",
  phone: "Phone / WhatsApp *",
  phonePlaceholder: "+355 …",
  phoneRequired: "Please enter a valid phone / WhatsApp number.",
  email: "Email *",
  emailPlaceholder: "you@example.com",
  emailInvalid: "Please enter a valid email address.",
  origin: "Import From",
  destination: "Destination",
  vehicleLink: "Vehicle Link or Lot Number",
  vehicleLinkPlaceholder: "Copart lot, Encar URL, dealer listing…",
  makeModel: "Vehicle Make & Model",
  makeModelPlaceholder: "e.g. BMW X5",
  service: "Service Needed",
  serviceFullProcess: "Full Process (recommended)",
  serviceInspectionOnly: "Inspection Only",
  serviceAuctionPurchase: "Auction Purchase",
  serviceShippingOnly: "Shipping Only",
  serviceCustoms: "Customs Coordination",
  message: "Message",
  messagePlaceholder: "Tell us about the vehicle, timing, and any preferences…",
  submitCompact: "Get a Free Quote",
  submitFull: "Request Quote on WhatsApp",
  submitting: "Sending…",
  submitHelper: "Submitting opens WhatsApp with your details pre-filled so our team gets your request instantly.",
  successTitle: "Sent to WhatsApp",
  successBody:
    "Your request opened in WhatsApp with all your details pre-filled — just hit send and our team will reply shortly. Didn't see a new tab open?",
  tryAgain: "Fill the form again",
  errorGeneric: "Something went wrong. Please try again or message us directly on WhatsApp.",
};

const ORIGIN_OPTIONS_EN: Option[] = ["USA", "South Korea", "UAE", "Canada", "Europe", "Other"].map((v) => ({ value: v, label: v }));
const DESTINATION_OPTIONS_EN: Option[] = ["Albania", "Germany", "Italy", "Belgium", "Netherlands", "France", "Other"].map((v) => ({ value: v, label: v }));

type FormState = {
  name: string;
  phone: string;
  email: string;
  origin: string;
  destination: string;
  link: string;
  model: string;
  service: string;
  message: string;
};

const emptyState = (originOptions: Option[], destinationOptions: Option[], serviceOptions: Option[]): FormState => ({
  name: "",
  phone: "",
  email: "",
  origin: originOptions[0].value,
  destination: destinationOptions[0].value,
  link: "",
  model: "",
  service: serviceOptions[0].value,
  message: "",
});

const PHONE_RE = /^[+()\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm({
  variant = "compact",
  onDark = false,
  locale = "en",
  source,
}: {
  variant?: Variant;
  onDark?: boolean;
  locale?: Locale;
  source?: string;
}) {
  const L = locale === "sq" ? QUOTE_FORM_LABELS_AL : LABELS_EN;
  const originOptions = locale === "sq" ? ORIGIN_OPTIONS_AL : ORIGIN_OPTIONS_EN;
  const destinationOptions = locale === "sq" ? DESTINATION_OPTIONS_AL : DESTINATION_OPTIONS_EN;
  const serviceOptions: Option[] = [
    { value: "Full Process", label: L.serviceFullProcess },
    { value: "Inspection Only", label: L.serviceInspectionOnly },
    { value: "Auction Purchase", label: L.serviceAuctionPurchase },
    { value: "Shipping Only", label: L.serviceShippingOnly },
    { value: "Customs Coordination", label: L.serviceCustoms },
  ];

  const [values, setValues] = useState<FormState>(emptyState(originOptions, destinationOptions, serviceOptions));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [started, setStarted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!started) {
      setStarted(true);
      trackEvent("quote_started", { variant, locale });
    }
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      next.name = L.fullNameRequired;
    }
    if (!values.phone.trim() || !PHONE_RE.test(values.phone.trim())) {
      next.phone = L.phoneRequired;
    }
    if (variant === "full") {
      if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) {
        next.email = L.emailInvalid;
      }
    } else if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = L.emailInvalid;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      const { whatsappUrl } = await submitLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || undefined,
        origin: values.origin,
        destination: variant === "full" ? values.destination : undefined,
        vehicleLink: values.link.trim() || undefined,
        model: variant === "full" ? values.model.trim() || undefined : undefined,
        service: variant === "full" ? values.service : undefined,
        message: variant === "full" ? values.message.trim() || undefined : undefined,
        source: source ?? `quote-form-${variant}`,
        locale,
      });

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
      onDark
        ? `bg-white/5 text-white placeholder:text-white/40 ${hasError ? "border-red-400 focus:ring-red-400/30" : "border-white/15 focus:border-teal focus:ring-teal/30"}`
        : `bg-background text-foreground placeholder:text-muted-foreground ${hasError ? "border-red-500 focus:ring-red-500/20" : "border-border focus:border-teal focus:ring-teal/25"}`
    }`;

  const labelClass = `mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] ${
    onDark ? "text-white/70" : "text-navy/70"
  }`;

  const errorClass = `mt-1 flex items-center gap-1 text-xs ${onDark ? "text-red-300" : "text-red-600"}`;

  if (status === "success") {
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
          {L.successTitle}
        </h3>
        <p className={`mt-2 text-sm ${onDark ? "text-white/70" : "text-slate-body"}`}>
          {L.successBody}{" "}
          <button
            type="button"
            className="font-semibold text-teal underline underline-offset-2"
            onClick={() => {
              setStatus("idle");
              setValues(emptyState(originOptions, destinationOptions, serviceOptions));
            }}
          >
            {L.tryAgain}
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-2xl p-6 md:p-8 ${
        onDark ? "border border-white/10 bg-white/[0.03]" : "border border-border bg-card shadow-card"
      }`}
    >
      <input
        type="text"
        name="company_website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>{L.fullName}</label>
          <input
            maxLength={100}
            type="text"
            value={values.name}
            onChange={set("name")}
            className={inputClass(!!errors.name)}
            placeholder={L.fullNamePlaceholder}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>{L.phone}</label>
          <input
            maxLength={30}
            type="tel"
            value={values.phone}
            onChange={set("phone")}
            className={inputClass(!!errors.phone)}
            placeholder={L.phonePlaceholder}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</p>}
        </div>

        {variant === "full" && (
          <div className="md:col-span-2">
            <label className={labelClass}>{L.email}</label>
            <input
              maxLength={200}
              type="email"
              value={values.email}
              onChange={set("email")}
              className={inputClass(!!errors.email)}
              placeholder={L.emailPlaceholder}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
          </div>
        )}

        <div className={variant === "full" ? "" : "md:col-span-2"}>
          <label className={labelClass}>{L.origin}</label>
          <select value={values.origin} onChange={set("origin")} className={inputClass(false)}>
            {originOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {variant === "full" && (
          <div>
            <label className={labelClass}>{L.destination}</label>
            <select value={values.destination} onChange={set("destination")} className={inputClass(false)}>
              {destinationOptions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
        )}

        <div className="md:col-span-2">
          <label className={labelClass}>{L.vehicleLink}</label>
          <input
            maxLength={500}
            type="text"
            value={values.link}
            onChange={set("link")}
            className={inputClass(false)}
            placeholder={L.vehicleLinkPlaceholder}
          />
        </div>

        {variant === "full" && (
          <>
            <div>
              <label className={labelClass}>{L.makeModel}</label>
              <input maxLength={100} type="text" value={values.model} onChange={set("model")} className={inputClass(false)} placeholder={L.makeModelPlaceholder} />
            </div>
            <div>
              <label className={labelClass}>{L.service}</label>
              <select value={values.service} onChange={set("service")} className={inputClass(false)}>
                {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>{L.message}</label>
              <textarea maxLength={2000} value={values.message} onChange={set("message")} rows={4} className={inputClass(false)} placeholder={L.messagePlaceholder} />
            </div>
          </>
        )}
      </div>

      {status === "error" && (
        <p className={`mt-4 flex items-center gap-1.5 text-sm ${onDark ? "text-red-300" : "text-red-600"}`}>
          <AlertCircle className="h-4 w-4" /> {L.errorGeneric}
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full md:w-auto disabled:opacity-70">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {L.submitting}
          </>
        ) : variant === "full" ? (
          L.submitFull
        ) : (
          L.submitCompact
        )}
      </button>
      <p className={`mt-3 text-xs ${onDark ? "text-white/50" : "text-slate-body"}`}>
        {L.submitHelper}
      </p>
    </form>
  );
}
