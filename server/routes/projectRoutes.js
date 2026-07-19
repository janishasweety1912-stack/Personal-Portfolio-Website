const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

// GET all projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST a new project
router.post("/", authMiddleware, async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE Project
router.delete("/:id", authMiddleware,  async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        res.json({
            success: true,
            message: "Project deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
});

// UPDATE Project
router.put("/:id", authMiddleware, async (req,res)=>{
    try{
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedProject){
            return res.status(404).json({
                message:"Project not found"
            });
        }
        res.json(updatedProject);
    }
    catch(error){
        res.status(400).json({
            message:error.message
        });
    }
});

// Upload Project Image
router.post("/upload", upload.single("image"),
    async(req,res)=>{
        try{
            res.status(200).json({
                image:req.file.path
            });
        }
        catch(error){
            res.status(500).json({
                message:error.message
            });
        }
    }
);

module.exports = router;