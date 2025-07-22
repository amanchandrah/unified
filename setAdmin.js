// setAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function makeAdmin() {
  try {
    // 1. Find the user by email
    const user = await admin.auth().getUserByEmail("ctrl.iitmparadox@gmail.com");
    console.log("✅ Found user UID:", user.uid);

    // 2. Give the user the admin claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log("✅ Admin claim added to ctrl.iitmparadox@gmail.com");

    // 3. Exit
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

makeAdmin();