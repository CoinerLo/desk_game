class MedalCard {
  type = 'medal';
  #nationCard;
  #numberOfMedals;
  #cardResurs;
  constructor(nationCard, numberOfMedals) {
    this.#nationCard = nationCard; // German France USA USSR
    this.#numberOfMedals = numberOfMedals; // 1 2
    this.#cardResurs = numberOfMedals;
  }

  getType() {
    return this.type;
  }

  getNation() {
    return this.#nationCard;
  }

  getCardResurs() {
    return this.#cardResurs;
  }

  getNumberOfMedals() {
    return this.#numberOfMedals;
  }
}

module.exports = MedalCard;