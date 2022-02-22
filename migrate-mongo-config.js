const config = {
    mongodb: {
      url: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`,
      databaseName: process.env.MONGO_DATABASE,
      options: {
        useNewUrlParser: true, // removes a deprecation warning when connecting
        useUnifiedTopology: true, // removes a deprecating warning when connecting
      },
    },
    // The migrations dir can be a relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',
    migrationFileExtension: '.js',
    // The MongoDB collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog-hopiha',
};
module.exports = config;
  