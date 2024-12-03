const express = require('express');
const Card = require('../../models/CardSchema');
const router = express.Router();

router.get("/card/getAll", async (req, res) => {
    console.log("Handling /card/getAll");
    const cards = await Card.find();

    if (cards.length === 12) {
        console.log("Found 12 cards");
        res.status(200).json({
          cards: cards
        })
    } else {
        console.log("Internal Server Error");
        res.status(500).json({
          message: "Internal Server Error"
        })
      }
  });

module.exports = router;
