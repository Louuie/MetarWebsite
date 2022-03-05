var admin = require("firebase-admin");

var serviceAccount = require('./middleware/auth/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;