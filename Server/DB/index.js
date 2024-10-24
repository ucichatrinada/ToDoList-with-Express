require("dotenv").config();
const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URI;

const db = mongoose.connect(dbURL);

module.exports = db;
