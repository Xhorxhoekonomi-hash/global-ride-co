import type { HeroSceneImage } from "@/components/site/HeroScene";
import {
  BROWN_PORSCHE_YARD, CYBERTRUCK_PORT, FERRARI_CAR_CARRIER, LAMBORGHINI_HANDOVER, LAMBORGHINI_IN_CONTAINER,
  MCLAREN_REAR_CONTAINER, ORANGE_MCLAREN_PORT, ROLLS_ROYCE_PORT, SILVER_FERRARI_YARD, YELLOW_MCLAREN_CONTAINER,
} from "@/lib/hero-scenes";
import { AIRFREIGHT_HUB_SCENE, AIRPORT_SCENES } from "@/lib/airfreight-photos";
import { KEYWORD_PAGES, type KeywordPage } from "@/lib/keyword-pages";

type Scene = Record<"en" | "sq", HeroSceneImage>;

/** Owner-photo libraries by page category; pages rotate through their list so neighbours differ. */
const PORTS: Scene[] = [MCLAREN_REAR_CONTAINER, ORANGE_MCLAREN_PORT, LAMBORGHINI_IN_CONTAINER, CYBERTRUCK_PORT, YELLOW_MCLAREN_CONTAINER];
const REGION: Scene[] = [BROWN_PORSCHE_YARD, FERRARI_CAR_CARRIER, SILVER_FERRARI_YARD, LAMBORGHINI_HANDOVER, ROLLS_ROYCE_PORT];
const USA: Scene[] = [YELLOW_MCLAREN_CONTAINER, BROWN_PORSCHE_YARD, MCLAREN_REAR_CONTAINER, SILVER_FERRARI_YARD, ORANGE_MCLAREN_PORT];
const SERVICE: Record<string, Scene> = {
  "/vehicle-sourcing": SILVER_FERRARI_YARD,
  "/dealer-purchasing": LAMBORGHINI_HANDOVER,
  "/inland-transport": FERRARI_CAR_CARRIER,
  "/airport-handling": AIRFREIGHT_HUB_SCENE,
  "/customs-coordination": CYBERTRUCK_PORT,
  "/t1-transit": LAMBORGHINI_IN_CONTAINER,
  "/carnet-de-passage": BROWN_PORSCHE_YARD,
  "/port-handling": ORANGE_MCLAREN_PORT,
  "/final-mile-delivery": FERRARI_CAR_CARRIER,
  "/storage-coordination": YELLOW_MCLAREN_CONTAINER,
};
const AIRFREIGHT: Scene[] = [AIRFREIGHT_HUB_SCENE, ...Object.values(AIRPORT_SCENES)];

function category(page: KeywordPage): Scene[] | Scene {
  if (page.kind === "service") return SERVICE[page.en] ?? AIRFREIGHT[0];
  if (page.kind === "port") return PORTS;
  if (page.en.startsWith("/locations/") && !["/locations/dubai", "/locations/durres"].includes(page.en)) return USA;
  if (page.en === "/locations/dubai") return ORANGE_MCLAREN_PORT;
  return REGION;
}

/** Hero photo for a registry page: category library, rotated by position among same-category pages. */
export function sceneForKeyword(page: KeywordPage): Scene {
  const lib = category(page);
  if (!Array.isArray(lib)) return lib;
  const peers = KEYWORD_PAGES.filter((p) => category(p) === lib);
  return lib[Math.max(0, peers.indexOf(page)) % lib.length];
}

export function sceneForPath(enPath: string): Scene {
  const page = KEYWORD_PAGES.find((p) => p.en === enPath);
  return page ? sceneForKeyword(page) : BROWN_PORSCHE_YARD;
}
