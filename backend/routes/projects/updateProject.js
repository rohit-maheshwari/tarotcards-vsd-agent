const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectSchema');

router.put('/project/update', async (req, res) => {
    console.log('Handling /project/update')
    try {
        const { projectId, projectSubfield, projectTitle, projectDescription, projectTakeaways } = req.body;
        const project = await Project.findOne({ projectId: projectId });
        const editedProject = {
            projectSubfield: projectSubfield ? projectSubfield : project.projectSubfield,
            projectTitle: projectTitle ? projectTitle : project.projectTitle,
            projectDescription: projectDescription ? projectDescription : project.projectDescription,
            projectTakeaways: projectTakeaways ? projectTakeaways : project.projectTakeaways,
        };
        const response = await Project.findOneAndUpdate({ projectId: projectId }, { $set: editedProject }, { new: true })
        if (response) {
            res.status(200).json({
                message: `Project successfully saved`
            })
        } else {
            res.status(400).json({
                message: `Something went wrong`
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
