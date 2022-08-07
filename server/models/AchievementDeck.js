const { shuffle } = require('lodash');
const achievement = require('../content/achievement');
const AchievementCard = require('./AchievementCard');

class AchievementDeck {
  #achievementDeck;

  constructor(amount) {
    let fullAchievementDeck = [];
    for (let i in achievement) {
      fullAchievementDeck.push(new AchievementCard(i, achievement[i]));
    }
    fullAchievementDeck = shuffle(fullAchievementDeck);
    this.#achievementDeck = [...Array(amount + 1).keys()].map((i) => fullAchievementDeck[i]);
  }

  getAchievementDeck() {
    return this.#achievementDeck;
  }

  deleteAchievement(idx) {
    const achievement = this.#achievementDeck.splice(idx, 1);
    return achievement[0];
  }

  getState() {
    return this.#achievementDeck.map(card => card.getState());
  }
}

module.exports = AchievementDeck;