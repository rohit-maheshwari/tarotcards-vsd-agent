const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST: Create a new item
router.post('/', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/get", async (req, res) => {
  console.log("Handling GET request for /get");
  res.status(200).json({ message: "This is a response from /get" });
});

module.exports = router;
