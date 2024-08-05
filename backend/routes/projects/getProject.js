const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectSchema');

router.get('/project/get', async (req, res) => {
    console.log('Handling /project/get')
    try {
        const { projectId } = req.query;
        const project = await Project.findOne({projectId: projectId});
        if (project) {
            res.status(200).json({
                subfield: project.projectSubfield,
                title: project.projectTitle,
                description: project.projectDescription,
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
