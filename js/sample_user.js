import { db } from "./js/firebaseConfig.js";
import {
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const sampleUsers = [
  {
    id: "user1",
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    travelStyle: "chill",
    destination: "bali",
    startDate: "2025-06-02",
    endDate: "2025-06-12",
    bio: "Beach lover. Always searching for sunsets and good food.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user2",
    name: "Ethan Johnson",
    email: "ethan.j@example.com",
    travelStyle: "adventure",
    destination: "tokyo",
    startDate: "2025-04-18",
    endDate: "2025-04-29",
    bio: "Hiker, photographer, and ramen-obsessed traveler.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user3",
    name: "Sophia Clarke",
    email: "sophia.c@example.com",
    travelStyle: "luxury",
    destination: "paris",
    startDate: "2025-07-03",
    endDate: "2025-07-10",
    bio: "Fashion and fine dining. Always down for a classy getaway.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user4",
    name: "Daniel Kim",
    email: "daniel.k@example.com",
    travelStyle: "solo",
    destination: "rome",
    startDate: "2025-05-14",
    endDate: "2025-05-20",
    bio: "History nerd. Loves exploring ruins and ancient cities.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user5",
    name: "Ava Thompson",
    email: "ava.t@example.com",
    travelStyle: "food",
    destination: "nyc",
    startDate: "2025-03-08",
    endDate: "2025-03-14",
    bio: "Street food explorer. Pizza, bagels, dumplings — bring it on.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user6",
    name: "Liam Patel",
    email: "liam.p@example.com",
    travelStyle: "budget",
    destination: "cancun",
    startDate: "2025-02-20",
    endDate: "2025-02-28",
    bio: "Backpacker. Traveling cheap, living rich.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user7",
    name: "Harper Lewis",
    email: "harper.l@example.com",
    travelStyle: "adventure",
    destination: "bali",
    startDate: "2025-08-11",
    endDate: "2025-08-23",
    bio: "Surfer + free-diver. Always chasing the next wave.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user8",
    name: "Noah Walker",
    email: "noah.w@example.com",
    travelStyle: "solo",
    destination: "tokyo",
    startDate: "2025-09-01",
    endDate: "2025-09-10",
    bio: "Tech lover. Wandering the neon streets of Tokyo.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user9",
    name: "Chloe Rivera",
    email: "chloe.r@example.com",
    travelStyle: "chill",
    destination: "cancun",
    startDate: "2025-12-05",
    endDate: "2025-12-12",
    bio: "Cocktails, beaches, repeat.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  },
  {
    id: "user10",
    name: "Mason Brooks",
    email: "mason.b@example.com",
    travelStyle: "budget",
    destination: "rome",
    startDate: "2025-11-10",
    endDate: "2025-11-20",
    bio: "Exploring the world one cheap flight at a time.",
    profilePicURL: "images/default.png",
    createdAt: new Date()
  }
];


async function uploadUsers() {
  for (const u of sampleUsers) {
    await setDoc(doc(db, "users", u.id), u);
    console.log("Uploaded:", u.name);
  }
  console.log("All sample users uploaded!");
}

uploadUsers();
