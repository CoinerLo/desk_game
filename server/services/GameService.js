const { shuffle } = require('lodash');
const DeckOfMedalCards = require('../models/DeckOfMedalCards');
const AchievementDeck = require('../models/AchievementDeck');

class GameService {
  #isStartGame = false;                       // началась ли игра
  #maxPlayers;                                // максимальное количество игроков
  #currentPlayer;                             // игрок чей сейчас ход
  #listPlayers = [];                          // список игроков в том порядке в котором они будут ходить
  #stateOfPlayerById = {};                    // состояние войска конкретного игрока
  #technologyCemetery = [];                   // кладбище техники. Сюда просто пушим технику которая выбыла на всю игру.
  #equipmentReset = [];                       // сброс техники (сюда идет карта техники из резерва, когда колода техники заканчивается эта колода перемешивается и вновь выкладывается в колоду техники)
  #techDeck = [];                             // колода техники, отсюда выкладывается техника в резерв
  #reserve = [...Array(4).keys()];            // резерв, сюда выкладываются 4 карты из колоды техники, отсюда покупается техника, и последняя карта скидывается в сброс при переходе хода к новому игроку
  #deckOfMedalCards = new DeckOfMedalCards(); // колода медалей
  #achievementDeck = [];                      // колода достижений, выкладывается в начале игры 

  constructor(maxPlayers, listPlayers) {
    this.#maxPlayers = maxPlayers;
    this.#listPlayers = shuffle(listPlayers); // нужно будет перемешивать игроков при начале игры
  }

  gameStart() {
    this.#isStartGame = true;
    this.#achievementDeck = new AchievementDeck(this.#maxPlayers);
  }

  gameHasBegun() {
    return this.#isStartGame;
  }
}

module.exports = GameService;