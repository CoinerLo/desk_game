const barracks = require('../content/barracks');
const VehicleCard = require('./VehicleCard');
const { shuffle } = require('lodash');

class BarracksCards {
  #barracks;
  constructor() {
    const deck = [];
    for (let nameCard in barracks) {
      const cardState = barracks[nameCard];
      const card = () => new VehicleCard({
        nameCard,
        ...cardState
      });
      if (nameCard === 'Кредит') {
        deck.push(card(), card(), card(), card());
      } else {
        deck.push(card());
      }
    }

    this.#barracks = [ ...shuffle(deck) ];
  }

  getBarracksCards() {
    return this.#barracks;
  }
}

module.exports = BarracksCards;