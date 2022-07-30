const MedalCard = require('./MedalCard');

class DeckOfMedalCards {
  #oneGermanMedal = [...Array(9).keys()].map(i => new MedalCard('German', 1));
  #twoGermanMedal = [...Array(3).keys()].map(i => new MedalCard('German', 2));
  #oneFranceMedal = [...Array(9).keys()].map(i => new MedalCard('France', 1));
  #twoFranceMedal = [...Array(3).keys()].map(i => new MedalCard('France', 2));
  #oneUSAMedal = [...Array(9).keys()].map(i => new MedalCard('USA', 1));
  #twoUSAMedal = [...Array(3).keys()].map(i => new MedalCard('USA', 2));
  #oneUSSRMedal = [...Array(9).keys()].map(i => new MedalCard('USSR', 1));
  #twoUSSRMedal = [...Array(3).keys()].map(i => new MedalCard('USSR', 2));

  howManyCardsInDeckOneMedal(nation) {
    switch (nation) {
      case 'German':
        return this.#oneGermanMedal.length;
      case 'France':
        return this.#oneFranceMedal.length;
      case 'USA':
        return this.#oneUSAMedal.length;
      case 'USSR':
        return this.#oneUSSRMedal.length;
      default:
        return null;
    }
  }

  howManyCardsInDeckTwoMedal(nation) {
    switch (nation) {
      case 'German':
        return this.#twoGermanMedal.length;
      case 'France':
        return this.#twoFranceMedal.length;
      case 'USA':
        return this.#twoUSAMedal.length;
      case 'USSR':
        return this.#twoUSSRMedal.length;
      default:
        return null;
    }
  }

  getOneMedal(nation) {
    switch (nation) {
      case 'German':
        return this.#oneGermanMedal.length > 0 ? this.#oneGermanMedal.pop() : null;
      case 'France':
        return this.#oneFranceMedal.length > 0 ? this.#oneFranceMedal.pop() : null;
      case 'USA':
        return this.#oneUSAMedal.length > 0 ? this.#oneUSAMedal.pop() : null;
      case 'USSR':
        return this.#oneUSSRMedal.length > 0 ? this.#oneUSSRMedal.pop() : null;
      default:
        return null;
    }
  }

  getTwoMedal(nation) {
    switch (nation) {
      case 'German':
        return this.#twoGermanMedal.length > 0
          ? this.#twoGermanMedal.pop()
          : [this.getOneMedal('German'), this.getOneMedal('German')];
      case 'France':
        return this.#twoFranceMedal.length > 0
          ? this.#twoFranceMedal.pop()
          : [this.getOneMedal('France'), this.getOneMedal('France')];
      case 'USA':
        return this.#twoUSAMedal.length > 0
          ? this.#twoUSAMedal.pop()
          : [this.getOneMedal('USA'), this.getOneMedal('USA')];
      case 'USSR':
        return this.#twoUSSRMedal.length > 0
          ? this.#twoUSSRMedal.pop()
          : [this.getOneMedal('USSR'), this.getOneMedal('USSR')];
      default:
        return null;
    }
  }
}

module.exports = DeckOfMedalCards;