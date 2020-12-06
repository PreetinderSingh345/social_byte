const mongoose=require("mongoose");//requiring mongoose and its existing instance will be used

const commentSchema=new mongoose.Schema({//defining a comment schema

    content: {//this content field is used for getting the comment data

        type: String,//this content field if of type string and is necesary
        required: true 

    },

    user: {//this user field is used for getting the user which has made the comment

        type: mongoose.Schema.Types.ObjectId,//the user the comment is linked to is of the type ObjectID
        ref: "User"//the ObjectId is the id of an object of the model type User

    },

    post: {//this post field is used for getting the post on which the comment has been made

        type: mongoose.Schema.Types.ObjectId,//the post the comment is linked to is of the type ObjectId
        ref: "Post"//the ObjectId is the id of an object of the model type Post

    }

},{

    timestamps: true//timestamps are added to get the information regarding the creation and the updation of the schema of a particular comment

});

const Comment=mongoose.model("Comment", commentSchema);//defining a model named Comment i.e. to use the above commentSchema and is stored inside Comment const variable

module.exports=Comment;//exporting the Comment model, so that it can be accessed wherever needed