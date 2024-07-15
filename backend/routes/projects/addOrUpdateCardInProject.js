const express = require('express');
const router = express.Router();
const Card = require('../../models/ProjectCardSchema');

router.put('/project/addOrUpdateCard', async (req, res) => {
  try {
    console.log("Handling /project/addOrUpdateCard");
    const { projectId, cardName, answers } = req.body;
    const card = await Card.findOne({ projectId: projectId, cardName: cardName });
    if (!card) { // POST
      const newCard = new Card({
        projectId: projectId,
        cardName: cardName,
        createDate: Date.now(),
        answers: answers
      });
      console.log(newCard)
      const result = await newCard.save();
      if (result) {
        console.log('Card saved successfully');
        res.status(200).json({
          message: "Card saved successfully"
        });
      } else {
        res.status(400).json({
          message: "Something went wrong. Could not save card."
        });
      }
    } else { // PUT
      const editedCard = {
        answers: answers
      };
      const result = await Card.findOneAndUpdate({ projectId: projectId, cardName: cardName }, { $set: editedCard }, { new: true });
      if (result) {
        res.json({
          message: "Card has been updated"
        });
      } else {
        res.status(400).json({
          message: "Something went wrong. Could not save card."
        });
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



