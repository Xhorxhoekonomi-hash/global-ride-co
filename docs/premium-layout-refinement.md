# Focused premium layout refinement

## Changed presentation
- `src/components/site/HomeExperience.tsx`: bounded 16:9 Urus hero without a caption; four equal 3:2 media-first origin cards; original Porsche/blue Ferrari contextual photos and designed KR/EU route graphics; wide service/guide photos; six curated album covers (Urus, Porsche, blue/silver/green Ferrari, Cybertruck).
- `src/components/site/InnerPageHero.tsx`: retained split text/media structure and all text/CTA props, replacing portrait boxes and captions with bounded 16:9 landscape media.
- `src/styles.css`: semantic-token framing, subtle shadow, individual photo positions and homepage-only 4:3 album covers. Full gallery and lightbox presentation/logic remain unchanged.
- `AGENTS.md` and `roadmap.md`: shared framing convention and verification tracking.

This is a focused new code edit, not a historical rollback. Existing copy, homepage section order, typography, header, quick actions, calculator promotion, forms and FAQ are retained. No photo pixels, assets, logo, operational logic, database, routes or SEO were changed.

## Verification
- Before/after screenshots reviewed on desktop 1280 and mobile 390; additional layout checks at 360.
- EN `/` and SQ `/al/`: four market cards, six covers, loaded images, no horizontal overflow, route-specific metadata.
- `/services`, `/import-usa`, `/inspection-service`: loaded images, headings, metadata and no overflow at all three widths.
- Homepage calculator CTA reaches `/calculator`.
- English/Albanian photo arrows and Escape checked; all 30 distinct originals navigable through `/delivered-vehicles`.
- No browser page errors; automatic preview build reports build OK.

## Limits
- Shared interior framing changes only existing media slots; pages without images remain without images.
- Landscape cover crops intentionally show less background; full originals remain available in the lightbox.
- KR/EU illustrations depict routes, not photographic provenance; contextual car images make no origin or delivery claim.
- No backend/lead persistence or external WhatsApp handoff testing was needed for this presentation-only change. Nothing published.