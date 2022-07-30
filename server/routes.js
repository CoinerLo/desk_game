const _ = require('lodash');
const { appAuth } = require('./firebase/index');

module.exports = async (app, {instanceOnlineService}) => {
  const state = instanceOnlineService;

  const clientMassMailing = () => {
    const sockets = state.getAllUsersSocketsOnline();
    const usersData = state.getAllUsersData();
    sockets.forEach(socket => socket.send(JSON.stringify({ type: 'users', payload: usersData })));
  }

  const gamesMassMailing = () => {
    const sockets = state.getAllUsersSocketsOnline();
    const games = state.getAllGamesData();
    sockets.forEach(socket => socket.send(JSON.stringify({ type: 'games', payload: games })));
  }

  const playersMassMailing = (gameId) => {
    const sockets = state.getUsersSocketsThisGames(gameId);
    if (!sockets) return null;
    const players = state.getPlayersThisGame(gameId);
    sockets.forEach(socket => socket.send(JSON.stringify({ type: 'players', payload: players })))
  }

  app.get('/api/v1/users', async (_request, _reply) => { /* на клиенте есть метод но не используется в этой версии */
    const allUsers = await appAuth.auth().listUsers(1000);
    state.usersOnline = [...state.usersOnline, ...allUsers.users];
    return state.usersOnline;
  });

  app.post('/api/v1/adduseronline', async (request, reply) => {
    const name = _.get(request, 'body.name');
    const uid = _.get(request, 'body.uid');
    state.usersOnline.push({ uid, name });
    reply.send(state.usersOnline);
  }); /* не оспользуется клиентом в этой версии*/

  app.get('/api/v1/main', { websocket: true }, (connection, req) => {
    const socketID = req.headers["sec-websocket-key"];
    
    app.log.info({
      msg: "Client connect",
      socket: socketID
    });

    connection.socket.on('message', (message) => {
      const { type, payload } = JSON.parse(message);

      switch (type) {
        case 'userdata':
          state.addUserOnline({ data: payload, socketID, socket: connection.socket });
          const games = state.getAllGamesData();
          clientMassMailing();
          connection.socket.send(JSON.stringify({ type: 'games', payload: games }));
          break;
        case 'newgame':
          const gameId = state.addGame(payload);
          connection.socket.send(JSON.stringify({ type: 'gameId', payload: gameId }))
          gamesMassMailing();
          break;
        default: 
          app.websocketServer.clients.forEach(client => {
            if (client.readyState === 1) {
              client.send(JSON.stringify('hi from server for all clients'));
            }
          });
      }
    });

    connection.socket.on('close', () => {
      state.exitUser(socketID);
      clientMassMailing();

      app.log.info({
        msg: "Client disconnect",
        socket: socketID
      });
    });
  });

  app.get('/game/:gameId', { websocket: true }, (connection, req) => {
    const { gameId } = req.params;
    const socketID = req.headers["sec-websocket-key"];

    app.log.info({
      msg: "Player connect to game",
      socket: socketID,
      gameId,
    });

    connection.socket.on('message', (message) => {
      const { type, payload } = JSON.parse(message);

      switch (type) {
        case 'playerEnteredGame':
          const game = state.playerEnteredGame({ userData: payload, gameId, socketID, socket: connection.socket });
          if (game.hasOwnProperty('error')) {
            connection.socket.send(JSON.stringify({ type: 'error' }));
          } else {
            playersMassMailing(gameId);
          }
          // новому игроку отправить текущий стейт игры
          break;
        case 'changingCurrentPlayer':
          // смена действующего игрока переход хода. изменение стейта, рассылка нового стейта всем
          state.changingGameState({ gameId, payload });
          break;
        case 'gameState':
          // отдать текущее состояние игры
          state.getGameState(gameId);
          break;
        default:
          // дефолтное сообщение всем игрокам
      }
    });

    connection.socket.on('close', () => {
      //выход игрока, изменить стейт и оповестить всех игроков этой комнаты
      state.playerLeftGame(socketID);
      playersMassMailing(gameId);
      gamesMassMailing();

      app.log.info({
        msg: "Player disconnect at game",
        socket: socketID,
        gameId,
      });
    });
  });

  app.get('/api/v1/games', async (_request, _reply) => {
    return state.getAllGames();
  });

  app.get('/', async (_request, reply) => {
    reply.send({ server: "It's works" });
  });
}
