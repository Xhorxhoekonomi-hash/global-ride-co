import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CarFront, Ship, Calculator, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { customerPath, CUSTOMER_ORIGINS, type CustomerOrigin, type CustomerTask } from "@/lib/customer-paths";
import { trackEvent } from "@/lib/analytics";

const TASKS = ["buy", "ship", "estimate", "inspect"] as const;
const ICONS = [CarFront, Ship, Calculator, ScanLine];
const COPY = {
  en: {
    title: "What would you like to do?", labels: ["Buy a car", "Ship a car", "Estimate costs", "Inspect before buying"],
    headings: ["Your next car. Your choice of origin.", "Bring your vehicle home.", "See what goes into your shipping cost.", "A closer look before you commit."],
    bodies: ["Explore sourcing, purchase support and the import process.", "Explore container transport, documentation and arrival coordination.", "An itemized estimate for USA and South Korea routes. Final quote confirmed by our team.", "Photos, diagnostics and a condition report, subject to vehicle access."],
    origin: "Vehicle origin", countries: ["USA", "South Korea", "Dubai / UAE", "Europe"], start: "Get started",
  },
  sq: {
    title: "Çfarë dëshironi të bëni?", labels: ["Bli një makinë", "Transporto makinën", "Llogarit kostot", "Inspekto para blerjes"],
    headings: ["Makina juaj e radhës. Zgjidhni origjinën.", "Sillni automjetin tuaj në shtëpi.", "Njihuni me kostot e transportit.", "Verifikoni përpara se të vendosni."],
    bodies: ["Eksploroni blerjen, mbështetjen dhe procesin e importit.", "Eksploroni transportin me kontenier, dokumentet dhe koordinimin e mbërritjes.", "Përllogaritje për Amerikën dhe Korenë e Jugut. Ekipi konfirmon ofertën përfundimtare.", "Foto, diagnostikim dhe raport gjendjeje, sipas aksesit në automjet."],
    origin: "Origjina e automjetit", countries: ["Amerikë", "Koreja e Jugut", "Dubai / EBA", "Evropë (EN)"], start: "Fillo këtu",
  },
};

export function CustomerEntry({ locale }: { locale: "en" | "sq" }) {
  const [task, setTask] = useState<CustomerTask>("buy");
  const [origin, setOrigin] = useState<CustomerOrigin>("usa");
  const c = COPY[locale];
  return <section className="customer-entry" aria-label={c.title}><div className="container-page">
    <h2 className="customer-entry-heading">{c.title}</h2>
    <Tabs value={task} onValueChange={value => { if (TASKS.some(item => item === value)) setTask(value as CustomerTask); }}>
      <TabsList className="customer-tabs" aria-label={c.title}>{TASKS.map((value, index) => {
        const Icon = ICONS[index];
        return <TabsTrigger key={value} value={value} className="customer-tab"><Icon className="h-5 w-5 shrink-0" /><span>{c.labels[index]}</span></TabsTrigger>;
      })}</TabsList>
      {TASKS.map((value, index) => <TabsContent value={value} key={value} className="customer-panel">
        <div className="min-w-0"><h3>{c.headings[index]}</h3><p>{c.bodies[index]}</p></div>
        <div className="customer-panel-actions">
          {value === "buy" && <div className="customer-origin"><label id="customer-origin-label">{c.origin}</label>
            <Select value={origin} onValueChange={value => { if (CUSTOMER_ORIGINS.some(item => item === value)) setOrigin(value as CustomerOrigin); }}>
              <SelectTrigger aria-labelledby="customer-origin-label" className="h-12"><SelectValue /></SelectTrigger>
              <SelectContent>{CUSTOMER_ORIGINS.map((value, i) => <SelectItem key={value} value={value}>{c.countries[i]}</SelectItem>)}</SelectContent>
            </Select>
          </div>}
          <Button asChild className="h-12"><Link to={customerPath(locale, value, origin)} onClick={() => {
            if (value === "estimate") trackEvent("calculator_started", { source: "homepage_task_tool" });
            if (value === "inspect") trackEvent("inspection_requested", { source: "homepage_task_tool" });
          }}>{c.start}<ArrowRight /></Link></Button>
        </div>
      </TabsContent>)}
    </Tabs>
  </div></section>;
}