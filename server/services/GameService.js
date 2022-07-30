
class GameService {
  #isStartGame = false;
  #currentPlayer;
  #stateOfPlayerById = {};

  constructor(maxPlayers, listPlayers) {
    this.maxPlayers = maxPlayers;
    this.listPlayers = listPlayers; // нужно будет перемешивать игроков при начале игры
  } 
}

module.exports = GameService;