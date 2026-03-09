var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

const myAPIKey = process.env.my_SPOONACULAR_API_Key;

// Recette aléatoire sans filtre
router.get("/random", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/random?number=1&apiKey=${myAPIKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data récupérée => ", data);
      res.json({
        recette: {
          image: data.recipes[0].image,
          title: data.recipes[0].title,
          duration: data.recipes[0].readyInMinutes,
          ingredients: data.recipes[0].extendedIngredients,
          instructions: data.recipes[0].analyzedInstructions,
        },
      });
    });
});

// Recette aléatoire selon un régime alimentaire
// On utilise complexSearch car l'endpoint /random ignore souvent les filtres diet
// complexSearch retourne une liste → on prend un résultat au hasard dedans
router.get("/random/:diet", async (req, res) => {
  try {
    const diet = req.params.diet;

    // Étape 1 — on cherche des recettes qui correspondent au régime
    // number=10 → on récupère 10 résultats pour ensuite en choisir un au hasard
    const searchResponse = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?diet=${diet}&number=10&apiKey=${myAPIKey}`,
    );
    const searchData = await searchResponse.json();

    console.log("résultats complexSearch => ", searchData);

    // Si aucun résultat trouvé pour ce régime
    if (!searchData.results || searchData.results.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucune recette trouvée pour ce régime" });
    }

    // Étape 2 — on choisit un résultat au hasard dans la liste
    const indexAleatoire = Math.floor(
      Math.random() * searchData.results.length,
    );
    const recetteChoisie = searchData.results[indexAleatoire];

    // Étape 3 — on récupère les détails complets de cette recette (ingrédients, instructions...)
    // complexSearch ne retourne que le titre et l'image, pas les détails
    const detailResponse = await fetch(
      `https://api.spoonacular.com/recipes/${recetteChoisie.id}/information?apiKey=${myAPIKey}`,
    );
    const detailData = await detailResponse.json();

    console.log("détails recette => ", detailData);

    res.json({
      recette: {
        image: detailData.image,
        title: detailData.title,
        duration: detailData.readyInMinutes,
        ingredients: detailData.extendedIngredients,
        instructions: detailData.analyzedInstructions,
      },
    });
  } catch (err) {
    console.error("Erreur fetchRecetteParRegime :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
