// Moved verbatim from src/routes/calculator.tsx — do not alter numbers.
export const USD_TO_EUR = 0.92;

export const fmt = (n: number, currency: "$" | "€" = "$") =>
  `${currency}${Math.round(n).toLocaleString("en-US")}`;

export const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

export function toTitle(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
