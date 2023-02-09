const Game = require('../models/Game');

class GameService {
  #games = []
  #isStartGame = false;

  gameStart() {
    this.#isStartGame = true;
  }

  gameHasBegun() {
    return this.#isStartGame;
  }
}

module.exports = GameService;