const AchievementCard = require('../models/AchievementCard');

let card;

beforeEach(() => {
  card = new AchievementCard('new', 'description');
});

test('AchievementCard create card', () => {
  expect(card).toBeInstanceOf(AchievementCard);
  expect(card.getType()).toBe('achievement');
});

test('AchievementCard get name, description and medals', () => {
  expect(card.getName()).toBe('new');
  expect(card.getDescription()).toBe('description');
  expect(card.getNumberOfMedals()).toBe(5);
});

test('AchievementCard get state', () => {
  const result = {
    name: 'new',
    description: 'description',
    medals: 5,
    type: 'achievement',
  }

  expect(card.getState()).toEqual(result);
});