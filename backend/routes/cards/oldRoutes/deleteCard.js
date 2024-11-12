const express = require('express');
const Item = require('../../../models/Item');
const router = express.Router();

router.delete("/delete", async (req, res) => {
    const { user_id , card } = req.query;
    console.log("Handling GET request for /delete");
    const result = await Item.deleteOne({user_id: user_id, card: card});
    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  });

module.exports = router;
