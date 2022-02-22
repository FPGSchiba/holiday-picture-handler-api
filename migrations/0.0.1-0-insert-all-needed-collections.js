module.exports = {
    async up(db) {
      const collections = await db.listCollections().map(collection => collection.name).toArray();
      const neededCollections = [
      'permissions',
      'roles',
      'users'];
      const promise = [];
      neededCollections.map((value) => {
        db.listCollections({name: value})
        .next(function(err, collinfo) {
            if (!collinfo) {
              promise.push(db.createCollection(value));
            }
        });
      });
      await Promise.all(promise);
    },
  };