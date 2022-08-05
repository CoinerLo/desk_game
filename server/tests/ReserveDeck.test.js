const ReserveDeck = require('../models/ReserveDeck');
const VehicleCard = require('../models/VehicleCard');

let deck;

beforeEach(() => {
  deck = new ReserveDeck();
});

test('ReserveDeck create deck', () => {
  expect(deck).toBeInstanceOf(ReserveDeck);
  expect(deck.getNumberCardsInDeck()).toBe(97);
});

test('ReserveDeck get deck', () => {
  const reserveDeck = deck.getReserveDeck();
  expect(reserveDeck).toHaveLength(4);
});

test('ReserveDeck get card by number', () => {
  const card = deck.getCardByNum(0);
  const reserveDeck = deck.getReserveDeck();
  const cardState = card.getCardState();

  expect(card).toBeInstanceOf(VehicleCard);
  expect(reserveDeck).toHaveLength(4);
  expect(typeof cardState.name).toBe('string');
});

test('ReserveDeck discard card', () => {
  const newDeck = deck.discardCard();
  expect(newDeck).toHaveLength(4);
  expect(deck.getNumberCardsInDeck()).toBe(96);
  expect(deck.getNumberCardsInResetDeck()).toBe(1);
});

test('ReserveDeck discard four cards', () => {
  const newDeck = deck.discardFourCards();
  expect(newDeck).toHaveLength(4);
  expect(deck.getNumberCardsInDeck()).toBe(93);
  expect(deck.getNumberCardsInResetDeck()).toBe(4);
});
