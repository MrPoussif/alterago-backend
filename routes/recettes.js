var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const myAPIKey = process.env.my_SPOONACULAR_API_Key;

//recette au hasard
router.get("/random", (req, res) => {
  fetch(`https://api.spoonacular.com/recipes/random?&apiKey=${myAPIKey}`)
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

//recette au hasard suivant régime alimentaire
router.get("/random/:diet", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?diet=${req.params.diet}&number=1&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data récupérée => ", data);
      res.json({
        // recette: data,
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

module.exports = router;
