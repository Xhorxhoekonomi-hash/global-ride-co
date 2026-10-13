export type HeroVariant = "market" | "logistics" | "service" | "editorial" | "gallery" | "contact";

/** Route purpose, not photo shape, determines the presentation archetype. */
export function mediaLayout(pathname: string): HeroVariant {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/guides")) return "editorial";
  if (path === "/delivered-vehicles" || path === "/reviews") return "gallery";
  if (/contact|kontakt|calculator|kalkulator/.test(path)) return "contact";
  if (/container|kontenier|roro|airfreight|ajror|how-it-works|\/en\/shipping\//.test(path)) return "logistics";
  if (/import-|makina-nga|auction|ankande|copart|iaai|encar|\/en\/(albania|netherlands)/.test(path)) return "market";
  if (/services|inspection|inspektim|vehicle-history|^\/about$|why-alpha-worldwide/.test(path)) return "service";
  return "editorial";
}