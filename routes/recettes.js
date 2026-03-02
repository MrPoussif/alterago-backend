var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const myAPIKey = process.env.my_API_Key;

//recette au hasard
router.get("/random", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?number=1&language=fr&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data reccupérée => ", data);
      res.json({
        recette: {
          image: data.recipes[0].image,
          title: data.recipes[0].title,
          duration: data.recipes[0].readyInMinutes,
          ingredients: data.recipes[0].extendedIngredients,
          instructions: data.recipes[0].analyzedInstructions,
        },
      });
      return data;
    });
});

//recette par filtre
router.get("/filtered", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?number=1&include-tags=vegtarian,dessert&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data reccupérée => ", data);
      res.json({
        rrecette: {
          image: data.recipes[0].image,
          title: data.recipes[0].title,
          duration: data.recipes[0].readyInMinutes,
          ingredients: data.recipes[0].extendedIngredients,
          instructions: data.recipes[0].analyzedInstructions,
        },
      });
      return data;
    });
});

module.exports = router;
