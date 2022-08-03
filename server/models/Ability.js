const abilities = require('../content/abilities');

class Ability {
  type = 'ability';
  #name;
  #description;
  #countAbil;

  constructor(abilityInit, countAbil) {
    const { name, description } = abilities[abilityInit];
    this.#name = name;
    this.#description = description;
    this.#countAbil = countAbil;
  }

  getType() {
    return this.type;
  }

  getDescription() {
    return {
      name: this.#name,
      description: this.#description,
      countAbil: this.#countAbil,
    }
  }

}

module.exports = Ability;