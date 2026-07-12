const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    // ==========================
    // BASIC INFORMATION
    // ==========================

    name: {
        type: String,
        default: "Anisha Sweety J"
    },

    role: {
        type: String,
        default: "Full Stack Developer"
    },

    heroDescription: {
        type: String,
        default: "A passionate Full Stack Developer focused on building responsive, modern, and user-friendly web applications."
    },

    heroDescription2: {
        type: String,
        default: "I enjoy turning ideas into real digital experiences using clean code and creative design."
    },

    about: {
        type: String,
        default: ""
    },

    about2: {
        type: String,
        default: ""
    },

    about3: {
        type: String,
        default: ""
    },

    about4: {
        type: String,
        default: ""
    },

    email: {
        type: String,
        default: ""
    },

    mobile: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    github: {
        type: String,
        default: ""
    },

    linkedin: {
        type: String,
        default: ""
    },

    resume: {
        type: String,
        default: ""
    },

    // ==========================
    // SKILLS
    // ==========================

    skills: [
        {
            name: String,
            category: String,
            percentage: Number,
            icon: String
        }
    ],

    // ==========================
    // EDUCATION
    // ==========================

    education: [
        {
            degree: String,
            college: String,
            location: String,
            duration: String,
            result: String
        }
    ],

    // ==========================
    // EXPERIENCE
    // ==========================

    experience: [
        {
            company: String,
            role: String,
            duration: String,
            responsibilities: [String],
            techStack: String,
            certificateLink: String
        }
    ],

    // ==========================
    // CERTIFICATIONS
    // ==========================

    certifications: [
        {
            category: String,
            title: String,
            organization: String,
            score: String,
            duration: String,
            description: String,
            certificateLink: String
        }
    ],

    // ==========================
    // ACHIEVEMENTS
    // ==========================

    achievements: [
        {
            title: String,
            description: String,
            buttonText: String,
            buttonLink: String
        }
    ]

});

module.exports = mongoose.model("Portfolio", portfolioSchema);