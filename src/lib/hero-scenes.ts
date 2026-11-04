import type { HeroSceneImage } from "@/components/site/HeroScene";
import ct1440 from "@/assets/heroes/cybertruck-port-1440.webp.asset.json";
import ct2560 from "@/assets/heroes/cybertruck-port-2560.webp.asset.json";
import ctM from "@/assets/heroes/cybertruck-port-mobile-1080.webp.asset.json";
import mr1440 from "@/assets/heroes/mclaren-rear-container-1440.webp.asset.json";
import mr2560 from "@/assets/heroes/mclaren-rear-container-2560.webp.asset.json";
import mrM from "@/assets/heroes/mclaren-rear-container-mobile-1080.webp.asset.json";
import rr1440 from "@/assets/heroes/rolls-royce-port-wide-1440.webp.asset.json";
import rr2560 from "@/assets/heroes/rolls-royce-port-wide-2560.webp.asset.json";
import rrM from "@/assets/heroes/rolls-royce-port-wide-mobile-1080.webp.asset.json";
import lh1440 from "@/assets/heroes/lamborghini-handover-wide-1440.webp.asset.json";
import lh2560 from "@/assets/heroes/lamborghini-handover-wide-2560.webp.asset.json";
import lhM from "@/assets/heroes/lamborghini-handover-wide-mobile-1080.webp.asset.json";
import bp1440 from "@/assets/heroes/brown-porsche-yard-1440.webp.asset.json";
import bp2560 from "@/assets/heroes/brown-porsche-yard-2560.webp.asset.json";
import bpM from "@/assets/heroes/brown-porsche-yard-mobile-1080.webp.asset.json";
import sf1440 from "@/assets/heroes/silver-ferrari-yard-1440.webp.asset.json";
import sf2560 from "@/assets/heroes/silver-ferrari-yard-2560.webp.asset.json";
import sfM from "@/assets/heroes/silver-ferrari-yard-mobile-1080.webp.asset.json";
import ym1440 from "@/assets/heroes/yellow-mclaren-container-1440.webp.asset.json";
import ym2560 from "@/assets/heroes/yellow-mclaren-container-2560.webp.asset.json";
import ymM from "@/assets/heroes/yellow-mclaren-container-mobile-1080.webp.asset.json";
import om1440 from "@/assets/heroes/orange-mclaren-port-1440.webp.asset.json";
import om2560 from "@/assets/heroes/orange-mclaren-port-2560.webp.asset.json";
import omM from "@/assets/heroes/orange-mclaren-port-mobile-1080.webp.asset.json";
import fc1440 from "@/assets/heroes/ferrari-car-carrier-1440.webp.asset.json";
import fc2560 from "@/assets/heroes/ferrari-car-carrier-2560.webp.asset.json";
import fcM from "@/assets/heroes/ferrari-car-carrier-mobile-1080.webp.asset.json";
import lc1440 from "@/assets/heroes/lamborghini-in-container-1440.webp.asset.json";
import lc2560 from "@/assets/heroes/lamborghini-in-container-2560.webp.asset.json";
import lcM from "@/assets/heroes/lamborghini-in-container-mobile-1080.webp.asset.json";

type Pointer = { url: string };
/** Owner photos (edges extended for framing; vehicle untouched) used as full-bleed interior heroes. */
function scene(d: Pointer, dl: Pointer, m: Pointer, en: string, sq: string): Record<"en" | "sq", HeroSceneImage> {
  const base = { desktop: d.url, desktopLarge: dl.url, mobile: m.url };
  return { en: { ...base, alt: en }, sq: { ...base, alt: sq } };
}

export const CYBERTRUCK_PORT = scene(ct1440, ct2560, ctM,
  "Stainless-steel Tesla Cybertruck parked on a container terminal road, with stacked shipping containers and cranes behind.",
  "Tesla Cybertruck prej çeliku inox i parkuar në rrugën e një terminali kontejnerësh, me kontejnerë dhe vinça në sfond.");
export const MCLAREN_REAR_CONTAINER = scene(mr1440, mr2560, mrM,
  "Yellow McLaren seen from behind, parked inside an open shipping container.",
  "McLaren e verdhë e parë nga pas, e parkuar brenda një kontenieri të hapur.");
export const ROLLS_ROYCE_PORT = scene(rr1440, rr2560, rrM,
  "Black Rolls-Royce SUV with its doors open, parked on a concrete lot in front of buildings.",
  "Rolls-Royce SUV i zi me dyert e hapura, i parkuar në një shesh betoni para ndërtesave.");
export const LAMBORGHINI_HANDOVER = scene(lh1440, lh2560, lhM,
  "Grey Lamborghini with its doors raised, parked outside a modern glass building.",
  "Lamborghini gri me dyert e ngritura, e parkuar para një ndërtese moderne me xham.");
export const BROWN_PORSCHE_YARD = scene(bp1440, bp2560, bpM,
  "Bronze-brown Porsche 911 parked on a paved yard beside a warehouse.",
  "Porsche 911 ngjyrë bronzi e parkuar në një shesh të shtruar pranë një magazine.");
export const SILVER_FERRARI_YARD = scene(sf1440, sf2560, sfM,
  "Silver Ferrari with yellow stripes parked on a paved yard next to other sports cars.",
  "Ferrari ngjyrë argjendi me vija të verdha, e parkuar në një shesh pranë makinave të tjera sportive.");
export const YELLOW_MCLAREN_CONTAINER = scene(ym1440, ym2560, ymM,
  "Yellow and black McLaren parked on a paved yard near shipping containers.",
  "McLaren e verdhë me të zezë e parkuar në një shesh pranë kontenierëve.");
export const ORANGE_MCLAREN_PORT = scene(om1440, om2560, omM,
  "Orange McLaren parked at a port with containers and cranes behind.",
  "McLaren portokalli e parkuar në port, me kontenierë dhe vinça pas.");
export const FERRARI_CAR_CARRIER = scene(fc1440, fc2560, fcM,
  "Ferrari loaded on a car-carrier truck.",
  "Ferrari e ngarkuar në një kamion transportues makinash.");
export const LAMBORGHINI_IN_CONTAINER = scene(lc1440, lc2560, lcM,
  "Lamborghini secured inside a shipping container.",
  "Lamborghini e siguruar brenda një kontenieri.");
