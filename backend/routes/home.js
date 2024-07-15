const express = require('express');
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("Handling request for /");
    res.status(200).send("hello");
});

module.exports = router;