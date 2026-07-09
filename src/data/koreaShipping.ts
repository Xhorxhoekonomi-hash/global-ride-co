// South Korea fixed all-in prices (pickup + RoRo + export docs)
// Price includes everything — no additional fees

export const KOREA_SHIPPING: Record<string, Record<string, number>> = {
  Albania: {
    "Sedan/Coupe": 1300, // EUR
    "SUV/Minivan": 1400,
    Oversized: 1500,
  },
  Germany: {
    "Sedan/Coupe": 1000,
    "SUV/Minivan": 1000,
    Oversized: 1000,
  },
  Netherlands: {
    "Sedan/Coupe": 1000,
    "SUV/Minivan": 1000,
    Oversized: 1000,
  },
};

export const KOREA_INCLUDES = [
  "Local pickup in South Korea",
  "Export documentation",
  "RoRo ocean freight",
  "Alpha Worldwide service fee",
];

export const KRW_TO_EUR_RATE = 1 / 1450;
