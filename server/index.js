const fastify = require('fastify'),
  pino = require('pino'),
  //addRoutes = require('./routes.js'),
  appAuth = require('./firebase/index'),
  OnlineService = require('./services/OnlineService');
  require('dotenv').config({ path: '../.env' });
console.log(appAuth);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.REACT_APP_SERVER_PORT || 8080;
const host = isProduction ? process.env.REACT_APP_SERVER_HOST : '0.0.0.0';

const cors = (instance) => {
  return (req, callback) => {
    const corsOptions = {
      origin: true
    };

    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    callback(null, corsOptions);
  }
};

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});

const instanceOnlineService = new OnlineService();

const start = async () => {
  const app = fastify({ logger });
  app.register(require('@fastify/cors'), cors);
  await app.register(require('@fastify/websocket'), { options: { clientTracking: true } });
  await app.register(require('./routes'), { instanceOnlineService });
  //addRoutes(app);
  try {
    await app.listen({ port, host }, () => {
      console.log(`Server has been started on ${port} port`);
    });
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start();
