import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { KOREA_SHIPPING, KOREA_INCLUDES, KRW_TO_EUR_RATE } from "@/data/koreaShipping";
import type { Destination } from "@/data/oceanFreight";
import { fmtInt } from "./format";
import { Step, StepReveal, Row } from "./StepUI";
import type { CalculatorDict, KoreaType } from "./dict";

// Locale-specific Korea inclusion list. Falls back to English data-module list.
export function KoreaCalculator({
  dict,
  source,
  contactHref,
  koreaIncludes,
}: {
  dict: CalculatorDict;
  source: string;
  contactHref: string;
  koreaIncludes?: string[];
}) {
  const D = dict.korea;
  const includes = koreaIncludes ?? KOREA_INCLUDES;

  const [type, setType] = useState<KoreaType | null>(null);
  const [currency, setCurrency] = useState<"KRW" | "EUR">("KRW");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState<Destination | null>(null);

  const priceNumber = parseFloat(price) || 0;
  const priceEur = currency === "KRW" ? priceNumber * KRW_TO_EUR_RATE : priceNumber;
  const priceKrw = currency === "EUR" ? priceNumber / KRW_TO_EUR_RATE : priceNumber;

  const ready = !!type && priceNumber > 0 && !!destination;
  const shippingEur = ready && destination && type ? KOREA_SHIPPING[destination][type] : 0;
  const totalEur = priceEur + shippingEur;

  const destinationLabel = (v: Destination): string =>
    D.step3.destinations.find((d) => d.value === v)?.label ?? v;

  const whatsappText = () => {
    if (!ready || !destination || !type) return "";
    return [
      D.wa.greeting,
      "",
      D.wa.resultLead(destinationLabel(destination)),
      `${D.wa.vehicle}: ${type}`,
      "",
      `${D.wa.vehiclePrice}: ₩${fmtInt(priceKrw)} (~€${fmtInt(priceEur)})`,
      `${D.wa.fixedShipping}: €${fmtInt(shippingEur)}`,
      D.wa.separator,
      `${D.wa.estimatedTotal}: €${fmtInt(totalEur)}`,
      "",
      D.wa.closingConfirm,
      D.wa.closingThanks,
    ].join("\n");
  };

  const onWhatsApp = () => {
    const text = whatsappText();
    if (!text) return;
    trackEvent("whatsapp_clicked", { source: `${source}-korea` });
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const showPrice = !!type;
  const showDest = showPrice && priceNumber > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
      <div className="space-y-6">
        <Step n={1} title={D.step1.title}>
          <div className="grid gap-3 sm:grid-cols-3">
            {D.step1.types.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setType(t.value)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  type === t.value ? "border-teal bg-teal/5 shadow-card" : "border-border bg-card hover:border-teal/40",
                )}
              >
                <div className="text-sm font-bold text-navy">{t.label}</div>
              </button>
            ))}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
            {D.step1.roroTag}
          </div>
        </Step>

        <AnimatePresence>
          {showPrice && (
            <StepReveal key="kp">
              <Step n={2} title={D.step2.title}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25"
                    />
                  </div>
                  <div className="flex overflow-hidden rounded-md border border-border">
                    {(["KRW", "EUR"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={cn(
                          "px-4 text-sm font-semibold transition-colors",
                          currency === c ? "bg-navy text-white" : "bg-background text-slate-body",
                        )}
                      >
                        {c === "KRW" ? "₩ KRW" : "€ EUR"}
                      </button>
                    ))}
                  </div>
                </div>
                {priceNumber > 0 && (
                  <p className="mt-1.5 text-xs text-slate-body">
                    {D.step2.helper(currency === "KRW" ? `€${fmtInt(priceEur)}` : `₩${fmtInt(priceKrw)}`)}
                  </p>
                )}
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDest && (
            <StepReveal key="kd">
              <Step n={3} title={D.step3.title}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {D.step3.destinations.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDestination(d.value)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-all",
                        destination === d.value ? "border-teal bg-teal/5 shadow-card" : "border-border bg-card hover:border-teal/40",
                      )}
                    >
                      <div className="text-xs font-bold tracking-[0.14em] text-teal">{d.code}</div>
                      <div className="mt-2 text-sm font-bold text-navy">{d.label}</div>
                      <div className="mt-1 text-xs text-slate-body">{d.port}</div>
                    </button>
                  ))}
                </div>
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          {ready && destination && type ? (
            <motion.div
              key="kr"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
            >
              <div className="border-b border-border p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-teal">{D.breakdown.title(destinationLabel(destination))}</div>
                <div className="mt-1 text-xs text-slate-body">{D.breakdown.vehicleLine(type)}</div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <Row label={D.breakdown.vehiclePrice} value={`₩${fmtInt(priceKrw)} (~€${fmtInt(priceEur)})`} />

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">{D.breakdown.allInTitle}</div>
                  <ul className="mb-2 space-y-1">
                    {includes.map((i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-body">
                        <Check className="h-3.5 w-3.5 text-teal" /> {i}
                      </li>
                    ))}
                  </ul>
                  <Row label={D.breakdown.fixedShipping} value={`€${fmtInt(shippingEur)}`} bold />
                </div>

                <div className="rounded-xl bg-mist p-4">
                  <Row label={D.breakdown.vehiclePrice} value={`€${fmtInt(priceEur)}`} />
                  <Row label={D.breakdown.plusShipping} value={`€${fmtInt(shippingEur)}`} />
                  <div className="my-2 border-t border-border" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-navy">{D.breakdown.estimatedTotal}</span>
                    <span className="font-display text-2xl font-bold text-teal">€{fmtInt(totalEur)}</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] leading-relaxed text-slate-body">
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.customsWarning}</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.estimatesWarning}</li>
                </ul>
              </div>

              <div className="border-t border-border p-5">
                <button
                  onClick={onWhatsApp}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
                >
                  <MessageCircle className="h-4 w-4" /> {D.requestOnWhatsApp}
                </button>
                <a href={contactHref} className="mt-3 block text-center text-sm font-semibold text-teal hover:underline">
                  {D.requestFullQuote}
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-slate-body"
            >
              {D.emptyState}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
