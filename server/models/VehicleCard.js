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
  #statrHP;

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
    this.#nationCard = nationCard;                   // German France USA USSR Inter
    this.#classCard = classCard;                     // тт ст лт пт арт всп брк
    this.#cardCost = cardCost;                       // стоимость карты
    this.#cardResurs = cardResurs;                   // сколько карта дает ресурсов
    this.#cardNationResurs = cardNationResurs;       // сколько карта дает национальных ресурсов
    this.#cardAttack = cardAttack;                   // сколько у карты очков атаки
    this.#cardDefense = cardDefense;                 // сколько у карты очков защиты
    this.#cardAbilities = cardAbilities
      ? makeCardsAbilities(cardAbilities, cardData)
      : null;                                        // способности карты []
    this.#statrHP = this.#cardDefense;               // сюда записываем стартовые хп что бы восстанавливать урон
  }

  getType() {
    return this.type;
  }

  getState() {
    return {
      type: this.getType(),
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

  makeDamage(dmg) {
    const xp = this.#cardDefense;
    if (dmg >= xp) return true;
    this.#cardDefense = xp - dmg;
    return false;
  }

  reestablish() {
    this.#cardDefense = this.#statrHP;
  }
}

module.exports = VehicleCard;