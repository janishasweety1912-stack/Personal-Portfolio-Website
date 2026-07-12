const express = require("express");
const router = express.Router();

const Portfolio = require("../models/Portfolio");

/* ===========================
   GET Portfolio
=========================== */

router.get("/", async (req, res) => {

    try {

        let portfolio = await Portfolio.findOne();

        // Create one automatically if none exists
        if (!portfolio) {

            portfolio = await Portfolio.create({});

        }

        res.json(portfolio);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/* ===========================
   UPDATE Portfolio
=========================== */

router.put("/", async (req, res) => {
    try {
        console.log("========== PORTFOLIO UPDATE ==========");
        console.log(req.body);
        console.log("Skills Received:", req.body.skills);
        let portfolio = await Portfolio.findOne();
        if (!portfolio) {
            portfolio = new Portfolio();
        }

        // Basic Information
        portfolio.name = req.body.name;
        portfolio.role = req.body.role;
        portfolio.heroDescription = req.body.heroDescription;
        portfolio.heroDescription2 = req.body.heroDescription2;
        portfolio.about = req.body.about;
        portfolio.about2 = req.body.about2;
        portfolio.about3 = req.body.about3;
        portfolio.about4 = req.body.about4;
        portfolio.email = req.body.email;
        portfolio.mobile = req.body.mobile;
        portfolio.location = req.body.location;
        portfolio.github = req.body.github;
        portfolio.linkedin = req.body.linkedin;
        portfolio.resume = req.body.resume;

        // Arrays
        portfolio.skills = req.body.skills || [];
        portfolio.education = req.body.education || [];
        portfolio.experience = req.body.experience || [];
        portfolio.certifications = req.body.certifications || [];
        portfolio.achievements = req.body.achievements || [];
        await portfolio.save();

        res.json({
            success: true,
            message: "Portfolio updated successfully",
            portfolio
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;