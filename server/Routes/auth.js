const express=require('express')

const router=express.Router()
const authController=require("../Controllers/AuthController")
const multer=require("multer")

const dotenv=require("dotenv")
const cloudinary=require("cloudinary")


dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const storage=multer.diskStorage({
    destination: function(req, file, callback){
        const destinationPath="./images";
        callback(null, destinationPath)
    },
    filename: function(req, file, callback){
        const uniqueName=Date.now()
        callback(null, uniqueName+file.originalname)
    }
})

var upload=multer({
    storage:storage
})

router.post("/signup", upload.single("profileImage"), authController.signup)
router.post("/login", authController.login)
// router.get("/getUser",authController.getUserById)

module.exports=router;