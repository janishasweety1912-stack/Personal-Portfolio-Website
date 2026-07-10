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
        let portfolio = await Portfolio.findOne();
        if (!portfolio) {
            portfolio = await Portfolio.create(req.body);
        } else {
            Object.assign(portfolio, req.body);
            await portfolio.save();
        }
        res.json({
            success: true,
            message: "Portfolio updated successfully",
            portfolio
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;