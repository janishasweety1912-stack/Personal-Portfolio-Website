const Project = require("../models/Project");


// =========================
// GET ALL PROJECTS
// =========================

const getProjects = async (req, res) => {

    try {

        const projects = await Project
            .find()
            .sort({ createdAt: -1 });


        res.status(200).json(projects);


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};



// =========================
// CREATE PROJECT
// =========================

const createProject = async (req, res) => {

    try {


        const {
            title,
            description,
            image,
            technologies,
            demoLink,
            githubLink

        } = req.body;



        const project = await Project.create({

            title,

            description,

            image,   // Cloudinary URL

            technologies,

            demoLink,

            githubLink

        });



        res.status(201).json({

            success: true,

            message: "Project created successfully",

            project

        });



    } catch (error) {

        console.log("CREATE PROJECT ERROR:", error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// =========================
// DELETE PROJECT
// =========================

const deleteProject = async (req, res) => {

    try {


        const project = await Project.findById(
            req.params.id
        );


        if(!project){

            return res.status(404).json({

                message:"Project not found"

            });

        }



        await Project.findByIdAndDelete(
            req.params.id
        );


        res.json({

            success:true,

            message:"Project deleted successfully"

        });



    } catch(error){


        res.status(500).json({

            message:error.message

        });


    }

};



module.exports = {

    getProjects,

    createProject,

    deleteProject

};