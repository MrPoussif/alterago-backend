const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  nickname: String,
  firstname: String,
  lastname: String,
  age: Number,
  sexe: String,
  picture: String,
  token: String,
  canBookmark: Boolean,
  friends: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  challenges: { type: mongoose.Schema.Types.ObjectId, ref: "challenges" },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
