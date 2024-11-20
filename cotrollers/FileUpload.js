const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

//local file upload handler
exports.localFileUpload = async (req, res)=>{
    try {
        //fetch file from request
        const file = req.files.file;
        console.log("file fetched ", file);

        //create path where file need to be store on the server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(('.')[1])}`;
        console.log("path", path);


        //add path to the move function 
        file.mv(path, (error)=>{
            console.log(error);
            
        })

        return res.json({
            success:true,
            message:"local file uploaded successfully",
        })
        

        
    } catch (error) {
        console.log(error);
        
        
    }
}

function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file, folder){
    const options = {folder}
    console.log("temp file path",file.tempFilePath);
    
    return cloudinary.uploader.upload(file.tempFilePath, options);
    

}

//image upload handler

exports.imageUpload = async(req, res)=>{
   try {
    //fetch data from request
    const {name, tags, email } = req.body;
    console.log(name, tags, email);


    //fetch file from request
    const file = req.files.imageFile;
    console.log("file",file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    //extract file type and convert into lower case
    
    const fileType = file.name.split('.')[1].toLowerCase();

    console.log("fileType ", fileType);
    

    
    if(!isFileTypeSupported(fileType, supportedTypes)){
        return res.status(400).json({
            success:false,
            message:"file format not supported",
        })
    }

    
    //file format supported h
     const response = await uploadFileToCloudinary(file, "uploadLearn");

     console.log(response);

     //save entry into database
     const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
     });

     res.status(200).json({
        success:true,
        fileData,
        message:"image uploaded succeefully",
     })


     





    
   } catch (error) {

    return res.status(400).json({
        success:false,
        message:"soething went wrong"
    })

    
   }


    
    
}