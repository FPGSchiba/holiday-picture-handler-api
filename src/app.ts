import express from 'express';
import { runningMigrationProcess } from './db.migrations';
import { connectMongo } from './utils/database';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userController from './controller/user.controller';
import expressWinston from 'express-winston';
import { loggerOptions } from './utils';
import { extractJWT } from './middleware/JWT.extract';
const app = express();
const pj = require('../package.json')

runningMigrationProcess();

connectMongo();

app.use(expressWinston.logger(loggerOptions));

app.use(
    cors({
      origin: '*',
      credentials: true,
      exposedHeaders: ['set-cookie'],
    }),
);


/** Parse the body of the request */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

/* Rules */ 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.post('/login', userController.login);

app.get('/', (req, res) => {
    res.send(`<h1>HuPiHa-API v${pj.version}</h1>
    <h2>${pj.description}</h2>`);
});

export default app;