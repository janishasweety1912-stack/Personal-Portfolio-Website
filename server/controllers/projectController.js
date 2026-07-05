const Project = require("../models/Project");

// Get all projects
const getProjects = async (req, res) => {

    try {

        const projects = await Project.find().sort({ createdAt: -1 });

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Create new project
const createProject = async (req, res) => {

    try {

        const project = await Project.create(req.body);

        res.status(201).json(project);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete project
const deleteProject = async (req, res) => {

    try {

        await Project.findByIdAndDelete(req.params.id);

        res.json({
            success: true
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getProjects,
    createProject,
    deleteProject
};