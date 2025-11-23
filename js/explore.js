import { auth, db } from "./firebaseConfig.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
   collection,
  getDocs,
  doc,       
  getDoc, 
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";



/* DOM Elements */
const pic = document.getElementById("user-pic");
const nameEl = document.getElementById("user-name");
const styleEl = document.getElementById("user-style");
const destEl = document.getElementById("user-destination");
const datesEl = document.getElementById("user-dates");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const matchPopup = document.getElementById("matchPopup");
const matchName = document.getElementById("matchName");
const closeMatchBtn = document.getElementById("closeMatchBtn");

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

async function saveLike(userId) {
  const userRef = doc(db, "users", currentUserId);
  await updateDoc(userRef, {
    liked: arrayUnion(userId)
  });
}

async function saveDislike(userId) {
  const userRef = doc(db, "users", currentUserId);
  await updateDoc(userRef, {
    disliked: arrayUnion(userId)
  });
}

likeBtn.addEventListener("click", async () => {
  const likedUser = users[index];

  // Save my like
  await saveLike(likedUser.id);

  // Check for mutual match
  const isMatch = await checkForMatch(likedUser.id);
  
  if (isMatch) {
    // Save match for both users
    await saveMatch(likedUser.id);

    // Show match popup
    matchName.textContent = likedUser.name;
    matchPopup.style.display = "flex";
  }

  // Move to next user
  index = (index + 1) % users.length;
  loadUser();
});

dislikeBtn.addEventListener("click", async () => {
  const dislikedUser = users[index];
  await saveDislike(dislikedUser.id);

  // Move to next user
  index = (index + 1) % users.length;
  loadUser();
});

async function checkForMatch(otherUserId) {
  const otherUserRef = doc(db, "users", otherUserId);
  const otherSnap = await getDoc(otherUserRef);

  if (!otherSnap.exists()) return false;

  const otherUserData = otherSnap.data();

  // Has the OTHER user already liked ME?
  return otherUserData.liked && otherUserData.liked.includes(currentUserId);
}

async function saveMatch(otherUserId) {
  const userRef = doc(db, "users", currentUserId);
  const otherRef = doc(db, "users", otherUserId);

  await updateDoc(userRef, {
    matches: arrayUnion(otherUserId)
  });

  await updateDoc(otherRef, {
    matches: arrayUnion(currentUserId)
  });
}

closeMatchBtn.addEventListener("click", () => {
  matchPopup.style.display = "none";
});

