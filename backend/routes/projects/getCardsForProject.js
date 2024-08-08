const express = require('express');
const router = express.Router();
const ProjectCard = require('../../models/ProjectCardSchema');

router.get('/project/getCards', async (req, res) => {
  try {
    console.log("Handling /project/getCards");
    const { projectId } = req.query;
    if (projectId == null) {
      res.status(200).send({cards: []})
    } else {
      const cards = await ProjectCard.find({ projectId: projectId });
      if (cards) { // GET
        console.log(cards)
        res.send({cards: cards})
      } else { // PUT
        throw new Error("Project does not exist");
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