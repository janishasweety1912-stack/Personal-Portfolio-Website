const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({

    name:{
        type:String,
        default:"Anisha Sweety J"
    },

    role:{
        type:String,
        default:"Full Stack Developer"
    },

    heroDescription:{
        type:String,
        default:"A passionate Full Stack Developer focused on building responsive, modern, and user-friendly web applications."
    },

    heroDescription2:{
        type:String,
        default:"I enjoy turning ideas into real digital experiences using clean code and creative design."
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

    email:String,

    mobile:String,

    location:String,

    github:String,

    linkedin:String,

    instagram:String,

    resume:String

});

module.exports = mongoose.model("Portfolio", portfolioSchema);