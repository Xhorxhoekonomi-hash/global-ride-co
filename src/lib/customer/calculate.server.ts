import {getLandTransport} from '@/data/landTransport';
import {getOceanFreight,UNLOADING_FEES} from '@/data/oceanFreight';
import {calculateAllAuctionFees} from '@/data/auctionFees';
import {getKoreaShipping,KRW_TO_EUR_RATE} from '@/data/koreaShipping';
import {USD_TO_EUR} from '@/components/calculator/format';
import {usaSchema,koreaSchema} from './validation';
export function calculateUsa(input:unknown) {
 const v=usaSchema.parse(input); const land=getLandTransport(v.location,v.size); if(!land) throw new Error('Unknown location');
 const fees=calculateAllAuctionFees(v.bid,v.isEV); const ocean=getOceanFreight(land.terminal,v.destination,v.size);const unloading=UNLOADING_FEES[v.destination];
 const totalUsd=v.bid+fees.total+land.finalCost+ocean+unloading.amount;
 return {land,fees,ocean,unloading,totalUsd,totalEur:totalUsd*USD_TO_EUR};
}
export function calculateKorea(input:unknown) {
 const v=koreaSchema.parse(input);const priceEur=v.currency==='KRW'?v.price*KRW_TO_EUR_RATE:v.price; const priceKrw=v.currency==='EUR'?v.price/KRW_TO_EUR_RATE:v.price;
 const shippingEur=getKoreaShipping(v.destination,v.type,v.method);
 return {priceEur,priceKrw,shippingEur,totalEur:priceEur+shippingEur};
}
