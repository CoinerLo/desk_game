const Ability = require('../models/Ability');
const VehicleCard = require('../models/VehicleCard');

let card;

const cardStat = {
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
  const cardState = card.getCardState();
  const abil = cardState.abilities[0];
  const desc = abil.getDescription();
  expect(typeof cardState.name).toBe('string');
  expect(cardState.class).toBe('тт');
  expect(cardState.abilities).toHaveLength(2);
  expect(abil).toBeInstanceOf(Ability);
  expect(desc.name).toBe('Подкрепление');
  expect(desc.countAbil).toBe(2);
});