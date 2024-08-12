const express = require('express');

const router = express.Router();
const Project = require('../../models/ProjectSchema');
const PersonProject = require('../../models/PersonProjectSchema');

const ObjectID = require('mongodb').ObjectId;



router.post('/project/create', async (req, res) => {
    console.log('Handling /project/create')
    const projectId = await new ObjectID();
    try {
        const { personEmailAddress } = req.body;
        const newProject = new Project({
            _id: projectId,
            projectId: projectId,
            projectCreateDate: Date.now(),
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
