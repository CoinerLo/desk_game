class VehicleCard {
  constructor({
    nameCard,
    nationCard,
    classCard,
    cardCost,
    cardResurs,
    cardAttack,
    cardDefense,
    cardAbilities
  }) {
    this.nameCard = nameCard;
    this.nationCard = nationCard; // German France USA USSR
    this.classCard = classCard; // тт ст лт пт арт всп
    this.cardCost = cardCost; // стоимость карты
    this.cardResurs = cardResurs; // сколько карта дает ресурсов
    this.cardAttack = cardAttack; // сколько у карты очков атаки
    this.cardDefense = cardDefense; // сколько у карты очков защиты
    this.cardAbilities = cardAbilities; // способности карты
  }
}

module.exports = VehicleCard;