import originalLogo from "@/assets/TD_LOGO_2023.png.asset.json";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return <img src={originalLogo.url} alt="Alpha Worldwide" width={2910} height={1157} className={cn("h-auto w-44 shrink-0 object-contain", className)} />;
}