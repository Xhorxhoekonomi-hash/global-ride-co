// Ocean freight per car (shared 40'HC container, 4 cars)
// All prices in USD, already include Alpha Worldwide margin

export type Destination = 'Albania' | 'Germany' | 'Netherlands';

// Sedan/Standard and Large SUV use these rates
// Oversized uses the oversized rates below
export const OCEAN_FREIGHT: Record<string, Record<Destination, { sedan: number; oversized: number }>> = {
  savannah: {
    Albania:     { sedan: 950,  oversized: 1100 },
    Germany:     { sedan: 825,  oversized: 975  },
    Netherlands: { sedan: 825,  oversized: 975  },
  },
  elizabeth: {
    Albania:     { sedan: 950,  oversized: 1100 },
    Germany:     { sedan: 825,  oversized: 975  },
    Netherlands: { sedan: 825,  oversized: 975  },
  },
  houston: {
    Albania:     { sedan: 1100, oversized: 1400 },
    Germany:     { sedan: 925,  oversized: 1225 },
    Netherlands: { sedan: 925,  oversized: 1225 },
  },
  la: {
    Albania:     { sedan: 1600, oversized: 1900 },
    Germany:     { sedan: 1425, oversized: 1725 },
    Netherlands: { sedan: 1425, oversized: 1725 },
  },
  indianapolis: {
    Albania:     { sedan: 950,  oversized: 1100 },
    Germany:     { sedan: 925,  oversized: 1075 },
    Netherlands: { sedan: 925,  oversized: 1075 },
  },
};

// Unloading fees at destination port
export const UNLOADING_FEES: Record<Destination, { amount: number; isEstimate: boolean; note: string }> = {
  Albania:     { amount: 240,  isEstimate: false, note: 'Port of Durrës unloading fee' },
  Germany:     { amount: 400,  isEstimate: true,  note: 'Approx. — client verifies at Bremerhaven' },
  Netherlands: { amount: 400,  isEstimate: true,  note: 'Approx. — client verifies at Rotterdam' },
};

export function getOceanFreight(terminal: string, destination: Destination, vehicleSize: string): number {
  const rates = OCEAN_FREIGHT[terminal as keyof typeof OCEAN_FREIGHT]?.[destination];
  if (!rates) return 0;
  return vehicleSize === 'Oversized' ? rates.oversized : rates.sedan;
}
