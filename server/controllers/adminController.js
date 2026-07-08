const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const admin = await Admin.findOne({
            username,
            email
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Email"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

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
    catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    loginAdmin
};