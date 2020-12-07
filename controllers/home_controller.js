const { populate } = require("../models/post");
const Post=require("../models/post");//requiring the Post model for which the postSchema has been defined
const User=require("../models/user");//requiring the User model for which the userSchema has been defined

module.exports.home=function(req, res){//home controller function/action and we are exporting it, so that it can be accesssed in the router section/folder

    // ** the below part where we accessed and altered the sample cookie data created from browser side is commented(cleared the sample cookie data from the browser side too) as we don't want the sample cookie data to interfere with the cookie data created by passport **

    // // created some sample cookies from the browser side

    // console.log(req.cookies);//accessing the sample cookies from the server side    

    // // altering specific cookie key-value pairs from the server side and send them as the response to the browser

    // res.cookie("user_name", "ghijk");//initial value of "user_name" key was - "abcde"
    // res.cookie("user_id", 67890);//initial value of "user_id" key was - "12345"

    Post.find({})//finding all the posts
    .populate("user")//populating the user of each post
    .populate({

        path: "comments",//populating the comments of each post

        populate: {
            path: "user"//populating the user of each comment of a post
        }

    })
    .exec(function(err, posts){//finding all the posts(all the posts will be returned as we have not passed any search criteria inside {}), populating the user and the comments of each post and the user of each comment of a post

        if(err){//if there is an error while finding the posts

            console.log(`Error in fetching the posts : ${err}`);//we print a relevant error message and simply return
            return ;

        }

        // if the posts have been found successfully

        User.find({}, function(err, users){//finding all the users and we have a callback function to handle the situation

            if(err){//if there is an error while getting the users

                console.log(`Error in fetching the users : ${err}`);//we display a relevant error message and simply return
                return ;

            }

            return res.render("home", {//rendering the home page as the response

                title: "Home",//providing the dynamic title, posts and the users object
                posts: posts,
                users: users
    
            });    

        }); 

    });    

};