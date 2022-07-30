const _ = require('lodash');

class OnlineService {
  constructor(currentState) {
    this.usersOnline = currentState?.usersOnline ?? {
      idAdmin : {
        userData: { uid: 1, name: 'Admin' },
        socket: { send: () => null }
      },
    };
    this.usersOnlineId = currentState?.usersOnlineId ?? {}; // {socketId: uid}
    this.usersSocketIDByGame = currentState?.usersSocketIDByGame ?? {};
    this.games = currentState?.games ?? {
      0: {
        id: 0,
        author: 'Admin',
        players: [
            { name: 'AdminUid', uid: 1 },
            { name: 'PlayerUid', uid: 2 },
        ],
        sockets: {
          socketIdAdmin: { uid: 1, socket: { send: () => null } },
          socketIdPlayer: { uid: 2, socket: { send: () => null } }
        },
        maxPlayers: 2,
        gameState: {}
      },
    };
  }

  getAllUsersOnline() {
    return this.usersOnline;
  }

  getAllGames() {
    return this.games;
  }

  addUserOnline({ data, socketID, socket }) {
    const { uid } = data;
    this.usersOnline[uid] = { userData: data, socket };
    this.usersOnlineId[socketID] = uid;
    return this.usersOnline;
  }

  getUserIdBySocketId(socketId) {
    return this.usersOnlineId[socketId];
  }

  getUserBySocketId(socketID) {
    const userId = this.getUserIdBySocketId[socketID];
    return this.usersOnline[userId];
  }

  getAllUsersData() {
    const usersData = [];
    for (let uid in this.usersOnline) {
      const { userData } = this.usersOnline[uid];
      usersData.push(userData);
    }
    return usersData;
  }

  getAllUsersSocketsOnline() {
    const usersSockets = [];
    for (let uid in this.usersOnline) {
      const { socket } = this.usersOnline[uid];
      usersSockets.push(socket);
    }
    return usersSockets;
  }

  exitUser(socketId) {
    const userId = this.getUserIdBySocketId(socketId);
    delete this.usersOnline[userId];
    delete this.usersOnlineId[socketId];
    return this.usersOnline;
  }

  addGame(data) {
    const id = _.uniqueId();
    this.games[id] = { id, sockets: {}, ...data };
    return id;
  }

  // здесь начинаются методы для страницы gameId в будующих версиях разделить на два сервиса

  getAllGamesData() {
    const gamesData = [];
    for (let game in this.games) {
      const { id, author, players, maxPlayers } = this.games[game];
      gamesData.push({ id, author, players, maxPlayers });
    }
    return gamesData;
  }

  playerEnteredGame({ gameId, socketID, userData, socket }) {
    const { uid } = userData;
    const game = this.games[gameId];
    const { players, id } = game;

    if (players.length >= game.maxPlayers && !players.find(player => player.uid === uid )) {
      return { error: 'Мест нет' };
    } // надо будет реализовать отключение кнопки на фронте, при полной комнате менять стейт игры и в зависимости от него в таблице деактивировать кнопку присоединения

    players.push(userData);
    const table = {};
    game.players = players
        .filter(({ uid }) => (!table[uid] && (table[uid] = 1)));

    game.sockets[socketID] = { uid, socket };
    this.usersSocketIDByGame[socketID] = id;
    this.usersOnlineId[socketID] = uid;

    return game;
  }

  removeGame(gameId) {
    delete this.games[gameId];
    return this.games;
  }

  getUsersSocketsThisGames(gameId) {
    const sockets = [];
    const game = this.games[gameId];
    if (!game) return null;

    for (let socket in game.sockets) {
      sockets.push(game.sockets[socket].socket);
    }
    return sockets;
  }

  getPlayersThisGame(gameId) {
    const game = this.games[gameId];
    return game?.players ?? [];
  }

  playerLeftGame(socketID) {
    const gameId = this.usersSocketIDByGame[socketID];
    const userUid = this.usersOnlineId[socketID];
    const game = this.games[gameId];

    if (!game) return null;

    game.players = game.players
      .filter(({ uid }) => uid !== userUid);

    if (!game.players || game.players.length === 0) {
      this.removeGame(gameId);
    }

    delete this.usersSocketIDByGame[socketID];
    delete this.usersOnlineId[socketID];
    delete game.sockets[socketID];
    return this.games;
  }

  getGameState(gameId) {
    const game = this.games[gameId];
    return game;
  }

  changingGameState({ gameId, data }) {
    const game = this.games[gameId];
    return game;
  }
}

module.exports = OnlineService;