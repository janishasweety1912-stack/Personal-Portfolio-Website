const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login Admin
const loginAdmin = async (req, res) => {

    try {

        const { username, password } = req.body;

        // Check username
        const admin = await Admin.findOne({ username });

        if (!admin) {

            return res.status(401).json({
                success: false,
                message: "Invalid Username"
            });

        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });

        }

        // Create JWT Token
        const token = jwt.sign(

            {
                id: admin._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            success: true,
            token,
            message: "Login Successful"

        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    loginAdmin
};