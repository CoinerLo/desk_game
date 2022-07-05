const admin = require("firebase-admin");
const serviceAccount = require("../../adminsdk.json");
exports.appAuth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
