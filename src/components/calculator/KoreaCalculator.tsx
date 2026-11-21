import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import type { KoreaMethod, KoreaIncludes } from "@/data/koreaShipping";
import { KOREA_INCLUDES, KOREA_CURRENCIES, KOREA_CURRENCY_SYMBOL, convertKoreaPrice, type KoreaCurrency } from "./korea-public";
import { useCustomer } from "@/components/account/CustomerSession";
import { LockedResult } from "@/components/account/LockedResult";
import { canSeePrices } from "@/lib/customer/validation";
import { getQuote, koreaMethodPrices } from "@/lib/customer/customer.functions";
import type { calculateKorea } from "@/lib/customer/calculate.server";
import type { Destination } from "@/data/oceanFreight";
import { fmtInt } from "./format";
import { Step, StepReveal, Row } from "./StepUI";
import type { CalculatorDict, KoreaType } from "./dict";
import type { CalculatorRates } from "@/lib/fx/calculator-rates";

// Locale-specific Korea inclusion list. Falls back to English data-module list.
export function KoreaCalculator({
  dict,
  source,
  contactHref,
  koreaIncludes,
  initialDestination,
  fxRates,
}: {
  dict: CalculatorDict;
  source: string;
  contactHref: string;
  koreaIncludes?: KoreaIncludes;
  initialDestination?: Destination;
  fxRates: CalculatorRates;
}) {
  const D = dict.korea;
  const includesByMethod = koreaIncludes ?? KOREA_INCLUDES;
  const [method, setMethod] = useState<KoreaMethod | null>(null);

  const [type, setType] = useState<KoreaType | null>(null);
  const [currency, setCurrency] = useState<KoreaCurrency>("KRW");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState<Destination | null>(initialDestination ?? null);

  const priceNumber = parseFloat(price) || 0;
  const [result,setResult]=useState<ReturnType<typeof calculateKorea>|null>(null);
  const rates = result?.fxRates ?? fxRates;
  const { priceEur, priceKrw, priceUsd } = convertKoreaPrice(currency, priceNumber, rates);
  const enteredLabel = `${KOREA_CURRENCY_SYMBOL[currency]}${fmtInt(priceNumber)}`;
  const enteredWithEur = currency === "EUR" ? enteredLabel : `${enteredLabel} (≈ €${fmtInt(priceEur)})`;
  const helperText = currency === "USD" ? `€${fmtInt(priceEur)} · ≈ ₩${fmtInt(priceKrw)}` : currency === "KRW" ? `€${fmtInt(priceEur)} · ≈ $${fmtInt(priceUsd)}` : `₩${fmtInt(priceKrw)} · ≈ $${fmtInt(priceUsd)}`;

  const effectiveMethod = destination === "Albania" ? method : destination ? "roro" : null;
  const ready = !!type && priceNumber > 0 && !!destination && !!effectiveMethod;
  const {user,hasProfile}=useCustomer();const unlocked=canSeePrices(user)&&hasProfile===true;
  const [methodPrices,setMethodPrices]=useState<{roro:number;container:number}|null>(null);
  const [resultError,setResultError]=useState('');
  const [restored,setRestored]=useState(false);
  useEffect(()=>{try{const v=JSON.parse(sessionStorage.getItem('alpha-calculator-korea')??'null');if(v){setType(v.type);if(KOREA_CURRENCIES.includes(v.currency))setCurrency(v.currency);setPrice(v.price);setDestination(v.destination);setMethod(v.method);}}catch{}setRestored(true);},[]);
  useEffect(()=>{if(restored)sessionStorage.setItem('alpha-calculator-korea',JSON.stringify({type,currency,price,destination,method}));},[type,currency,price,destination,method,restored]);
  useEffect(()=>{setMethodPrices(null);if(!unlocked||!type)return;let active=true;void koreaMethodPrices({data:{type}}).then(v=>{if(active)setMethodPrices(v);}).catch(()=>{});return()=>{active=false;};},[unlocked,user?.id,type]);
  useEffect(()=>{setResult(null);setResultError('');if(!unlocked||!ready||!destination||!type||!effectiveMethod)return;let active=true;const timer=setTimeout(()=>{void getQuote({data:{tab:'korea',inputs:{type,currency,price:priceNumber,destination,method:effectiveMethod}}}).then(v=>{if(active&&v.tab==='korea'&&'shippingEur' in v.result){setResult(v.result);trackEvent('calculator_unlocked',{tab:'korea'});}}).catch(e=>{if(active)setResultError(e.message);});},350);return()=>{active=false;clearTimeout(timer);};},[unlocked,user?.id,ready,type,currency,priceNumber,destination,effectiveMethod,fxRates.usdEur.rate,fxRates.eurKrw.rate,fxRates.usdEur.fetchedAt]);
  const shippingEur=unlocked?result?.shippingEur??0:0;
  const methodLabel = D.step4.methods.find((m) => m.value === effectiveMethod)?.label ?? "";
  const includes = effectiveMethod ? includesByMethod[effectiveMethod] : [];
  const totalEur = unlocked ? result?.totalEur ?? 0 : 0;

  const destinationLabel = (v: Destination): string =>
    D.step3.destinations.find((d) => d.value === v)?.label ?? v;

  const whatsappText = () => {
    if (!ready || !destination || !type) return "";
    return [
      D.wa.greeting,
      "",
      D.wa.resultLead(destinationLabel(destination)),
      `${D.wa.vehicle}: ${type}`,
      `${D.wa.shippingMethod}: ${effectiveMethod === "container" ? "Container" : "RoRo"}`,
      "",
      `${D.wa.vehiclePrice}: ${enteredWithEur}`,
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
    trackEvent("whatsapp_clicked", { source: `${source}-korea`, method: effectiveMethod ?? "roro" });
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
        </Step>

        <AnimatePresence>
          {showPrice && (
            <StepReveal key="kp">
              <Step n={2} title={D.step2.title}>
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
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
                    {KOREA_CURRENCIES.map((c) => (
                      <Button variant="ghost"
                        key={c}
                        type="button"
                        aria-pressed={currency === c}
                         onClick={() => setCurrency(c)}
                        className={cn(
                          "h-12 min-h-12 flex-1 rounded-none px-2 text-sm font-semibold transition-colors sm:w-24 sm:flex-none",
                          currency === c ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground",
                        )}
                      >
                        {`${KOREA_CURRENCY_SYMBOL[c]} ${c}`}
                      </Button>
                    ))}
                  </div>
                </div>
                {priceNumber > 0 && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {D.step2.helper(helperText, rates)}
                  </p>
                )}
                {priceNumber > 0 && (
                  <p className="mt-1 text-xs text-muted-foreground">{dict.usa.breakdown.notes.usdEurNote(rates)}</p>
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
                       onClick={() => {
                        if (d.value !== destination) setMethod(null);
                        setDestination(d.value);
                      }}
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
        <AnimatePresence>
          {showDest && destination === "Albania" && type && (
            <StepReveal key="km">
              <Step n={4} title={D.step4.title}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {D.step4.methods.map((m) => (
                    <Button variant="ghost" key={m.value} type="button" aria-pressed={method === m.value}
                      onClick={() => setMethod(m.value)}
                      className={cn("h-auto min-h-12 w-full flex-col items-start whitespace-normal rounded-lg border p-4 text-left transition-colors",
                        method === m.value ? "border-primary bg-accent shadow-card" : "border-border bg-card hover:border-primary")}
                    >
                      <span className="text-sm font-bold text-secondary">{m.label}</span>
                      <span className="mt-1 text-xs text-muted-foreground">{m.body}</span>
                      {unlocked && methodPrices && <span className="mt-3 text-base font-semibold tabular-nums text-primary">{fmtInt(methodPrices[m.value])} EUR</span>}
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
          {ready && !unlocked ? <LockedResult sq={contactHref.startsWith("/al")} /> : ready && destination && type && result ? (
            <motion.div
              key="kr"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden rounded-lg border border-border bg-card shadow-card"
            >
              <div className="border-b border-border p-5">
                <div className="text-xs font-bold uppercase tracking-normal text-primary">{D.breakdown.title(destinationLabel(destination), methodLabel)}</div>
                <div className="mt-1 text-xs text-muted-foreground">{D.breakdown.vehicleLine(type)}</div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <Row label={D.breakdown.vehiclePrice} value={enteredWithEur} />

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-normal text-muted-foreground">{D.breakdown.allInTitle}</div>
                  <ul className="mb-2 space-y-1">
                    {includes.map((i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary" /> {i}
                      </li>
                    ))}
                  </ul>
                  <Row label={D.breakdown.fixedShipping(destinationLabel(destination), methodLabel)} value={`€${fmtInt(shippingEur)}`} bold />
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
                  className="h-auto min-h-12 w-full whitespace-normal bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-teal-dark"
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
              {resultError || (ready && unlocked ? (contactHref.startsWith("/al") ? "Duke përllogaritur…" : "Calculating…") : D.emptyState)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
