export function getBuyerFee(winningBid: number): number {
  const base = winningBid + 100; // Copart rule: always calculate on bid + $100
  if (base < 50) return 27.5;
  if (base < 100) return 50.0;
  if (base < 200) return 90.0;
  if (base < 300) return 145.0;
  if (base < 350) return 155.0;
  if (base < 400) return 167.5;
  if (base < 450) return 200.0;
  if (base < 500) return 210.0;
  if (base < 550) return 235.0;
  if (base < 600) return 240.0;
  if (base < 700) return 275.0;
  if (base < 800) return 312.5;
  if (base < 900) return 342.5;
  if (base < 1000) return 370.0;
  if (base < 1200) return 440.0;
  if (base < 1300) return 460.0;
  if (base < 1400) return 482.5;
  if (base < 1500) return 510.0;
  if (base < 1600) return 530.0;
  if (base < 1700) return 555.0;
  if (base < 1800) return 582.5;
  if (base < 2000) return 620.0;
  if (base < 2400) return 662.5;
  if (base < 2500) return 705.0;
  if (base < 3000) return 775.0;
  if (base < 3500) return 830.0;
  if (base < 4000) return 927.5;
  if (base < 4500) return 935.0;
  if (base < 5000) return 1000.0;
  if (base < 5500) return 1025.0;
  if (base < 6000) return 1055.0;
  if (base < 6500) return 1085.0;
  if (base < 7000) return 1110.0;
  if (base < 7500) return 1145.0;
  if (base < 8000) return 1175.0;
  if (base < 8500) return 1200.0;
  if (base < 10000) return 1225.0;
  if (base < 11500) return 1390.0;
  if (base < 15000) return 1400.0;
  return base * 0.125; // 12.5% for $15,000+
}

export function getVirtualBidFee(winningBid: number): number {
  if (winningBid < 100) return 0;
  if (winningBid < 500) return 50;
  if (winningBid < 1000) return 65;
  if (winningBid < 1500) return 85;
  if (winningBid < 2000) return 95;
  if (winningBid < 4000) return 110;
  if (winningBid < 6000) return 125;
  if (winningBid < 8000) return 145;
  return 160;
}

export const FLAT_FEES = {
  gate: 95,
  title: 15,
  environmental: 15,
  broker: 300,
  evSurcharge: 300,
};

export function calculateAllAuctionFees(winningBid: number, isEV: boolean) {
  const buyerFee = getBuyerFee(winningBid);
  const virtualBidFee = getVirtualBidFee(winningBid);
  const evFee = isEV ? FLAT_FEES.evSurcharge : 0;
  const total =
    buyerFee + virtualBidFee + FLAT_FEES.gate + FLAT_FEES.title + FLAT_FEES.environmental + FLAT_FEES.broker + evFee;
  return {
    buyerFee,
    virtualBidFee,
    gateFee: FLAT_FEES.gate,
    titleFee: FLAT_FEES.title,
    environmentalFee: FLAT_FEES.environmental,
    brokerFee: FLAT_FEES.broker,
    evFee,
    total,
  };
}
