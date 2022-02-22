import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    retryWrites: true
};

const MONGO_DATABSE = process.env.MONGO_DATABASE || 'aria';
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'ARIA-DB';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '1234';
const MONGO_HOST = process.env.MONGO_HOST || `localhost:27017`;

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    database: MONGO_DATABSE,
    options: MONGO_OPTIONS,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || '7d';
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'aria.ch';
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'superencryptedsecret';

const SERVER = {
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    mongo: MONGO,
    server: SERVER
};

export default config;
