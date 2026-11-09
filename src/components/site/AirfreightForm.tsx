import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const ENQUIRY_TYPES = [
  "Complete Vehicle Airfreight",
  "European Airport Handling Only",
  "Freight Forwarder Partnership",
  "General Airfreight Enquiry",
] as const;

type EnquiryType = (typeof ENQUIRY_TYPES)[number];

const PHONE_RE = /^[+()\d][\d\s\-()]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AirfreightForm({ initialAirport = "", locale = "en" }: { initialAirport?: string; locale?: "en" | "sq" }) {
  const sq = locale === "sq";
  const t = (en: string, al: string) => sq ? al : en;
  const typeLabels: Record<EnquiryType, string> = {
    "Complete Vehicle Airfreight": t("Complete Vehicle Airfreight", "Transport ajror i plotë i automjetit"),
    "European Airport Handling Only": t("European Airport Handling Only", "Vetëm trajtim në aeroportin evropian"),
    "Freight Forwarder Partnership": t("Freight Forwarder Partnership", "Bashkëpunim me spedicionerë"),
    "General Airfreight Enquiry": t("General Airfreight Enquiry", "Kërkesë e përgjithshme për transport ajror"),
  };
  const [enquiryType, setEnquiryType] = useState<EnquiryType | "">(initialAirport ? "Complete Vehicle Airfreight" : "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [started, setStarted] = useState(false);

  const [origin, setOrigin] = useState("");
  const [destinationAirport, setDestinationAirport] = useState(initialAirport);
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [timeline, setTimeline] = useState("");

  const [arrivalAirport, setArrivalAirport] = useState(initialAirport);
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
    if (!enquiryType) next.enquiryType = t("Please select an enquiry type.", "Zgjidhni llojin e kërkesës.");
    if (!name.trim() || name.trim().length < 2) next.name = t("Please enter your full name.", "Shkruani emrin tuaj të plotë.");
    if (!phone.trim() || !PHONE_RE.test(phone.trim())) next.phone = t("Please enter a valid phone / WhatsApp number.", "Shkruani një numër të vlefshëm telefoni / WhatsApp.");
    if (email.trim() && !EMAIL_RE.test(email.trim())) next.email = t("Please enter a valid email address.", "Shkruani një adresë email të vlefshme.");
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

  const inputClass = (hasError: boolean) => `form-control${hasError ? " border-destructive" : ""}`;
  const labelClass = "form-label";
  const errorClass = "mt-1 flex items-center gap-1 text-xs text-red-600";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-navy">{t("Sent to WhatsApp", "Dërguar në WhatsApp")}</h3>
        <p className="mt-2 text-sm text-slate-body">
          {sq ? "Kërkesa juaj u hap në WhatsApp me të gjitha të dhënat — dërgojeni dhe ekipi do t'ju përgjigjet." : `Your ${enquiryType.toLowerCase()} request opened in WhatsApp with all your details pre-filled — send it and we'll respond shortly.`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
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
        <label className={labelClass}>{t("Enquiry Type *", "Lloji i kërkesës *")}</label>
        <select
          aria-label={t("Enquiry Type", "Lloji i kërkesës")}
          value={enquiryType}
          onChange={(e) => {
            trackStart();
            setEnquiryType(e.target.value as EnquiryType);
            if (errors.enquiryType) setErrors((er) => ({ ...er, enquiryType: "" }));
          }}
          className={inputClass(!!errors.enquiryType)}
        >
          <option value="">{t("Select an enquiry type…", "Zgjidhni llojin e kërkesës…")}</option>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t} value={t}>{typeLabels[t]}</option>
          ))}
        </select>
        {errors.enquiryType && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.enquiryType}</p>}
      </div>

      {enquiryType === "Complete Vehicle Airfreight" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>{t("Origin", "Origjina")}</label>
            <input aria-label={t("Origin", "Origjina")} value={origin} onChange={(e) => setOrigin(e.target.value)} className={inputClass(false)} placeholder={t("City or airport", "Qyteti ose aeroporti")} />
          </div>
          <div>
            <label className={labelClass}>{t("Destination Airport", "Aeroporti i destinacionit")}</label>
            <input aria-label={t("Destination Airport", "Aeroporti i destinacionit")} value={destinationAirport} onChange={(e) => setDestinationAirport(e.target.value)} className={inputClass(false)} placeholder="Amsterdam Schiphol" />
          </div>
          <div>
            <label className={labelClass}>{t("Vehicle Details", "Të dhënat e automjetit")}</label>
            <input aria-label={t("Vehicle Details", "Të dhënat e automjetit")} value={vehicleDetails} onChange={(e) => setVehicleDetails(e.target.value)} className={inputClass(false)} placeholder={t("Make, model, dimensions", "Marka, modeli, përmasat")} />
          </div>
          <div>
            <label className={labelClass}>{t("Desired Timeline", "Afati i dëshiruar")}</label>
            <input aria-label={t("Desired Timeline", "Afati i dëshiruar")} value={timeline} onChange={(e) => setTimeline(e.target.value)} className={inputClass(false)} placeholder={t("Requested timing", "Afati i kërkuar")} />
          </div>
        </div>
      )}

      {enquiryType === "European Airport Handling Only" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>{t("Arrival Airport", "Aeroporti i mbërritjes")}</label>
            <input aria-label={t("Arrival Airport", "Aeroporti i mbërritjes")} value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} className={inputClass(false)} placeholder="Milan Malpensa" />
          </div>
          <div>
            <label className={labelClass}>{t("Air Waybill Available?", "A është gati Air Waybill?")}</label>
            <select aria-label={t("Air Waybill Available?", "A është gati Air Waybill?")} value={awbAvailable} onChange={(e) => setAwbAvailable(e.target.value)} className={inputClass(false)}>
              <option value="">{t("Select…", "Zgjidhni…")}</option>
              <option value="Yes">{t("Yes", "Po")}</option>
              <option value="No">{t("No", "Jo")}</option>
              <option value="Not yet booked">{t("Not yet booked", "Ende pa rezervim")}</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>{t("Arrival Date", "Data e mbërritjes")}</label>
            <input aria-label={t("Arrival Date", "Data e mbërritjes")} value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} className={inputClass(false)} placeholder={t("If known", "Nëse dihet")} />
          </div>
          <div>
            <label className={labelClass}>{t("Final Delivery Destination", "Destinacioni përfundimtar")}</label>
            <input aria-label={t("Final Delivery Destination", "Destinacioni përfundimtar")} value={finalDelivery} onChange={(e) => setFinalDelivery(e.target.value)} className={inputClass(false)} placeholder={t("City or address", "Qyteti ose adresa")} />
          </div>
        </div>
      )}

      {enquiryType === "Freight Forwarder Partnership" && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>{t("Company Name", "Emri i kompanisë")}</label>
            <input aria-label={t("Company Name", "Emri i kompanisë")} value={companyName} onChange={(e) => setCompanyName(e.target.value)} className={inputClass(false)} placeholder={t("Your company", "Kompania juaj")} />
          </div>
          <div>
            <label className={labelClass}>{t("Airports / Routes", "Aeroportet / Itineraret")}</label>
            <input aria-label={t("Airports / Routes", "Aeroportet / Itineraret")} value={routes} onChange={(e) => setRoutes(e.target.value)} className={inputClass(false)} placeholder={t("Airports and routes", "Aeroportet dhe itineraret")} />
          </div>
          <div>
            <label className={labelClass}>{t("Expected Volume", "Vëllimi i parashikuar")}</label>
            <input aria-label={t("Expected Volume", "Vëllimi i parashikuar")} value={volume} onChange={(e) => setVolume(e.target.value)} className={inputClass(false)} placeholder={t("Expected vehicle volume", "Vëllimi i parashikuar i automjeteve")} />
          </div>
          <div>
            <label className={labelClass}>{t("Required Handling Scope", "Shërbimet e nevojshme të trajtimit")}</label>
            <input aria-label={t("Required Handling Scope", "Shërbimet e nevojshme të trajtimit")} value={handlingScope} onChange={(e) => setHandlingScope(e.target.value)} className={inputClass(false)} placeholder={t("e.g. arrival handling only", "p.sh. vetëm trajtim në mbërritje")} />
          </div>
        </div>
      )}

      {enquiryType && (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>{t("Full Name *", "Emri i plotë *")}</label>
            <input aria-label={t("Full Name", "Emri i plotë")} value={name} onChange={(e) => { trackStart(); setName(e.target.value); if (errors.name) setErrors((er) => ({ ...er, name: "" })); }} className={inputClass(!!errors.name)} placeholder={t("Your name", "Emri juaj")} />
            {errors.name && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass}>{t("Phone / WhatsApp *", "Telefon / WhatsApp *")}</label>
            <input aria-label={t("Phone / WhatsApp", "Telefon / WhatsApp")} value={phone} onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors((er) => ({ ...er, phone: "" })); }} className={inputClass(!!errors.phone)} placeholder="+355 …" />
            {errors.phone && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.phone}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input aria-label="Email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((er) => ({ ...er, email: "" })); }} className={inputClass(!!errors.email)} placeholder="you@example.com" />
            {errors.email && <p className={errorClass}><AlertCircle className="h-3.5 w-3.5" />{errors.email}</p>}
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>{t("Message", "Mesazhi")}</label>
            <textarea aria-label={t("Message", "Mesazhi")} value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={inputClass(false)} placeholder={t("Anything else we should know?", "Çfarë tjetër duhet të dimë?")} />
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="mt-4 flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {t("Something went wrong. Please try again or message us directly on WhatsApp.", "Diçka nuk shkoi si duhet. Provoni përsëri ose na shkruani në WhatsApp.")}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-6 w-full md:w-auto">
        {status === "submitting" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {t("Sending…", "Duke dërguar…")}</>
        ) : (
          t("Send Airfreight Enquiry", "Dërgo kërkesën për transport ajror")
        )}
      </Button>
      <p className="mt-3 text-xs text-slate-body">
        {t("Submitting opens WhatsApp with your enquiry pre-filled so our team gets it instantly.", "Dërgimi hap WhatsApp me të dhënat e kërkesës suaj.")}
      </p>
    </form>
  );
}
