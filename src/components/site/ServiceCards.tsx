import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AIRFREIGHT_PORTRAITS } from "@/lib/airfreight-photos";
import handover from "@/assets/services/lamborghini-handover-1200.webp.asset.json";
import ferrariContainer from "@/assets/services/ferrari-in-container-1200.webp.asset.json";
import rolls from "@/assets/services/rolls-royce-port-1200.webp.asset.json";
import cullinan from "@/assets/services/cullinan-port-yard-1200.webp.asset.json";
import greenFerrari from "@/assets/services/green-ferrari-delivery-1200.webp.asset.json";

type Card = { title: string; body: string; to: string; img: string; alt: string; w?: number; h?: number };
const af = AIRFREIGHT_PORTRAITS.loader;

export function ServiceCards({ locale }: { locale: "en" | "sq" }) {
  const al = locale === "sq";
  const more = al ? "Më shumë" : "Learn more";
  const cards: Card[] = al ? [
    { title: "Blerje dhe inspektim", body: "Mbështetje në blerje dhe inspektim para blerjes.", to: "/al/inspektim-makinash", img: handover.url, alt: "Lamborghini Aventador gri me dyert e hapura përpara një ndërtese me xhama." },
    { title: "Transport me kontenier", body: "I ngarkuar dhe i siguruar në kontenier të dedikuar.", to: "/al/transport-me-kontenier", img: ferrariContainer.url, alt: "Ferrari gri brenda një kontenieri transporti, me një punonjës pranë." },
    { title: "Transport RoRo", body: "Për automjete që lëvizin vetë.", to: "/al/transport-roro", img: rolls.url, alt: "Rolls-Royce i zi me dyert e hapura në një shesh të shtruar." },
    { title: "Koordinim doganor", body: "Dokumentet dhe procedurat në port, të koordinuara.", to: "/al/koordinim-doganor", img: cullinan.url, alt: "Rolls-Royce Cullinan i zi në një shesh me kontenierë dhe kamionë." },
    { title: "Dorëzim", body: "Nga porti deri në adresën tuaj.", to: "/al/dorezim-ne-adrese", img: greenFerrari.url, alt: "Ferrari jeshil me vija të verdha në një shesh logjistik pranë një kamioni." },
    { title: "Transport ajror", body: "Për automjete urgjente dhe me vlerë të lartë.", to: "/al/transport-ajror-makinash", img: af.src, alt: af.alt.sq, w: af.width, h: af.height },
  ] : [
    { title: "Buy & Inspect", body: "Purchase support and pre-purchase inspection.", to: "/inspection-service", img: handover.url, alt: "Grey Lamborghini Aventador with its doors raised outside a glass-fronted building." },
    { title: "Container Shipping", body: "Loaded and secured in a dedicated container.", to: "/container-shipping", img: ferrariContainer.url, alt: "Grey Ferrari inside a shipping container with a worker beside it." },
    { title: "RoRo Shipping", body: "Roll-on/roll-off for drivable vehicles.", to: "/roro-shipping", img: rolls.url, alt: "Black Rolls-Royce with its doors open on a paved yard." },
    { title: "Customs Coordination", body: "Documents and port procedures, coordinated.", to: "/customs-coordination", img: cullinan.url, alt: "Black Rolls-Royce Cullinan in a yard with containers and trucks." },
    { title: "Delivery", body: "From the port to your address.", to: "/final-mile-delivery", img: greenFerrari.url, alt: "Green Ferrari with yellow stripes on a logistics yard beside a truck." },
    { title: "Airfreight", body: "For urgent and high-value vehicles.", to: "/airfreight", img: af.src, alt: af.alt.en, w: af.width, h: af.height },
  ];
  return <section className="home-section"><div className="container-page">
    <div className="alpha-section-heading"><div><p className="home-kicker">{al ? "Mbështetje në çdo hap" : "The right support, at every stage"}</p><h2 className="home-heading">{al ? "Më shumë se transport." : "More than moving a car."}</h2></div></div>
    <div className="bento-grid">
      {cards.map((c) => <Link key={c.title} to={c.to} className="bento-tile">
        <img src={c.img} alt={c.alt} width={c.w ?? 1200} height={c.h ?? 1600} loading="lazy" decoding="async" />
        <div className="bento-tile-copy"><h3>{c.title}</h3><p>{c.body}</p><span>{more}<ArrowRight className="h-4 w-4" /></span></div>
      </Link>)}
    </div>
  </div></section>;
}
