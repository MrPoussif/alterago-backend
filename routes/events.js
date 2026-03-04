var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const my_GOOGLE_PLACES_API_Key = process.env.my_GOOGLE_PLACES_API_Key;

router.post("/nearby", async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": my_GOOGLE_PLACES_API_Key,
          "X-Goog-FieldMask":
            "places.displayName.text,places.formattedAddress,places.nationalPhoneNumber,places.regularOpeningHours.weekdayDescriptions,places.rating,places.primaryType",
        },
        body: JSON.stringify({
          includedTypes: [
            "bakery",
            "restaurant",
            "pharmacy",
            "book_store",
            "hospital",
            "doctor",
            "dentist",
            "pharmacy",
            "museum",
            "movie_theater",
            "park",
            "zoo",
            "aquarium",
            "art_gallery",
            "gas_station",
            "parking",
            "bank",
            "post_office",
            "police",
          ],
          // maxResultCount: 10,
          locationRestriction: {
            circle: {
              center: {
                latitude: latitude,
                longitude: longitude,
              },
              radius: 1500,
            },
          },
        }),
      },
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur Google Places" });
  }
});

module.exports = router;
