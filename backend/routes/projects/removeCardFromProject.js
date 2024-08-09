const express = require('express');
const router = express.Router();
const ProjectCard = require('../../models/ProjectCardSchema');

router.delete('/project/removeCard', async (req, res) => {
    console.log('Handling /project/removeCard')
    try {
        const { projectId, cardName } = req.body;
        const card = await ProjectCard.deleteOne({ projectId: projectId, cardName: cardName });
        if (card.deletedCount === 1) {
            console.log("Successfully removed card from project.");
            res.status(200).json({
            message: "Successfully removed card from project."
            })
        } else {
            console.log("Card is not in project");
            res.status(404).json({
                message: "Card is not in project"
            })
        }
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
            message: "error"
        }
    )}
});


module.exports = router;
