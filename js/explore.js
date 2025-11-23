import { auth, db } from "./firebaseConfig.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


/* DOM Elements */
const pic = document.getElementById("user-pic");
const nameEl = document.getElementById("user-name");
const styleEl = document.getElementById("user-style");
const destEl = document.getElementById("user-destination");
const datesEl = document.getElementById("user-dates");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let users = [];
let index = 0;
let currentUserId = null;


/* Load Users Once Auth is Known */
onAuthStateChanged(auth, async (user) => {
  if (!user) return window.location.href = "home.html";

  currentUserId = user.uid;

  const snapshot = await getDocs(collection(db, "users"));

  users = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((u) => u.id !== currentUserId); // skip myself

  if (users.length === 0) {
    nameEl.textContent = "No other travelers found.";
    return;
  }

  index = 0;
  loadUser();
});


/* Display a Single User */
function loadUser() {
  const u = users[index];

  pic.src = u.profilePicURL || "images/default.png";
  nameEl.textContent = u.name || "Unknown";
  styleEl.textContent = u.travelStyle || "Not set";
  destEl.textContent = u.destination || "Not set";

  if (u.startDate && u.endDate) {
    datesEl.textContent = `${u.startDate} → ${u.endDate}`;
  } else {
    datesEl.textContent = "Not set";
  }
}


/* Navigation Buttons */
nextBtn.addEventListener("click", () => {
  if (users.length === 0) return;
  index = (index + 1) % users.length;
  loadUser();
});

prevBtn.addEventListener("click", () => {
  if (users.length === 0) return;
  index = (index - 1 + users.length) % users.length;
  loadUser();
});
