import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
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

  return (
    <nav aria-label="Breadcrumb" className="mt-18 border-b border-border bg-mist">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3 text-xs text-slate-body">
        {full.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 text-slate-body/50" />}
            {crumb.to && i < full.length - 1 ? (
              <Link to={crumb.to} className="hover:text-teal">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-navy">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
