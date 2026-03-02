const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  name: String,
  objectif: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  compteur_quotidien: { type: Number, default: 0 },
  compteur_hebdo: { type: Number, default: 0 },
  compteur_mensuel: { type: Number, default: 0 },
  compteur_annuel: { type: Number, default: 0 },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Challenge = mongoose.model("challenges", challengeSchema);

module.exports = Challenge;
