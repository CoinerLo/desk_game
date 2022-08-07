const BarracksCards = require('../models/BarracksCards');
const VehicleCard = require('../models/VehicleCard');

let deck;

beforeEach(() => {
  deck = new BarracksCards();
});

test('BarracksCards create deck', () => {
  const cards = deck.getBarracksCards();
  expect(deck).toBeInstanceOf(BarracksCards);
  expect(cards).toHaveLength(6);
  expect(cards[5]).toBeInstanceOf(VehicleCard);
});