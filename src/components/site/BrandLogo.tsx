import originalLogo from "@/assets/TD_LOGO_2023.png.asset.json";
import whiteLogo from "@/assets/logo-footer.png.asset.json";
import { cn } from "@/lib/utils";

/** tone="light" shows the supplied white transparent version of the same artwork for dark backgrounds. */
export function BrandLogo({ className, tone = "default" }: { className?: string; tone?: "default" | "light" }) {
  const src = tone === "light" ? whiteLogo.url : originalLogo.url;
  return <img src={src} alt="Alpha Worldwide" width={2910} height={1157} className={cn("h-auto w-44 shrink-0 object-contain", className)} />;
}
