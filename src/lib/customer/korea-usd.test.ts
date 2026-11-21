import {test} from 'node:test';
import assert from 'node:assert/strict';
function expect(v:unknown){return {toBe:(x:unknown)=>assert.equal(v,x),toBeCloseTo:(x:number,d=2)=>assert.ok(Math.abs(Number(v)-x)<10**-d,`${v} != ${x}`)};}
import {calculateKorea} from './calculate.server';
import {koreaSchema} from './validation';
import {convertKoreaPrice,KRW_TO_EUR_RATE as clientKrw} from '@/components/calculator/korea-public';
import {KRW_TO_EUR_RATE as serverKrw} from '@/data/koreaShipping';
import {USD_TO_EUR,RATES_UPDATED} from '@/components/calculator/format';
const base={type:'Sedan/Coupe',price:10000,currency:'USD'} as const;
test('USD 10,000 converts to EUR 9,117 with the approved shared constant',()=>{expect(USD_TO_EUR).toBe(0.9117);expect(RATES_UPDATED).toBe('2026-11-21');expect(convertKoreaPrice('USD',10000).priceEur).toBeCloseTo(9117,6);expect(convertKoreaPrice('USD',10000).priceKrw).toBeCloseTo(9117*1474,4);});
test('USD Albania RoRo Sedan total 10,867',()=>{expect(calculateKorea({...base,destination:'Albania',method:'roro'}).totalEur).toBeCloseTo(10867,6);});
test('USD Albania container total 10,207',()=>{expect(calculateKorea({...base,destination:'Albania',method:'container'}).totalEur).toBeCloseTo(10207,6);});
test('USD Germany total 10,117',()=>{expect(calculateKorea({...base,destination:'Germany',method:'roro'}).totalEur).toBeCloseTo(10117,6);});
test('KRW 14,740,000 converts exactly to EUR 10,000; EUR unchanged',()=>{expect(clientKrw).toBe(1/1474);expect(convertKoreaPrice('KRW',14740000).priceEur).toBe(10000);expect(calculateKorea({type:'Sedan/Coupe',price:14740000,currency:'KRW',destination:'Germany',method:'roro'}).totalEur).toBeCloseTo(11000,6);expect(calculateKorea({type:'Sedan/Coupe',price:10000,currency:'EUR',destination:'Germany',method:'roro'}).totalEur).toBe(11000);});
test('schema accepts KRW/USD/EUR and rejects others',()=>{for(const c of ['KRW','USD','EUR'])expect(koreaSchema.safeParse({...base,currency:c,destination:'Germany',method:'roro'}).success).toBe(true);for(const c of ['GBP','usd',''])expect(koreaSchema.safeParse({...base,currency:c,destination:'Germany',method:'roro'}).success).toBe(false);});
test('server result matches client conversion and records entered amount',()=>{for(const c of ['KRW','USD','EUR'] as const){const r=calculateKorea({...base,currency:c,destination:'Albania',method:'roro'});const cl=convertKoreaPrice(c,10000);expect(r.priceEur).toBe(cl.priceEur);expect(r.priceKrw).toBe(cl.priceKrw);expect(r.currency).toBe(c);expect(r.priceEntered).toBe(10000);}expect(clientKrw).toBe(serverKrw);});
