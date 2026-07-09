import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-contact.jpg";
import { Faq } from "@/components/site/Faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Alpha Worldwide Albania" },
      { name: "description", content: "Answers about shipping, auctions, import, transit times, payments, inspection, and customs for vehicle import to Albania and Europe." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Shipping, auctions, import, transit, payments, inspection, and customs — answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
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
