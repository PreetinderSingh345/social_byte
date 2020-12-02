const mongoose=require("mongoose");//requiring mongoose library

mongoose.connect("mongodb://localhost/social_byte_development");//connect to the database

const db=mongoose.connection;//obtaining the connection to check if it is successful or not

db.on("error", console.error.bind(console, "Error in connecting to the database"));//print the error message if there is any while connecting to the database

db.once("open", function(){//print the successfull connection message, once the connection to the database is successfully opened
    console.log("Successfully connected to the database");
})

module.exports=db;//exporting the database, so that it can be accessed by the server