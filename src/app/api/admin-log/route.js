// src/app/api/admin-log/route.js
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  if (!token) {
    console.log('No token provided');
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);
    console.log('Decoded token:', decoded); // Log the decoded token
    if (!decoded.admin) {
      console.log('User is not an admin');
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const db = admin.firestore();
    const snap = await db.collection("updates").orderBy("createdAt", "desc").get();
    const rows = [];

    snap.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;

      // 1. Creation entry
      rows.push({
        id,
        timestamp: data.createdAt?.toDate?.() || new Date(data.createdAt),
        action: "CREATE",
        user: data.addedBy,
        message: data.message || data.eventName || data.department || "-",
        snapshot: JSON.stringify(data, null, 2),
      });

      // 2. All edits
      if (data.history && Array.isArray(data.history)) {
        data.history.forEach((h) => {
          rows.push({
            id,
            timestamp: new Date(h.changedAt),
            action: "EDIT",
            user: h.changedBy,
            message: h.snapshot?.message || h.snapshot?.eventName || h.snapshot?.department || "-",
            snapshot: JSON.stringify(h.snapshot, null, 2),
          });
        });
      }
    });

    return new Response(JSON.stringify(rows));
  } catch (error) {
    console.error('Error verifying token:', error); // Log any errors
    return new Response(JSON.stringify([]), { status: 401 });
  }
}