import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Link2, ScanLine, Check, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ICONS = [Link2, ScanLine, Check, Ship];
export function HomeJourney({ locale, titles, bodies }: { locale: "en" | "sq"; titles: string[]; bodies: string[] }) {
  const [step, setStep] = useState("0");
  const sq = locale === "sq";
  const routes = [sq ? "/al/kontakt" : "/contact", sq ? "/al/inspektim-makinash" : "/inspection-service", sq ? "/al/kontakt" : "/contact", sq ? "/al/transport-me-kontenier" : "/container-shipping"];
  const actions = sq ? ["Dërgo linkun", "Eksploro inspektimin", "Fol me ekipin", "Eksploro transportin"] : ["Send your vehicle link", "Explore inspections", "Talk to our team", "Explore shipping"];
  return <Tabs value={step} onValueChange={setStep} className="home-journey-tool">
    <TabsList className="home-journey-tabs" aria-label={sq ? "Hapat e importit" : "Import steps"}>{titles.map((title, i) => <TabsTrigger key={title} value={String(i)} className="home-journey-tab"><span>0{i + 1}</span><span>{title}</span></TabsTrigger>)}</TabsList>
    {titles.map((title, i) => { const Icon = ICONS[i]; return <TabsContent value={String(i)} key={title} className="home-journey-detail"><Icon className="h-8 w-8 text-primary" /><div><h3>{title}</h3><p>{bodies[i]}</p></div><Button asChild variant="link"><Link to={routes[i]}>{actions[i]}<ArrowRight /></Link></Button></TabsContent>; })}
  </Tabs>;
}