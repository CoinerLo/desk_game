const { shuffle } = require('lodash');
const vehicle = require('../content/vehicle');
const VehicleCard = require('./VehicleCard');

class VehicleDeck {
  #vehicleDeck = [];
  #resetVehicleDeck = [];

  start() {
    const deck = [];
    for (let nameCard in vehicle) {

      const card = new VehicleCard({
        nameCard,
        ...vehicle[nameCard]
      });
      deck.push(card);
    }

    this.#vehicleDeck = [ ...shuffle(deck) ];
    return this.#vehicleDeck;
  }

  pop() {
    const card = this.#vehicleDeck.pop();
    if (card) return card;
    this.updateDeck();
    this.pop();
  }

  updateDeck() {
    if (this.getNumberCardsInDeck() !== 0) return null;
    this.#vehicleDeck = shuffle(this.#resetVehicleDeck);
    this.#resetVehicleDeck = [];
    return this.#vehicleDeck;
  }

  reset(card) {
    this.#resetVehicleDeck.push(card);
  }

  getNumberCardsInDeck() {
    return this.#vehicleDeck.length;
  }

  getNumberCardsInResetDeck() {
    return this.#resetVehicleDeck.length;
  }
}

module.exports = VehicleDeck;