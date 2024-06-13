const express=require('express')

const router=express.Router()
const NotesController=require("../Controllers/NotesController")
const multer=require("multer")

const dotenv=require("dotenv")
const cloudinary=require("cloudinary")




dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const destinationPath = "./files";
        callback(null, destinationPath);
    },
    filename: function (req, file, callback) {
        const uniqueName = Date.now();
        callback(null, uniqueName + file.originalname);
    }
});

const upload = multer({
    storage: storage
});


router.post("/upload", upload.fields([{ name: 'file', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), NotesController.uploadNote);
router.get("/getFiles", NotesController.getNote)
router.get("/getFiles/:id", NotesController.getNotesByID)

module.exports= router;