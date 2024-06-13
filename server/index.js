const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const express=require('express')
const bodyParser = require('body-parser')

const app=express()
const PORT=4000;
dotenv.config()
app.use(cors())
app.use(bodyParser.json())


const authRoutes=require('./Routes/auth')
const notesRoutes=require('./Routes/notes')
try{
    mongoose.connect(process.env.MONGO_URL)
    console.log("DB Connection successful")
}
catch(err){
    console.log(err)
}

app.get("/",(req,res)=>{
    res.send("Connection successful")
})

app.use("/auth", authRoutes)
app.use("/notes", notesRoutes)
app.use("/files", express.static("files"));


app.listen(PORT,()=>{
    console.log(`App listening to port ${PORT}`)
})