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
        const hashedPassword = await bcrypt.hash("Jayakumar@1", 10);

        // Create new admin
        await Admin.create({

            username: "Anisha Sweety J",

            email: "anishasweety1912@example.com", // Change this to your real email

            password: hashedPassword,

            profileImage: ""

        });

        console.log("✅ Admin Created Successfully");
        console.log("Username : Anisha Sweety J");
        console.log("Email    : anishasweety@example.com");
        console.log("Password : Jayakumar@1");

        process.exit();

    }

    catch (error) {

        console.log(error);

        process.exit();

    }

}

createAdmin();