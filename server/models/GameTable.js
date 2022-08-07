const AchievementDeck = require('./AchievementDeck');
const DeckOfMedalCards = require('./DeckOfMedalCards');
const ReserveDeck = require('./ReserveDeck');

class GameTable extends ReserveDeck {
  #medals;
  #achievements;
  #cemetery = [];                                        // кладбище техники

  constructor(numberPlayers) {
    super();
    this.numberPlayers = numberPlayers;
    this.#medals = new DeckOfMedalCards();
    this.#achievements = new AchievementDeck(numberPlayers);
  }

  getNumberPlayers() {
    return this.numberPlayers;
  }

  // medals

  getMedal(num, nation) {
    if (num === 1) {
      return this.#medals.getOneMedal(nation);
    }
    const twoMedals = this.#medals.getTwoMedal(nation);

    return twoMedals.filter(Boolean); // может прийти массив с одной картой на две медали, с двумя картами по одной медали, с одной картой на одну медаль или пустой массив
  }

  getAllMedals() {
    return this.#medals.getFullCountMedals();
  }

  // achievements

  getAchievements() {
    return this.#achievements.getAchievementDeck();
  }

  getOneAchievement(idx) {
    return this.#achievements.deleteAchievement(idx);
  }

  getAchievementsState() {
    return this.#achievements.getState();
  }

  // reserve

  getReserveState() {
    return super.getState();
  }

  // cemetery

  addCardInCemetery(card) {
    this.#cemetery.push(card);
    return true;
  }

  // state

  getState() {
    return {
      medals: this.getAllMedals(),
      achievements: this.getAchievementsState(),
      reserve: this.getReserveState(),
      vehicle: super.getNumberCardsInDeck(),
      reset: super.getNumberCardsInResetDeck(),
      cemetery: this.#cemetery.length,
    }
  }
}

module.exports = GameTable;