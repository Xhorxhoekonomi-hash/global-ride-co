import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialMedia } from "@/components/site/EditorialMedia";
import { PHOTO_SELECTIONS } from "@/lib/alpha-photos";

export function GuideFeature({ locale = "en", title, category, read }: { locale?: "en" | "sq"; title: string; category: string; read: string }) {
  const al = locale === "sq";
  return <article className="guide-lead-story">
    <figure className="guide-feature-media"><EditorialMedia photo={PHOTO_SELECTIONS.porsche} locale={locale} role="guide" /><figcaption>{al ? "Nga arkivi Alpha · jo provë e origjinës së ankandit" : "From the Alpha archive · not evidence of auction origin"}</figcaption></figure>
    <div className="guide-lead-copy"><p className="alpha-overline">{category}</p><h3>{title}</h3><p>{al ? "Nga zgjedhja e platformës te tarifat, dokumentet dhe transporti — njihuni me hapat para se të ofertoni." : "From choosing a platform to fees, paperwork and shipping — understand the steps before you place a bid."}</p><Button asChild variant="link" className="px-0"><Link to="/guides/how-to-buy-a-car-from-usa-auctions" lang={al ? "en" : undefined}>{read}<ArrowRight /></Link></Button></div>
  </article>;
}