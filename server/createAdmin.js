const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

dotenv.config();

connectDB();

async function createAdmin() {

    try {

        // Delete old admin if it exists
        await Admin.deleteOne({
            username: "Anisha Sweety J"
        });

        // Encrypt password
        const hashedPassword = await bcrypt.hash("123", 10);

        // Create new admin
        await Admin.create({

            username: "Anisha Sweety J",

            email: "anishasweety@gmail.com", 

            password: hashedPassword,

            profileImage: ""

        });

        console.log("✅ Admin Created Successfully");
        console.log("Username : Anisha Sweety J");
        console.log("Email    : anishasweety@gmail.com");
        console.log("Password : 123");

        process.exit();

    }

    catch (error) {

        console.log(error);

        process.exit();

    }

}

createAdmin();