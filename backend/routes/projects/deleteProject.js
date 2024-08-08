const express = require('express');
const Project = require('../../models/ProjectSchema');
const PersonProject = require('../../models/PersonProjectSchema');
const ProjectCard = require('../../models/ProjectCardSchema')
const router = express.Router();

router.delete("/project/delete", async (req, res) => {
    const { projectId } = req.query;
    console.log("Handling /project/delete");
    const deletedProjectFromProjectSchema = await Project.deleteOne({projectId: projectId});
    const deletedProjectFromPersonProjectSchema = await PersonProject.deleteMany({ projectId: projectId });
    const deletedCardsFromProjectSchema = await ProjectCard.deleteMany({ projectId: projectId });
    
    if (deletedProjectFromProjectSchema.deletedCount === 1 && deletedProjectFromPersonProjectSchema.deletedCount !== 0 && deletedCardsFromProjectSchema.deletedCount !== 0) {
      const remainingProjects = await Project.find({});
      console.log("Successfully deleted one project.");
      res.status(200).json({
        message: "Successfully deleted one project.",
        remainingProjects: remainingProjects
      })
    } else {
        console.log("No projects matched the query. Deleted 0 projects.");
        res.status(404).json({
          message: "No projects matched the query. Deleted 0 projects."
        })
      }
  });

module.exports = router;
