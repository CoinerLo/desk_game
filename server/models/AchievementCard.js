class AchievementCard {
  type = 'achievement';
  #numberOfMedals = 5; // количество медалей, которое дает эта карта
  #name;
  #description;

  constructor(name, description) {
    this.#name = name;
    this.#description = description;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.#name;
  }

  getDescription() {
    return this.#description;
  }

  getNumberOfMedals() {
    return this.#numberOfMedals;
  }
}

module.exports = AchievementCard;