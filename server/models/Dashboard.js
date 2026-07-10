const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({

    visitors:{
        type:Number,
        default:0
    },

    resumeDownloads:{
        type:Number,
        default:0
    },

    lastLogin:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model(
    "Dashboard",
    dashboardSchema
);