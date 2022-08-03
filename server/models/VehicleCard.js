const makeCardsAbilities = require('../utility/makeCardsAbilities');

class VehicleCard {
  type = 'vehicle';
  #nameCard;
  #nationCard;
  #classCard;
  #cardCost;
  #cardResurs;
  #cardNationResurs;                      // национальный ресурс который можно потратить только на технику той же национальности что и карта
  #cardAttack;
  #cardDefense;
  #cardAbilities = [];

  constructor(cardData) {
    const {
      nameCard,
      nationCard,
      classCard,
      cardCost,
      cardResurs,
      cardNationResurs,
      cardAttack,
      cardDefense,
      cardAbilities
    } = cardData;

    this.#nameCard = nameCard;
    this.#nationCard = nationCard;                   // German France USA USSR
    this.#classCard = classCard;                     // тт ст лт пт арт всп
    this.#cardCost = cardCost;                       // стоимость карты
    this.#cardResurs = cardResurs;                   // сколько карта дает ресурсов
    this.#cardNationResurs = cardNationResurs;       // сколько карта дает национальных ресурсов
    this.#cardAttack = cardAttack;                   // сколько у карты очков атаки
    this.#cardDefense = cardDefense;                 // сколько у карты очков защиты
    this.#cardAbilities = cardAbilities
      ? makeCardsAbilities(cardAbilities, cardData)
      : null;                                        // способности карты []
  }

  getType() {
    return this.type;
  }

  getCardState() {
    return {
      name: this.#nameCard,
      nation: this.#nationCard,
      class: this.#classCard,
      cost: this.#cardCost,
      resurs: this.#cardResurs,
      nationResurs: this.#cardNationResurs,
      attack: this.#cardAttack,
      defense: this.#cardDefense,
      abilities: this.#cardAbilities,
    }
  }
}

module.exports = VehicleCard;