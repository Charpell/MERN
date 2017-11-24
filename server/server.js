import express from 'express';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import http from 'http';
import path from 'path';
import dotenv from 'dotenv';
import colors from 'colors';
import winston from 'winston';
import mongooseSetting from './config/mongooseSetting';
import apiRoutes from './routes';

dotenv.config();
const app = express();
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 7000);
app.use(express.static(path.join(__dirname, '../public')));
// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});
// database setting
mongooseSetting(logger);
// Api routes
apiRoutes(app);

const server = http.createServer(app);
server.listen(app.get('port'), (err) => {
  if (err) {
    // call winston logger
    logger.error(err);
  }
  // call winston logger
  logger.info(`App running on port ${app.get('port')}`.blue);
});

export default app;