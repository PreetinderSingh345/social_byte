const mongoose=require("mongoose");//requiring mongoose and its existing instance will be used

const multer=require("multer");//requiring multer and we're requiring it explicitly inside user's model, so that different models can use it specifically 

const path=require("path");//requiring path for defining the location where the avatars will be stored(converts the below avatar path string to a path)

const AVATAR_PATH=path.join("/uploads/users/avatars");//defining the path where the avatar of the user will be stored

const userSchema=mongoose.Schema({//defining a user schema

    email: {//this email field is of type string, is necessary and is unique for each and every user

        type: String,
        required: true,
        unique: true

    },

    password: {//this password field is of type string, is necessary and can be same for different users and this field along with the email one are sufficient for the authentication purpose

        type: String,
        required: true

    },

    name: {//this name field is of type string and is necessary

        type: String,
        required: true

    },

    avatar: {

        type: String

    }

}, {

    timestamps: true//timestamps are added to get the information regarding the creation and the updation of the schema of a particular user

});

let storage=multer.diskStorage({//we're storing the avatars remotely, so we're using disk storage function of multer for defining the destination, filename and it returns a storage engine implementation for storing the files locally

    // the destination, filename functions, take the req, file contained by the request and cb i.e. the callback function as the arguments

    destination: function(req, file, cb){

        cb(null, path.join(__dirname, "..", AVATAR_PATH));//we're providing the error(null means no error) and the location where the avatars will be stored(wrt the current file) to this callback function

    },

    filename: function(req, file, cb){

        cb(null, file.fieldname+"-"+Date.now());//we're providing the error(null means no error) and the filename(date now(in ms) has been added to avoid similar file names)

    }

});

const User=mongoose.model("User", userSchema);//defining a model which is to use this userSchema with name as User and storing it inside User const variable

module.exports=User;//exporting the User model, so that it can be accesseed wherever needed