import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { CALCULATOR_DICT_AL, CALCULATOR_FAQS_AL, KOREA_INCLUDES_AL } from "@/lib/i18n-al";

export const Route = createFileRoute("/al/kalkulator-transporti")({
  head: () => {
    const base = buildHead({
      title: "Kalkulator transporti automjetesh | Copart, IAAI dhe Koreja e Jugut",
      description: "Kalkulator falas për koston e transportit të automjetit nga SHBA-ja dhe Koreja e Jugut drejt Shqipërisë, Holandës dhe Gjermanisë — tarifa reale, të detajuara zë për zë.",
      path: "/al/kalkulator-transporti",
      lang: "sq",
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
            inLanguage: "sq",
            url: `${SITE_URL}/al/kalkulator-transporti`,
            mainEntity: CALCULATOR_FAQS_AL.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: KalkulatorTransporti,
});

function KalkulatorTransporti() {
  return (
    <CalculatorShell
      dict={CALCULATOR_DICT_AL}
      faqs={CALCULATOR_FAQS_AL}
      source="al-calculator"
      contactHref="/al/kontakt"
      heroImgSrc={heroImg}
      heroImgAlt="Kalkulator i kostos së transportit të automjetit"
      koreaIncludes={KOREA_INCLUDES_AL}
    />
  );
}
