module.exports = {
    async up(db) {
      await db.collection('roles').insertMany([
        {
            name: 'SuperAdmin',
            description: 'The highest Role with all Permissions.',
            permissions: [
                "login",
                'user',
                'permission',
                'role'
            ]
        },
        {
            name: 'Admin',
            description: 'A Manager, that can configure.',
            permissions: [
                "login",
                'user'
            ]
        },
        {
            name: 'User',
            description: 'A role that can use the services, but cannot configure them.',
            permissions: [
                "login"
            ]
        },
      ]);
    },
};
  