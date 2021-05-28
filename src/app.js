import express from 'express';
import chalk from 'chalk';
import { apiRouter } from './routes/index';
import { devConfig } from './config/config.js';
import { configureDb } from './config/db.js';
import { setGlobalmiddleware } from './middlewares/global-middleware';
import path from 'path';
import redis from 'redis';
let client = redis.createClient();



// instantiate a connection to redis 
client.on('connect', () => {
  console.log('Connected to Redis...')
})

// configureDb();

const app = express();

app.use(express.static(path.join(__dirname, 'uploads/images')));

// REGISTER  GLOBAL MIDDLEWAREs
setGlobalmiddleware(app);
 
app.use('/api', apiRouter);

// handler the the UNAUTORIZED 
app.use('/failure', (req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid Authorization';
  error.code = 401;
  error.status = false;
  next(error);
});
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = false;
  error.code = 404;
  next(error);
});
app.use((error, req, res, next) => {
  // res.status(error.status || 500);
  return res.status(error.status || 500).json({
      message: error.message,
      status: error.status,
      code: error.code,
  });
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});