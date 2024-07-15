const express = require('express');
const Card = require('../../models/CardSchema');
const router = express.Router();

router.delete("/card/delete", async (req, res) => {
    const { cardId } = req.query;
    console.log("Handling /card/delete");
    const deletedCardFromCardSchema = await Card.deleteOne({cardId: cardId});
    
    if (deletedCardFromCardSchema.deletedCount === 1) {
        console.log("Successfully deleted one card.");
        res.status(200).json({
          message: "Successfully deleted one card."
        })
    } else {
        console.log("No cards matched the query. Deleted 0 cards.");
        res.status(404).json({
          message: "No cards matched the query. Deleted 0 cards."
        })
      }
  });

module.exports = router;
