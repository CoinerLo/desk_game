const DeckOfMedalCards = require('../models/DeckOfMedalCards');

class GameService {
  #isStartGame = false;                       // началась ли игра
  #currentPlayer;                             // игрок чей сейчас ход
  #stateOfPlayerById = {};                    // состояние войска конкретного игрока
  #technologyCemetery = [];                   // кладбище техники. Сюда просто пушим технику которая выбыла на всю игру.
  #equipmentReset = [];                       // сброс техники (сюда идет карта техники из резерва, когда колода техники заканчивается эта колода перемешивается и вновь выкладывается в колоду техники)
  #techDeck = [];                             // колода техники, отсюда выкладывается техника в резерв
  #reserve = [...Array(4).keys()];            // резерв, сюда выкладываются 4 карты из колоды техники, отсюда покупается техника, и последняя карта скидывается в сброс при переходе хода к новому игроку
  #deckOfMedalCards = new DeckOfMedalCards(); // колода медалей
  #achievementDeck = [];                      // колода достижений, выкладывается в начале игры 

  constructor(maxPlayers, listPlayers) {
    this.maxPlayers = maxPlayers;
    this.listPlayers = listPlayers; // нужно будет перемешивать игроков при начале игры
  } 
}

module.exports = GameService;