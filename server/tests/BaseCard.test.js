const BaseCard = require('../models/BaseCard');

let card;

beforeEach(() => {
  card = new BaseCard();
});

test('BaseCard create card', () => {
  expect(card).toBeInstanceOf(BaseCard);
  expect(card.getType()).toBe('base');
  expect(card.getNumberOfMedals()).toBe(3);
});

test('BaseCard one damage', () => {
  expect(card.getHP()).toBe(2);
  expect(card.makeDamage('пт')).toBe(1);
});

test('BaseCard two damage', () => {
  expect(card.getHP()).toBe(2);
  expect(card.makeDamage('тт')).toBe(0);
});

test('BaseCard reestablish', () => {
  expect(card.makeDamage('cт')).toBe(1);
  expect(card.reestablish()).toBe(2);
});
