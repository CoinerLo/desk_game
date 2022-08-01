class BaseCard {
  type = 'base';
  #healthPoints = 2;                // количество здоровья базы
  #numberOfMedals = 3;              // побежденная база отправляется в колоду уничтожившего её игрока и защитывается в результате как 3 медали

  getType() {
    return this.type;
  }

  getHP() {
    return this.#healthPoints;
  }

  getNumberOfMedals() {
    return this.#numberOfMedals;
  }

  reestablish() {                   // восстанавливаем все хп при начале хода владельца базы
    this.#healthPoints = 2;
    return this.#healthPoints;
  }

  makeDamage(classCard) {           // только тт может уничтожить базу за одину атаку, остальные карты независимо от их урона наносят только одно повреждение
    this.#healthPoints = this.#healthPoints - (classCard === 'тт' ? 2 : 1);
    return this.#healthPoints;
  }
}

module.exports = BaseCard;