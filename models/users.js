const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  nickname: String,
  firstname: String,
  lastname: String,
  age: Number,
  gender: String,
  picture: String,
  friends: {
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: "users", default: null },
    ],
    default: [],
  },
  challenges: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenges",
        default: null,
      },
    ],
    default: [],
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
