import ct1440 from "@/assets/heroes/cybertruck-port-1440.webp.asset.json";
import ct2560 from "@/assets/heroes/cybertruck-port-2560.webp.asset.json";
import ctMobile from "@/assets/heroes/cybertruck-port-mobile-1080.webp.asset.json";
import type { HeroSceneImage } from "@/components/site/HeroScene";

/** Owner photos (edges extended for framing; vehicle untouched) used as full-bleed interior heroes. */
export const CYBERTRUCK_PORT: Record<"en" | "sq", HeroSceneImage> = {
  en: { desktop: ct1440.url, desktopLarge: ct2560.url, mobile: ctMobile.url, alt: "Stainless-steel Tesla Cybertruck parked on a container terminal road, with stacked shipping containers and cranes behind." },
  sq: { desktop: ct1440.url, desktopLarge: ct2560.url, mobile: ctMobile.url, alt: "Tesla Cybertruck prej çeliku inox i parkuar në rrugën e një terminali kontejnerësh, me kontejnerë dhe vinça në sfond." },
};
