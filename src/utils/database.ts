import mongoose from 'mongoose';
import config from '../config/config';
import { LOG } from '.';

export const connectMongo = () => {
    mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        LOG.info('Mongo Connected');
    })
    .catch((error) => {
        LOG.error(error.message, error);
    });
}