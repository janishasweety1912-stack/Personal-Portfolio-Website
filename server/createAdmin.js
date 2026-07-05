const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

dotenv.config();

connectDB();

async function createAdmin() {

    try {

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: "Anisha Sweety J" });

        if (existingAdmin) {
            console.log("✅ Admin already exists");
            process.exit();
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash("Jayakumar@1", 10);

        // Create admin
        await Admin.create({
            username: "Anisha Sweety J",
            password: hashedPassword
        });

        console.log("✅ Admin Created Successfully");
        console.log("Username: Anisha Sweety J");
        console.log("Password: Jayakumar@1");

        process.exit();

    } catch (error) {

        console.log(error);
        process.exit();

    }

}

createAdmin();