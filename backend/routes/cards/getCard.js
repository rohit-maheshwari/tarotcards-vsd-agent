const express = require('express');
const Card = require('../../models/CardSchema');
const router = express.Router();

router.get("/card/get", async (req, res) => {
    const { cardName } = req.query;
    console.log("Handling /card/get");
    const card = await Card.findOne({cardName: cardName});
    console.log(card)
    if (card != null) {
        console.log("Returned one card");
        res.status(200).json({
          cardName: card.cardName,
          cardQuestions: card.cardQuestions
        })
    } else {
        console.log("Card does not exist");
        res.status(404).json({
          message: "Card does not exist"
        })
      }
  });

module.exports = router;
