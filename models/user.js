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

    }

}, {

    timestamps: true//timestamps are added to get the information regarding the creation and the updation of the schema of a particular user

});

const User=mongoose.model("User", userSchema);//defining a model which is to use this userSchema with name as User and storing it inside User const variable

module.exports=User;//exporting the User model, so that it can be accesseed wherever needed