<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared BrandLogo is the single presentation boundary for owner-supplied artwork so header and footer always use the same unchanged original asset.
- The EN and SQ homepages share HomeExperience presentation with localized copy and valid existing links; route-specific SEO remains in each leaf route to preserve indexing.
- Visual redesigns may restyle calculator presentation but must not modify calculation logic/data, lead submission, auth or database schema, keeping operational behavior independent of presentation.
- InnerPageHero and EditorialHero use HeroComposition with typed route-purpose variants from media-layouts; this differentiates market art, logistics stories, editorial headings and gallery introductions without moving SEO or operational content. Import journeys retain JourneySteps.
- Named owner-photo selections and vehicle/session albums in alpha-photos are the single source for documentary/proof imagery; generated editorial brand artwork stays separate and visibly identified, so it cannot imply real deliveries.
- EditorialMedia and photo-presentation are the shared boundary for original-photo dimensions, responsive focal points and role-specific framing; homepage, interior, story, guide and album media use it so layouts cannot drift, while the full-size viewer preserves complete originals.
- Customer entry destinations are resolved in the shared customer-paths module, with explicit localized routes and English fallbacks, so selected tasks and origins cannot drift from tested navigation.
- Homepage entry and journey interactions are presentational tabs independent of operational calculators and forms, so discovery improvements do not affect lead or pricing behavior.
- Prominent brand introductions use a cohesive image-led editorial stage with separate desktop/mobile art direction; documentary media remains purpose-selected and uncropped where practical, without duplicated blur or masks.
