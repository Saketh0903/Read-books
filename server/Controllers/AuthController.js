const express=require('express')
const dotenv=require('dotenv')
const User=require('../Users/User')
const bcryptjs=require('bcryptjs')
const multer=require('multer')
const cloudinary=require('cloudinary')
const { ObjectId } = require('mongodb')
const { default: mongoose } = require('mongoose')


dotenv.config()

const router=express.Router()

const storage=multer.memoryStorage()

var upload=multer({
    storage:storage
})

const signup=async(req, res)=>{
    try{
        const {firstName, lastName, userBio, userEmail, userMobile, userName, userPassword}=req.body

        const existingUser=await User.findOne({userEmail:userEmail})
        if(existingUser){
            return res.status(401).send("User already existing with this email")
        }

        if(!req.file){
            return res.send(400).send("No profile image uploaded")
        }

        const result=await cloudinary.uploader.upload(req.file.path)

        console.log(result)

        const hashedPassword=bcryptjs.hashSync(userPassword, 5)

        const newUser=new User({
            firstName,
            lastName,
            userBio,
            userEmail,
            userMobile,
            userName,
            userPassword: hashedPassword,
            profileImage: result.secure_url
        })

        await newUser.save();
        return res.send({message:"New User Created", payload:newUser})
    }
    catch(err){
        res.send({error: err.message})
        console.log(err)
    }
}

const login=async(req,res)=>{
    try{
        const {userEmail, userPassword}=req.body
        const user=await User.findOne({userEmail: userEmail})
        console.log(user)
        if(user){
            const password=bcryptjs.compareSync(userPassword, user.userPassword)
            if(password){
                return res.status(200).json(user)
            }
            else{
                return res.status(401).json({message:"Invalid Password", getUser:false})
            }
        }
        else{
            return res(401).json({message:"Invalid Username", getUser:false})
        }
    }
    catch(err){
        res.json({error:err})
        console.log(err)
    }
}

const getUserById=async(req,res)=>{
    let {uploadedBy}=req.body
    uploadedBy=mongoose.Types.ObjectId(uploadedBy)
    const user=await User.findOne({_id:uploadedBy})
    console.log(user)
    res.send({data:user})
}

module.exports={signup,login,getUserById}