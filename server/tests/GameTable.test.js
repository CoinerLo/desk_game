const AchievementCard = require('../models/AchievementCard');
const GameTable = require('../models/GameTable');
const MedalCard = require('../models/MedalCard');

let table;

beforeEach(() => {
  table = new GameTable(3);
});

test('GameTable create', () => {
  expect(table).toBeInstanceOf(GameTable);
  expect(table.getNumberPlayers()).toBe(3);
});

test('GameTable medals', () => {
  const [ medal ] = table.getMedal(2, 'USA');

  expect(medal).toBeInstanceOf(MedalCard);
  expect(medal.getNumberOfMedals()).toBe(2);

  table.getMedal(2, 'USA');
  table.getMedal(2, 'USA');

  expect(table.getMedal(2, 'USA')).toHaveLength(2);  // если заканчиваются двойные медали то возвращается массив одинарных

  table.getMedal(2, 'USA');
  table.getMedal(2, 'USA');
  table.getMedal(2, 'USA');

  const nextMedal = table.getMedal(2, 'USA');
  expect(nextMedal).toHaveLength(1);
  expect(nextMedal[0]).toBeInstanceOf(MedalCard);

  expect(table.getMedal(2, 'USA')).toHaveLength(0);

  const oneMedal = table.getMedal(1, 'USSR');
  expect(oneMedal).toBeInstanceOf(MedalCard);
});

test('GameTable achievements', () => {
  const achievements = table.getAchievements();

  expect(achievements).toHaveLength(4);

  const achievement = table.getOneAchievement(0);
  const achievementsTwo = table.getAchievements();
  const achievementsState = table.getAchievementsState();

  expect(achievementsTwo).toHaveLength(3);
  expect(achievement).toBeInstanceOf(AchievementCard);
  expect(achievementsState).toHaveLength(3);
  expect(achievementsState[0]).toHaveProperty('medals', 5);
});

test('GameTable reserve', () => {
  const reserveState = table.getReserveState();

  expect(reserveState).toHaveLength(4);
  expect(reserveState[3]).toHaveProperty('name');
});

test('GameTable getState', () => {
  const state = table.getState();

  expect(state).toHaveProperty('cemetery', 0);
  expect(state).toHaveProperty('reset', 0);
  expect(state).toHaveProperty('vehicle', 97);
  expect(state).toHaveProperty('reserve');
  expect(state).toHaveProperty('achievements');
  expect(state).toHaveProperty('medals');

  const { medals, achievements, reserve } = state;

  expect(reserve).toHaveLength(4);
  expect(reserve[0]).toHaveProperty('name');

  expect(achievements).toHaveLength(4);
  expect(achievements[0]).toHaveProperty('medals', 5);

  expect(medals).toHaveProperty('oneMedal');
});