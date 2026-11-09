import { Search, Gavel, Handshake, ScanLine, Truck, Container, Ship, Plane, PlaneLanding, FileCheck2, Route, BookCheck, Anchor, MapPin, Flag, type LucideIcon } from "lucide-react";

/** Presentation-only icon per service slug (cards on the services pages). */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  sourcing: Search,
  "auction-access": Gavel,
  "dealer-purchasing": Handshake,
  inspection: ScanLine,
  "inland-transport": Truck,
  "container-shipping": Container,
  "roro-shipping": Ship,
  airfreight: Plane,
  "airport-handling": PlaneLanding,
  customs: FileCheck2,
  transit: Route,
  carnet: BookCheck,
  "port-handling": Anchor,
  "final-mile": MapPin,
};

export const ORIGIN_ICON: LucideIcon = Flag;
