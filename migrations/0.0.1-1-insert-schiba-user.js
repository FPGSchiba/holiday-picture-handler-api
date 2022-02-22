const mongoose = require('mongoose');

module.exports = {
    async up(db) {
      await db.collection('users').insertOne({
        username: 'FPGSchiba',
        password: '68c6251167728fd3ca56ec1c270e0a25fa0267d330548a904e6540f7e5e981bf933f13b4b08cb77d7bf8aaa34b45805e53b6b1f6dd80935cc750e6dd04cd3b4d',
        fullName: 'Jann Erhardt',
        roles: [
            "SuperAdmin"
        ],
        email: "jann.erhardt@icloud.com"
      });
    },
};
  