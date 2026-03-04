const express = require("express");
const router = express.Router();

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");
// const uid2 = require("uid2");
// const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  //TODO Voir comment ajouter un checkbody, vérifier toutes les infos ou pas ?
  // if (!checkBody(req.body, ["username", "password", "email"])) {
  //   return res.json({ result: false, error: "Missing or empty fields" });
  // }
  // console.log("COUCOU");
  try {
    const existingUser = await User.findOne({ userId: req.userId });

    if (existingUser) {
      console.log("User already exists");
      return res.json({ result: false, error: "User already exists" });
    }

    // const hash = bcrypt.hashSync(req.body.password, 10);
    // const newToken = uid2(32);
    const newUser = new User({
      userId: req.userId,
      nickname: req.body.nickname,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      picture: req.body.picture,
      // password: hash,
      // email: req.body.email,
      // token: newToken,
      // canBookmark: true,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json({ result: true, message: "New user saved" });
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
