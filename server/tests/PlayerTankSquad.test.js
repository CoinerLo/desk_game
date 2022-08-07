const BaseCard = require('../models/BaseCard');
const PlayerTankSquad = require('../models/PlayerTankSquad');
const VehicleCard = require('../models/VehicleCard');

const cardStatOne = {
  nameCard: 'nameOne',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 0,
  cardResurs: 0,
  cardNationResurs: 0,
  cardAttack: 0,
  cardDefense: 2,
  cardAbilities: null
};

const cardStatTwo = {
  nameCard: 'nameTwo',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 0,
  cardResurs: 0,
  cardNationResurs: 0,
  cardAttack: 0,
  cardDefense: 2,
  cardAbilities: null
};

const cardStatThree = {
  nameCard: 'nameThree',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 0,
  cardResurs: 0,
  cardNationResurs: 0,
  cardAttack: 0,
  cardDefense: 2,
  cardAbilities: null
};

const cardStatFour = {
  nameCard: 'nameFour',
  nationCard: 'USA',
  classCard: 'тт',
  cardCost: 0,
  cardResurs: 0,
  cardNationResurs: 0,
  cardAttack: 0,
  cardDefense: 2,
  cardAbilities: null
};

let playerTankSquad;

beforeEach(() => {
  playerTankSquad = new PlayerTankSquad();
});

test('PlayerTankSquad create model', () => {
  expect(playerTankSquad).toBeInstanceOf(PlayerTankSquad);
});

test('PlayerTankSquad get cards in hand', () => {
  const cardsInHand = playerTankSquad.getAllCardsInHand();

  expect(cardsInHand).toHaveLength(3);
  expect(cardsInHand[2]).toBeInstanceOf(VehicleCard);
  expect(playerTankSquad.numberCardsInHand()).toBe(3);

  const card = playerTankSquad.removeCardFromHand(1);
  playerTankSquad.pushToStock(card);

  expect(playerTankSquad.numberCardsInStock()).toBe(1);
  expect(playerTankSquad.numberCardsInHand()).toBe(2);
  expect(card).toBeInstanceOf(VehicleCard);

  const newDeck = playerTankSquad.changeCardsInHand();

  expect(newDeck).toHaveLength(3);
  expect(playerTankSquad.numberCardsInReserve()).toBe(0);

  const nextDeck = playerTankSquad.changeCardsInHand();

  expect(nextDeck).toHaveLength(3);
  expect(playerTankSquad.numberCardsInReserve()).toBe(3);
});

test('PlayerTankSquad pushCardToDefendBase', () => {
  const oneCard = new VehicleCard(cardStatOne);
  const resultOne = playerTankSquad.pushCardToDefendBase(oneCard, 1);       // ставим первую карту на защиту второй базы
  let defendOne = playerTankSquad.getCardToDefendBase(1);
  const { name: nameOne } = defendOne.getState();

  expect(resultOne).toBeTruthy();
  expect(nameOne).toBe('nameOne');

  const twoCard = new VehicleCard(cardStatTwo);
  const resultTwo = playerTankSquad.pushCardToDefendBase(twoCard, 1);       // ставим вторую карту на защиту второй базы
  defendOne = playerTankSquad.getCardToDefendBase(1);
  let defendTwo = playerTankSquad.getCardToDefendBase(0);                   // она оказывается на защите первой базы т.к. та была незащищена

  const { name: nameTwoPos } = defendOne.getState();
  const { name: nameOnePos } = defendTwo.getState();

  expect(resultTwo).toBeTruthy();
  expect(nameTwoPos).toBe('nameOne');
  expect(nameOnePos).toBe('nameTwo');

  const threeCard = new VehicleCard(cardStatThree);
  const fourCard = new VehicleCard(cardStatFour);

  const resultThree = playerTankSquad.pushCardToDefendBase(threeCard, 1);   // ставим третью карту на защиту второй базы
  const resultFour = playerTankSquad.pushCardToDefendBase(fourCard, 1);     // ставим четвертую карту на защиту второй базы
  
  defendOne = playerTankSquad.getCardToDefendBase(0);
  defendTwo = playerTankSquad.getCardToDefendBase(1);
  let defendThree = playerTankSquad.getCardToDefendBase(2);

  const { name: nOne } = defendOne.getState();
  const { name: nTwo } = defendTwo.getState();
  const { name: nThree } = defendThree.getState();
  const { name: nFour } = resultFour.getState();

  expect(resultThree).toBeTruthy();
  expect(resultFour).toBeInstanceOf(VehicleCard);                           // первая карта вернулась в колоду т.к. была заменена на 4-ю
  expect(nFour).toBe('nameOne');
  expect(nOne).toBe('nameTwo');
  expect(nTwo).toBe('nameFour');                                            // четвертая карта какк и ожидалось встала на защиту второй базы
  expect(nThree).toBe('nameThree');                                         // третья карта оказывается на защите третьей базы т.к. та была незащищена
});

test('PlayerTankSquad deleteBase', () => {
  const base = playerTankSquad.deleteBase(1);

  expect(playerTankSquad.getNumberOfBases()).toBe(2);
  expect(base).toBeInstanceOf(BaseCard);
});

test('PlayerTankSquad getState', () => {
  const { bases, inHand, reserve, stock } = playerTankSquad.getState(true);
  const { inHand: secretInHand } = playerTankSquad.getState(false);

  expect(stock).toBe(0);
  expect(reserve).toBe(3);
  expect(secretInHand).toBe(3);
  expect(bases).toHaveLength(3);
  expect(inHand).toHaveLength(3);
  expect(inHand[0]).toHaveProperty('name');
  expect(bases[0]).toHaveProperty('hp', 2);
});