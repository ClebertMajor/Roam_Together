// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGjh0Rg-ntj13zuaMAswJbeV24F4h8R10",
  authDomain: "roam-together-81733.firebaseapp.com",
  projectId: "roam-together-81733",
  storageBucket: "roam-together-81733.firebasestorage.app",
  messagingSenderId: "194350936784",
  appId: "1:194350936784:web:6624d7545c5202cbafa4d5",
  measurementId: "G-HHSMH2QTE3"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
