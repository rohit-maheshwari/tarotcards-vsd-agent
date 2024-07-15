const express = require('express');
const Person = require('../../models/PersonSchema');
const router = express.Router();

router.delete("/user/delete", async (req, res) => {
    const { emailAddress } = req.query;
    console.log("Handling /user/delete");
    const result = await Person.deleteOne({emailAddress: emailAddress});
    /* Print a message that indicates whether the operation deleted a
    document */
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one person.");
      res.status(200).json({
        message: "Successfully deleted one person."
      })
    } else {
      console.log("No persons matched the query. Deleted 0 persons.");
      res.status(404).json({
        message: "No persons matched the query. Deleted 0 persons."
      })
    }
  });

module.exports = router;
