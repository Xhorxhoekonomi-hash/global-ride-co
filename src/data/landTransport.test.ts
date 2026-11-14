import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LAND_TRANSPORT_TABLE, getLandTransport } from './landTransport';

test('owner-approved USA land table contains exactly 251 locations', () => {
  assert.equal(Object.keys(LAND_TRANSPORT_TABLE).length, 251);
});

test('155 Manheim/Adesa locations follow the original 96 locations', () => {
  const keys = Object.keys(LAND_TRANSPORT_TABLE);
  assert.equal(keys.slice(0, 96).filter(key => /^(MANHEIM|ADESA) /.test(key)).length, 0);
  assert.equal(keys.slice(96).filter(key => /^(MANHEIM|ADESA) /.test(key)).length, 155);
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