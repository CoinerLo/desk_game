const VehicleCard = require('../models/VehicleCard');
const VehicleDeck = require('../models/VehicleDeck');

let deck;

beforeEach(() => {
  deck = new VehicleDeck();
});

test('VehicleDeck create deck', () => {
  expect(deck).toBeInstanceOf(VehicleDeck);
  expect(deck.getNumberCardsInDeck()).toBe(101);
});

test('VehicleDeck start getCard update reset', () => {
  const card = deck.getCard();
  const cardState = card.getCardState();
  deck.reset(card);

  expect(card).toBeInstanceOf(VehicleCard);
  expect(typeof cardState.name).toBe('string');
  expect(deck.getNumberCardsInResetDeck()).toBe(1);
  expect(deck.getNumberCardsInDeck()).toBe(100);
  expect(deck.updateDeck()).toBeNull();
});

test('VehicleDeck get four cards', () => {

  const fourCards = deck.getFourCards();
  expect(fourCards).toHaveLength(4);
});