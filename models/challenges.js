const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  name: String,
  objectif: Number,
  like: Number,
  compteur_quotidien: Number,
  compteur_hebdo: Number,
  compteur_mensuel: Number,
  compteur_annuel: Number,
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Challenge = mongoose.model("challenges", challengeSchema);

module.exports = Challenge;
