const BaseCard = require('../models/BaseCard');
const VehicleCard = require('../models/VehicleCard');

let cardDef;
let cardNotDef;
let card;

beforeEach(() => {
  card = new BaseCard();

  cardNotDef = new VehicleCard({
    nameCard: 'name',
    nationCard: 'USA',
    classCard: 'тт',
    cardCost: 0,
    cardResurs: 0,
    cardNationResurs: 0,
    cardAttack: 0,
    cardDefense: 0,
    cardAbilities: null
  });

  cardDef = new VehicleCard({
    nameCard: 'name',
    nationCard: 'USA',
    classCard: 'тт',
    cardCost: 0,
    cardResurs: 0,
    cardNationResurs: 0,
    cardAttack: 0,
    cardDefense: 2,
    cardAbilities: null
  });
});

test('BaseCard create card', () => {
  expect(card).toBeInstanceOf(BaseCard);
  expect(card.getType()).toBe('base');
  expect(card.getNumberOfMedals()).toBe(3);
});

test('BaseCard one damage', () => {
  expect(card.getHP()).toBe(2);
  expect(card.makeDamage(2, 'пт')).toBe(1);
});

test('BaseCard two damage', () => {
  expect(card.getHP()).toBe(2);
  expect(card.makeDamage(2, 'тт')).toBe(0);
});

test('BaseCard reestablish', () => {
  expect(card.makeDamage('cт')).toBe(1);
  expect(card.reestablish()).toBe(2);
});

test('BaseCard card to defend base', () => {
  expect(card.putCardToDefendBase(cardNotDef)).toBeFalsy();
  expect(card.getStatBaseDefender()).toBeFalsy();
  expect(card.putCardToDefendBase(cardDef)).toBeTruthy();

  const oldCard = card.putCardToDefendBase(cardDef);

  expect(oldCard).toBeInstanceOf(VehicleCard);
  expect(card.getStatBaseDefender()).toBeInstanceOf(VehicleCard);
  
  const twoOldCard = card.deleteCardToDefendBase();

  expect(twoOldCard).toBeInstanceOf(VehicleCard);
  expect(card.getStatBaseDefender()).toBeFalsy();
});

test('BaseCard card to defend base make damage', () => {
  expect(card.putCardToDefendBase(cardDef)).toBeTruthy();
  expect(card.makeDamage(1)).toBeFalsy();

  const attackResult = card.putCardToDefendBase(cardDef);

  expect(attackResult).toBeInstanceOf(VehicleCard);
});

test('BaseCard getState', () => {
  const result = {
    hp: 2,
    medals: 3,
    defender: {
      name: 'name',
      nation: 'USA',
      class: 'тт',
      cost: 0,
      resurs: 0,
      nationResurs: 0,
      attack: 0,
      defense: 2,
      abilities: null
    }
  }

  expect(card.putCardToDefendBase(cardDef)).toBeTruthy();
  expect(card.getState()).toEqual(result);
});