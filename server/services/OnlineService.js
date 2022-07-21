const _ = require('lodash');

class OnlineService {
  constructor (currentState) {
    //const { usersOnline, usersSocketID, games } = currentState;
    this.usersOnline = currentState?.usersOnline ?? [
      { uid: 1, name: 'Admin' }
    ];
    this.usersSocketID = currentState?.usersSocketID ?? {};
    this.games = currentState?.games ?? [
      { id: 0, author: 'Admin', players: ['Admin', 'Player'], maxPlayers: 2 },
    ];
  }

  getAllUsersOnline() {
    return this.usersOnline;
  }

  getAllGames() {
    return this.games;
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
    const game = { ...data, id: _.uniqueId() };
    this.games.push(game);
    return this.games;
  }
}

module.exports = OnlineService;