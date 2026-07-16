import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Car, Check, ChevronsUpDown, Container, MessageCircle, Truck, Zap, type LucideIcon } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  LAND_TRANSPORT_TABLE,
  getLandTransport,
  type VehicleSize,
} from "@/data/landTransport";
import { UNLOADING_FEES, getOceanFreight, type Destination } from "@/data/oceanFreight";
import { calculateAllAuctionFees } from "@/data/auctionFees";
import { KOREA_SHIPPING, KOREA_INCLUDES, KRW_TO_EUR_RATE } from "@/data/koreaShipping";

export const Route = createFileRoute("/calculator")({
  head: () => {
    const base = buildHead({
      title: "Car Shipping Cost Calculator | Copart, IAAI & Korea",
      description: "Free car shipping cost calculator for Copart, IAAI, and South Korea imports — real, itemized rates for shipping to Albania, the Netherlands, and Germany.",
      path: "/calculator",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: CALCULATOR_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: CalculatorPage,
});

const CALCULATOR_FAQS = [
  { q: "How is my USA shipping estimate calculated?", a: "We combine the real land-transport rate from your auction location to the nearest export terminal, the full Copart/IAAI buyer-fee bracket for your winning bid, and the ocean-freight rate for that terminal-to-destination route — all from the same tables our team uses internally." },
  { q: "How is my South Korea shipping estimate calculated?", a: "South Korea uses a fixed all-in price by vehicle type and destination, covering local pickup, export documentation, and RoRo ocean freight — so the estimate is simpler and doesn't require a separate fee breakdown." },
  { q: "What's included in the estimate?", a: "Land transport (USA), auction fees (USA), ocean freight, and destination unloading. The Korea estimate additionally bundles pickup and export documentation into one fixed price." },
  { q: "What's excluded from the estimate?", a: "Customs duties and import taxes are not included in either calculator, since these depend on your destination country's regulations and the vehicle's declared value. We'll help confirm these once we know your destination." },
  { q: "Why might my final price change from the estimate?", a: "Vehicle dimensions, condition, exact loading requirements, and current carrier schedules can all affect the final price. The calculator gives a real, itemized estimate — your case handler confirms the final number before booking." },
  { q: "Is this a binding quote?", a: "No — all figures are estimates based on real rate tables, confirmed by our team before any booking is made. Nothing is charged or booked automatically from the calculator." },
];

const USD_TO_EUR = 0.92;
const fmt = (n: number, currency: "$" | "€" = "$") =>
  `${currency}${Math.round(n).toLocaleString("en-US")}`;
const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

const DESTINATIONS: { label: string; value: Destination; code: string; port: string }[] = [
  { label: "Albania", value: "Albania", code: "AL", port: "Port of Durrës" },
  { label: "Germany", value: "Germany", code: "DE", port: "Port of Bremerhaven" },
  { label: "Netherlands", value: "Netherlands", code: "NL", port: "Port of Rotterdam" },
];

const SIZE_OPTIONS: { value: VehicleSize; Icon: LucideIcon; title: string; body: string }[] = [
  { value: "Sedan/Standard", Icon: Car, title: "Sedan / Standard", body: "Sedan, standard SUV, standard van, standard pickup" },
  { value: "Large SUV/Truck", Icon: Truck, title: "Large SUV / Large Truck", body: "Large SUV, large pickup · ×1.5 land transport" },
  { value: "Oversized", Icon: Container, title: "Oversized", body: "Large van, oversized pickup · ×2.0 land transport" },
];

function CalculatorPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Vehicle shipping cost calculator" width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[38vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Shipping calculator</div>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] md:text-6xl">
            Real Costs. No Guessing.
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            Every fee itemized — land transport, auction fees, ocean freight, and unloading — calculated from real rate tables.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-20">
          <Tabs defaultValue="usa" className="mx-auto max-w-4xl">
            <TabsList className="mx-auto grid h-auto w-full max-w-lg grid-cols-2 gap-1 rounded-xl bg-mist p-1.5">
              <TabsTrigger value="usa" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white">
                USA — Copart / IAAI
              </TabsTrigger>
              <TabsTrigger value="korea" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white">
                South Korea — Encar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="usa" className="mt-10">
              <UsaCalculator />
            </TabsContent>
            <TabsContent value="korea" className="mt-10">
              <KoreaCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How the estimates work */}
      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">How it works</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Real Rate Tables, Not Guesses</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">USA Estimate</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">
                Combines the real land-transport rate from your auction location to the nearest export terminal, the full Copart/IAAI buyer-fee bracket for your winning bid, and the ocean-freight rate for that route.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">South Korea Estimate</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">
                A fixed all-in price by vehicle type and destination — bundling local pickup, export documentation, and RoRo ocean freight into one figure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included / excluded */}
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">What's Included</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
                <li className="flex gap-2"><span className="text-teal">•</span>Land transport to the export terminal (USA)</li>
                <li className="flex gap-2"><span className="text-teal">•</span>Full auction buyer fees (USA)</li>
                <li className="flex gap-2"><span className="text-teal">•</span>Local pickup & export documentation (South Korea)</li>
                <li className="flex gap-2"><span className="text-teal">•</span>Ocean freight to your destination port</li>
                <li className="flex gap-2"><span className="text-teal">•</span>Destination unloading</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">What's Excluded</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
                <li className="flex gap-2"><span className="text-navy/40">•</span>Customs duties and import taxes</li>
                <li className="flex gap-2"><span className="text-navy/40">•</span>Vehicle registration and homologation fees</li>
                <li className="flex gap-2"><span className="text-navy/40">•</span>Onward delivery beyond the destination port, unless separately quoted</li>
              </ul>
              <p className="mt-4 text-xs text-slate-body">
                Customs values, tax amounts, and clearance decisions are determined by the relevant customs authority, not by Alpha Worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destination ports */}
      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Destination ports</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Where Your Vehicle Arrives</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <h3 className="font-display text-base font-bold text-navy">Port of Durrës</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-body">Albania's main port and our home operational base.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <h3 className="font-display text-base font-bold text-navy">Rotterdam</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-body">Our Netherlands gateway, with onward delivery across Western Europe.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <h3 className="font-display text-base font-bold text-navy">Bremerhaven</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-body">A German destination option, available on request.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Questions</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">Frequently Asked</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {CALCULATOR_FAQS.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                  {f.q}
                  <span className="text-teal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages */}
      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Ready to move forward?</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">Explore Your Route</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/import-usa" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal-glow">
              Import from USA
            </Link>
            <Link to="/import-korea" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal-glow">
              Import from South Korea
            </Link>
            <Link to="/en/albania" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal-glow">
              Shipping to Albania
            </Link>
            <Link to="/en/netherlands" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal-glow">
              Shipping to Netherlands
            </Link>
          </div>
        </div>
      </section>
    </>

  );
}

/* ---------------------------------- USA ---------------------------------- */

function UsaCalculator() {
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

  const whatsappText = () => {
    if (!ready || !land || !fees || !unloading || !destination) return "";
    return [
      "Hello Alpha Worldwide,",
      "",
      "My shipping calculator result:",
      "",
      `Auction Location: ${location}`,
      `Routed via: ${land.terminalName}`,
      `Destination: ${destination}`,
      `Vehicle: ${size}${isEV ? " (EV/Hybrid)" : ""}`,
      `Winning Bid: ${fmt(bidNumber)}`,
      "",
      `Land Transport:    ${fmt(land.finalCost)}`,
      `Auction Fees:      ${fmt(fees.total)}`,
      `Ocean Freight:     ${fmt(ocean)}`,
      `Unloading:         ${fmt(unloading.amount)}`,
      "──────────────────────",
      `Estimated Total:   ${fmt(totalUsd)} (~${fmt(totalEur, "€")})`,
      "",
      "Please confirm and send next steps.",
      "Thank you.",
    ].join("\n");
  };

  const onWhatsApp = () => {
    const text = whatsappText();
    if (!text) return;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };




  const showSize = !!location;
  const showBid = showSize && !!size;
  const showDest = showBid && bidNumber > 0;

  const selectedLoc = location ? LAND_TRANSPORT_TABLE[location] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
      <div className="space-y-6">
        {/* Step 1 — Location */}
        <Step n={1} title="Search your auction location">
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
                  <span className="text-muted-foreground">e.g. Houston TX, Miami FL, Atlanta GA…</span>
                )}
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Type a city or state…" />
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
              Routed via {land.terminalName}
            </motion.div>
          )}
        </Step>

        {/* Step 2 — Vehicle size + EV */}
        <AnimatePresence>
          {showSize && (
            <StepReveal key="s2">
              <Step n={2} title="Vehicle size">
                <div className="grid gap-3 sm:grid-cols-3">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSize(s.value)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition-all",
                        size === s.value ? "border-teal bg-teal/5 shadow-card" : "border-border bg-card hover:border-teal/40",
                      )}
                    >
                      <s.Icon className="h-7 w-7 text-teal" strokeWidth={1.75} />
                      <div className="mt-2 text-sm font-bold text-navy">{s.title}</div>
                      <div className="mt-1 text-xs text-slate-body">{s.body}</div>
                    </button>
                  ))}
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
                      <span className="text-sm font-medium text-navy">This is an electric or hybrid vehicle (+$300)</span>
                    </motion.label>
                  )}
                </AnimatePresence>
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        {/* Step 4 — Winning bid */}
        <AnimatePresence>
          {showBid && (
            <StepReveal key="s4">
              <Step n={3} title="Winning bid at auction">
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
                <p className="mt-1.5 text-xs text-slate-body">
                  Enter the hammer price — all Copart/IAAI fees are calculated automatically.
                </p>
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        {/* Step 5 — Destination */}
        <AnimatePresence>
          {showDest && (
            <StepReveal key="s5">
              <Step n={4} title="Destination">
                <div className="grid gap-3 sm:grid-cols-3">
                  {DESTINATIONS.map((d) => (
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

      {/* Result panel */}
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
                <div className="text-xs font-bold uppercase tracking-wider text-teal">Cost Breakdown</div>
                <div className="mt-1 text-sm font-semibold text-navy">
                  {toTitle(selectedLoc.city)}, {selectedLoc.state} → {land.terminalName} → {destination}
                </div>
                <div className="mt-1 text-xs text-slate-body">
                  {size} {isEV && "· EV/Hybrid"} · Bid: {fmt(bidNumber)}
                </div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">Land Transport</div>
                  <Row label={`Auction yard → ${land.terminalName}`} value={fmt(land.finalCost)} />
                  <div className="text-[11px] text-slate-body">
                    Base {fmt(land.baseCost)} × {land.multiplier} for size
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">Auction Fees</div>
                  <Row label={`Buyer Fee (on ${fmt(bidNumber + 100)})`} value={fmt(fees.buyerFee)} />
                  <Row label="Virtual Bid Fee" value={fmt(fees.virtualBidFee)} />
                  <Row label="Gate Fee" value={fmt(fees.gateFee)} />
                  <Row label="Title Shipping Fee" value={fmt(fees.titleFee)} />
                  <Row label="Environmental Fee" value={fmt(fees.environmentalFee)} />
                  <Row label="Alpha Worldwide Broker Fee" value={fmt(fees.brokerFee)} />
                  {isEV && <Row label="EV Surcharge" value={fmt(fees.evFee)} />}
                  <div className="my-1 border-t border-border" />
                  <Row label="Total Auction Fees" value={fmt(fees.total)} bold />
                </div>

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">Ocean Freight & Destination</div>
                  <Row label={`${land.terminalName} → ${destination}`} value={fmt(ocean)} />
                  <Row label={`Unloading at ${destination}`} value={fmt(unloading.amount)} />
                  <div className="my-1 border-t border-border" />
                  <Row label="Total Shipping" value={fmt(ocean + unloading.amount)} bold />
                </div>

                <div className="rounded-xl bg-mist p-4">
                  <Row label="Winning Bid" value={fmt(bidNumber)} />
                  <Row label="+ Auction Fees" value={fmt(fees.total)} />
                  <Row label="+ Land Transport" value={fmt(land.finalCost)} />
                  <Row label="+ Ocean Freight + Unloading" value={fmt(ocean + unloading.amount)} />
                  <div className="my-2 border-t border-border" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-navy">Estimated Total (USD)</span>
                    <span className="font-display text-2xl font-bold text-teal">{fmt(totalUsd)}</span>
                  </div>
                  <div className="flex items-baseline justify-between text-slate-body">
                    <span className="text-xs">Estimated Total (EUR ~)</span>
                    <span className="text-sm font-semibold">{fmt(totalEur, "€")}</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] leading-relaxed text-slate-body">
                  <li>* Buyer fee applied on (bid + $100) per Copart rules</li>
                  <li>* Shared 40'HC container — typically 4 cars</li>
                  {unloading.isEstimate && <li>* {unloading.note}</li>}
                  <li>* USD→EUR at ~0.92 (approximate rate)</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> Customs & import duties NOT included</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> All figures are estimates. Final confirmed by team.</li>
                </ul>
              </div>

              <div className="space-y-2 border-t border-border p-5">
                <button
                  onClick={onWhatsApp}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
                >
                  <MessageCircle className="h-4 w-4" /> Request This Quote on WhatsApp
                </button>


                <a href="/contact" className="block text-center text-sm font-semibold text-teal hover:underline">
                  Request Full Quote →
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
              Complete each step — location, size, bid, destination — to see your itemized cost breakdown.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --------------------------------- KOREA --------------------------------- */

const KOREA_TYPES = ["Sedan/Coupe", "SUV/Minivan", "Oversized"] as const;

function KoreaCalculator() {
  const [type, setType] = useState<(typeof KOREA_TYPES)[number] | null>(null);
  const [currency, setCurrency] = useState<"KRW" | "EUR">("KRW");
  const [price, setPrice] = useState("");
  const [destination, setDestination] = useState<Destination | null>(null);

  const priceNumber = parseFloat(price) || 0;
  const priceEur = currency === "KRW" ? priceNumber * KRW_TO_EUR_RATE : priceNumber;
  const priceKrw = currency === "EUR" ? priceNumber / KRW_TO_EUR_RATE : priceNumber;

  const ready = !!type && priceNumber > 0 && !!destination;
  const shippingEur = ready && destination && type ? KOREA_SHIPPING[destination][type] : 0;
  const totalEur = priceEur + shippingEur;

  const whatsappText = () => {
    if (!ready || !destination || !type) return "";
    return [
      "Hello Alpha Worldwide,",
      "",
      `My shipping calculator result — South Korea → ${destination}`,
      `Vehicle: ${type}`,
      "",
      `Vehicle Price: ₩${fmtInt(priceKrw)} (~€${fmtInt(priceEur)})`,
      `Fixed Shipping Price: €${fmtInt(shippingEur)}`,
      "──────────────────────",
      `Estimated Total: €${fmtInt(totalEur)}`,
      "",
      "Please confirm and send next steps.",
      "Thank you.",
    ].join("\n");
  };

  const onWhatsApp = () => {
    const text = whatsappText();
    if (!text) return;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const showPrice = !!type;
  const showDest = showPrice && priceNumber > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-start">
      <div className="space-y-6">
        <Step n={1} title="Vehicle type">
          <div className="grid gap-3 sm:grid-cols-3">
            {KOREA_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all",
                  type === t ? "border-teal bg-teal/5 shadow-card" : "border-border bg-card hover:border-teal/40",
                )}
              >
                <div className="text-sm font-bold text-navy">{t}</div>
              </button>
            ))}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
            RoRo shipping — included in fixed price
          </div>
        </Step>

        <AnimatePresence>
          {showPrice && (
            <StepReveal key="kp">
              <Step n={2} title="Vehicle price">
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
                    ≈ {currency === "KRW" ? `€${fmtInt(priceEur)}` : `₩${fmtInt(priceKrw)}`} (approximate rate, ₩1,450 = €1)
                  </p>
                )}
              </Step>
            </StepReveal>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDest && (
            <StepReveal key="kd">
              <Step n={3} title="Destination">
                <div className="grid gap-3 sm:grid-cols-3">
                  {DESTINATIONS.map((d) => (
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
                <div className="text-xs font-bold uppercase tracking-wider text-teal">Cost Breakdown — South Korea → {destination}</div>
                <div className="mt-1 text-xs text-slate-body">Vehicle: {type}</div>
              </div>

              <div className="space-y-5 p-5 text-sm">
                <Row label="Vehicle Price" value={`₩${fmtInt(priceKrw)} (~€${fmtInt(priceEur)})`} />

                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-navy/60">All-In Shipping Package</div>
                  <ul className="mb-2 space-y-1">
                    {KOREA_INCLUDES.map((i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-body">
                        <Check className="h-3.5 w-3.5 text-teal" /> {i}
                      </li>
                    ))}
                  </ul>
                  <Row label="Fixed Shipping Price" value={`€${fmtInt(shippingEur)}`} bold />
                </div>

                <div className="rounded-xl bg-mist p-4">
                  <Row label="Vehicle Price" value={`€${fmtInt(priceEur)}`} />
                  <Row label="+ All-In Shipping" value={`€${fmtInt(shippingEur)}`} />
                  <div className="my-2 border-t border-border" />
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-navy">Estimated Total</span>
                    <span className="font-display text-2xl font-bold text-teal">€{fmtInt(totalEur)}</span>
                  </div>
                </div>

                <ul className="space-y-1 text-[11px] leading-relaxed text-slate-body">
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> Customs & import duties not included</li>
                  <li className="flex items-start gap-1.5 font-semibold text-amber-700"><AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" /> Estimates only. Final confirmed by team.</li>
                </ul>
              </div>

              <div className="border-t border-border p-5">
                <button
                  onClick={onWhatsApp}
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white shadow-sm"
                  style={{ backgroundColor: "oklch(0.66 0.17 145)" }}
                >
                  <MessageCircle className="h-4 w-4" /> Request This Quote on WhatsApp
                </button>
                <a href="/contact" className="mt-3 block text-center text-sm font-semibold text-teal hover:underline">
                  Request Full Quote →
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
              Complete vehicle type, price, and destination to see your cost breakdown.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------- shared UI ------------------------------- */

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-[11px] font-bold text-white">{n}</span>
        <label className="text-sm font-bold text-navy">{title}</label>
      </div>
      {children}
    </div>
  );
}

function StepReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: -6 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between py-0.5", bold && "font-bold text-navy")}>
      <span className={cn("text-xs", bold ? "text-navy" : "text-slate-body")}>{label}</span>
      <span className={cn("text-xs tabular-nums", bold ? "text-navy" : "text-navy/80")}>{value}</span>
    </div>
  );
}

function toTitle(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
