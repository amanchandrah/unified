// setAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json"); // ← file you downloaded from Firebase → Project settings → Service accounts

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth()
  .setCustomUserClaims("IkKEnyhEk9doJjv72l8llNaMWQ92", { admin: true })
  .then(() => {
    console.log("✅ admin claim set for user");
    process.exit(0);
  })
  .catch(console.error);