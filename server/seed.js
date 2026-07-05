const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Project = require("./models/Project");

dotenv.config();

connectDB();

const projects = [
  {
    title: "Simple Calculator",
    description:
      "A responsive web-based calculator performing basic arithmetic operations.",
    image: "images/project1.img.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoLink:
      "https://www.linkedin.com/posts/anisha-sweety-b0a1a8356_internshipexperience-interpe-webdevelopment-activity-7413151058287493120-2gQ3",
    githubLink: ""
  },
  {
    title: "Simple E-Commerce Website",
    description:
      "Fully functional online store with product listing, cart, and checkout features.",
    image: "images/project2.img.jpeg",
    technologies: ["HTML", "CSS", "JavaScript"],
    demoLink:
      "https://www.linkedin.com/posts/anisha-sweety-b0a1a8356_interpeinternship-task2completed-webdevelopment-activity-7415818602840272897-S8uA",
    githubLink: ""
  }
];

const importData = async () => {
  try {
    await Project.deleteMany();

    await Project.insertMany(projects);

    console.log("✅ Projects inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();