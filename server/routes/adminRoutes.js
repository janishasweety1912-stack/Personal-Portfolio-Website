console.log("✅ adminRoutes.js executed");
const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const upload = require("../middleware/upload");

// ======================
// JWT AUTH MIDDLEWARE
// ======================

function auth(req, res, next) {

    console.log("Authorization Header:", req.headers.authorization);

    const token = req.headers.authorization?.split(" ")[1];

    console.log("Extracted Token:", token);

    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try {

        console.log("TOKEN:", token);
        console.log("SECRET:", process.env.JWT_SECRET);

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log("VERIFIED:", verified);

        req.admin = verified;

        next();

    } catch (err) {

        console.log("JWT ERROR:");
        console.log(err);

        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });

    }
}

const { loginAdmin } = require("../controllers/adminController");

router.post("/login", loginAdmin);


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

// ======================
// UPLOAD PROFILE IMAGE
// ======================

router.post(
    "/upload-profile",
    auth,
    upload.single("profileImage"),
    async (req, res) => {

        try {

            const admin = await Admin.findById(req.admin.id);

            if (!admin) {
                return res.status(404).json({
                    message: "Admin not found"
                });
            }

            admin.profileImage = `uploads/${req.file.filename}`;

            await admin.save();

            res.json({
                success: true,
                profileImage: admin.profileImage
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);
// ======================
// UPDATE ADMIN PROFILE
// ======================

router.put("/profile", auth, async (req, res) => {

    try {

        const admin = await Admin.findById(req.admin.id);

        if (!admin) {

            return res.status(404).json({
                message: "Admin not found"
            });

        }

        if(req.body.username){
            admin.username = req.body.username;
        }

        // Update Email only if a new email is entered
        if (req.body.newEmail && req.body.newEmail.trim() !== "") {

            const existingEmail = await Admin.findOne({
                email: req.body.newEmail
            });

            if (
                existingEmail &&
                existingEmail._id.toString() !== admin._id.toString()
            ) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            admin.email = req.body.newEmail;

        }

        // Update Password only if entered
        if (req.body.newPassword && req.body.newPassword.trim() !== "") {

            const isMatch = await bcrypt.compare(
                req.body.currentPassword,
                admin.password
            );

            if (!isMatch) {

                return res.status(400).json({
                    message: "Current password is incorrect"
                });

            }

            admin.password = await bcrypt.hash(
                req.body.newPassword,
                10
            );

        }

        await admin.save();

        res.json({

            success: true,

            message: "Profile updated successfully"

        });

    }

    catch (error) {

        console.error("UPDATE PROFILE ERROR:");
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });

    }
});

module.exports = router;