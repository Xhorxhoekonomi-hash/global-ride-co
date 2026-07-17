import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead } from "@/lib/seo";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CALCULATOR_DICT_EN, CALCULATOR_FAQS_EN } from "@/components/calculator/dict";

export const Route = createFileRoute("/calculator")({
  head: () => {
    const base = buildHead({
      title: "Car Shipping Cost Calculator | Copart, IAAI & Korea",
      description: "Free car shipping cost calculator for Copart, IAAI, and South Korea imports — real, itemized rates for shipping to Albania, the Netherlands, and Germany.",
      path: "/calculator",
      image: heroImg,
      hreflang: [
        { lang: "en", path: "/calculator" },
        { lang: "sq", path: "/al/kalkulator-transporti" },
      ],
      xDefault: "/calculator",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: CALCULATOR_FAQS_EN.map((f) => ({
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

function CalculatorPage() {
  return (
    <CalculatorShell
      dict={CALCULATOR_DICT_EN}
      faqs={CALCULATOR_FAQS_EN}
      source="en-calculator"
      contactHref="/contact"
      heroImgSrc={heroImg}
      heroImgAlt="Vehicle shipping cost calculator"
    />
  );
}
