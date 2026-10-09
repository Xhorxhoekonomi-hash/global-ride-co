import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
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
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <div className="min-w-0 space-y-8">
        <Step n={1} title={D.step1.title}>
          <div className="grid gap-3 sm:grid-cols-3">
            {D.step1.types.map((t) => (
              <Button variant="ghost"
                key={t.value}
                type="button"
                aria-pressed={type === t.value}
                 onClick={() => setType(t.value)}
                className={cn(
                  "h-auto min-h-12 w-full flex-col items-start whitespace-normal rounded-lg border p-4 text-left transition-colors",
                  type === t.value ? "border-primary bg-accent shadow-card" : "border-border bg-card hover:border-primary",
                )}
              >
                <div className="text-sm font-bold text-secondary">{t.label}</div>
              </Button>
            ))}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">
            {D.step1.roroTag}
          </div>
        </Step>

        <AnimatePresence>
          {showPrice && (
            <StepReveal key="kp">
              <Step n={2} title={D.step2.title}>
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <div className="relative min-w-0">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0"
                      aria-label={D.step2.title}
                     className="min-h-12 w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25"
                    />
                  </div>
                  <div className="flex overflow-hidden rounded-md border border-border">
                    {(["KRW", "EUR"] as const).map((c) => (
                      <Button variant="ghost"
                        key={c}
                        type="button"
                        aria-pressed={currency === c}
                         onClick={() => setCurrency(c)}
                        className={cn(
                          "min-h-12 rounded-none px-3 text-sm font-semibold transition-colors",
                          currency === c ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground",
                        )}
                      >
                        {c === "KRW" ? "₩ KRW" : "€ EUR"}
                      </Button>
                    ))}
                  </div>
                </div>
                {priceNumber > 0 && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
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
                    <Button variant="ghost"
                      key={d.value}
                      type="button"
                      aria-pressed={destination === d.value}
                       onClick={() => setDestination(d.value)}
                      className={cn(
                        "h-auto min-h-12 w-full flex-col items-start whitespace-normal rounded-lg border p-4 text-left transition-colors",
                        destination === d.value ? "border-primary bg-accent shadow-card" : "border-border bg-card hover:border-primary",
                      )}
                    >
                      <div className="text-xs font-bold tracking-normal text-primary">{d.code}</div>
                      <div className="mt-2 text-sm font-bold text-secondary">{d.label}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{d.port}</div>
                    </Button>
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
              className="overflow-hidden rounded-lg border border-border bg-card shadow-card"
            >
              <div className="border-b border-border p-5">
                <div className="text-xs font-bold uppercase tracking-normal text-primary">{D.breakdown.title(destinationLabel(destination))}</div>
                <div className="mt-1 text-xs text-muted-foreground">{D.breakdown.vehicleLine(type)}</div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <Row label={D.breakdown.vehiclePrice} value={`₩${fmtInt(priceKrw)} (~€${fmtInt(priceEur)})`} />

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-normal text-muted-foreground">{D.breakdown.allInTitle}</div>
                  <ul className="mb-2 space-y-1">
                    {includes.map((i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary" /> {i}
                      </li>
                    ))}
                  </ul>
                  <Row label={D.breakdown.fixedShipping} value={`€${fmtInt(shippingEur)}`} bold />
                </div>

                <div className="border-t border-border bg-accent p-4">
                  <Row label={D.breakdown.vehiclePrice} value={`€${fmtInt(priceEur)}`} />
                  <Row label={D.breakdown.plusShipping} value={`€${fmtInt(shippingEur)}`} />
                  <div className="my-2 border-t border-border" />
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                    <span className="text-sm font-bold text-secondary">{D.breakdown.estimatedTotal}</span>
                    <span className="font-display text-2xl font-bold text-primary">€{fmtInt(totalEur)}</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] leading-relaxed text-muted-foreground">
                  <li className="flex items-start gap-1.5 font-semibold text-warning"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.customsWarning}</li>
                  <li className="flex items-start gap-1.5 font-semibold text-warning"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.estimatesWarning}</li>
                </ul>
              </div>

              <div className="border-t border-border p-5">
                <Button variant="ghost"
                  onClick={onWhatsApp}
                  type="button"
                  className="h-auto min-h-12 w-full whitespace-normal bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" /> {D.requestOnWhatsApp}
                </Button>
                <Button asChild variant="link" className="mt-3 h-auto min-h-11 w-full whitespace-normal"><Link to={contactHref}>
                  {D.requestFullQuote}
                </Link></Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ke"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground"
            >
              {D.emptyState}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
