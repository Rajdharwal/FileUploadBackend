//app create 
const express = require("express");
const app = express();

//port finding
require("dotenv").config();
const PORT = process.env.PORT;

//middleware adding
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//connect to db
const dbconnect = require("./config/database");
dbconnect();

//connect to cloudinary
// require("./config/cloudinary").cloudinaryConnect();
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mounting
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

//activate server
app.listen(PORT, ()=>{
    console.log(`server is started on port no ${PORT}`);
    
})