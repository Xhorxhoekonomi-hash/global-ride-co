import type { HeroSceneImage } from "@/components/site/HeroScene";
import loW1440 from "@/assets/heroes/airfreight-ferrari-loader-wide-1440.webp.asset.json";
import loW2560 from "@/assets/heroes/airfreight-ferrari-loader-wide-2560.webp.asset.json";
import hoW1440 from "@/assets/heroes/airfreight-ferrari-hold-wide-1440.webp.asset.json";
import hoW2560 from "@/assets/heroes/airfreight-ferrari-hold-wide-2560.webp.asset.json";
import doW1440 from "@/assets/heroes/airfreight-ferrari-door-wide-1440.webp.asset.json";
import doW2560 from "@/assets/heroes/airfreight-ferrari-door-wide-2560.webp.asset.json";
import lo1080 from "@/assets/heroes/airfreight-ferrari-loader-1080.webp.asset.json";
import lo720 from "@/assets/heroes/airfreight-ferrari-loader-720.webp.asset.json";
import fd1080 from "@/assets/heroes/airfreight-ferrari-door-1080.webp.asset.json";
import fd720 from "@/assets/heroes/airfreight-ferrari-door-720.webp.asset.json";
import ba1080 from "@/assets/heroes/airfreight-brabus-apron-1080.webp.asset.json";
import ba720 from "@/assets/heroes/airfreight-brabus-apron-720.webp.asset.json";
import bh1080 from "@/assets/heroes/airfreight-brabus-hold-1080.webp.asset.json";
import bh720 from "@/assets/heroes/airfreight-brabus-hold-720.webp.asset.json";
import mh1080 from "@/assets/heroes/airfreight-mercedes-hold-1080.webp.asset.json";
import mh720 from "@/assets/heroes/airfreight-mercedes-hold-720.webp.asset.json";

type Bi = { en: string; sq: string };
/** Owner airfreight photos: portrait originals (resized only) and Higgsfield edge-extended 16:9 wides. Alt text describes only what is visible — never an airport. */
export type AirfreightPortrait = { src: string; srcSmall: string; width: number; height: number; alt: Bi };
const P = {
  loader: { src: lo1080.url, srcSmall: lo720.url, width: 1080, height: 1453, alt: { en: "Black Ferrari Purosangue on an aircraft loader before airfreight loading", sq: "Ferrari Purosangue e zezë mbi një ngarkues avioni para ngarkimit për transport ajror" } },
  door: { src: fd1080.url, srcSmall: fd720.url, width: 1080, height: 1350, alt: { en: "Black Ferrari secured on the main deck of a freighter aircraft, seen from the cargo door", sq: "Ferrari e zezë e siguruar në kuvertën kryesore të një avioni mallrash, e parë nga dera e ngarkesës" } },
  apron: { src: ba1080.url, srcSmall: ba720.url, width: 1080, height: 1350, alt: { en: "Grey Brabus Mercedes on a cargo pallet on an airport apron", sq: "Brabus Mercedes gri mbi një paletë ngarkese në pistën e aeroportit" } },
  brabusHold: { src: bh1080.url, srcSmall: bh720.url, width: 1080, height: 1440, alt: { en: "Brabus Mercedes secured inside a freighter main deck", sq: "Brabus Mercedes i siguruar brenda kuvertës kryesore të një avioni mallrash" } },
  mercedesHold: { src: mh1080.url, srcSmall: mh720.url, width: 1080, height: 1350, alt: { en: "Grey Mercedes sedan secured inside a freighter aircraft near the open cargo door", sq: "Mercedes sedan gri i siguruar brenda një avioni mallrash pranë derës së hapur të ngarkesës" } },
} satisfies Record<string, AirfreightPortrait>;

export const AIRFREIGHT_PORTRAITS = P;
export const AIRFREIGHT_GALLERY: AirfreightPortrait[] = [P.loader, P.door, P.apron, P.brabusHold, P.mercedesHold];

const WIDE = {
  loader: { d: loW1440.url, dl: loW2560.url },
  hold: { d: hoW1440.url, dl: hoW2560.url },
  door: { d: doW1440.url, dl: doW2560.url },
};
const WIDE_ALT: Record<keyof typeof WIDE, Bi> = {
  loader: P.loader.alt,
  hold: { en: "Black Ferrari Purosangue secured inside a freighter main deck beside the side cargo door", sq: "Ferrari Purosangue e zezë e siguruar brenda kuvertës kryesore të avionit të mallrave, pranë derës anësore" },
  door: { en: "Black Ferrari inside a freighter aircraft, seen from the cargo door", sq: "Ferrari e zezë brenda një avioni mallrash, e parë nga dera e ngarkesës" },
};

function scene(wide: keyof typeof WIDE, mobile: AirfreightPortrait): Record<"en" | "sq", HeroSceneImage> {
  const base = { desktop: WIDE[wide].d, desktopLarge: WIDE[wide].dl, mobile: mobile.src };
  return { en: { ...base, alt: WIDE_ALT[wide].en }, sq: { ...base, alt: WIDE_ALT[wide].sq } };
}

export const AIRFREIGHT_HUB_SCENE = scene("loader", P.loader);
export const AIRPORT_SCENES: Record<string, Record<"en" | "sq", HeroSceneImage>> = {
  "amsterdam-schiphol": scene("hold", P.door),
  "milan-malpensa": scene("door", P.door),
  "leipzig-halle": scene("hold", P.brabusHold),
  frankfurt: scene("loader", P.apron),
};
