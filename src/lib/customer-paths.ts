export const CUSTOMER_ORIGINS = ["usa", "korea", "uae", "europe"] as const;
export type CustomerOrigin = typeof CUSTOMER_ORIGINS[number];
export type CustomerTask = "buy" | "ship" | "estimate" | "inspect";

const IMPORT_PATHS = {
  en: { usa: "/import-usa", korea: "/import-korea", uae: "/import-uae", europe: "/import-europe" },
  sq: { usa: "/al/makina-nga-amerika", korea: "/al/makina-nga-korea", uae: "/al/makina-nga-dubai", europe: "/import-europe" },
} as const;
const SERVICE_PATHS = {
  en: { ship: "/container-shipping", estimate: "/calculator", inspect: "/inspection-service" },
  sq: { ship: "/al/transport-me-kontenier", estimate: "/al/kalkulator-transporti", inspect: "/al/inspektim-makinash" },
} as const;

export function customerPath(locale: "en" | "sq", task: CustomerTask, origin: CustomerOrigin = "usa") {
  return task === "buy" ? IMPORT_PATHS[locale][origin] : SERVICE_PATHS[locale][task];
}