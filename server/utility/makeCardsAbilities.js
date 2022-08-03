const Ability = require('../models/Ability');

const makeCardsAbilities = (cardAbilities, cardData) => {
  return cardAbilities.map(abil => {
    switch (abil) {
      case 'rei':
        const { countAbilRei } = cardData;
        return new Ability(abil, countAbilRei);
      case 'stu':
        const { countAbilStu } = cardData;
        return new Ability(abil, countAbilStu);
      default:
        return new Ability(abil);
    }
  });
}

module.exports = makeCardsAbilities;