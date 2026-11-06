import { AIRFREIGHT_GALLERY } from "@/lib/airfreight-photos";

/** Five portrait owner photos from airfreight operations; no location captions. */
export function AirfreightGallery({ sq = false }: { sq?: boolean }) {
  return (
    <section className="section-pad">
      <div className="container-x">
        <h2 className="text-2xl md:text-3xl font-semibold text-navy mb-6">{sq ? "Nga operacionet tona të transportit ajror" : "From our airfreight operations"}</h2>
        <ul className="af-gallery">
          {AIRFREIGHT_GALLERY.map((p) => (
            <li key={p.src}>
              <img src={p.srcSmall} srcSet={`${p.srcSmall} 720w, ${p.src} 1080w`} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 75vw" width={p.width} height={p.height} alt={sq ? p.alt.sq : p.alt.en} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
