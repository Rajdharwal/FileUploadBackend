const File = require("../models/file");

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