const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("database connection success");})
    .catch((error)=>{console.log("db connection issue", error);
    })
}

module.exports = dbconnect;