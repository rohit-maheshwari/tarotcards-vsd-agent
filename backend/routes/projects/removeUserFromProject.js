const express = require('express');
const router = express.Router();
const PersonProject = require('../../models/PersonProjectSchema');

router.delete('/project/removeUser', async (req, res) => {
    console.log('Handling /project/removeUser')
    try {
        const { personEmailAddress, projectId } = req.body;
        const personproject = await PersonProject.deleteOne({personEmailAddress: personEmailAddress, projectId: projectId});
        if (personproject.deletedCount === 1) {
            console.log("Successfully removed person from project.");
            res.status(200).json({
            message: "Successfully removed person from project."
            })
        } else {
            console.log("Person is not in project");
            res.status(404).json({
                message: "Person is not in project"
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
