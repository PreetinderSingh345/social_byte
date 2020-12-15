const { populate } = require("../models/post");
const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined
const User=require("../models/user");//requiring the User model for which the userSchema has been defined

module.exports.home=async function(req, res){//home controller function/action, we are exporting it so that it can be accesssed in the router section/folder and this function contains asynchronous statements(indicated using async)

    try{//we are using try catch instead of multiple ifs for handling the errors

        let posts=await Post.find({})//finding all the posts and we are awaiting here(indicated using await) till this statement is executed(success response of this statement will be forwarded to the next await statement)

        .sort("-createdAt")//sorting the posts in reverse chronological order, so that prepending looks natural
        .populate("user")//populating the user of each post
        .populate({

            path: "comments",//populating the comments of each post

            populate: {
                path: "user"//populating the user of each comment of a post
            }

        });
        
        let users=await User.find({});//finding all the users and we are awaiting here till this statement completes its execution and the statements below can be executed

        return res.render("home", {//rendering the home page as the response after the above two await statements have been executed successfully

            title: "Home",//providing the dynamic title, posts and the users object
            posts: posts,
            users: users

        });    

    }   
    catch(err){//if there is an error while executing the code inside the try

         console.log("Error : "+err);//we print a relevant error message and simply return
         return;

    }

};