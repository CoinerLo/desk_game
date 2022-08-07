const DeckOfMedalCards = require('../models/DeckOfMedalCards');
const MedalCard = require('../models/MedalCard');

let deck;

beforeEach(() => {
  deck = new DeckOfMedalCards();
});

test('DeckOfMedalCards one medal', () => {
  const card = new MedalCard('USA', 1);
  expect(deck.getOneMedal('USA')).toEqual(card);
});

test('DeckOfMedalCards two medal', () => {
  const card = new MedalCard('USA', 2);
  expect(deck.getTwoMedal('USA')[0]).toEqual(card);
});

test('DeckOfMedalCards end two medals', () => {
  const card = [deck.getOneMedal('USA'), deck.getOneMedal('USA')];
  deck.getTwoMedal('USA');
  deck.getTwoMedal('USA');
  deck.getTwoMedal('USA');
  expect(deck.howManyCardsInDeckTwoMedal('USA')).toBe(0);
  expect(deck.getTwoMedal('USA')).toEqual(card);
});

test('DeckOfMedalCards getFullCountMedals', () => {
  const fullMedals = deck.getFullCountMedals();
  expect(fullMedals.oneMedal.USA).toBe(9);
  expect(fullMedals.twoMedals.German).toBe(3);
});