const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

//post middleware 
fileSchema.post("save", async function(doc) {
    try {
        console.log("doc",doc);
        //Transporter
        //todo: shift this into config folder
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //Send mail
        let info = transporter.sendMail({
            from:"codehelp",
            to:doc.email,
            subject:"file successfully uploaded on cloudinary",
            html:`<h1>Hello ji</h1> <p>file uploaded view here <a href="${doc.imageUrl}" >${doc.imageUrl}</a></P>`,
        })

        console.log("info",info);
        
        
    } catch (error) {
        console.error(error);
    }
    
})

const File = mongoose.model("File", fileSchema);
module.exports  = File;


