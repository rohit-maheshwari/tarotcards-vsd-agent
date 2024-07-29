const express = require('express');
const router = express.Router();
const ProjectCard = require('../../models/ProjectCardSchema');

router.get('/project/getCard', async (req, res) => {
  try {
    console.log("Handling /project/getCard");
    const { projectId, cardName } = req.query;
    const card = await ProjectCard.findOne({ projectId: projectId, cardName: cardName });
    res.send({card: card})
  } catch (err) {
      console.error('error: ' + err);
      res.status(400).json({
        message: "error" + err
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