const express = require('express');
const router = express.Router();
const ProjectCard = require('../../models/ProjectCardSchema');

router.put('/project/addOrUpdateCard', async (req, res) => {
  try {
    console.log("Handling /project/addOrUpdateCard");
    const { projectId, cardName, answers } = req.body;
    const card = await ProjectCard.findOne({ projectId: projectId, cardName: cardName });
    console.log(card)
    if (!card) { // POST
      const newCard = new ProjectCard({
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
      const result = await ProjectCard.findOneAndUpdate({ projectId: projectId, cardName: cardName }, { $set: editedCard }, { new: true });
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





        // const body = {
        //     projectId: 1,
        //     cardName: this.state.currentCard,
        //     answers: this.state.response
        // }
        // try {
        //     const response = await fetch("/api/project/addOrUpdateCard", {
        //         body: JSON.stringify(body)
        //     })
        //     const data = await response.json()
        //     if (response.status == 200) {
        //         console.log(data.message)
        //     } else {
        //         console.error(response.status)
        //     }
        // } catch (error: any) {
        //     console.error(error.message)
        // }