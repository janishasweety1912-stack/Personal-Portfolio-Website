const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");


// =========================
// GET ALL PROJECTS
// =========================

router.get("/", async (req, res) => {

    try {

        const projects = await Project.find().sort({
            createdAt: -1
        });

        res.status(200).json(projects);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =========================
// CREATE PROJECT
// =========================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const project = new Project({

            title: req.body.title,
            description: req.body.description,
            image: req.body.image,        // Cloudinary URL
            technologies: req.body.technologies,
            demoLink: req.body.demoLink,
            githubLink: req.body.githubLink

        });

        await project.save();

        res.status(201).json({

            success: true,
            message: "Project added successfully",
            project

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// =========================
// UPDATE PROJECT
// =========================

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedProject = await Project.findByIdAndUpdate(

            req.params.id,

            {

                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                technologies: req.body.technologies,
                demoLink: req.body.demoLink,
                githubLink: req.body.githubLink

            },

            {

                new: true,
                runValidators: true

            }

        );

        if (!updatedProject) {

            return res.status(404).json({

                success: false,
                message: "Project not found"

            });

        }

        res.json({

            success: true,
            message: "Project updated successfully",
            project: updatedProject

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// =========================
// DELETE PROJECT
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const deletedProject = await Project.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProject) {

            return res.status(404).json({

                success: false,
                message: "Project not found"

            });

        }

        res.json({

            success: true,
            message: "Project deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});


// =========================
// UPLOAD PROJECT IMAGE
// =========================

router.post(

    "/upload",

    authMiddleware,

    upload.single("image"),

    async (req, res) => {

        try {

            if (!req.file) {

                return res.status(400).json({

                    success: false,
                    message: "No image uploaded"

                });

            }

            res.status(200).json({

                success: true,

                image: req.file.path

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }

);

module.exports = router;