import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, MessageCircle, Ship } from "lucide-react";
import heroImg from "@/assets/hero-delivered.jpg";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/delivered-vehicles")({
  head: () => buildHead({ title: "Delivered Vehicles | Alpha Worldwide Albania", description: "Real vehicles sourced, inspected and shipped by Alpha Worldwide — Rolls Royce, Ferrari, Porsche, Mercedes and more delivered to Albania and Europe.", path: "/delivered-vehicles", image: heroImg }),
  component: DeliveredVehicles,
});

function DeliveredVehicles() {
  return <>
    <InnerPageHero eyebrow="Deliveries & updates" title="Delivered Vehicles" description="Explore shipment updates from Alpha Worldwide Albania on our Instagram page.">
      <Button asChild className="h-auto min-h-12 whitespace-normal py-3"><a href="https://www.instagram.com/alphaworldwidealbania/" target="_blank" rel="noopener noreferrer"><Instagram /> See our deliveries on Instagram <ArrowRight /></a></Button>
      <Button asChild variant="outline" className="min-h-12"><Link to="/contact">Get a Quote</Link></Button>
    </InnerPageHero>
    <section className="bg-background">
      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-2">
        <div className="min-w-0">
          <Ship className="h-9 w-9 text-primary" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-semibold text-secondary">Your vehicle. Your next journey.</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">Tell us about the vehicle you’re considering and where it needs to go. Our team can review sourcing, inspection availability and shipping options with you.</p>
          <Button asChild variant="link" className="mt-5 h-auto min-h-11 px-0"><Link to="/how-it-works">Explore the import process <ArrowRight /></Link></Button>
        </div>
        <div className="min-w-0 border-l-2 border-primary pl-6">
          <p className="text-xs font-semibold text-primary">Speak directly with our team</p>
          <h2 className="mt-4 text-2xl font-semibold text-secondary">Already found a vehicle?</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Send the listing or auction lot to discuss your shipment, or explore an estimate using our existing USA and South Korea calculator.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="min-h-12"><a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></Button>
            <Button asChild variant="outline" className="h-auto min-h-12 whitespace-normal py-3"><Link to="/calculator">Calculate Shipping <ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </section>
  </>;
}
