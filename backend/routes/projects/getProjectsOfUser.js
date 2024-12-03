const express = require('express');
const Person = require('../../models/PersonSchema');
const PersonProject = require('../../models/PersonProjectSchema');
const Project = require('../../models/ProjectSchema')
const router = express.Router();

router.get("/project/getUsers", async (req, res) => {
    console.log("Handling GET request for /project/getUsers");
    const { emailAddress } = req.query;
    try {
        const person = await Person.findOne({emailAddress: emailAddress})
        const personEmailAddress = person.emailAddress;
        const personProjectRelations = await PersonProject.find({personEmailAddress: personEmailAddress})

        let projects = [];
        for (const relation of personProjectRelations) {
            const projectId = relation.projectId;
            const currProject = await Project.findOne({projectId: projectId});
            projects.push(currProject)
        }
        if (projects.length !== 0) {
            res.status(200).json({
                projects: projects
            });
        } else {
            res.status(404).json({
                message: `Person not found`
            });
        }
    } catch (err) {
        console.error('error: ' + err);
        res.status(400).json({
            message: "error"
        })
    }
  
});

module.exports = router;