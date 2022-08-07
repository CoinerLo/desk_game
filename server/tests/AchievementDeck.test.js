const AchievementCard = require('../models/AchievementCard');
const AchievementDeck = require('../models/AchievementDeck');

let deck;

beforeEach(() => {
  deck = new AchievementDeck(3);
})

test('AchievementDeck create', () => {
  expect(deck instanceof AchievementDeck).toBeTruthy();
});

test('AchievementDeck get deck', () => {
  const achievementDeck = deck.getAchievementDeck();
  const item = achievementDeck[0];
  expect(achievementDeck).toHaveLength(4);
  expect(item).toBeInstanceOf(AchievementCard);
  expect(typeof item.getName()).toBe('string');
  expect(item.getNumberOfMedals()).toBe(5);
});

test('AchievementDeck deleteAchievement', () => {
  const achievement = deck.deleteAchievement(1);
  const achievementDeck = deck.getAchievementDeck();

  expect(achievement).toBeInstanceOf(AchievementCard);
  expect(achievementDeck).toHaveLength(3);
});