const express = require('express');
const router = express.Router();

router.get("/get", async (req, res) => {
    console.log("Handling GET request for /get");
    res.status(200).json({ message: "This is a response from /get" });
});

module.exports = router;