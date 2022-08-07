const { shuffle } = require('lodash');
const BarracksCards = require('./BarracksCards');
const BaseCard = require('./BaseCard');

class PlayerTankSquad {
  #reserve;                                   // ангар, колода из которой набираются карты в руку
  #cardsInHand = [];                          // рука, карты на руке - 3 шт
  #stock = [];                                // склад, карты ушедшие из руки (не использованные, использованные как ресурсы, снятые или выбитые с защиты базы)
  #bases;                                     // базы

  constructor() {
    const barracksInit = new BarracksCards();
    const barracks = barracksInit.getBarracksCards();

    this.#bases = [
      new BaseCard(),
      new BaseCard(),
      new BaseCard(),
    ];
    this.#cardsInHand = [
      barracks.pop(),
      barracks.pop(),
      barracks.pop(),
    ];
    this.#reserve = [...barracks];
  }

  // in hand

  getFullCardsInHand() {                            // взять три карты на руку
    const oneCard = this.getCardFromReserve();
    const twoCard = this.getCardFromReserve();
    const threeCard = this.getCardFromReserve();
  
    this.#cardsInHand = [threeCard, twoCard, oneCard];
    return this.#cardsInHand;
  }

  getAllCardsInHand() {                             // вернуть карты в руке
    return this.#cardsInHand;
  }

  getCardInHandById(idx) {                           // вернуть данные конкретной карты из руки
    return this.#cardsInHand[idx];
  }

  removeCardFromHand(id) {                          // вытащить карту из руки первую, вторую, или третью
    const result = this.#cardsInHand.splice(id, 1);
    return result[0];
  }

  numberCardsInHand() {                             // количество карт в руке
    return this.#cardsInHand.length;
  }

  changeCardsInHand() {                             // заменить карты в руке на новые, оставшиеся сбросить на склад
    this.#stock.push(...this.#cardsInHand);
    this.getFullCardsInHand();
    return this.#cardsInHand;
  }

  // reserve

  getCardFromReserve() {                            // взять карту из резерва
    if (this.numberCardsInReserve() < 1) {
      this.changeCardsInReserve();
    }
    return this.#reserve.pop();
  }

  changeCardsInReserve() {                          // обновить колоду резерва когда там заканчиваются карты
    this.#reserve = shuffle(this.#stock);
    this.#stock = [];
    return this.#reserve;
  }

  numberCardsInReserve() {                          // количество карт в резерве
    return this.#reserve.length;
  }

  // stock

  pushToStock(card) {                               // скинуть карту в сток
    this.#stock.push(card);
  }

  numberCardsInStock() {                             // сколько карт в сбросе
    return this.#stock.length;
  }

  // bases

  getCardToDefendBase(numBase) {
    return this.#bases[numBase].getStatBaseDefender();  // вернет карту защиты или false если защиты нет
  }

  pushCardToDefendBase(card, numBase) {                 // установить карту на защиту базы
    if (!this.getCardToDefendBase(numBase)) {
      this.#bases[numBase].putCardToDefendBase(card);
      return true;
    }
    let ind;
    const baseWithoutDefender = this.#bases
      .find((base, idx) => {                            // если у базы уже есть защитник, нужно убедится что у других баз они тоже есть, нельзя сменить защитника у базы если есть незащищенная база
        if (!base.getStatBaseDefender()) {
          ind = idx;
          return base;
        }
        return false;
      });
    if (baseWithoutDefender) {
      this.#bases[ind].putCardToDefendBase(card);
      return true;
    }
    const oldCard = this.#bases[numBase].putCardToDefendBase(card);
    return oldCard;
  }

  deleteBase(idx) {                                      // удалить базу у игрока
    const base = this.#bases.splice(idx, 1);
    return base[0];
  }

  getBases() {
    return this.#bases;
  }

  getNumberOfBases() {                                    // цзнать сколько баз у игрока
    return this.#bases.length;
  }

  getState(isPrivate) {
    let bases = this.getBases();
    bases = bases.map(base => base.getState());
    let inHand = isPrivate ? this.getAllCardsInHand() : this.numberCardsInHand();
    inHand = isPrivate ? inHand.map(card => card.getState()) : inHand;
    const reserve = this.numberCardsInReserve();
    const stock = this.numberCardsInStock();

    return {
      bases,
      inHand,
      reserve,
      stock
    }
  }
}

module.exports = PlayerTankSquad;