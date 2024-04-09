const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// POST: Create a new item
router.put('/record', async (req, res) => {
  try {
    const { description, card, card_response, finished, user_id, session_id } = req.body;
    const item = await Item.findOne({ user_id: req.body.user_id, card: req.body.card });
    if (!item) { //POST
      let date = new Date();
      const newItem = new Item({
        time_stamp: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        description: description,
        card: card,
        card_response: card_response,
        finished: finished,
        user_id: user_id,
        session_id: session_id
      });
      await newItem.save();
      console.log('Item saved successfully');
      res.status(200).json({
        message: "Item saved successfully"
    });
    } else { // PUT
      let date = new Date();
      const editedItem = {
        time_stamp: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
        card_response: card_response,
        finished: finished,
        session_id: session_id
      };
      const result = await Item.findOneAndUpdate({ user_id: user_id, card: card }, { $set: editedItem }, { new: true });
      if (result) {
        res.send(`User with ID: ${user_id} has been updated with new card title: ${card}`);
      } else {
        res.status(404).send(`User with ID: ${user_id} not found`);
      }
    }
  } catch (err) {
      console.error('error: ' + err);
      res.status(400).json({
        message: "error"
      }
  )}
});


module.exports = router;



