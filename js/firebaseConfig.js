// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqrbT2WlbHxsJkxuqtqeHplnxO5CpNd64",
  authDomain: "roamtogether-91a56.firebaseapp.com",
  projectId: "roamtogether-91a56",
  storageBucket: "roamtogether-91a56.firebasestorage.app",
  messagingSenderId: "1035575817678",
  appId: "1:1035575817678:web:0a39827b7708b9c67ea79f",
  measurementId: "G-YV32GEXE3J"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
