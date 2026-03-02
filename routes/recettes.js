var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const myAPIKey = process.env.my_API_Key;

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

//recette végétarienne au hasard
router.get("/randomVegetarian", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?diet=vegetarian&number=1&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data reccupérée => ", data);
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

//recette sans gluten au hasard
router.get("/randomGlutenFree", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?diet=glutenfree&number=1&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data reccupérée => ", data);
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

//recette vegan au hasard
router.get("/randomVegan", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?diet=vegan&number=1&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data reccupérée => ", data);
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
