import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { albumsForPhotos, type AlphaPhoto } from "@/lib/alpha-photos";

/** Album cards with all original angles accessible in a continuous viewer. */
export function PhotoGallery({ photos, locale = "en", limit, variant = "grid", coverAlbumIds }: { photos: AlphaPhoto[]; locale?: "en" | "sq"; limit?: number; variant?: "grid" | "filmstrip"; coverAlbumIds?: string[] }) {
  const albums = useMemo(() => albumsForPhotos(photos), [photos]);
  const frames = useMemo(() => albums.flatMap((album) => album.photos.map((photo) => ({ album, photo }))), [albums]);
  const [open, setOpen] = useState<number | null>(null);
  const curated = coverAlbumIds ? coverAlbumIds.flatMap(id => albums.filter(album => album.id === id)) : albums;
  const shown = limit ? curated.slice(0, limit) : curated;
  const step = useCallback((direction: number) => setOpen((index) => index === null || frames.length === 0 ? null : (index + direction + frames.length) % frames.length), [frames.length]);
  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);
  const current = open === null ? undefined : frames[open];
  return <>
    <ul className={variant === "filmstrip" ? "alpha-filmstrip" : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
      {shown.map((album) => {
        const cover = album.photos[0];
        if (!cover) return null;
        return <li key={album.id} className="min-w-0">
          <Button variant="ghost" onClick={() => setOpen(frames.findIndex((frame) => frame.album.id === album.id))} className={variant === "filmstrip" ? `alpha-film-frame alpha-film-${album.id} group` : "group block h-auto w-full overflow-hidden rounded-lg border border-border bg-card p-0 text-left whitespace-normal"} aria-label={`${album[locale]} — ${locale === "sq" ? "hap albumin" : "open album"}`}>
            <img src={cover.src} alt={cover[locale]} loading="lazy" decoding="async" width={600} height={800} className="aspect-[4/5] w-full bg-mist object-contain" />
            <span className="block p-3"><span className="block text-sm font-semibold leading-snug text-secondary">{album[locale]}</span><span className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Images className="h-4 w-4" />{album.photos.length} {locale === "sq" ? "foto" : album.photos.length === 1 ? "photo" : "photos"}</span></span>
          </Button>
        </li>;
      })}
    </ul>
    <Dialog open={open !== null} onOpenChange={(value) => { if (!value) setOpen(null); }}>
      <DialogContent aria-describedby={undefined} className="max-h-[94dvh] max-w-4xl overflow-y-auto border-border bg-background p-3 sm:p-5 [&>button]:hidden">
        {current && <>
          <div className="flex min-w-0 items-center justify-between gap-3"><DialogTitle className="text-sm font-semibold leading-snug text-secondary">{current.album[locale]} <span className="text-muted-foreground">· {(open ?? 0) + 1}/{frames.length}</span></DialogTitle><Button variant="ghost" size="icon" className="h-11 w-11 shrink-0" aria-label={locale === "sq" ? "Mbyll" : "Close"} onClick={() => setOpen(null)}><X /></Button></div>
          <img src={current.photo.src} alt={current.photo[locale]} width={960} height={1280} className="h-[52dvh] w-full bg-mist object-contain sm:h-[62dvh]" />
          <div className="flex items-center justify-between gap-3"><Button variant="outline" size="icon" className="h-11 w-11 shrink-0" aria-label={locale === "sq" ? "Foto e mëparshme" : "Previous photo"} onClick={() => step(-1)}><ChevronLeft /></Button><p className="text-center text-xs text-muted-foreground">{current.photo[locale]}</p><Button variant="outline" size="icon" className="h-11 w-11 shrink-0" aria-label={locale === "sq" ? "Foto tjetër" : "Next photo"} onClick={() => step(1)}><ChevronRight /></Button></div>
          <div className="flex flex-wrap justify-center gap-2" aria-label={locale === "sq" ? "Këndet e automjetit" : "Vehicle angles"}>{current.album.photos.map((photo, index) => <Button key={photo.src} variant="outline" onClick={() => setOpen(frames.findIndex((frame) => frame.photo.src === photo.src))} aria-label={`${locale === "sq" ? "Këndi" : "Angle"} ${index + 1}`} aria-pressed={photo.src === current.photo.src} className="h-16 w-12 overflow-hidden p-0 aria-pressed:ring-2 aria-pressed:ring-primary"><img src={photo.src} alt="" width={60} height={80} className="h-full w-full object-contain" /></Button>)}</div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}
