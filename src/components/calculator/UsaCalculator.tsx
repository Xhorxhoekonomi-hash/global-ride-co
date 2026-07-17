import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Car, Check, ChevronsUpDown, Container, MessageCircle, Truck, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { LAND_TRANSPORT_TABLE, getLandTransport, type VehicleSize } from "@/data/landTransport";
import { UNLOADING_FEES, getOceanFreight, type Destination } from "@/data/oceanFreight";
import { calculateAllAuctionFees } from "@/data/auctionFees";
import { fmt, toTitle, USD_TO_EUR } from "./format";
import { Step, StepReveal, Row } from "./StepUI";
import type { CalculatorDict } from "./dict";

const SIZE_ICONS: Record<VehicleSize, LucideIcon> = {
  "Sedan/Standard": Car,
  "Large SUV/Truck": Truck,
  "Oversized": Container,
};

export function UsaCalculator({ dict, source, contactHref }: { dict: CalculatorDict; source: string; contactHref: string }) {
  const D = dict.usa;
  const locations = useMemo(() => Object.keys(LAND_TRANSPORT_TABLE).sort(), []);
  const [location, setLocation] = useState<string | null>(null);
  const [comboOpen, setComboOpen] = useState(false);
  const [size, setSize] = useState<VehicleSize | null>(null);
  const [isEV, setIsEV] = useState(false);
  const [bid, setBid] = useState<string>("");
  const [destination, setDestination] = useState<Destination | null>(null);

  const bidNumber = parseFloat(bid) || 0;
  const ready = !!location && !!size && bidNumber > 0 && !!destination;

  const land = location && size ? getLandTransport(location, size) : null;
  const fees = ready ? calculateAllAuctionFees(bidNumber, isEV) : null;
  const ocean = land && destination && size ? getOceanFreight(land.terminal, destination, size) : 0;
  const unloading = destination ? UNLOADING_FEES[destination] : null;

  const totalUsd =
    ready && land && fees && unloading ? bidNumber + fees.total + land.finalCost + ocean + unloading.amount : 0;
  const totalEur = totalUsd * USD_TO_EUR;

  const destinationLabel = (v: Destination): string =>
    D.step4.destinations.find((d) => d.value === v)?.label ?? v;

  const whatsappText = () => {
    if (!ready || !land || !fees || !unloading || !destination) return "";
    return [
      D.wa.greeting,
      "",
      D.wa.resultLead,
      "",
      `${D.wa.auctionLocation}: ${location}`,
      `${D.wa.routedVia}: ${land.terminalName}`,
      `${D.wa.destination}: ${destinationLabel(destination)}`,
      `${D.wa.vehicle}: ${size}${isEV ? D.wa.evTag : ""}`,
      `${D.wa.winningBid}: ${fmt(bidNumber)}`,
      "",
      `${D.wa.landTransport}:    ${fmt(land.finalCost)}`,
      `${D.wa.auctionFees}:      ${fmt(fees.total)}`,
      `${D.wa.oceanFreight}:     ${fmt(ocean)}`,
      `${D.wa.unloading}:         ${fmt(unloading.amount)}`,
      D.wa.separator,
      `${D.wa.estimatedTotal}:   ${fmt(totalUsd)} (~${fmt(totalEur, "€")})`,
      "",
      D.wa.closingConfirm,
      D.wa.closingThanks,
    ].join("\n");
  };

  const onWhatsApp = () => {
    const text = whatsappText();
    if (!text) return;
    trackEvent("whatsapp_clicked", { source: `${source}-usa` });
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const showSize = !!location;
  const showBid = showSize && !!size;
  const showDest = showBid && bidNumber > 0;

  const selectedLoc = location ? LAND_TRANSPORT_TABLE[location] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
      <div className="space-y-6">
        <Step n={1} title={D.step1.title}>
          <Popover open={comboOpen} onOpenChange={setComboOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground"
              >
                {selectedLoc && location ? (
                  <span className="font-medium">
                    {location} — {toTitle(selectedLoc.city)}, {selectedLoc.state}
                  </span>
                ) : (
                  <span className="text-muted-foreground">{D.step1.placeholder}</span>
                )}
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder={D.step1.placeholder} />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    {locations.map((loc) => {
                      const l = LAND_TRANSPORT_TABLE[loc];
                      return (
                        <CommandItem
                          key={loc}
                          value={`${loc} ${l.city} ${l.state}`}
                          onSelect={() => {
                            setLocation(loc);
                            setComboOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", location === loc ? "opacity-100" : "opacity-0")} />
                          <span className="font-semibold">{loc}</span>
                          <span className="ml-1.5 text-slate-body">— {toTitle(l.city)}</span>
                          <span className="ml-2 rounded bg-mist px-1.5 py-0.5 text-[10px] font-bold text-navy/70">
                            {l.state}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {land && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal"
            >
              {D.routedVia} {land.terminalName}
            </motion.div>
          )}
        </Step>

        <AnimatePresence>
          {showSize && (
            <StepReveal key="s2">
              <Step n={2} title={D.step2.title}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {D.step2.sizes.map((s) => {
                    const Icon = SIZE_ICONS[s.value];
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setSize(s.value)}
                        className={cn(
                          "rounded-2xl border p-4 text-left transition-all",
                          size === s.value ? "border-teal bg-teal/5 shadow-card" : "border-border bg-card hover:border-teal/40",
                        )}
                      >
                        <Icon className="h-7 w-7 text-teal" strokeWidth={1.75} />
                        <div className="mt-2 text-sm font-bold text-navy">{s.title}</div>
                        <div className="mt-1 text-xs text-slate-body">{s.body}</div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {size && (
                    <motion.label
                      key="ev"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-4"
                    >
                      <input type="checkbox" checked={isEV} onChange={(e) => setIsEV(e.target.checked)} className="h-4 w-4 accent-teal" />
                      <Zap className="h-4 w-4 text-teal" />
                      <span className="text-sm font-medium text-navy">{D.step2.evLabel}</span>
                    </motion.label>
                  )}
                </AnimatePresence>
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBid && (
            <StepReveal key="s4">
              <Step n={3} title={D.step3.title}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-body">$</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={bid}
                    onChange={(e) => setBid(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background py-3 pl-8 pr-4 text-sm text-foreground focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-body">{D.step3.helper}</p>
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDest && (
            <StepReveal key="s5">
              <Step n={4} title={D.step4.title}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {D.step4.destinations.map((d) => (
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
          {ready && land && fees && unloading && destination && selectedLoc ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
            >
              <div className="border-b border-border p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-teal">{D.breakdown.title}</div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">{D.breakdown.landTransportSection}</div>
                  <Row label={`${location} → ${land.terminalName}`} value={fmt(land.finalCost)} />
                  <div className="mt-1 text-[11px] text-slate-body">
                    {toTitle(selectedLoc.city)}, {selectedLoc.state}
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">{D.breakdown.auctionFeesSection}</div>
                  <Row label={D.breakdown.buyerFee(fmt(bidNumber + 100))} value={fmt(fees.buyerFee)} />
                  <Row label={D.breakdown.virtualBidFee} value={fmt(fees.virtualBidFee)} />
                  <Row label={D.breakdown.gateFee} value={fmt(fees.gateFee)} />
                  <Row label={D.breakdown.titleFee} value={fmt(fees.titleFee)} />
                  <Row label={D.breakdown.envFee} value={fmt(fees.environmentalFee)} />
                  <Row label={D.breakdown.brokerFee} value={fmt(fees.brokerFee)} />
                  {isEV && <Row label={D.breakdown.evSurcharge} value={fmt(fees.evFee)} />}
                  <div className="my-1 border-t border-border" />
                  <Row label={D.breakdown.totalAuctionFees} value={fmt(fees.total)} bold />
                </div>

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">{D.breakdown.oceanSection}</div>
                  <Row label={D.breakdown.terminalToDest(land.terminalName, destinationLabel(destination))} value={fmt(ocean)} />
                  <Row label={D.breakdown.unloadingAt(destinationLabel(destination))} value={fmt(unloading.amount)} />
                  <div className="my-1 border-t border-border" />
                  <Row label={D.breakdown.totalShipping} value={fmt(ocean + unloading.amount)} bold />
                </div>

                <div className="rounded-xl bg-mist p-4">
                  <Row label={D.breakdown.winningBid} value={fmt(bidNumber)} />
                  <Row label={D.breakdown.plusAuctionFees} value={fmt(fees.total)} />
                  <Row label={D.breakdown.plusLandTransport} value={fmt(land.finalCost)} />
                  <Row label={D.breakdown.plusOceanUnloading} value={fmt(ocean + unloading.amount)} />
                  <div className="my-2 border-t border-border" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-navy">{D.breakdown.estimatedTotalUsd}</span>
                    <span className="font-display text-2xl font-bold text-teal">{fmt(totalUsd)}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-slate-body">
                    <span className="text-xs">{D.breakdown.estimatedTotalEurApprox}</span>
                    <span className="text-sm font-semibold">{fmt(totalEur, "€")}</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] leading-relaxed text-slate-body">
                  <li>{D.breakdown.notes.buyerFeeNote}</li>
                  <li>{D.breakdown.notes.containerNote}</li>
                  {unloading.isEstimate && <li>* {unloading.note}</li>}
                  <li>{D.breakdown.notes.usdEurNote}</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.customsWarning}</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> {D.breakdown.notes.estimatesWarning}</li>
                </ul>
              </div>

              <div className="space-y-2 border-t border-border p-5">
                <button
                  onClick={onWhatsApp}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
                >
                  <MessageCircle className="h-4 w-4" /> {D.requestOnWhatsApp}
                </button>
                <a href={contactHref} className="block text-center text-sm font-semibold text-teal hover:underline">
                  {D.requestFullQuote}
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
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
