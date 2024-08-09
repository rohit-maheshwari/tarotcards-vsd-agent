const express = require('express');
const router = express.Router();
const PersonProject = require('../../models/PersonProjectSchema');

router.post('/project/addUser', async (req, res) => {
    console.log('Handling /project/addUser')
    try {
        const { personEmailAddress, projectId } = req.body;
        const personproject = await PersonProject.findOne({personEmailAddress: personEmailAddress, projectId: projectId});
        if (!personproject) {
            const newPersonProject = new PersonProject({
                personEmailAddress: personEmailAddress,
                projectId: projectId
            })
            const responsePersonProject = await newPersonProject.save()
            if (responsePersonProject) {
                res.status(200).json({
                    message: `Person successfully added to project`
                })
            } else {
                res.status(400).json({
                    message: `Something went wrong`
                })
            }
        } else {
            res.status(400).json({
                message: "Person already added to project"
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
