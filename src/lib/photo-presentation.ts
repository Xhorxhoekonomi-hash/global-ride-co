import { ALPHA_PHOTOS, PHOTO_SELECTIONS, type AlphaPhoto } from "@/lib/alpha-photos";

export type PhotoRole = "hero" | "feature" | "story" | "guide" | "album" | "lightbox";
export type PhotoPresentation = {
  photo: AlphaPhoto;
  width: number;
  height: number;
  focalDesktop: string;
  focalMobile: string;
  format: "landscape" | "portrait";
  featureRatio: string;
  featureMobileRatio: string;
};

const arrangements: Array<[AlphaPhoto, number, number, string, string]> = [
  [PHOTO_SELECTIONS.urus, 1086, 1448, "50% 80%", "50% 68%"],
  [PHOTO_SELECTIONS.urusFront, 1152, 1536, "50% 65%", "50% 62%"],
  [PHOTO_SELECTIONS.porsche, 1152, 1536, "50% 68%", "50% 68%"],
  [PHOTO_SELECTIONS.blueFerrari, 865, 1536, "50% 72%", "50% 72%"],
  [PHOTO_SELECTIONS.container, 1024, 768, "50% 50%", "50% 50%"],
  [PHOTO_SELECTIONS.mercedesContainer, 768, 1024, "50% 58%", "50% 58%"],
  [PHOTO_SELECTIONS.gallardo, 1024, 768, "50% 55%", "50% 55%"],
  [PHOTO_SELECTIONS.darkFerrariContainer, 1152, 1536, "50% 57%", "50% 57%"],
  [PHOTO_SELECTIONS.greenContainer, 1152, 1536, "50% 65%", "50% 65%"],
  [PHOTO_SELECTIONS.loading, 1141, 1536, "50% 70%", "50% 70%"],
  [PHOTO_SELECTIONS.transporter, 1152, 1536, "50% 49%", "50% 49%"],
  [PHOTO_SELECTIONS.silverFerrari, 1152, 1536, "50% 66%", "50% 66%"],
];

// Remaining album originals: dimensions and focal placement are photograph-specific.
const albumDetails: Record<string, [number, number, string, string]> = {
  "alpha-4269aa57-bd57-4b51-a65b-5ffd586d67c4.jpg": [1024, 768, "50% 60%", "50% 60%"],
  "alpha-9aec2d9b-f42d-43db-8b31-1f91df55aa3b.jpg": [768, 1024, "50% 54%", "50% 54%"],
  "alpha-662e279c-eb31-466b-8bba-5ce09d3e56ad.jpg": [1152, 1536, "50% 61%", "50% 61%"],
  "alpha-img_1470.jpg": [1152, 1536, "50% 67%", "50% 67%"],
  "alpha-img_8078.jpg": [1152, 1536, "50% 67%", "50% 67%"],
  "alpha-img_8075.jpg": [1152, 1536, "50% 66%", "50% 66%"],
  "alpha-img_1571.jpg": [1152, 1536, "50% 67%", "50% 67%"],
  "alpha-img_1573.jpg": [1152, 1536, "50% 68%", "50% 68%"],
  "alpha-img_1566.jpg": [1152, 1536, "50% 59%", "50% 59%"],
  "alpha-img_1562.jpg": [1152, 1536, "50% 60%", "50% 60%"],
  "alpha-img_1717.jpg": [1152, 1536, "50% 63%", "50% 63%"],
  "alpha-img_1750.jpg": [1152, 1536, "50% 70%", "50% 70%"],
  "alpha-img_1769.jpg": [1152, 1536, "50% 65%", "50% 65%"],
  "alpha-img_1751.jpg": [1152, 1536, "50% 50%", "50% 50%"],
  "alpha-img_9790.jpg": [1152, 1536, "50% 68%", "50% 68%"],
  "alpha-img_9794.jpg": [1152, 1536, "50% 68%", "50% 68%"],
  "alpha-img_4822.jpg": [1152, 1536, "50% 69%", "50% 69%"],
  "alpha-img_1806.jpg": [1152, 1536, "50% 63%", "50% 63%"],
};

/** Presentation only: no geographic or delivery claims are inferred from an image. */
export function photoPresentation(photo: AlphaPhoto): PhotoPresentation {
  const arrangement = arrangements.find(([item]) => item.src === photo.src);
  const filename = photo.src.split("/").pop() ?? "";
  const [width, height, focalDesktop, focalMobile] = arrangement ? arrangement.slice(1) as [number, number, string, string] : albumDetails[filename] ?? [1152, 1536, "50% 62%", "50% 62%"];
  const tallContext = photo.src === PHOTO_SELECTIONS.transporter.src || photo.src === PHOTO_SELECTIONS.loading.src;
  return { photo, width, height, focalDesktop, focalMobile, format: width > height ? "landscape" : "portrait", featureRatio: tallContext ? "1 / 1" : "5 / 4", featureMobileRatio: tallContext ? "1 / 1" : "4 / 3" };
}

export function ownerPhoto(src: string): AlphaPhoto | undefined {
  return ALPHA_PHOTOS.find(photo => photo.src === src);
}