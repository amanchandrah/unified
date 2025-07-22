// src/app/api/isAdmin/route.js
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
  if (!token) return new Response(JSON.stringify({ admin: false }), { status: 401 });

  try {
    const decoded = await getAuth().verifyIdToken(token);
    return new Response(JSON.stringify({ admin: decoded.admin === true }));
  } catch {
    return new Response(JSON.stringify({ admin: false }), { status: 401 });
  }
}