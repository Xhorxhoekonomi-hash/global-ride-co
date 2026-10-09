import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { AlphaPhoto } from "@/lib/alpha-photos";

/** Responsive grid of owner-supplied photos with an accessible lightbox. */
export function PhotoGallery({ photos, locale = "en", limit }: { photos: AlphaPhoto[]; locale?: "en" | "sq"; limit?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const shown = limit ? photos.slice(0, limit) : photos;
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);
  const label = (p: AlphaPhoto) => (locale === "sq" ? p.sq : p.en);
  const current = open === null ? null : photos[open];
  return <>
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((p, i) => <li key={p.src}>
        <button type="button" onClick={() => setOpen(i)} className="group block w-full overflow-hidden rounded-lg bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={`${label(p)} — ${locale === "sq" ? "hap foton" : "open photo"}`}>
          <img src={p.src} alt={label(p)} loading="lazy" decoding="async" width={600} height={800} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
        </button>
      </li>)}
    </ul>
    <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
      <DialogContent className="max-w-4xl border-none bg-background p-2 sm:p-4 [&>button]:hidden">
        {current && <>
          <DialogTitle className="px-1 pr-12 text-sm font-medium text-secondary">{label(current)} <span className="text-muted-foreground">· {open! + 1}/{photos.length}</span></DialogTitle>
          <img src={current.src} alt={label(current)} className="max-h-[78vh] w-full rounded-md object-contain" />
          <div className="flex justify-between gap-2">
            <button type="button" onClick={() => step(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border hover:bg-mist" aria-label={locale === "sq" ? "Foto e mëparshme" : "Previous photo"}><ChevronLeft /></button>
            <button type="button" onClick={() => setOpen(null)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border hover:bg-mist" aria-label={locale === "sq" ? "Mbyll" : "Close"}><X /></button>
            <button type="button" onClick={() => step(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border hover:bg-mist" aria-label={locale === "sq" ? "Foto tjetër" : "Next photo"}><ChevronRight /></button>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}
