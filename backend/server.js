const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = "./users.json";
const TRIPS_FILE = "./trips.json";

const SECRET = "SUPER_SECRET_KEY_CHANGE_THIS";

// Load or create storage files
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
if (!fs.existsSync(TRIPS_FILE)) fs.writeFileSync(TRIPS_FILE, "[]");

// Helper to read and write JSON files
function read(file) {
  return JSON.parse(fs.readFileSync(file));
}
function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
