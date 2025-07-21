// pages/api/isAdmin.js   ← keep this line
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

// 1-time setup
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_KEY)
    ),
  });
}

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ admin: false });

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const isAdmin = decoded.email === "ctrl.iitmparadox@gmail.com";
    res.json({ admin: isAdmin });
  } catch {
    res.status(401).json({ admin: false });
  }
}