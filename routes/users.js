const express = require("express");
const router = express.Router();

const User = require("../models/users");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { checkBody } = require("../modules/checkBody");

router.post("/signup", async (req, res) => {
  //! REIMPLEMENTER LE CHECKBODY MAIS NE FONCTIONNAIT PLUS
  // if (
  //   !checkBody(req.body, [
  //     // "email",
  //     // "password",
  //     "nickname",
  //     "firstname",
  //     "lastname",
  //     "age",
  //     "gender",
  //   ])
  // ) {
  //   return res.json({ result: false, error: "Missing or empty fields" });
  // }

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { nickname: req.body.nickname }],
    });

    if (existingUser) {
      console.log("User already exists");
      return res.json({ result: false, error: "User already exists" });
    }

    const newUser = new User({
      userId: req.userId,
      nickname: req.body.nickname,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      gender: req.body.gender,
      picture: req.body.picture,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json({ result: true, error: "New user saved" });
  } catch (error) {
    res.json({ result: false, error: error.message });
  }
});

//Récupération signature cloudinary pour uploader une image
router.get("/signature", async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: "AlterAgo/profile_pictures",
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    res.json({
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "AlterAgo/profile_pictures",
    });
  } catch (error) {
    res.status(500).json({ error: "Signature generation failed" });
  }
});

//! Plus nécessaire mais à vérifier
router.post("/signin", async (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({ result: true, token: user.token });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});
//! modifier pour implémenter clerk
router.put("/update", async (req, res) => {
  if (
    !checkBody(req.body, ["nickname", "firstname", "lastname", "age", "sexe"])
  ) {
    return res.json({ result: false, error: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ token: req.body.token });
    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    await User.updateOne(
      { token: req.body.token },
      {
        nickname: req.body.nickname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        sexe: req.body.sexe,
        picture: req.body.picture,
      },
    );

    const updatedUser = await User.findOne({ token: req.body.token }).select(
      "-_id nickname firstname lastname age sexe picture",
    );

    res.json({
      result: true,
      user: updatedUser,
    });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// Passer l'utilisateur en premium
router.put("/premium", async (req, res) => {
  if (!checkBody(req.body, ["token"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const user = await User.findOne({ token: req.body.token });

    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    await User.updateOne({ token: req.body.token }, { isPremium: true });

    res.json({ result: true, message: "User is now premium" });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// Récupérer le profil de l'utilisateur
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    res.json({
      result: true,
      user: {
        userId: user.userId,
        nickname: user.nickname,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        sexe: user.sexe,
        picture: user.picture,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// Récupérer tous les utilisateurs (pour le SocialScreen)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      result: true,
      users: users,
    });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
