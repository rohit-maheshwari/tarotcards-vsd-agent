const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
router.use(express.json());

// POST: Create a new item
router.post('/record', async (req, res) => {
  try {
    const newItem = new Item({
      time_stamp: new Date().getTime(),
      description: req.body.description,
      cards: req.body.cards,
      card_responses: req.body.card_responses,
      user_id: req.body.user_id,
      session_id: req.body.session_id
    });
    await newItem.save();
    console.log('Item saved successfully');
    res.status(200).json({
      message: "Item saved successfully"
    });
  } catch (err) {
      console.error('error: ' + err);
      res.status(400).json({
        message: "error"
      }
  )}
});

module.exports = router;
