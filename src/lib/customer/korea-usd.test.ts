import {test} from 'node:test';
import assert from 'node:assert/strict';
function expect(v:unknown){return {toBe:(x:unknown)=>assert.equal(v,x),toBeCloseTo:(x:number,d=2)=>assert.ok(Math.abs(Number(v)-x)<10**-d,`${v} != ${x}`)};}
import {calculateKorea} from './calculate.server';
import {koreaSchema} from './validation';
import {convertKoreaPrice,KRW_TO_EUR_RATE as clientKrw} from '@/components/calculator/korea-public';
import {KRW_TO_EUR_RATE as serverKrw} from '@/data/koreaShipping';
import {USD_TO_EUR} from '@/components/calculator/format';
const base={type:'Sedan/Coupe',price:10000,currency:'USD'} as const;
test('USD 10,000 converts to EUR 9,200 with the shared 0.92 constant',()=>{expect(USD_TO_EUR).toBe(0.92);expect(convertKoreaPrice('USD',10000).priceEur).toBeCloseTo(9200,6);expect(convertKoreaPrice('USD',10000).priceKrw).toBeCloseTo(9200*1450,4);});
test('USD Albania RoRo Sedan total 10,950',()=>{expect(calculateKorea({...base,destination:'Albania',method:'roro'}).totalEur).toBeCloseTo(10950,6);});
test('USD Albania container total 10,290',()=>{expect(calculateKorea({...base,destination:'Albania',method:'container'}).totalEur).toBeCloseTo(10290,6);});
test('USD Germany total 10,200',()=>{expect(calculateKorea({...base,destination:'Germany',method:'roro'}).totalEur).toBeCloseTo(10200,6);});
test('KRW and EUR unchanged',()=>{expect(calculateKorea({type:'Sedan/Coupe',price:14500000,currency:'KRW',destination:'Germany',method:'roro'}).totalEur).toBeCloseTo(11000,6);expect(calculateKorea({type:'Sedan/Coupe',price:10000,currency:'EUR',destination:'Germany',method:'roro'}).totalEur).toBe(11000);});
test('schema accepts KRW/USD/EUR and rejects others',()=>{for(const c of ['KRW','USD','EUR'])expect(koreaSchema.safeParse({...base,currency:c,destination:'Germany',method:'roro'}).success).toBe(true);for(const c of ['GBP','usd',''])expect(koreaSchema.safeParse({...base,currency:c,destination:'Germany',method:'roro'}).success).toBe(false);});
test('server result matches client conversion and records entered amount',()=>{for(const c of ['KRW','USD','EUR'] as const){const r=calculateKorea({...base,currency:c,destination:'Albania',method:'roro'});const cl=convertKoreaPrice(c,10000);expect(r.priceEur).toBe(cl.priceEur);expect(r.priceKrw).toBe(cl.priceKrw);expect(r.currency).toBe(c);expect(r.priceEntered).toBe(10000);}expect(clientKrw).toBe(serverKrw);});
