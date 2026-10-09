import { createFileRoute } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { FAQS } from "@/lib/site-data";
import { HomeExperience } from "@/components/site/HomeExperience";
import heroImg from "@/assets/hero-home.jpg";

export const Route = createFileRoute("/")({
  head: () =>
    buildHead({
      title: "International Vehicle Shipping & Import | Alpha Worldwide",
      description: "Source, inspect, and ship vehicles worldwide from the USA, South Korea, UAE, and Canada to Albania and across Europe. Dubai headquarters, Durrës operations.",
      path: "/",
      lang: "en",
      hreflang: [
        { lang: "en", path: "/" },
        { lang: "sq", path: "/al/" },
      ],
      xDefault: "/",
      image: heroImg,
    }),
  component: Home_,
});

function Home_() {
  return <HomeExperience locale="en" faqs={FAQS.slice(2, 6)} />;
}
