const mongoose=require("mongoose");//requiring mongoose and its existing instance will be used

const postSchema=new mongoose.Schema({//defining a post schema

    content: {//this content field is used for getting the post data

        type: "string",//this content field is of type string and is necessary
        required: true

    },

    user: {//this user field is used for linking the post to a user(the relation between post and user is many to one as a user can post multiple posts, but a particular post cannot be posted by multiple users)

        type: mongoose.Schema.Types.ObjectId,//the user the post is linked to is of the type ObjectId
        ref: "User"//the ObjectId is the id of an object of the model type User

    }

}, {

    timestamps: true//timestamps are added to get the information regarding the creation and the updation of the schema of a particular user

});

const Post=mongoose.model("Post", postSchema);//defining a model named Post i.e. to use the above postSchema and store it inside a const Post variable

module.exports=Post;//exporting the Post model, so that it can be accessed wherever required