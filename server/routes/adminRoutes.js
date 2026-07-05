const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ======================
// JWT AUTH MIDDLEWARE
// ======================

function auth(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try {

        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = verified;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

}

const { loginAdmin } = require("../controllers/adminController");

router.post("/login", loginAdmin);

// ======================
// GET PROFILE
// ======================

router.get("/profile", auth, async (req, res) => {

    try {

        const admin = await Admin.findById(req.admin.id).select("-password");

        res.json(admin);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// ======================
// GET ADMIN PROFILE
// ======================

router.get("/profile", auth, async (req, res) => {

    try {

        const admin = await Admin.findById(req.admin.id).select("-password");

        if (!admin) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }

        res.json(admin);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;