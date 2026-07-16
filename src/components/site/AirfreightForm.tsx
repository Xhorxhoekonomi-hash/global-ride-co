import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { trackEvent } from "@/lib/analytics";

const ENQUIRY_TYPES = [
  "Complete Vehicle Airfreight",
  "European Airport Handling Only",
  "Freight Forwarder Partnership",
  "General Airfreight Enquiry",
] as const;

type EnquiryType = (typeof ENQUIRY_TYPES)[number];

const PHONE_RE = /^[+()\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AirfreightForm() {
  const [enquiryType, setEnquiryType] = useState<EnquiryType | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [started, setStarted] = useState(false);

  const [origin, setOrigin] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [timeline, setTimeline] = useState("");

  const [arrivalAirport, setArrivalAirport] = useState("");
  const [awbAvailable, setAwbAvailable] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [finalDelivery, setFinalDelivery] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [routes, setRoutes] = useState("");
  const [volume, setVolume] = useState("");
  const [handlingScope, setHandlingScope] = useState("");

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const trackStart = () => {
    if (!started) {
      setStarted(true);
      trackEvent("quote_started", { source: "airfreight-hub" });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!enquiryType) next.enquiryType = "Please select an enquiry type.";
    if (!name.trim() || name.trim().length < 2) next.name = "Please enter your full name.";
    if (!phone.trim() || !PHONE_RE.test(phone.trim())) next.phone = "Please enter a valid phone / WhatsApp number.";
    if (email.trim() && !EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildTypeDetails = (): string => {
    const lines: string[] = [];
    if (enquiryType === "Complete Vehicle Airfreight") {
      if (origin) lines.push(`Origin: ${origin}`);
      if (destinationAirport) lines.push(`Destination Airport: ${destinationAirport}`);
      if (vehicleDetails) lines.push(`Vehicle Details: ${vehicleDetails}`);
      if (timeline) lines.push(`Desired Timeline: ${timeline}`);
    } else if (enquiryType === "European Airport Handling Only") {
      if (arrivalAirport) lines.push(`Arrival Airport: ${arrivalAirport}`);
      if (awbAvailable) lines.push(`Air Waybill Available: ${awbAvailable}`);
      if (arrivalDate) lines.push(`Arrival Date: ${arrivalDate}`);
      if (finalDelivery) lines.push(`Final Delivery Destination: ${finalDelivery}`);
    } else if (enquiryType === "Freight Forwarder Partnership") {
      if (companyName) lines.push(`Company Name: ${companyName}`);
      if (routes) lines.push(`Airports / Routes: ${routes}`);
      if (volume) lines.push(`Expected Volume: ${volume}`);
      if (handlingScope) lines.push(`Required Handling Scope: ${handlingScope}`);
    }
    if (message) lines.push(`Message: ${message}`);
    return lines.join("\n");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validate()) return;

    setStatus("submitting");
    try {
      const { whatsappUrl } = await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        origin: enquiryType === "Complete Vehicle Airfreight" ? origin || "Not specified" : "N/A",
        destination:
          enquiryType === "Complete Vehicle Airfreight"
            ? destinationAirport
            : enquiryType === "European Airport Handling Only"
              ? finalDelivery
              : undefined,
        model: enquiryType === "Complete Vehicle Airfreight" ? vehicleDetails || undefined : undefined,
        service: enquiryType as string,
        message: buildTypeDetails(),
        source: "airfreight-hub",
      });
      trackEvent(
        enquiryType === "European Airport Handling Only" ? "airport_handling_requested" : "airfreight_quote_submitted",
        { enquiryType: enquiryType as string },
      );
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border px-4 py-3 text-sm text-foreground bg-background focus:outline-none focus:ring-2 ${
      hasError ? "border-red-500 focus:ring-red-500/20" : "border-border focus:border-teal focus:ring-teal/25"
    }`;
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70";
  const errorClass = "mt-1 flex items-center gap-1 text-xs text-red-600";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display mt-4 text-2xl font-bold text-navy">Sent to WhatsApp</h3>
        <p className="mt-2 text-sm text-slate-body">
          Your {enquiryType.toLowerCase()} request opened in WhatsApp with all your details pre-filled — send it and we'll respond shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
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

      <div>
        <label className={labelClass}>Enquiry Type *</label>
        <select
          value={enquiryType}
          onChange={(e) => {
            trackStart();
            setEnquiryType(e.target.value as EnquiryType);
            if (errors.enquiryType) setErrors((er) => ({ ...er, enquiryType: "" }));
          }}
          className={inputClass(!!errors.enquiryType)}
        >
          <option value="">Select an enquiry type…</option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.enquiryType && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.enquiryType}</p>}
      </div>

      {enquiryType === "Complete Vehicle Airfreight" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Origin</label>
            <input value={origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass(false)} placeholder="City or airport" />
          </div>
          <div>
            <label className={labelClass}>Destination Airport</label>
            <input value={destinationAirport} onChange={(e) => setDestinationAirport(e.target.value)} className={inputClass(false)} placeholder="e.g. Amsterdam Schiphol" />
          </div>
          <div>
            <label className={labelClass}>Vehicle Details</label>
            <input value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)} className={inputClass(false)} placeholder="Make, model, dimensions" />
          </div>
          <div>
            <label className={labelClass}>Desired Timeline</label>
            <input value={timeline} onChange={(e) => setTimeline(e.target.value)} className={inputClass(false)} placeholder="e.g. within 2 weeks" />
          </div>
        </div>
      )}

      {enquiryType === "European Airport Handling Only" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Arrival Airport</label>
            <input value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} className={inputClass(false)} placeholder="e.g. Milan Malpensa" />
          </div>
          <div>
            <label className={labelClass}>Air Waybill Available?</label>
            <select value={awbAvailable} onChange={(e) => setAwbAvailable(e.target.value)} className={inputClass(false)}>
              <option value="">Select…</option>
              <option>Yes</option>
              <option>No</option>
              <option>Not yet booked</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Arrival Date</label>
            <input value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className={inputClass(false)} placeholder="If known" />
          </div>
          <div>
            <label className={labelClass}>Final Delivery Destination</label>
            <input value={finalDelivery} onChange={(e) => setFinalDelivery(e.target.value)} className={inputClass(false)} placeholder="City or address" />
          </div>
        </div>
      )}

      {enquiryType === "Freight Forwarder Partnership" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Company Name</label>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass(false)} placeholder="Your company" />
          </div>
          <div>
            <label className={labelClass}>Airports / Routes</label>
            <input value={routes} onChange={(e) => setRoutes(e.target.value)} className={inputClass(false)} placeholder="e.g. Dubai–Schiphol" />
          </div>
          <div>
            <label className={labelClass}>Expected Volume</label>
            <input value={volume} onChange={(e) => setVolume(e.target.value)} className={inputClass(false)} placeholder="e.g. 2–3 vehicles/month" />
          </div>
          <div>
            <label className={labelClass}>Required Handling Scope</label>
            <input value={handlingScope} onChange={(e) => setHandlingScope(e.target.value)} className={inputClass(false)} placeholder="e.g. arrival handling only" />
          </div>
        </div>
      )}

      {enquiryType && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input value={name} onChange={(e) => { trackStart(); setName(e.target.value); if (errors.name) setErrors((er) => ({ ...er, name: "" })); }} className={inputClass(!!errors.name)} placeholder="Your name" />
            {errors.name && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone / WhatsApp *</label>
            <input value={phone} onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((er) => ({ ...er, phone: "" })); }} className={inputClass(!!errors.phone)} placeholder="+355 …" />
            {errors.phone && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((er) => ({ ...er, email: "" })); }} className={inputClass(!!errors.email)} placeholder="you@example.com" />
            {errors.email && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputClass(false)} placeholder="Anything else we should know?" />
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> Something went wrong. Please try again or message us directly on WhatsApp.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full md:w-auto disabled:opacity-70">
        {status === "submitting" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
        ) : (
          "Send Airfreight Enquiry"
        )}
      </button>
      <p className="mt-3 text-xs text-slate-body">
        Submitting opens WhatsApp with your enquiry pre-filled so our team gets it instantly.
      </p>
    </form>
  );
}
