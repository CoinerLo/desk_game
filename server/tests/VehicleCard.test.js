const Ability = require('../models/Ability');
const VehicleCard = require('../models/VehicleCard');

let card;

const cardStat = {
  type: 'vehicle',
  nameCard: 'T30',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 6,
  cardResurs: 5,
  cardNationResurs: null,
  cardAttack: 2,
  cardDefense: 2,
  cardAbilities: ['rei', 'rep'],
  countAbilRei: 2,
}

beforeEach(() => {
  card = new VehicleCard(cardStat);
});

test('VehicleCard create card', () => {
  expect(card).toBeInstanceOf(VehicleCard);
  expect(card.getType()).toBe('vehicle');
});

test('VehicleCard get card', () => {
  const cardState = card.getState();
  const abil = cardState.abilities[0];
  const desc = abil.getDescription();
  expect(typeof cardState.name).toBe('string');
  expect(cardState.class).toBe('тт');
  expect(cardState.abilities).toHaveLength(2);
  expect(abil).toBeInstanceOf(Ability);
  expect(desc.name).toBe('Подкрепление');
  expect(desc.countAbil).toBe(2);
});

test('VehicleCard make two damage', () => {
  expect(card.makeDamage(2)).toBeTruthy();
});

test('VehicleCard make one damage', () => {
  expect(card.makeDamage(1)).toBeFalsy();
  expect(card.makeDamage(1)).toBeTruthy();

  card.reestablish();
  const { defense } = card.getState();

  expect(defense).toBe(2);
});