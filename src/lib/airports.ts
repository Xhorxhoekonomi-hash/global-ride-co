export const AIRPORTS = [
  { slug: "amsterdam-schiphol", name: "Amsterdam Schiphol", verified: true, country: "Netherlands" },
  { slug: "milan-malpensa", name: "Milan Malpensa", nameSq: "Milano Malpensa", verified: true, country: "Italy" },
  { slug: "leipzig-halle", name: "Leipzig/Halle", verified: true, country: "Germany" },
  { slug: "frankfurt", name: "Frankfurt", verified: false, country: "Germany" },
] as const;

export type Airport = (typeof AIRPORTS)[number];
export function airportName(airport: Airport, sq: boolean) {
  return sq && "nameSq" in airport ? airport.nameSq : airport.name;
}
export function airportPath(airport: Airport, sq: boolean) {
  return `${sq ? "/al/transport-ajror-makinash" : "/airfreight"}/${airport.slug}`;
}
export function airportStatus(airport: Airport, sq: boolean) {
  return airport.verified ? (sq ? "Trajtim i verifikuar" : "Verified handling") : (sq ? "Në dispozicion me kërkesë" : "Available on request");
}