const _ = require('lodash');

class OnlineService {
  constructor (currentState) {
    //const { usersOnline, usersSocketID, games } = currentState;
    this.usersOnline = currentState?.usersOnline ?? [
      { uid: 1, name: 'Admin' }
    ];
    this.usersSocketID = currentState?.usersSocketID ?? {};
    this.usersSocketIDByGame = currentState?.usersSocketIDByGame ?? {};
    this.games = currentState?.games ?? [
      { 
        id: 0,
        author: 'Admin',
        players: [{ name: 'AdminUid', uid: 1}, { name: 'PlayerUid', uid: 2}],
        maxPlayers: 2
      },
    ];
  }

  getAllUsersOnline() {
    return this.usersOnline;
  }

  getAllGames() {
    return this.games;
  }

  getUserNameById(userId) {
    return this.usersOnline.find(({ uid }) => uid === userId);
  }

  getUserUidBySocketId(socketID) {
    const userUid = this.usersSocketID[socketID];
    return this.getUserUidBySocketId(userUid);
  }

  addUserOnline(data, socketID) {
    this.usersOnline.push(data);
    const table = {};
    this.usersOnline = this.usersOnline
        .filter(({ uid }) => (!table[uid] && (table[uid] = 1)));
    this.usersSocketID[socketID] = data.uid;
    return this.games;
  }

  exitUser(socketID) {
    const id = this.usersSocketID[socketID];
    this.usersOnline = this.usersOnline
        .filter(({ uid }) => uid !== id);
    delete this.usersSocketID[socketID];
    return this.usersOnline;
  }

  addGame(data) {
    const game = { id: _.uniqueId(), ...data };
    this.games.push(game);
    return game.id;
  }

  // здесь начинаются методы для страницы gameId в будующих версиях разделить на два сервиса

  removeGame(gameId) {
    this.games = this.games.filter(({ id }) => gameId !== id);
    return this.games;
  }

  getGameById(gameId) {
    return this.games.find(({ id }) => id === gameId);
  }

  getPlayersThisGame(gameId) {
    const game = this.getGameById(gameId);
    //console.log(gameId, game);
    return game?.players ?? [];
  }

  playerEnteredGame(data) {
    const { gameId, socketID, usersData } = data;
    //const { uid, name } = usersData;
    const game = this.getGameById(gameId);
    if (game.players.length === game.maxPlayers) {
      return { error: 'Мест нет' };
    }
    game.players.push({ ...usersData, socketID });
    const table = {};
    game.players = game.players
        .filter(({ uid }) => (!table[uid] && (table[uid] = 1)));
    this.usersSocketIDByGame[socketID] = game.id;
    this.usersSocketID[socketID] = usersData.uid;
    //console.log(game, this.games);
    // новому игроку отправить текущий стейт игры
    return game;
  }

  playerLeftGame(socketID) {
    const gameId = this.usersSocketIDByGame[socketID];
    const userUid = this.usersSocketID[socketID];
    const game = this.getGameById(gameId);

    game.players = game.players
      .filter(({ uid }) => uid !== userUid);

    if (!game.players || game.players.length === 0) {
      this.removeGame(gameId);
    }
    // console.log(this.games);
    delete this.usersSocketIDByGame[socketID];
    delete this.usersSocketID[socketID];
    return this.games;
  }

  getGameState(gameId) {
    const game = this.getGameById(gameId);
    return game;
  }

  changingGameState({ gameId, data }) {
    const game = this.getGameById(gameId);
    return game;
  }
}

module.exports = OnlineService;