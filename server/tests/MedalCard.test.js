const MedalCard = require('../models/MedalCard');

let card;

beforeEach(() => {
  card = new MedalCard('USSR', 1);
});

test('MedalCard create card', () => {
  const result = {
    type: 'medal'
  }
  expect(card).toBeInstanceOf(MedalCard);
  expect(card).toEqual(result);
});

test('MedalCard get nation', () => {
  expect(card.getNation()).toBe('USSR');
});

test('MedalCard get card resurs', () => {
  expect(card.getCardResurs()).toBe(1);
});

test('MedalCard get number of medals', () => {
  expect(card.getNumberOfMedals()).toBe(1);
});

test('MedalCard getState', () => {
  const result = {
    type: 'medal',
    resurs: 1,
    nation: 'USSR',
    medals: 1,
  }
  expect(card.getState()).toEqual(result);
});