module.exports = {
    async up(db) {
      await db.collection('permissions').insertMany([
        {
            name: 'doLogin',
            groupName: 'login',
            description: 'The right to login to any Service.',
            level: 2
        },
        {
            name: 'createUser',
            groupName: 'user',
            description: 'The right to create new Users.',
            level: 2
        },
        {
            name: 'getUser',
            groupName: 'user',
            description: 'The right to get Users.',
            level: 1
        },
        {
            name: 'getAllUsers',
            groupName: 'user',
            description: 'The right to get All users in ARIA.',
            level: 1
        },
        {
            name: 'updateUser',
            groupName: 'user',
            description: 'The right to edit a User',
            level: 2
        },
        {
            name: 'createPermission',
            groupName: 'permission',
            description: 'The right to create new Permissions',
            level: 2
        },
        {
            name: 'getAllPermissions',
            groupName: 'permission',
            description: 'The right to get all Permissions',
            level: 1
        },
        {
            name: 'createRole',
            groupName: 'role',
            description: 'The right to create a new Role',
            level: 2
        },
        {
            name: 'getAllRoles',
            groupName: 'role',
            description: 'The right to get all Roles',
            level: 1
        },
        {
            name: 'updateRole',
            groupName: 'role',
            description: 'The right to Update a Role',
            level: 2
        }
      ]);
    },
};
  