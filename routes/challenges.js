const express = require("express");
const router = express.Router();

const Challenge = require("../models/challenges");
const { checkBody } = require("../modules/checkBody");

// CREATE - Créer un nouveau challenge
router.post("/", async (req, res) => {
  if (!checkBody(req.body, ["name", "objectif", "users"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const newChallenge = new Challenge({
      name: req.body.name,
      objectif: req.body.objectif,
      like: 0,
      "compteur hebdo": 0,
      "compteur mensuel": 0,
      "compteur annuel": 0,
      users: req.body.users,
    });

    const savedChallenge = await newChallenge.save();

    res.json({ result: true, challenge: savedChallenge });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// READ - Récupérer tous les challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json({ result: true, challenges });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// READ - Récupérer un challenge par son ID
router.get("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.json({ result: false, error: "Challenge not found" });
    }

    res.json({ result: true, challenge });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// UPDATE - Modifier un challenge par son ID
router.put("/:id", async (req, res) => {
  if (!checkBody(req.body, ["name", "objectif"])) {
    return res.json({ result: false, error: "Missing or empty fields" });
  }

  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.json({ result: false, error: "Challenge not found" });
    }

    challenge.name = req.body.name || challenge.name;
    challenge.objectif = req.body.objectif || challenge.objectif;
    challenge.like = req.body.like || challenge.like;
    challenge["compteur quotidien"] =
      req.body["compteur quotidien"] || challenge["compteur quotidien"];
    challenge["compteur hebdo"] =
      req.body["compteur hebdo"] || challenge["compteur hebdo"];
    challenge["compteur mensuel"] =
      req.body["compteur mensuel"] || challenge["compteur mensuel"];
    challenge["compteur annuel"] =
      req.body["compteur annuel"] || challenge["compteur annuel"];

    const updatedChallenge = await challenge.save();
    res.json({ result: true, challenge: updatedChallenge });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

// DELETE - Supprimer un challenge par son ID
router.delete("/:id", async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.json({ result: false, error: "Challenge not found" });
    }

    await Challenge.deleteOne({ _id: req.params.id });
    res.json({ result: true, message: "Challenge deleted" });
  } catch (error) {
    res.json({ result: false, error: "Server error" });
  }
});

module.exports = router;
