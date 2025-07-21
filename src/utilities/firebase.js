import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDviZSFj3yDwNNDtZdRKP1A_HuntpT7aOI",
  authDomain: "unified-19451.firebaseapp.com",
  projectId: "unified-19451",
  storageBucket: "unified-19451.appspot.com",
  messagingSenderId: "286169931454",
  appId: "1:286169931454:web:2bbd09aaccdcbef40408ef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);