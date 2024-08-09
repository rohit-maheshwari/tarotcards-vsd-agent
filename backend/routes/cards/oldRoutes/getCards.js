const express = require('express');
const Item = require('../../../models/Item');
const router = express.Router();

router.get("/cards", async (req, res) => {
  const { uid } = req.query;
  console.log("Handling GET request for /cards");
  const cursor = Item.find({
      user_id: uid
    })
  let filledCards = [];
  for await (const doc of cursor) {
    filledCards.push(doc);
  }
  console.log(filledCards);
  res.status(200).json({ cardData: filledCards });
});

module.exports = router;