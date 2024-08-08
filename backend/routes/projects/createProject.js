const express = require('express');
const router = express.Router();
const Project = require('../../models/ProjectSchema');
const PersonProject = require('../../models/PersonProjectSchema');

router.post('/project/create', async (req, res) => {
    console.log('Handling /project/create')
    try {
        const projectId = await Project.countDocuments()+1
        const { personEmailAddress, projectSubfield, projectTitle, projectDescription } = req.body;
        const newProject = new Project({
            projectId: projectId,
            projectCreateDate: Date.now(),
            projectSubfield: projectSubfield ? projectSubfield : '',
            projectTitle: projectTitle ? projectTitle : '',
            projectDescription: projectDescription ? projectDescription : '',
            subfieldId: 1
        })
        const responseProject = await newProject.save()
        const newPersonProject = new PersonProject({
            personEmailAddress: personEmailAddress,
            projectId: projectId
        })
        const responsePersonProject = await newPersonProject.save()
        if (responseProject && responsePersonProject) {
            res.status(200).json({
                message: `Project successfully saved`,
                projectId: projectId
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
