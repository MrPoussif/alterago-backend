const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  name: String,
  objectif: Number,
  like: Number,
  "compteur quotidien": Number,
  "compteur hebdo": Number,
  "compteur mensuel": Number,
  "compteur annuel": Number,
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Challenge = mongoose.model("challenges", challengeSchema);

module.exports = Challenge;
