import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export type Crumb = { label: string; to?: string };

/** Breadcrumb trail + BreadcrumbList schema. `photo` renders inside a HeroScene over the image. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "navy" | "photo" }) {
  const full: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: full.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: crumb.to ? `${SITE_URL}${crumb.to === "/" ? "" : crumb.to}` : undefined,
    })),
  };

  const list = <ol className="breadcrumbs-list">
    {full.map((crumb, i) => (
      <li key={crumb.label}>
        {i > 0 && <ChevronRight aria-hidden="true" />}
        {crumb.to && i < full.length - 1 ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
      </li>
    ))}
  </ol>;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs breadcrumbs--${tone}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {tone === "photo" ? list : <div className="container-page">{list}</div>}
    </nav>
  );
}
