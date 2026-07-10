const express = require("express");
const router = express.Router();

const Dashboard = require("../models/Dashboard");
const Project = require("../models/Project");
const Contact = require("../models/Contact");

router.get("/", async (req,res)=>{

    try{

        let dashboard = await Dashboard.findOne();

        if(!dashboard){

            dashboard = await Dashboard.create({});

        }

        const projects = await Project.countDocuments();

        const messages = await Contact.countDocuments();

        res.json({

            projects,

            messages,

            visitors:dashboard.visitors,

            resumeDownloads:dashboard.resumeDownloads,

            lastLogin:dashboard.lastLogin

        });

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});

module.exports = router;