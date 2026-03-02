const express = require("express");
const router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  if (!checkBody(req.body, ["username", "password", "email"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
    const newToken = uid2(32);

    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      token: newToken,
      canBookmark: true,
    });

    const savedUser = await newUser.save();

    res.json({ result: true, token: savedUser.token });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

router.post("/signin", async (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const user = await User.findOne({ username: req.body.username });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ result: true, token: user.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
