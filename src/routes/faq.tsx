import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-contact.jpg";
import { buildHead } from "@/lib/seo";
import { Faq } from "@/components/site/Faq";

export const Route = createFileRoute("/faq")({
  head: () => buildHead({ title: "FAQ | Car Shipping & Import to Albania", description: "Answers on car shipping to Albania, auction brokerage, inspection, transit times, customs and payments.", path: "/faq", image: heroImg }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Alpha Worldwide Albania support" width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[35vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">Support</div>
          <h1 className="font-display mt-4 text-4xl font-bold md:text-6xl">Frequently Asked Questions</h1>
        </div>
      </section>
      <Faq />
    </>
  );
}
