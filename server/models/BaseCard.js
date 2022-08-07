const isDefend = require('../utility/isDefend');

class BaseCard {
  type = 'base';
  #healthPoints = 2;                // количество здоровья базы
  #numberOfMedals = 3;              // побежденная база отправляется в колоду уничтожившего её игрока и защитывается в результате как 3 медали
  #baseDefender;                    // карта теники на защите базы

  getType() {
    return this.type;
  }

  getHP() {
    return this.#healthPoints;
  }

  getNumberOfMedals() {
    return this.#numberOfMedals;
  }

  reestablish() {                         // восстанавливаем все хп при начале хода владельца базы
    this.#healthPoints = 2;
    if(!!this.#baseDefender) this.#baseDefender.reestablish();
    return this.#healthPoints;
  }

  makeDamage(dmg, classCard) {            // только тт может уничтожить базу за одину атаку, остальные карты независимо от их урона наносят только одно повреждение
    if(this.#baseDefender) {
      const defenderCard = this.#baseDefender;
      const attackResult = defenderCard.makeDamage(dmg);
      if (attackResult) {
        this.#baseDefender = null;
        return defenderCard;
      }
      this.#baseDefender = defenderCard;
      return false;
    }
    this.#healthPoints = this.#healthPoints - (classCard === 'тт' ? 2 : 1);
    return this.#healthPoints;
  }

  putCardToDefendBase(card) {             // поставить карту на защиту базы
    if (!isDefend(card)) return false;    // проверка - может ли карта встать на защиту
    if (!!this.#baseDefender) {           // если у базы уже есть защитник его надо вернуть в колоду склада
      const oldCard = this.#baseDefender;
      this.#baseDefender = card;
      return oldCard;
    }
    this.#baseDefender = card;
    return true;
  }

  deleteCardToDefendBase() {              // убираем карту с защиты базы
    const oldCard = this.#baseDefender;
    this.#baseDefender = null;
    return oldCard;
  }

  getStatBaseDefender() {                 // отдаем карту на защите базы
    return !!this.#baseDefender ? this.#baseDefender : false;
  }

  getState() {                            // получить состояние базы
    const defender = this.getStatBaseDefender();
    return {
      hp: this.getHP(),
      medals: this.getNumberOfMedals(),
      defender: defender ? defender.getCardState() : null,
    }
  }
}

module.exports = BaseCard;