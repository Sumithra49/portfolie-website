const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json({ success: true, projects });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message || "Failed to fetch projects",
      });
  }
});

// Add new project
router.post("/", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json({ success: true, message: "Project created", project });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message || "Failed to create project",
      });
  }
});

// Update project
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.update(req.body, { where: { id } });

    if (updated[0]) {
      const updatedProject = await Project.findOne({ where: { id } });
      res.json({
        success: true,
        message: "Project updated",
        project: updatedProject,
      });
    } else {
      res.status(404).json({ success: false, error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message || "Failed to update project",
      });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.destroy({ where: { id } });

    if (deleted) {
      res.json({ success: true, message: "Project deleted" });
    } else {
      res.status(404).json({ success: false, error: "Project not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        error: error.message || "Failed to delete project",
      });
  }
});

module.exports = router;
