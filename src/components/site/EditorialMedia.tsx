import type { CSSProperties } from "react";
import type { AlphaPhoto } from "@/lib/alpha-photos";
import { photoPresentation, type PhotoRole } from "@/lib/photo-presentation";

type PhotoStyle = CSSProperties & { "--photo-desktop": string; "--photo-mobile": string; "--photo-ratio": string; "--feature-ratio": string; "--feature-mobile-ratio": string };

/** One presentation boundary, with image-specific composition and untouched originals. */
export function EditorialMedia({ photo, mobilePhoto, locale = "en", role = "feature", priority = false, eager = false, className = "", alt }: {
  photo: AlphaPhoto;
  mobilePhoto?: AlphaPhoto;
  locale?: "en" | "sq";
  role?: PhotoRole;
  priority?: boolean;
  eager?: boolean;
  className?: string;
  alt?: string;
}) {
  const layout = photoPresentation(photo);
  const mobile = photoPresentation(mobilePhoto ?? photo);
  const style: PhotoStyle = { "--photo-desktop": layout.focalDesktop, "--photo-mobile": mobile.focalMobile, "--photo-ratio": `${layout.width} / ${layout.height}`, "--feature-ratio": layout.featureRatio, "--feature-mobile-ratio": mobile.featureMobileRatio };
  return <picture className={`editorial-media editorial-media--${role} editorial-media--${layout.format} ${className}`} style={style}>
    {mobilePhoto && <source media="(max-width: 767px)" srcSet={mobilePhoto.src} />}
    <img src={photo.src} alt={alt ?? photo[locale]} width={layout.width} height={layout.height} loading={priority || eager ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />
  </picture>;
}