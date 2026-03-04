var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const my_GOOGLE_PLACES_API_Key = process.env.my_GOOGLE_PLACES_API_Key;

const includedCategories = {
  manger: ["bakery", "restaurant"],
  santé: ["hospital", "doctor", "dentist", "pharmacy"],
  culture: ["museum", "art_gallery", "movie_theater", "castle", "monument"],
  nature: ["park", "garden", "national_park", "zoo", "aquarium"],
  services: ["bank", "post_office", "police"],
};

const excludedTypes = [
  "shopping_mall",
  "supermarket",
  "clothing_store",
  "store",
];

//places aux alentours depuis API google places
router.post("/nearby", async (req, res) => {
  const { latitude, longitude, category, radius } = req.body;

  const includedTypes = includedCategories[category] || [];

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": my_GOOGLE_PLACES_API_Key,
          "X-Goog-FieldMask":
            // "places.displayName.text,places.formattedAddress,places.nationalPhoneNumber,places.regularOpeningHours.weekdayDescriptions,places.rating,places.primaryType",
            "places",
        },
        body: JSON.stringify({
          includedTypes,
          excludedTypes,
          // maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: latitude,
                longitude: longitude,
              },
              radius: radius,
            },
          },
        }),
      },
    );

    const data = await response.json();
    const simplified =
      data.places?.map((place) => ({
        name: place.displayName?.text,
        address: place.formattedAddress,
        phone: place.nationalPhoneNumber,
        hours: place.regularOpeningHours?.weekdayDescriptions,
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
        rating: place.rating,
        type: place.primaryType,
      })) || [];

    res.json(simplified);
    // res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur Google Places" });
  }
});

//route pour avoir les filtres categories
router.get("/categories", (req, res) => {
  res.json(Object.keys(includedCategories));
});

module.exports = router;
