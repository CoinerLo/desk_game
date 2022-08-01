const { shuffle } = require('lodash');
const achievement = require('../content/achievement');
const AchievementCard = require('./AchievementCard');

let fullAchievementDeck = [];

for (let i in achievement) {
  fullAchievementDeck.push(new AchievementCard(i, achievement[i]));
}

fullAchievementDeck = shuffle(fullAchievementDeck);

class AchievementDeck {
  #achievementDeck;

  constructor(amount) {
    this.#achievementDeck = [...Array(amount + 1).keys()].map((i) => fullAchievementDeck[i]);
  }

  getAchievementDeck() {
    return this.#achievementDeck;
  }
}

module.exports = AchievementDeck;