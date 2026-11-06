import { AIRFREIGHT_GALLERY } from "@/lib/airfreight-photos";

/** Five portrait owner photos from airfreight operations; no location captions. */
export function AirfreightGallery({ sq = false }: { sq?: boolean }) {
  return (
    <section className="bg-background">
      <div className="container-page py-12 md:py-20">
        <h2 className="text-secondary">{sq ? "Nga operacionet tona të transportit ajror" : "From our airfreight operations"}</h2>
        <ul className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0">
          {AIRFREIGHT_GALLERY.map((p) => (
            <li key={p.src} className="w-[72%] shrink-0 snap-start sm:w-[40%] md:w-auto">
              <img src={p.srcSmall} srcSet={`${p.srcSmall} 720w, ${p.src} 1080w`} sizes="(min-width: 768px) 20vw, 72vw" width={p.width} height={p.height} alt={sq ? p.alt.sq : p.alt.en} loading="lazy" decoding="async" className="aspect-[4/5] h-auto w-full rounded-xl object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
