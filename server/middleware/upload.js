const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith("image/")) {

        cb(null, true);

    } else {

        cb(
            new Error("Only image files are allowed"),
            false
        );

    }

};


const cloudinaryStorage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: "portfolio-projects",

        allowed_formats: [
            "jpg",
            "jpeg",
            "png",
            "webp"
        ]

    }

});


const upload = multer({

    storage: cloudinaryStorage,

    fileFilter: fileFilter

});


module.exports = upload;