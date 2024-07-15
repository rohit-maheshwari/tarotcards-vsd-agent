const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectSchema');
const PersonProject = require('../../models/PersonProjectSchema');

router.post('/project/create', async (req, res) => {
    console.log('Handling /project/create')
    try {
        projectId = await Project.countDocuments()+1
        const { personId, projectName, projectTitle, projectDescription } = req.body;
        const newProject = new Project({
            projectId: projectId,
            projectCreateDate: Date.now(),
            projectName: projectName,
            projectTitle: projectTitle,
            projectDescription: projectDescription,
            subfieldId: 1
        })
        const responseProject = await newProject.save()
        const newPersonProject = new PersonProject({
            personId: personId,
            projectId: projectId
        })
        const responsePersonProject = await newPersonProject.save()
        if (responseProject && responsePersonProject) {
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
