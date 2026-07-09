import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Calculator, Loader2 } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { submitLead } from "@/lib/submit-lead";

export const Route = createFileRoute("/shipping-calculator")({
  head: () => ({
    meta: [
      { title: "Shipping Calculator | Vehicle Import Cost to Albania" },
      { name: "description", content: "Get an accurate shipping cost estimate for importing a vehicle from USA, South Korea, UAE, or Canada to Albania and Europe." },
      { property: "og:title", content: "Shipping Calculator" },
      { property: "og:description", content: "Tell us your route and vehicle — get a real, accurate shipping quote." },
      { property: "og:url", content: "/shipping-calculator" },
    ],
    links: [{ rel: "canonical", href: "/shipping-calculator" }],
  }),
  component: ShippingCalculator,
});

const ORIGINS = ["USA", "South Korea", "UAE", "Canada", "Europe"];
const DESTINATIONS = ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France", "Other"];
const VEHICLE_TYPES = ["Sedan", "SUV", "Pickup Truck", "Sports Car", "Luxury / Exotic", "Van / Commercial"];
const METHODS = ["Not sure — recommend one", "RoRo (economical)", "Container (enclosed)", "Airfreight (fastest)"];

function ShippingCalculator() {
  const [origin, setOrigin] = useState(ORIGINS[0]);
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [vehicleType, setVehicleType] = useState(VEHICLE_TYPES[0]);
  const [method, setMethod] = useState(METHODS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and phone/WhatsApp so we can send your estimate.");
      return;
    }
    setError("");
    setStatus("submitting");
    const { whatsappUrl } = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      origin,
      destination,
      model: vehicleType,
      service: `Shipping calculator — method: ${method}`,
      message: `Requesting a shipping cost estimate: ${vehicleType} from ${origin} to ${destination}, preferred method: ${method}.`,
      source: "shipping-calculator",
    });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setStatus("done");
  };

  const inputClass = "w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25";
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-navy/70";

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle shipping calculator" width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[40vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Shipping calculator</div>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] md:text-6xl">
            Get a Real Shipping Estimate
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            Rates depend on the specific vehicle, exact route, and current freight schedules — so instead of a generic
            number, tell us the details and we'll send you an accurate quote directly.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            {status === "done" ? (
              <div className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal">
                  <Calculator className="h-7 w-7" />
                </div>
                <h3 className="font-display mt-4 text-2xl font-bold text-navy">Request sent to WhatsApp</h3>
                <p className="mt-2 text-sm text-slate-body">
                  Your route and vehicle details opened in WhatsApp — send the message and we'll reply with an accurate shipping estimate.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Origin</label>
                    <select className={inputClass} value={origin} onChange={(e) => setOrigin(e.target.value)}>
                      {ORIGINS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Destination</label>
                    <select className={inputClass} value={destination} onChange={(e) => setDestination(e.target.value)}>
                      {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Vehicle Type</label>
                    <select className={inputClass} value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                      {VEHICLE_TYPES.map((v) => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Method</label>
                    <select className={inputClass} value={method} onChange={(e) => setMethod(e.target.value)}>
                      {METHODS.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Your Name</label>
                    <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone / WhatsApp</label>
                    <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+355 …" />
                  </div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 w-full disabled:opacity-70">
                  {status === "submitting" ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
                  ) : (
                    <><Calculator className="h-4 w-4" /> Get My Shipping Estimate</>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-slate-body">
                  Opens WhatsApp with your route pre-filled — no generic price guesses, just a real quote.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
