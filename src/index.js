// import './env';
import './db';
import CONFIG from './config/config';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import routes from './routes';
import favicon from 'serve-favicon';
import logger from './utils/logger';
import bodyParser from 'body-parser';
import compression from 'compression';
import json from './middlewares/json';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

const APP_PORT = (CONFIG.node_env === 'test' ? CONFIG.test_app_port : CONFIG.app_port) || CONFIG.port || '3000';
const APP_HOST = CONFIG.app_host || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = CONFIG.app_name;
app.locals.version = CONFIG.app_version;

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler.bodyParser);
app.use(json);

// Everything in the public folder is served as static content
app.use(express.static(path.join(__dirname, '/../public')));

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
