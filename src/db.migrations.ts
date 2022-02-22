import { LOG } from './utils';
import  migrateMongo from 'migrate-mongo';
import config from './config/config';
import * as mongo from 'mongodb';
 
export function runningMigrationProcess(): void {
  migrateMongo.database
    .connect()
    .then(({ db }) => migrateMongo.up(db, new mongo.MongoClient(config.mongo.url, config.mongo.options)))
    .then(migrated => {
      LOG.info('Migration success files: %o', migrated);
    })
    .catch(err => {
      LOG.error('Migration error: %o', err);
    });
}
