const _ = require('lodash');
const { appAuth } = require('./firebase/index');

const getUniqueId = () => Number(_.uniqueId());

const buildState = (currentState) => {
  const testGameID = getUniqueId();
  const state = {
    usersOnline: [
      { uid: 1, name: 'Admin' },
    ],
    usersSocketID: {},
    games: [
      { id: testGameID, author: 'Admin', players: ['Admin', 'Player'] },
    ],
  }

  if (currentState.usersOnline) {
    state.usersOnline.push(...currentState);
  }
  if (currentState.games) {
    state.games.push(...currentState.games);
  }

  return state;
}

module.exports = (app, defaultState = {}) => {
  const state = buildState(defaultState);

  const clientMassMailing = (client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(state.usersOnline));
    }
  }

  app.get('/api/v1/users', async (_request, _reply) => {
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
          state.usersOnline.push(payload);
          const table = {};
          state.usersOnline = state.usersOnline.filter(({ uid }) => (!table[uid] && (table[uid] = 1)));
          state.usersSocketID[socketID] = payload.uid;
          app.websocketServer.clients.forEach(clientMassMailing);
          break;
        // case 'exituser':
        //   state.usersOnline = state.usersOnline.filter(({ uid }) => uid !== payload.uid);
        //   app.websocketServer.clients.forEach(clientMassMailing);
        //   // console.log("Exit", state.usersOnline, `\n`, payload, `\n`);
        //   break;
        default: 
          app.websocketServer.clients.forEach(client => {
            if (client.readyState === 1) {
              client.send('hi from server for all clients');
            }
          });
      }
    });

    connection.socket.on('close', () => {
      const id = state.usersSocketID[socketID];
      state.usersOnline = state.usersOnline.filter(({ uid }) => uid !== id);
      app.websocketServer.clients.forEach(clientMassMailing);
      delete state.usersSocketID[socketID];

      app.log.info({
        msg: "Client disconnect",
        socket: socketID
      });
    });
  });

  app.get('/api/v1/games', async (_request, _reply) => {
    return state.games;
  });

  app.get('/', async (_request, reply) => {
    reply.send({ server: "It's works" });
  });
}
