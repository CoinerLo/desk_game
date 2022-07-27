const _ = require('lodash');
const { appAuth } = require('./firebase/index');
//const OnlineService = require('./services/OnlineService');

//const getUniqueId = () => Number(_.uniqueId());

// const buildState = (currentState) => {
//   const testGameID = getUniqueId();
//   const state = {
//     usersOnline: [
//       { uid: 1, name: 'Admin' },
//     ],
//     usersSocketID: {},
//     games: [
//       { id: testGameID, author: 'Admin', players: ['Admin', 'Player'] },
//     ],
//   }

//   if (currentState.usersOnline) {
//     state.usersOnline.push(...currentState);
//   }
//   if (currentState.games) {
//     state.games.push(...currentState.games);
//   }

//   return state;
// }

// const defaultData = {
//   usersOnline: [
//     { uid: 1, name: 'Admin' }
//   ],
//   usersSocketID: {},
//   games: [
//     { id: getUniqueId(), author: 'Admin', players: ['Admin', 'Player'] },
//   ]
// }

//const instanceOnlineService = new OnlineService();

module.exports = async (app, {instanceOnlineService}) => {
  const state = instanceOnlineService; //buildState(defaultState);

  const clientMassMailing = (client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'users', payload: state.getAllUsersOnline() }));
    }
  }

  const gamesMassMailing = (client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'games', payload: state.getAllGames() }));
    }
  }

  const playersMassMailing = (client, gameId) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type: 'players', payload: state.getPlayersThisGame(gameId) }));
    }
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
    connection.socket.id = socketID;
    app.log.info({
      msg: "Client connect",
      socket: socketID
    });
    //console.log(connection.socket)
    connection.socket.on('message', (message) => {
      const { type, payload } = JSON.parse(message);

      switch (type) {
        case 'userdata':
          // state.usersOnline.push(payload);
          // const table = {};
          // state.usersOnline = state.usersOnline.filter(({ uid }) => (!table[uid] && (table[uid] = 1)));
          // state.usersSocketID[socketID] = payload.uid;
          const games = state.addUserOnline(payload, socketID);
          app.websocketServer.clients.forEach(clientMassMailing);
          connection.socket.send(JSON.stringify({ type: 'games', payload: games }));
          break;
        case 'newgame':
          const gameId = state.addGame(payload);
          connection.socket.send(JSON.stringify({ type: 'gameId', payload: gameId }))
          app.websocketServer.clients.forEach(gamesMassMailing);
          break;
        // case 'exituser':
        //   state.usersOnline = state.usersOnline.filter(({ uid }) => uid !== payload.uid);
        //   app.websocketServer.clients.forEach(clientMassMailing);
        //   // console.log("Exit", state.usersOnline, `\n`, payload, `\n`);
        //   break;
        default: 
          app.websocketServer.clients.forEach(client => {
            if (client.readyState === 1) {
              client.send(JSON.stringify('hi from server for all clients'));
            }
          });
      }
    });

    connection.socket.on('close', () => {
      // const id = state.usersSocketID[socketID];
      // state.usersOnline = state.usersOnline.filter(({ uid }) => uid !== id);
      state.exitUser(socketID);
      app.websocketServer.clients.forEach(clientMassMailing);
      //delete state.usersSocketID[socketID];

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
          state.playerEnteredGame({ usersData: payload, gameId, socketID });
          app.websocketServer.clients.forEach(client => playersMassMailing(client, gameId));
          // новому игроку отправить текущий стейт игры
          break;
        case 'changingCurrentPlayer':
          // смена действующего игрокаб переход хода. изменение стейта, рассылка нового стейта всем
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
      app.websocketServer.clients.forEach(client => {
        playersMassMailing(client, gameId);
        gamesMassMailing(client);
      });

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
