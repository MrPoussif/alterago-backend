var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const my_FOURSQUARE_API_Key = process.env.my_FOURSQUARE_API_Key;

// exemple THUNDERCLIENT GET /events/nearby?lat=48.8566&lng=2.3522&radius=1500&query=coffee&limit=10

router.get("/nearby", async (req, res) => {
  try {
    const { lat, lng, radius = 1500, query = "", limit = 20 } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "lat et lng sont requis" });
    }
    const url = new URL("https://places-api.foursquare.com/places/search");
    url.searchParams.set("ll", `${lat},${lng}`);
    url.searchParams.set("radius", String(radius));
    url.searchParams.set("limit", String(limit));
    if (query) url.searchParams.set("query", String(query));
    const r = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${my_FOURSQUARE_API_Key}`,
        "X-Places-Api-Version": "2025-06-17", // <-- IMPORTANT
      },
    });
    if (!r.ok) {
      return res.status(r.status).send(await r.text());
    }
    console.log("data =>", r);
    // const data = await r.json();

    // const formatted = data.results.map((place) => ({
    //   id: place.fsq_id,
    //   name: place.name,
    //   address: place.location?.formatted_address,
    //   category: place.categories?.[0]?.name,
    // }));

    // res.json(formatted);

    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

module.exports = router;
