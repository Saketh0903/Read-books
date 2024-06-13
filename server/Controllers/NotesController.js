const express=require('express')
const dotenv=require('dotenv')
const Notes=require('../Users/Notes.js')
const multer=require('multer')
const path=require('path')
const cloudinary=require('cloudinary')


dotenv.config()
const router=express.Router()

const storage=multer.memoryStorage()

var upload=multer({storage:storage})

const uploadNote = async (req, res) => {
    try {
        const fileName = req.body.fileName;
        const fileDescription = req.body.fileDescription;
        const tags = req.body.tags;
        const uploadedBy = req.body.uploadedBy;

        // Check if both file and thumbnail are uploaded
        if (!req.files || !req.files.file || !req.files.thumbnail) {
            return res.status(400).json({ error: "Both file and thumbnail are required." });
        }

        // Upload file and thumbnail to Cloudinary
        const fileResult = await cloudinary.uploader.upload(req.files.file[0].path);
        const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path);

        const fileUrl = fileResult.secure_url;
        const thumbnailUrl = thumbnailResult.secure_url;

        // Save file and thumbnail URLs to database
        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            tags: tags,
            file: fileUrl,
            thumbnail: thumbnailUrl,
            uploadedBy: uploadedBy
        });
        await newFile.save();

        res.send({ status: "OK" });
    } catch (err) {
        res.status(400).json({ error: err.message });
        console.log(err);
    }
};


const getNote=async(req, res)=>{
    try{
        const {fileName, tags}=req.body
        const query={} 
        if (fileName){
            query.fileName=fileName
        };
        
        if(tags){
            query.tags=tags
        };
        console.log(query)
        const data=await Notes.find({...query})
        res.send({data:data})
    }
    catch(err){
        console.log(err)
    }
}

const getNotesByID=async(req,res)=>{
    try{
        const userID=req.params.id;
        console.log(userID)

        const data=await Notes.find({uploadedBy:userID})
        res.send({data:data})
    }
    catch(err){
        console.log(err)
    }
}

module.exports={uploadNote, getNote, getNotesByID}