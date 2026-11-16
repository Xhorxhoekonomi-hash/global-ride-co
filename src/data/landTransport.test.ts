import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAND_TRANSPORT_TABLE, getLandTransport } from './landTransport';
import { AUCTION_LOCATIONS } from '../components/calculator/locations';

test('owner-approved USA land table contains exactly 580 locations', () => {
  assert.equal(Object.keys(LAND_TRANSPORT_TABLE).length, 580);
});

test('155 Manheim/Adesa locations follow the original 96 locations', () => {
  const keys = Object.keys(LAND_TRANSPORT_TABLE);
  assert.equal(keys.slice(0, 96).filter(key => /^(MANHEIM|ADESA) /.test(key)).length, 0);
  assert.equal(keys.slice(96, 251).filter(key => /^(MANHEIM|ADESA) /.test(key)).length, 155);
});

test('329 Copart/IAAI locations follow the first 251, with unique keys', () => {
  const keys = Object.keys(LAND_TRANSPORT_TABLE);
  assert.equal(keys.slice(251).length, 329);
  assert.equal(keys.slice(251).filter(key => /^IAAI /.test(key)).length, 200);
  assert.equal(new Set(keys).size, 580);
});

test('public location list mirrors the table keys and carries no prices', () => {
  assert.deepEqual(Object.keys(AUCTION_LOCATIONS).sort(), Object.keys(LAND_TRANSPORT_TABLE).sort());
  for (const [key, entry] of Object.entries(AUCTION_LOCATIONS)) {
    assert.deepEqual(Object.keys(entry).sort(), ['city', 'state'], key);
  }
});

test('no location routes through Indianapolis', () => {
  for (const [key, entry] of Object.entries(LAND_TRANSPORT_TABLE)) {
    assert.notEqual(entry.preferredTerminal, 'indianapolis', key);
  }
});

test('every base price matches the preferred terminal column', () => {
  for (const [key, entry] of Object.entries(LAND_TRANSPORT_TABLE)) {
    assert.equal(entry.basePrice, entry[entry.preferredTerminal], key);
  }
});

for (const [key, price, terminal] of [
  ['INDIANAPOLIS', 700, 'elizabeth'],
  ['CHICAGO NORTH', 725, 'elizabeth'],
  ['HOUSTON', 345, 'houston'],
  ['LONG BEACH CA', 290, 'la'],
  ['ABILENE, TX', 575, 'houston'],
  ['SAVANNAH GA', 300, 'savannah'],
  ['MANHEIM HOUSTON', 345, 'houston'],
  ['ADESA INDIANAPOLIS', 700, 'elizabeth'],
  ['MANHEIM NEW JERSEY', 400, 'elizabeth'],
  ['ADESA LOS ANGELES', 380, 'la'],
  ['LAS VEGAS WEST (NV)', 485, 'la'],
  ['VALLEJO (CA)', 550, 'la'],
  ['IAAI HOUSTON SOUTH', 345, 'houston'],
  ['IAAI ACE - CARSON (CA)', 325, 'la'],
  ['CICERO, IN', 700, 'elizabeth'],
  ['IAAI SAVANNAH', 300, 'savannah'],
] as const) {
  test(`${key} uses approved USD ${price} via ${terminal}`, () => {
    assert.equal(LAND_TRANSPORT_TABLE[key]?.basePrice, price);
    assert.equal(LAND_TRANSPORT_TABLE[key]?.preferredTerminal, terminal);
  });
}

for (const [size, amount] of [
  ['Sedan/Standard', 700],
  ['Large SUV/Truck', 1050],
  ['Oversized', 1400],
] as const) {
  test(`Indianapolis ${size} costs USD ${amount} via Elizabeth`, () => {
    const result = getLandTransport('INDIANAPOLIS', size);
    assert.equal(result?.finalCost, amount);
    assert.equal(result?.terminalName, 'Elizabeth, NJ');
  });
}