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
- Visual redesigns must not modify calculator modules/data, lead submission, auth or database schema, keeping operational behavior independent of presentation.
