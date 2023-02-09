const { shuffle } = require('lodash');
const GameTable = require('./GameTable');
const PlayerTankSquad = require('./PlayerTankSquad');

class Game extends GameTable {
  #players = {};
  #listPlayersIds = [];
  #currentPlayer;                               // игрок чей сейчас ход

  constructor(nuberPlayers, players = []) {
    super(nuberPlayers);

    players = shuffle(players);
    this.#currentPlayer = players[0].uid;

    players.forEach(player => {
      const { uid } = player;
      this.#listPlayersIds.push(uid);
      this.#players[uid] = new PlayerTankSquad();
    });
  }

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  getStateGame(idPlayer) {                      // стэйт общий отдается в зависимости от игрока которому он предназначен
    const table = super.getState();
    const playersState = [];
    for (let pl in this.#players) {
      const playerTankSquad = this.#players[pl];
      const isPrivate = this.#currentPlayer === pl || this.#currentPlayer === idPlayer;
      const state = playerTankSquad.getState(isPrivate);
      playersState.push(state);
    }
    return {
      table,
      playersState,
      currentPlayer: this.getCurrentPlayer(),
    }
  }
}

module.exports = Game;