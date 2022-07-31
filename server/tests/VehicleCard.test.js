const VehicleCard = require('../models/VehicleCard');

let card;

const cardStat = {
  nameCard: 'T30',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 6,
  cardResurs: 5,
  cardAttack: 2,
  cardDefense: 2,
  cardAbilities: null
}

beforeEach(() => {
  card = new VehicleCard(cardStat);
});

test('VehicleCard create card', () => {
  expect(card).toBeInstanceOf(VehicleCard);
});