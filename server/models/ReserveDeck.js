const VehicleDeck = require('./VehicleDeck');

class ReserveDeck extends VehicleDeck {
  #reserveDeck = [];

  constructor() {
    super();
    this.#reserveDeck = super.getFourCards();
  }

  getReserveDeck() {
    return this.#reserveDeck;
  }

  getCardByNum(num) {
    const card = this.#reserveDeck.splice(num, 1);
    const newCard = super.getCard();
    this.#reserveDeck.unshift(newCard);
    return card[0];
  }

  discardCard() {
    const oldCard = this.#reserveDeck.pop();
    super.reset(oldCard);
    const newCard = super.getCard();
    this.#reserveDeck.unshift(newCard);
    return this.#reserveDeck;
  }

  discardFourCards() {
    const fourOldCards = this.#reserveDeck.splice(0, 4);
    fourOldCards.forEach(card => super.reset(card));
    const fourNewCards = super.getFourCards();
    this.#reserveDeck.push(...fourNewCards);
    return this.#reserveDeck;
  }
}

module.exports = ReserveDeck;