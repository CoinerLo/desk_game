const VehicleCard = require('../models/VehicleCard');
const VehicleDeck = require('../models/VehicleDeck');

let deck;

beforeEach(() => {
  deck = new VehicleDeck();
});

test('VehicleDeck create deck', () => {
  expect(deck).toBeInstanceOf(VehicleDeck);
  expect(deck.getNumberCardsInDeck()).toBe(0);
});

test('VehicleDeck start pop update reset', () => {
  const deckStart = deck.start();

  expect(deckStart).toHaveLength(101);
  expect(deck.getNumberCardsInDeck()).toBe(101);

  const card = deck.pop();
  const cardState = card.getCardState();
  deck.reset(card);

  expect(card).toBeInstanceOf(VehicleCard);
  expect(typeof cardState.name).toBe('string');
  expect(deck.getNumberCardsInResetDeck()).toBe(1);
  expect(deck.getNumberCardsInDeck()).toBe(100);
  expect(deck.updateDeck()).toBeNull();
});